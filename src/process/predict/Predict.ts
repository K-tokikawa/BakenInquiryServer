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
import { GetBloodPredictData, GetDicAchievementData, GetDicAptitudeData, GetDicHorseInfomation, GetDicRace, GetDicRotationData, GetHorsePredictData, GetPredictRows} from "./PredictUtil"
import IFAptitude from "../../IF/IFDicAptitude"
import IFDicRotation from "../../IF/IFDicRotation"
import IFDicAchievement from "../../IF/IFDicAchievement"
import IFPredictRows from "../../IF/IFPredictRows"
import IFDicPredictData from "../../IF/IFDicPredictData"
import IFDicHorseInfomation from "../../IF/IFDicHorseInfomation"

export default async function CreateRacePredictData(RaceData: {
    predictRaceID: number[]
    cancelHorseNo: {
        [RaceID: number]: number[]
    }
}, shell: PythonShell) {
    // // /**DBに登録した予測用のデータで予測を行う */
    const ProgressBar = simpleProgress()
    let predictrows: IFPredictRows = {}
    const dicpredict: IFDicPredictData = {}

    const [dicRace, RaceIDs] = await GetDicRace(RaceData.predictRaceID, ProgressBar)
    const [dicHorse, HorseIDs] = await GetDicHorseInfomation(RaceIDs, dicRace, ProgressBar)

    const blooddata: {[ID: number]: string} = await GetBloodPredictData(HorseIDs)

    const dicAptitude: IFAptitude = await GetDicAptitudeData(RaceIDs, dicRace, ProgressBar)
    const dicAchievement: IFDicAchievement = await GetDicAchievementData(RaceIDs, dicRace, ProgressBar)
    const dicRotation: IFDicRotation = await GetDicRotationData(RaceIDs, dicRace, ProgressBar)

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

