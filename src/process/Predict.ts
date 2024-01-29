import EntBloodStudyData_Blood from "../sql/Entity/EntBloodStudyData_Blood"
import EntRaceHorseInfomationData from "../sql/Entity/EntRaceHorseInfomationData"
import EntRaceInfomationData from "../sql/Entity/EntRaceInfomationData"
import EntAchievementData from "../sql/Entity/EntAchievementData"
import EntAptitudeData from "../sql/Entity/EntAptitudeData"
import EntRotationData from "../sql/Entity/EntRotationData"
import PrmStudyData from "../sql/param/PrmStudyData"
import GetAchievementData from "../sql/query/GetAchievementData"
import GetAptitudeData from "../sql/query/GetAptitudeData"
import GetHorseIDBloodStudyData_Blood from "../sql/query/GetHorseIDBloodStudyData_Blood"
import GetRotationData from "../sql/query/GetRotationData"
import simpleProgress, { multiProgress } from "./ProgressBar"
import { PythonShell } from "python-shell"
import GetRaceHorseInfomationData from "../sql/query/GetRaceHorseInfomationData"
import FileUtil from "../FileUtil"
import GetRaceInfomationData from "../sql/query/GetRaceInfomationData"
import { IFDicRace } from "../IF/IFDicRace"
import { GetDicAchievementData, GetDicAptitudeData, GetDicRotationData, GetHorsePredictData, GetPredictRows} from "./PredictUtil"
import IFAptitude from "../IF/IFDicAptitude"
import IFDicRotation from "../IF/IFDicRotation"
import IFDicAchievement from "../IF/IFDicAchievement"
import IFPredictRows from "../IF/IFPredictRows"
import IFDicPredictData from "../IF/IFDicPredictData"

export default async function CreateRacePredictData(RaceData: {
    predictRaceID: number[]
    cancelHorseNo: {
        [RaceID: number]: number[]
    }
}, shell: PythonShell) {
    // // /**DBに登録した予測用のデータで予測を行う */
    const predictparam = new PrmStudyData(RaceData.predictRaceID)
    const sql = new GetRaceInfomationData(predictparam)
    const value = await sql.Execsql() as EntRaceInfomationData[]
    const ProgressBar = simpleProgress()
    let predictrows: IFPredictRows = {}
    const dicRace:IFDicRace = {}

    const dicpredict: IFDicPredictData = {}

    const initprogress = ProgressBar(Object.keys(dicRace).length, 20, 'init')
    value.map(x => {
        initprogress(1)
        dicRace[x.ID] = {
            Venue: x.Venue,
            VenueName: x.VenueName,
            Direction: x.Direction,
            Range: x.Range,
            Ground: x.Ground,
            GroundName: x.GroundName,
            GroundCondition: x.GroundCondition,
            Weather: x.Weather,
            Hold: x.Hold,
            Day: x.Day,
            HoldMonth: x.HoldMonth,
            Round: x.Round
        }
    })
    const RaceIDs = value.map(x => {return x.ID})
    const param = new PrmStudyData(RaceIDs)

    const HorseIDssql = new GetRaceHorseInfomationData(param)
    const HorseIDsvalue = await HorseIDssql.Execsql() as EntRaceHorseInfomationData[]
    const dicHorse: {
        [RaceID: number]: {
            [HorseID: number]: {
                Jockey: number,
                Rank: number,
                HorseName: string,
                HorseNo: number
                HorseAge: number,
                HorseGender: number,
                HorseWeight: number,
                Weight: number,
                TrainerID: number,
                Fluctuation: number,
                Popularity: number
            }
        }
    } = {}
    const horseprogress = ProgressBar(Object.keys(dicRace).length, 20, 'horse')
    for (const data of HorseIDsvalue) {
        horseprogress(1)
        if (dicHorse[data.RaceID] == undefined) {
            dicHorse[data.RaceID] = {}
        }
        dicHorse[data.RaceID][data.HorseID] = {
            Jockey: data.JockeyID,
            Rank : 0,
            HorseName: data.Name,
            HorseNo : data.HorseNo,
            HorseAge: data.HorseAge,
            HorseGender: data.HorseGender,
            HorseWeight: data.HorseWeight,
            Weight: data.Weight,
            TrainerID: data.TrainerID,
            Fluctuation: data.Fluctuation,
            Popularity: data.Popularity
        }
    }
    const HorseIDs = Array.from(new Set(HorseIDsvalue.map(x => {return x.HorseID})))

    const bloodparam = new PrmStudyData(HorseIDs)
    const blood = new GetHorseIDBloodStudyData_Blood(bloodparam)
    const bloodvalue = await blood.Execsql() as EntBloodStudyData_Blood[]
    const blooddata: {[ID: number]: string} = {}
    bloodvalue.forEach(x=> {
        blooddata[x.HorseID] = `${x.FID},${x.MID},${x.FFID},${x.FMID},${x.MFID},${x.MMID},${x.FFFID},${x.FFMID},${x.FMFID},${x.FMMID},${x.MFFID},${x.MFMID},${x.MMFID},${x.MMMID},${x.FFFFID},${x.FFFMID},${x.FFFFFID},${x.FFFFMID},${x.FFFMFID},${x.FFFMMID},${x.FFFFFFID},${x.FFFFFMID},${x.FFFFMFID},${x.FFFFMMID},${x.FFFMFFID},${x.FFFMFMID},${x.FFFMMFID},${x.FFFMMMID},${x.FFMFID},${x.FFMMID},${x.FFMFFID},${x.FFMFMID},${x.FFMMFID},${x.FFMMMID},${x.FFMFFFID},${x.FFMFFMID},${x.FFMFMFID},${x.FFMFMMID},${x.FFMMFFID},${x.FFMMFMID},${x.FFMMMFID},${x.FFMMMMID},${x.FMFFID},${x.FMFMID},${x.FMFFFID},${x.FMFFMID},${x.FMFMFID},${x.FMFMMID},${x.FMFFFFID},${x.FMFFFMID},${x.FMFFMFID},${x.FMFFMMID},${x.FMFMFFID},${x.FMFMFMID},${x.FMFMMFID},${x.FMFMMMID},${x.FMMFID},${x.FMMMID},${x.FMMFFID},${x.FMMFMID},${x.FMMMFID},${x.FMMMMID},${x.FMMFFFID},${x.FMMFFMID},${x.FMMFMFID},${x.FMMFMMID},${x.FMMMFFID},${x.FMMMFMID},${x.FMMMMFID},${x.FMMMMMID},${x.MFFFID},${x.MFFMID},${x.MFFFFID},${x.MFFFMID},${x.MFFMFID},${x.MFFMMID},${x.MFFFFFID},${x.MFFFFMID},${x.MFFFMFID},${x.MFFFMMID},${x.MFFMFFID},${x.MFFMFMID},${x.MFFMMFID},${x.MFFMMMID},${x.MFMFID},${x.MFMMID},${x.MFMFFID},${x.MFMFMID},${x.MFMMFID},${x.MFMMMID},${x.MFMFFFID},${x.MFMFFMID},${x.MFMFMFID},${x.MFMFMMID},${x.MFMMFFID},${x.MFMMFMID},${x.MFMMMFID},${x.MFMMMMID},${x.MMFFID},${x.MMFMID},${x.MMFFFID},${x.MMFFMID},${x.MMFMFID},${x.MMFMMID},${x.MMFFFFID},${x.MMFFFMID},${x.MMFFMFID},${x.MMFFMMID},${x.MMFMFFID},${x.MMFMFMID},${x.MMFMMFID},${x.MMFMMMID},${x.MMMFID},${x.MMMMID},${x.MMMFFID},${x.MMMFMID},${x.MMMMFID},${x.MMMMMID},${x.MMMFFFID},${x.MMMFFMID},${x.MMMFMFID},${x.MMMFMMID},${x.MMMMFFID},${x.MMMMFMID},${x.MMMMMFID},${x.MMMMMMID},${x.FID1},${x.FID2},${x.FID3},${x.FID4},${x.FID5},${x.FID6},${x.FID7},${x.FID8},${x.FID9},${x.FID10},${x.FID11},${x.FID12},${x.FID13},${x.FID14},${x.FID15},${x.FID16},${x.FID17},${x.FID18},${x.FID19},${x.FID20},${x.FID21},${x.FID22},${x.FID23},${x.FID24},${x.FID25},${x.FID26},${x.FID27},${x.FID28},${x.FID29},${x.FID30},${x.FID31},${x.FID32},${x.FID33},${x.FID34},${x.FID35},${x.FID36},${x.FID37},${x.FID38},${x.FID39},${x.FID40},${x.FID41},${x.FID42},${x.FID43},${x.FID44},${x.FID45},${x.FID46},${x.FID47},${x.FID48},${x.FID49},${x.FID50},${x.FID51},${x.FID52},${x.FID53},${x.FID54},${x.FID55},${x.FID56},${x.FID57},${x.FID58},${x.FID59},${x.FID60},${x.FID61},${x.FID62},${x.FID63},${x.FID64},${x.FID65},${x.FID66},${x.FID67},${x.FID68},${x.FID69},${x.FID70},${x.FID71},${x.FID72},${x.FID73},${x.FID74},${x.FID75},${x.FID76},${x.FID77},${x.FID78},${x.FID79},${x.FID80},${x.FID81},${x.FID82},${x.FID83},${x.FID84},${x.FID85},${x.FID86},${x.FID87},${x.MFSID1},${x.MFSID2},${x.MFSID3},${x.MFSID4},${x.MFSID5},${x.MFSID6},${x.MFSID7},${x.MFSID8},${x.MFSID9},${x.MFSID10},${x.MFSID11},${x.MFSID12},${x.MFSID13},${x.MFSID14},${x.MFSID15},${x.MFSID16},${x.MFSID17},${x.MFSID18},${x.MFSID19},${x.MFSID20},${x.MFSID21},${x.MFSID22},${x.MFSID23},${x.MFSID24},${x.MFSID25},${x.MFSID26},${x.MFSID27},${x.MFSID28},${x.MFSID29},${x.MFSID30},${x.MFSID31},${x.MFSID32},${x.MFSID33},${x.MFSID34},${x.MFSID35},${x.MFSID36},${x.MFSID37},${x.MFSID38},${x.MFSID39},${x.MFSID40},${x.MFSID41},${x.MFSID42},${x.MFSID43},${x.MFSID44},${x.MFSID45},${x.MFSID46},${x.MFSID47},${x.MFSID48},${x.MFSID49},${x.MFSID50},${x.MFSID51},${x.MFSID52},${x.MFSID53},${x.MFSID54},${x.MFSID55},${x.MFSID56},${x.MFSID57},${x.MFSID58},${x.MFSID59},${x.MFSID60},${x.MFSID61},${x.MFSID62},${x.MFSID63},${x.MFSID64},${x.MFSID65},${x.MFSID66},${x.MFSID67},${x.MFSID68},${x.MFSID69},${x.MFSID70},${x.MFSID71},${x.MFSID72},${x.MFSID73},${x.MFSID74},${x.MFSID75},${x.MFSID76},${x.MFSID77},${x.MFSID78},${x.MFSID79},${x.MFSID80},${x.MFSID81},${x.MFSID82},${x.MFSID83},${x.MFSID84},${x.MFSID85},${x.MFSID86},${x.MFSID87},${x.MMFSID1},${x.MMFSID2},${x.MMFSID3},${x.MMFSID4},${x.MMFSID5},${x.MMFSID6},${x.MMFSID7},${x.MMFSID8},${x.MMFSID9},${x.MMFSID10},${x.MMFSID11},${x.MMFSID12},${x.MMFSID13},${x.MMFSID14},${x.MMFSID15},${x.MMFSID16},${x.MMFSID17},${x.MMFSID18},${x.MMFSID19},${x.MMFSID20},${x.MMFSID21},${x.MMFSID22},${x.MMFSID23},${x.MMFSID24},${x.MMFSID25},${x.MMFSID26},${x.MMFSID27},${x.MMFSID28},${x.MMFSID29},${x.MMFSID30},${x.MMFSID31},${x.MMFSID32},${x.MMFSID33},${x.MMFSID34},${x.MMFSID35},${x.MMFSID36},${x.MMFSID37},${x.MMFSID38},${x.MMFSID39},${x.MMFSID40},${x.MMFSID41},${x.MMFSID42},${x.MMFSID43},${x.MMFSID44},${x.MMFSID45},${x.MMFSID46},${x.MMFSID47},${x.MMFSID48},${x.MMFSID49},${x.MMFSID50},${x.MMFSID51},${x.MMFSID52},${x.MMFSID53},${x.MMFSID54},${x.MMFSID55},${x.MMFSID56},${x.MMFSID57},${x.MMFSID58},${x.MMFSID59},${x.MMFSID60},${x.MMFSID61},${x.MMFSID62},${x.MMFSID63},${x.MMFSID64},${x.MMFSID65},${x.MMFSID66},${x.MMFSID67},${x.MMFSID68},${x.MMFSID69},${x.MMFSID70},${x.MMFSID71},${x.MMFSID72},${x.MMFSID73},${x.MMFSID74},${x.MMFSID75},${x.MMFSID76},${x.MMFSID77},${x.MMFSID78},${x.MMFSID79},${x.MMFSID80},${x.MMFSID81},${x.MMFSID82},${x.MMFSID83},${x.MMFSID84},${x.MMFSID85},${x.MMFSID86},${x.MMFSID87}`
    })

    const dicAptitude: IFAptitude = await GetDicAptitudeData(param, dicRace, ProgressBar)
    const dicAchievement: IFDicAchievement = await GetDicAchievementData(param, dicRace, ProgressBar)
    const dicRotation: IFDicRotation = await GetDicRotationData(param, dicRace, ProgressBar)

    const multiProgressber = multiProgress()
    const Raceprogress = multiProgressber().addProgress(Object.keys(dicRace).length, 20, 'Race')
    for (const strRaceID of Object.keys(dicRace)) {
        const RaceID = Number(strRaceID)

        const info = dicRace[RaceID]
        if (dicpredict[RaceID] == undefined) {
            dicpredict[RaceID] = {
                info: `,${info.Venue},${info.Range},${info.Ground},${info.GroundCondition},${info.Weather},${info.Hold},${info.Day}`,
                Horses:[]
            }
        }
        for (let no = 1; no <= 24; no++ ){
            dicpredict[RaceID].Horses[no]={
                horsepredictdata:',None,None,None,None,None',
                rank:-1,
                Name: ''
            }
        }
        const Horse = dicHorse[RaceID]

        const predictprogress = multiProgressber().addProgress(Object.keys(Horse).length, 20, 'predict')
        for (const strHorseID of Object.keys(Horse)) {
            predictprogress.addCount(1)
            const HorseID = Number(strHorseID)
            const Horsevalue = Horse[HorseID]

            const HorsePredictData = await GetHorsePredictData(
                RaceID,
                HorseID,
                Horsevalue,
                info,
                blooddata,
                dicAptitude,
                dicAchievement,
                dicRotation,
                shell
                )

            dicpredict[RaceID].Horses[Horsevalue.HorseNo] = {
                horsepredictdata: HorsePredictData,
                rank: Horsevalue.Rank,
                Name: Horsevalue.HorseName
            }
        }
        predictrows = await GetPredictRows(RaceID, dicpredict)
        predictprogress.del()
        Raceprogress.addCount(1)
    }

    return predictrows
}

export function Predict(data: string,shell: PythonShell, name=''): Promise<number | null>{
    return new Promise((resolve, reject) => {
        const datarow = data.split(',')
        const datas = datarow.map(x => {return x == null || x == 'null' ? 'None': x})
        shell.send(`${datas}`)
        let result: number| null = null
        shell.once('message', async function(message){
            result = Number(message.replace('[', '').replace(']', ''))
            resolve(result)
        })
    })

}