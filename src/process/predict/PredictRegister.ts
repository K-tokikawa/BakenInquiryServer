import { PythonShell } from "python-shell";
import IFPredictRows from "../../IF/IFPredictRows";
import MgrRaceData from "../../Manager/MgrRaceData";
import EntRaceHorseStudyData from "../../sql/Entity/EntRaceHorseStudyData";
import PrmGetSpecifyDateRaceData from "../../sql/param/PrmGetSpecifyDateRaceData";
import PrmStudyData from "../../sql/param/PrmStudyData";
import DeletePredictRecord from "../../sql/query/DeletePredictRecord";
import GetRaceHorseStudyDataBeforeSpecifyID from "../../sql/query/GetRaceHorseStudyDataBeforeSpecifyID";
import GetSpecifyDateRaceData from "../../sql/query/GetSpecifyDateRaceData";
import simpleProgress from "../ProgressBar";
import { GetDicHorseInfomation, GetDicRace, GetPredictData } from "./PredictUtil";

export default async function PredictRegister(startData: Date | null, finishData: Date | null){
    const deletesql = new DeletePredictRecord()
    await deletesql.Execsql()
    
    const ProgressBar = simpleProgress()
    const param = new PrmGetSpecifyDateRaceData(startData, finishData)
    const sql = new GetSpecifyDateRaceData(param)
    const RaceData = await sql.Execsql()
    const lstRaceID = RaceData.map(x => {return x.ID})
    const [dicRace, RaceIDs] = await GetDicRace(lstRaceID, ProgressBar)
    const [dicHorse, HorseIDs] = await GetDicHorseInfomation(lstRaceID, dicRace, ProgressBar)
    
    let mgr = new MgrRaceData([], lstRaceID)
    for (const strRaceID in Object.keys(dicHorse)) {

        const RaceID = Number(strRaceID)
        const HorseIDs = Object.keys(dicHorse[RaceID]).map(x => {return Number(x)})
        const studyparam = new PrmStudyData(HorseIDs, RaceID)
        const studydatasql = new GetRaceHorseStudyDataBeforeSpecifyID(studyparam)
        const studydata = await studydatasql.Execsql() as EntRaceHorseStudyData[]

        await mgr.addStudyData(studydata)
        if (mgr.insertDic.strAchievement.length >= 1000) {
            await mgr.dicCreate()
            await mgr.Register()
            mgr = new MgrRaceData([], lstRaceID)
        }
    }
    const shell = new PythonShell('./src/python/whilepredict.py')
    const predictrows: IFPredictRows = await GetPredictData(
        HorseIDs,
        RaceIDs,
        dicRace,
        dicHorse,
        shell,
        ProgressBar
        )
}