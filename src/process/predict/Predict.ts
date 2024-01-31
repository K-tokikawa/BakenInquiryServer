import EntBloodStudyData_Blood from "../../sql/Entity/EntBloodStudyData_Blood"
import EntRaceHorseInfomationData from "../../sql/Entity/EntRaceHorseInfomationData"
import EntRaceInfomationData from "../../sql/Entity/EntRaceInfomationData"
import PrmStudyData from "../../sql/param/PrmStudyData"
import GetHorseIDBloodStudyData_Blood from "../../sql/query/GetHorseIDBloodStudyData_Blood"
import simpleProgress, { multiProgress } from "../ProgressBar"
import { PythonShell } from "python-shell"
import GetRaceHorseInfomationData from "../../sql/query/GetRaceHorseInfomationData"
import GetRaceInfomationData from "../../sql/query/GetRaceInfomationData"
import { IFDicRace } from "../../IF/IFDicRace"
import { GetBloodPredictData, GetDicAchievementData, GetDicAptitudeData, GetDicRotationData, GetHorsePredictData, GetPredictRows} from "./PredictUtil"
import IFAptitude from "../../IF/IFDicAptitude"
import IFDicRotation from "../../IF/IFDicRotation"
import IFDicAchievement from "../../IF/IFDicAchievement"
import IFPredictRows from "../../IF/IFPredictRows"
import IFDicPredictData from "../../IF/IFDicPredictData"

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

    const blooddata: {[ID: number]: string} = await GetBloodPredictData(HorseIDs)

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

