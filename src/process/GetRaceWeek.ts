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
import CreateRacePredictData from './Predict'
import PrmStudyData from '../sql/param/PrmStudyData'
import EntRaceInfomationData from '../sql/Entity/EntRaceInfomationData'
import MgrRaceData from '../Manager/MgrRaceData'
import GetRaceHorseStudyData from '../sql/query/GetRaceHorseStudyData'
import EntRaceHorseStudyData from '../sql/Entity/EntRaceHorseStudyData'
import BulkInsert from '../sql/query/BulkInsert'
import DeletePredictRecord from '../sql/query/DeletePredictRecord'
export default async function process(Year: number, Month: number, HoldDay: number) {
    const predictRaceID = await GetRaceWeek(Year, Month, HoldDay)
    const temppredictRaceID = [
        125983,
        125984,
        125985,
        125986,
        125987,
        125988,
        125989,
        125990,
        125991,
        125992,
        125993,
        125994,
        127589,
        127590,
        127591,
        127592,
        127593,
        127594,
        127595,
        127596,
        127597,
        127598,
        127599,
        127600
    ]
    const param = new PrmStudyData(temppredictRaceID)
    /** 予測用のデータ作ってDBに登録 */
    const studydatasql = new GetRaceHorseStudyData(param)
    const studydata = await studydatasql.Execsql() as EntRaceHorseStudyData[]
    const mgr = new MgrRaceData(studydata, temppredictRaceID)
    await mgr.dicCreate()
    const deletesql = new DeletePredictRecord(param)
    await deletesql.Execsql()
    const insertDic = mgr.insertDic
    const Achievement = new BulkInsert(insertDic.strAchievement, 'AchievementTable')
    await Achievement.BulkInsert('AchievementTable')
    const Aptitude = new BulkInsert(insertDic.strPassage, 'AptitudeTable')
    await Aptitude.BulkInsert('AptitudeTable')
    const Rotation = new BulkInsert(insertDic.data, 'RotationTable')
    await Rotation.BulkInsert('RotationTable')

    /**DBに登録した予測用のデータで予測を行う */
    const sql = new GetRaceInfomationData(param)
    const value = await sql.Execsql() as EntRaceInfomationData[]
    const rows = await CreateRacePredictData(value)
    console.log(rows)
}

async function GetRaceWeek(Year: number, Month: number, HoldDay: number) {
    const strMonth = Month < 10 ? `0${Month}` : `${Month}`
    const strDay = HoldDay < 10 ? `0${HoldDay}` : `${HoldDay}`
    const dateID = `${Year}${strMonth}${strDay}`

    const url = `https://race.netkeiba.com/top/race_list.html?kaisai_date=${dateID}`
    const axios: AxiosBase = new AxiosBase(url)
    const page = await axios.GET() as Buffer
    const pageElement = iconv.decode(page, 'eucjp')

    const predictRaceID: number[] = []
    for (const strkey of Object.keys(ClassRace.VaneuMatch)) {
        const VenueNum = Number(strkey)
        if (pageElement.match(ClassRace.VaneuMatch[VenueNum])) {
            const sqlHold = new GetVenueMaxHold(Year, VenueNum)
            const lstHold = await sqlHold.Execsql()
            let Hold = lstHold[0].Hold
            let strHold = Hold < 10 ? `0${Hold}` : `${Hold}`

            const sqlDay = new GetVenueMaxDay(Year, VenueNum, Hold)
            const lstDay = await sqlDay.Execsql()

            const Day = lstDay[0].Day - 1

            let strDay = Day + 1 < 10 ? `0${Day + 1}` : `${Day + 1}`

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
            }

            const Rounds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ,12]
            const raceparam: PrmRaceInfo[] = []
            const horseparam: PrmRegisterRaceHorseInfo[] = []

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
                    predictRaceID.push(RaceID)
                    const pages = pageElement.split('\n')
                    const racedata: ClassRace = PageAnalysis(pages, 0, strRaceID, VenueCode, Year, Hold, Day, Month, HoldDay, Round)

                    const param = new PrmRaceInfo(RaceID, strRaceID, VenueCode, Year, Hold, Day, Round, racedata.Range, racedata.Direction, racedata.Ground, racedata.Weather, racedata.GroundCondition, Month, HoldDay)
                    raceparam.push(param)

                    for (const horse of racedata.Horse) {
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
                        )
                        horseparam.push(Horseparam)
                    }
                }
            }
            const horsesql = new SQLRegisterRaceHorseInfo(horseparam)
            // await horsesql.BulkInsert('Horse')
            const racesql = new SQLRegisterRaceInfo(raceparam)
            // await racesql.BulkInsert('Race')
        }
    }
    return predictRaceID
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
            }
        }
    } = {}
    let HorseID: string | null = ''
    let GateNo: number = 0
    let HorseNo: number = 0
    for (const line of pages) {
        if (line.match(/span class="Turf"/)) {
            // 距離
            if (line.match(/\d{4}/)) {
                range = Number(line.match(/\d{4}/)?.[0])
            }
            // 芝orダート
            if (line.match(/芝/)) {
                ground = 1
            } else if (line.match(/ダ/)) {
                ground = 2
            } else if (line.match(/障/)) {
                ground = 3
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
                }
            }
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
            dicHorse[GateNo][HorseNo].Weight = Number(line.match(/\d{2}.\d{1}/)?.[0])
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
                TrainerID
            )
            data.Horse.push(Horse)
        }
    }
    return data
}