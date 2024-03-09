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
import { GetDicHorseInfomation, GetDicRace, GetPredictData, Predict } from "./PredictUtil";
import PrmPredictRegister from "../../sql/param/PrmPredictRegister";
import RegisterPredict from "../../sql/query/RegisterPredict";

const shell = new PythonShell('./src/python/whilepredict.py')
PredictRegister(new Date('2024-01-01'), new Date('2024-12-31'), shell)
export default async function PredictRegister(startData: Date | null, finishData: Date | null, shell: PythonShell){
    const deletesql = new DeletePredictRecord()
    await deletesql.Execsql()
    
    const ProgressBar = simpleProgress()
    const param = new PrmGetSpecifyDateRaceData(startData, finishData)
    const sql = new GetSpecifyDateRaceData(param)
    const RaceData = await sql.Execsql()
    const RaceIDs = RaceData.map(x => x.ID)
    const lstRaceIDs = RaceIDs.flatMap((_, i, a) => i % 150 ? [] : [a.slice(i, i + 150)]);

    for (const lstRaceID of lstRaceIDs) {
        const dicRace = await GetDicRace(lstRaceID, ProgressBar)
        const [dicHorse, HorseIDs] = await GetDicHorseInfomation(lstRaceID, ProgressBar)
        let mgr = new MgrRaceData([], lstRaceID)
        
        for (const num in lstRaceID) {
            const RaceID = lstRaceID[num]
            if (dicHorse[RaceID] == undefined) {
                continue
            }
            const HorseIDs = Object.keys(dicHorse[RaceID]).map(x => Number(x))
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
        await mgr.dicCreate()
        await mgr.Register()
    
    
        const predictrows: IFPredictRows = await GetPredictData(
            HorseIDs,
            lstRaceID,
            dicRace,
            dicHorse,
            shell,
            ProgressBar
            )
        const Predictprogress = ProgressBar(Object.keys(predictrows).length, 20, 'Predict')
        for (const strkey of Object.keys(predictrows)) {
            const prm: PrmPredictRegister[] = []
            const RaceID = Number(strkey)
    
            const results: {
                HorseID: number,
                HorseNo: number
                predict :number
            }[] = []
            const Horses = predictrows[RaceID].Horse
            Predictprogress(1)
            for (const strHorseNo of Object.keys(Horses)) {
                const HorseNo = Number(strHorseNo)
                const row = Horses[HorseNo].predict
                let predict = await Predict(row, shell) as number
                results.push({
                    HorseID: Horses[HorseNo].HorseID,
                    HorseNo: HorseNo,
                    predict: predict
                })
            }
            results.sort((x, y) => {
                return x.predict - y.predict
            })
            let rank = 0
            for (const result of results) {
                const HorseNo = result.HorseNo
                if (results[HorseNo] == undefined) {
                    continue
                }
                rank++
                prm.push(
                    new PrmPredictRegister(
                        RaceID,
                        HorseNo,
                        result.predict,
                        rank
                    )
                )
            }
            const predictsql = new RegisterPredict(prm)
            await predictsql.BulkInsert('predict')
        }
    }
    return null
}