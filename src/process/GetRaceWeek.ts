import { AxiosBase } from '../class/AxiosBase'
import iconv from 'iconv-lite'
import ClassRace from '../class/ClassRace'
import GetVenueMaxHold from '../sql/query/GetVenueMaxHold'
import GetVenueMaxDay from '../sql/query/GetVenueMaxDay'
import ClassHorse from '../class/ClassHorse'
import PrmRaceInfo from '../sql/param/PrmRaceInfo'
import PrmRegisterRaceHorseInfo from '../sql/param/PrmRegisterRaceHorseInfo'
import SQLRegisterRaceHorseInfo from '../sql/query/SQLRegisterRaceHorseInfo'
import SQLRegisterRaceInfo from '../sql/query/SQLRegisterRaceInfo'
import PrmGetSYSTEMCurrentID from '../sql/param/PrmGetSYSTEMCurrentID'
import GetSYSTEMCurrentID from '../sql/query/SQLGetSYSTEMCurrentID'
import EntSYSTEMCurrentID from '../sql/Entity/EntSYSTEMCurrentID'
import asEnumrable from 'linq-es5'
import GetRaceInfomationData from '../sql/query/GetRaceInfomationData'
import CreateRacePredictData, { Predict } from './Predict'
import PrmStudyData from '../sql/param/PrmStudyData'
import EntRaceInfomationData from '../sql/Entity/EntRaceInfomationData'
import MgrRaceData from '../Manager/MgrRaceData'
import GetRaceHorseStudyData from '../sql/query/GetRaceHorseStudyData'
import EntRaceHorseStudyData from '../sql/Entity/EntRaceHorseStudyData'
import BulkInsert from '../sql/query/BulkInsert'
import DeletePredictRecord from '../sql/query/DeletePredictRecord'
import GetHorseIDs from '../sql/query/GetHorseIDs'
import { PythonShell } from 'python-shell'
import {IFPredictParentTreeNode, IFPredictTreeNode} from '../IF/IFPredictTreeNode'
import InitRaceInfomation from '../sql/query/InitRaceInfomation'
import GetRace from '../sql/query/GetRace'
import DeleteRaceRecord from '../sql/query/DeleteUpdateRaceRecord'
import UpdateSystemID from '../sql/query/UpdateSystemID'
import FileUtil from '../FileUtil'

export default async function process(Year: number, Month: number, HoldDay: number, Venue: number[], Round: number[], shell: PythonShell) {
    const predictRacedata = await GetRaceWeek(Year, Month, HoldDay, Venue, Round)
    const param = new PrmStudyData(predictRacedata.predictRaceID)
    // // /**DBに登録した予測用のデータで予測を行う */
    const sql = new GetRaceInfomationData(param)
    const value = await sql.Execsql() as EntRaceInfomationData[]
    const predictdata = await CreateRacePredictData(value, shell)
    const res = await GetNodeTree(predictdata, predictRacedata.cancelHorseNo, shell)
    return res

}

async function GetNodeTree(
    predictdata: {
        [RaceID: number]: {
            Round: number,
            Ground: string,
            Venue: string,
            Horse: {
                [HorseNo: number] : {
                    HorseName: string,
                    predict: string
                }
            }
        }
    },
    cancelHorseNo: {[RaceID: number]: number[]},
    shell: PythonShell
    ) {
    let tree: IFPredictParentTreeNode[] = []
    let key = 0
    for (const strkey of Object.keys(predictdata)) {
        const RaceID = Number(strkey)
        const datas: IFPredictTreeNode[] =  []
        const result: {
            HorseNo: number
            predict :number
        }[] = []
        const Horses = predictdata[RaceID].Horse
        const RaceName = `${predictdata[RaceID].Venue}_${predictdata[RaceID].Round}R`
        let txt = `${RaceName}\n`
        for (const strHorseNo of Object.keys(Horses)) {
            const HorseNo = Number(strHorseNo)
            const row = Horses[HorseNo].predict
            const Name = Horses[HorseNo].HorseName
            let predict = await Predict(row, shell) as number
            let strpredict = `${predict}`
            if (cancelHorseNo[RaceID] != undefined) {
                if (cancelHorseNo[RaceID].includes(HorseNo)) {
                    strpredict = ''
                } else {
                    result.push({HorseNo, predict})
                }
            } else {
                result.push({HorseNo, predict})
            }
            datas.push({
                key: `${key}-${HorseNo-1}`,
                data: {
                    'RaceID': '',
                    'Mark': '',
                    'HorseNo': `${HorseNo}`,
                    'Name': Name,
                    'Predict': strpredict,
                    'Rank': ''
                }
            })
        }
        result.sort((x, y) => {
            return x.predict - y.predict
        })
        let rank = 0
        for (const val of result) {
            let Mark = ''
            rank++
            if (rank == 1) {
                Mark = '◎'
                txt += `${Mark} ${val.HorseNo} ${datas[val.HorseNo - 1].data.Name}\n`
                }
            if (rank == 2) {
                Mark = '〇'
                txt += `${Mark} ${val.HorseNo} ${datas[val.HorseNo - 1].data.Name}\n`
                }
            if (rank == 3) {
                Mark = '▲'
                txt += `${Mark} ${val.HorseNo} ${datas[val.HorseNo - 1].data.Name}\n`
                }
            if (rank == 4) {
                Mark = '△'
                txt += `${Mark} ${val.HorseNo} ${datas[val.HorseNo - 1].data.Name}\n`
                }
            if (rank > 4) {
                if (val.predict - result[3].predict < 0.25) {
                    Mark = '△'
                    txt += `${Mark} ${val.HorseNo} ${datas[val.HorseNo - 1].data.Name}\n`
                }
            }
            datas[val.HorseNo - 1].data.Rank = `${rank}`
            datas[val.HorseNo - 1].data.Mark = Mark
        }
        txt += `\n`
        txt += `#${predictdata[RaceID].Venue}${predictdata[RaceID].Round}R\n`
        txt += `#中央競馬\n`
        txt += `#競馬予想\n`
        txt += `#競馬AI\n`
        txt += `#AI予測`
        tree.push({
            key: key,
            data: {
                'RaceID': `${RaceName}`,
                'Mark': '',
                'HorseNo': `${Object.keys(Horses).length}`,
                'Name': `${RaceID}`,
                'Predict': '',
                'Rank': '',
                'text': txt
            },
            children: datas
        })
        key++
    }
    return {
        'root':
            tree
    }
}
async function GetRaceWeek(Year: number, Month: number, HoldDay: number, Venue: number[], Rounds: number[]) {

    const strMonth = Month < 10 ? `0${Month}` : `${Month}`
    const strDay = HoldDay < 10 ? `0${HoldDay}` : `${HoldDay}`

    const raceIDparam = new PrmStudyData([], Year, Month, HoldDay, Venue)
    const raceIDsql = new GetRace(raceIDparam)
    const registerdRace = await raceIDsql.Execsql()

    const registerdRaceIDs = registerdRace.map(x => {return x.RaceID})
    if (registerdRaceIDs.length > 0){
        const deletesql = new PrmStudyData(registerdRaceIDs)
        const sql = new DeleteRaceRecord(deletesql)
        sql.Execsql()
    }

    const dateID = `${Year}${strMonth}${strDay}`

    const url = `https://race.netkeiba.com/top/race_list.html?kaisai_date=${dateID}`
    const axios: AxiosBase = new AxiosBase(url)
    const page = await axios.GET() as Buffer
    const pageElement = iconv.decode(page, 'eucjp')

    const predictRaceID: number[] = []
    const cancelHorseNo: {
        [RaceID: number]: number[]
    } = {}
    const RaceData: {
        predictRaceID: number[]
        cancelHorseNo: {
            [RaceID: number]: number[]
        }
    } = {predictRaceID: [], cancelHorseNo: {}}
    const idparam = new PrmGetSYSTEMCurrentID(null)
    const idsql = new GetSYSTEMCurrentID(idparam)
    const ids = await idsql.Execsql() as EntSYSTEMCurrentID[]

    let RaceHorseID: number = asEnumrable(ids)
        .Where(x => x.ID == 3)
        .Select(x => x.CurrentID)
        .FirstOrDefault()
    let RaceID: number = asEnumrable(ids)
        .Where(x => x.ID == 2)
        .Select(x => x.CurrentID)
        .FirstOrDefault()
    for (const VenueNum of Venue) {
        if (pageElement.match(ClassRace.VaneuMatch[VenueNum])) {
            const sqlHold = new GetVenueMaxHold(Year, VenueNum)
            const lstHold = await sqlHold.Execsql()
            let Hold = lstHold[0].Hold
            let strHold = Hold < 10 ? `0${Hold}` : `${Hold}`

            const sqlDay = new GetVenueMaxDay(Year, VenueNum, Hold)
            const lstDay = await sqlDay.Execsql()

            let Day = lstDay[0].Day + 1

            let strDay = Day< 10 ? `0${Day}` : `${Day}`

            // 開催が合っているかの確認
            // 11Rなのはページが用意されている確率が高いから
            const checkRaceID = `${Year}${ClassRace.VenueCode[VenueNum]}${strHold}${strDay}11`
            const memberurl = `https://race.netkeiba.com/race/shutuba.html?race_id=${checkRaceID}&rf=race_submenu`
            const axios: AxiosBase = new AxiosBase(memberurl)
            const page = await axios.GET() as Buffer
            const pageElement = iconv.decode(page, 'eucjp')
            if (!pageElement.match(/RaceName/)) {
                Hold += 1
                strHold = Hold < 10 ? `0${Hold}` : `${Hold}`
                strDay = '01'
                Day = 1
            }
            const raceparam: PrmRaceInfo[] = []
            const horseparam: PrmRegisterRaceHorseInfo[] = []
            
            for (const Round of Rounds) {
                RaceID++
                const strRound = Round < 10 ? `0${Round}` : `${Round}`
                const VenueCode = ClassRace.VenueCode[VenueNum]
                const strRaceID = `${Year}${VenueCode}${strHold}${strDay}${strRound}`
                const memberurl = `https://race.netkeiba.com/race/shutuba.html?race_id=${strRaceID}&rf=race_submenu`

                const axios: AxiosBase = new AxiosBase(memberurl)
                const page = await axios.GET() as Buffer
                
                const pageElement = iconv.decode(page, 'eucjp')
                if (pageElement.match(/RaceName/)) {
                    const pages = pageElement.split('\n')
                    FileUtil.OutputFile(pages, `${RaceID}.txt`)
                    const racedata: ClassRace = PageAnalysis(pages, 0, strRaceID, VenueCode, Year, Hold, Day, Month, HoldDay, Round)

                    if (racedata.Ground == 3) continue;
                    predictRaceID.push(RaceID)

                    const param = new PrmRaceInfo(RaceID, strRaceID, VenueCode, Year, Hold, Day, Round, racedata.Range, racedata.Direction, racedata.Ground, racedata.Weather, racedata.GroundCondition, Month, HoldDay)
                    raceparam.push(param)

                    for (const horse of racedata.Horse) {
                        if (horse.Cancel) {
                            if (cancelHorseNo[RaceID] == undefined) {
                                cancelHorseNo[RaceID] = [horse.HorseNo]
                            } else {
                                cancelHorseNo[RaceID].push(horse.HorseNo)
                            }
                        }
                        const Horseparam = new PrmRegisterRaceHorseInfo(
                            RaceHorseID++,
                            RaceID,
                            strRaceID,
                            null,
                            null,
                            0,
                            horse.netkeibaID,
                            horse.GateNo,
                            horse.HorseNo,
                            horse.HorseAge,
                            horse.HorseGender,
                            horse.Weight,
                            horse.JockeyID,
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            horse.Popularity,
                            horse.HorseWeight,
                            horse.Fluctuation,
                            horse.Barn,
                            horse.TrainerID,
                            null
                        )
                        horseparam.push(Horseparam)
                    }
                }
            }
            if (raceparam.length > 0) {
                const horsesql = new SQLRegisterRaceHorseInfo(horseparam)
                console.log('Horse')
                await horsesql.BulkInsert('Horse')
                const racesql = new SQLRegisterRaceInfo(raceparam)
                console.log('Race')
                await racesql.BulkInsert('Race')
                const horseupdate = new PrmStudyData([], RaceHorseID, 3)
                const horseupdatesql = new UpdateSystemID(horseupdate)
                horseupdatesql.Execsql()
                const raceupdate = new PrmStudyData([], RaceID, 2)
                const raceupdatesql = new UpdateSystemID(raceupdate)
                raceupdatesql.Execsql()

            }
        }
    }
    const param = new PrmStudyData(predictRaceID)
    const initsql = new InitRaceInfomation(param)
    await initsql.Execsql()
    const HorseIDsql = new GetHorseIDs(param)
    const horseIDs = (await HorseIDsql.Execsql()).map(x => {return x.HorseID})

    const studyparam = new PrmStudyData(horseIDs)
    const studydatasql = new GetRaceHorseStudyData(studyparam)
    const studydata = await studydatasql.Execsql() as EntRaceHorseStudyData[]
    const mgr = new MgrRaceData(studydata, predictRaceID)
    await mgr.dicCreate()
    const deletesql = new DeletePredictRecord(param)
    await deletesql.Execsql()
    const insertDic = mgr.insertDic
    const pace = new BulkInsert(insertDic.pace, 'PaceTable')
    await pace.BulkInsert('PaceTable_')
    const Achievement = new BulkInsert(insertDic.strAchievement, 'AchievementTable')
    await Achievement.BulkInsert('AchievementTable_')
    const Aptitude = new BulkInsert(insertDic.strPassage, 'AptitudeTable')
    await Aptitude.BulkInsert('AptitudeTable_')
    const Rotation = new BulkInsert(insertDic.data, 'RotationTable')
    await Rotation.BulkInsert(`RotationTable_`)
    RaceData.predictRaceID = predictRaceID
    RaceData.cancelHorseNo = cancelHorseNo
    return RaceData
}

function PageAnalysis(pages: string[], ID: number, RaceID: string, Venue: string, Year: number, Hold: number, Day: number, HoldMonth: number, HoldDay: number, Round: number) {
    let range = 0
    let ground = 0
    let direction = 0
    let weather = 0
    let groundcondition = 0
    const dicHorse: {
        [GateNo: number]: {
            [HorseNo: number]: {
                HorseID: string,
                HorseAge: number,
                HorseGender: number,
                Weight: number,
                JockeyID: string,
                Popularity: number,
                HorseWeight: number,
                Fluctuation: string,
                Barn: number,
                TrainerID: string
                cancel: boolean
            }
        }
    } = {}
    let HorseID: string | null = ''
    let GateNo: number = 0
    let HorseNo: number = 0
    let cancel: boolean = false
    for (const line of pages) {
        if (line.match(/span class="Turf"/)) {
            // 距離
            if (line.match(/\d{4}/)) {
                range = Number(line.match(/\d{4}/)?.[0])
            }
            // 芝orダート
            if (ground == 0) {
                if (line.match(/障/)) {
                    ground = 3
                } else if (line.match(/ダ/)) {
                    ground = 2
                } else if (line.match(/芝/)) {
                    ground = 1
                }
            }
    
            // 向き
            if (line.match(/右/)) {
                direction = 1
            } else if (line.match(/左/)) {
                direction = 2
            } else if (line.match(/直線/)) {
                direction = 3
            }
        }
        if (line.match(/晴/)) {
            weather = 1
        }
        if (line.match(/曇/)) {
            weather = 2
        }
        if (line.match(/雨/)) {
            weather = 3
        }
        if (line.match(/雪/)) {
            weather = 4
        }

        if (line.match(/良/)){
            groundcondition = 1
        }
        if (line.match(/稍/)){
            groundcondition = 2
        }
        if (line.match(/重/)){
            groundcondition = 3
        }
        if (line.match(/不/)){
            groundcondition = 4
        }
        if (line.match(/Waku[0-9]/)) {
            GateNo = Number(line.match(/(?<=\<span\>).*?(?=\<\/span\>)/)?.[0] as string)
            if (dicHorse[GateNo] == undefined) {
                dicHorse[GateNo] = {}
            }
        }
        if (line.match(/HorseList Cancel/)) {
            cancel = true
        }
        if (line.match(/Umaban[0-9] /)) {
            HorseNo = Number(line.match(/(?<=Txt_C"\>).*?(?=\<\/td\>)/)?.[0] as string)
            if (dicHorse[GateNo][HorseNo] == undefined) {
                dicHorse[GateNo][HorseNo] = {
                    HorseID: '',
                    HorseAge: 0,
                    HorseGender: 0,
                    Weight: 0,
                    JockeyID: '',
                    Popularity: 0,
                    HorseWeight: 0,
                    Fluctuation: '',
                    Barn: 0,
                    TrainerID: '',
                    cancel: cancel
                }
            }
            cancel = false
        }

        if (line.match(/(?<=id="myhorse_).*?(?=\")/)) {
            HorseID = line.match(/(?<=id="myhorse_).*?(?=\")/)?.[0] as string
            dicHorse[GateNo][HorseNo].HorseID = HorseID
        }

        if (line.match(/Barei Txt_C/)) {
            if (line.match(/牡/)) {
                dicHorse[GateNo][HorseNo].HorseGender = 1
            }
            if (line.match(/牝/)) {
                dicHorse[GateNo][HorseNo].HorseGender = 2
            }
            if (line.match(/セ/)) {
                dicHorse[GateNo][HorseNo].HorseGender = 3
            }
            dicHorse[GateNo][HorseNo].HorseAge = Number(line.match(/\d{1}|\d{2}/)?.[0])
        }

        if (line.match(/"Txt_C">\d{2}/)) {
            // dicHorse[GateNo][HorseNo].Weight = Number(line.match(/\d{2}.\d{1}/)?.[0])
            dicHorse[GateNo][HorseNo].Weight = Number(line.match(/\d{2}/)?.[0])
        }

        if (line.match(/jockey\/result\/recent/)) {
            dicHorse[GateNo][HorseNo].JockeyID = line.match(/(?<=recent\/).*?(?=\/\")/)?.[0] as string
        }

        if (line.match(/\d{3}<small>/)) {
            dicHorse[GateNo][HorseNo].HorseWeight = Number(line.match(/\d{3}/)?.[0] as string)
        }

        if (line.match(/(?<=small>\().[0-9][0-9]?(?=\)<\/small)/)) {
            dicHorse[GateNo][HorseNo].Fluctuation = line.match(/(?<=small>\().[0-9][0-9]?(?=\)<\/small)/)?.[0] as string
        }
        if (line.match(/(?<="Label[0-9]">).*?(?=<\/span)/)) {
            if (line.match(/栗東/)) {
                dicHorse[GateNo][HorseNo].Barn = 1
            }
            if (line.match(/美浦/)) {
                dicHorse[GateNo][HorseNo].Barn = 2
            }
            if (line.match(/地方/)) {
                dicHorse[GateNo][HorseNo].Barn = 3
            }
            if (line.match(/海外/)) {
                dicHorse[GateNo][HorseNo].Barn = 4
            }
        }
        if (line.match(/trainer\/result/)) {
            dicHorse[GateNo][HorseNo].TrainerID = line.match(/(?<=recent\/).*?(?=\/\")/)?.[0] as string
        }
    }
    const data = new ClassRace(
        ID,
        RaceID,
        Venue,
        Year,
        Hold,
        Day,
        HoldMonth,
        HoldDay,
        Round,
        range,
        direction,
        ground,
        weather,
        groundcondition,
        0
    )
    for (const strGateNo of Object.keys(dicHorse)) {
        const GateNo = Number(strGateNo)
        for (const strHorseNo of Object.keys(dicHorse[GateNo])) {
            const HorseNo = Number(strHorseNo)
            const HorseID = dicHorse[GateNo][HorseNo].HorseID
            const HorseAge = dicHorse[GateNo][HorseNo].HorseAge
            const HorseGender = dicHorse[GateNo][HorseNo].HorseGender
            const Weight = dicHorse[GateNo][HorseNo].Weight
            const JockeyID = dicHorse[GateNo][HorseNo].JockeyID
            const Popularity = dicHorse[GateNo][HorseNo].Popularity
            const HorseWeight = dicHorse[GateNo][HorseNo].HorseWeight
            const Fluctuation = dicHorse[GateNo][HorseNo].Fluctuation
            const Barn = dicHorse[GateNo][HorseNo].Barn
            const TrainerID = dicHorse[GateNo][HorseNo].TrainerID
            const cancel = dicHorse[GateNo][HorseNo].cancel
            const Horse = new ClassHorse(
                HorseID,
                GateNo,
                HorseNo,
                HorseAge,
                HorseGender,
                Weight,
                JockeyID,
                Popularity,
                HorseWeight,
                Fluctuation,
                Barn,
                TrainerID,
                cancel
            )
            data.Horse.push(Horse)
        }
    }
    return data
}