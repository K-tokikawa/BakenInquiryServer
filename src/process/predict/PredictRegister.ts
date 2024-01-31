import PrmGetSpecifyDateRaceData from "../../sql/param/PrmGetSpecifyDateRaceData";
import GetSpecifyDateRaceData from "../../sql/query/GetSpecifyDateRaceData";
import simpleProgress from "../ProgressBar";
import { GetDicHorseInfomation, GetDicRace } from "./PredictUtil";

export default async function PredictRegister(startData: Date | null, finishData: Date | null){
    // レース情報を取得
    const ProgressBar = simpleProgress()
    const param = new PrmGetSpecifyDateRaceData(startData, finishData)
    const sql = new GetSpecifyDateRaceData(param)
    const RaceData = await sql.Execsql()
    const lstRaceID = RaceData.map(x => {return x.ID})
    const [dicRace, RaceIDs] = await GetDicRace(lstRaceID, ProgressBar)
    const [dicHorse, HorseIDs] = await GetDicHorseInfomation(lstRaceID, dicRace, ProgressBar)

    // 出走馬情報を取得
    // 予測用のデータを登録
    // 予測を実行
    // 予測結果を登録

}