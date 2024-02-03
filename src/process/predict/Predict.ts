import simpleProgress, { multiProgress } from "../ProgressBar"
import { PythonShell } from "python-shell"
import { GetDicHorseInfomation, GetDicRace, GetPredictData} from "./PredictUtil"
import IFPredictRows from "../../IF/IFPredictRows"


export default async function CreateRacePredictData(RaceData: {
    predictRaceID: number[]
    cancelHorseNo: {
        [RaceID: number]: number[]
    }
}, shell: PythonShell) {
    // // /**DBに登録した予測用のデータで予測を行う */
    const ProgressBar = simpleProgress()

    const dicRace = await GetDicRace(RaceData.predictRaceID, ProgressBar)
    const [dicHorse, HorseIDs] = await GetDicHorseInfomation(RaceData.predictRaceID, dicRace, ProgressBar)

    const predictrows: IFPredictRows = await GetPredictData(
        HorseIDs,
        RaceData.predictRaceID,
        dicRace,
        dicHorse,
        shell,
        ProgressBar
        )

    return predictrows
}

