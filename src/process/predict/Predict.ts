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

    const [dicRace, RaceIDs] = await GetDicRace(RaceData.predictRaceID, ProgressBar)
    const [dicHorse, HorseIDs] = await GetDicHorseInfomation(RaceIDs, dicRace, ProgressBar)

    const predictrows: IFPredictRows = await GetPredictData(
        HorseIDs,
        RaceIDs,
        dicRace,
        dicHorse,
        shell,
        ProgressBar
        )

    return predictrows
}

