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

PredictRegister(new Date('2023-12-01'), new Date('2023-12-2'))
export default async function PredictRegister(startData: Date | null, finishData: Date | null){
    const deletesql = new DeletePredictRecord()
    await deletesql.Execsql()
    
    const ProgressBar = simpleProgress()
    const param = new PrmGetSpecifyDateRaceData(startData, finishData)
    const sql = new GetSpecifyDateRaceData(param)
    const RaceData = await sql.Execsql()
    const lstRaceID = RaceData.map(x => x.ID)
    const dicRace = await GetDicRace(lstRaceID, ProgressBar)
    const [dicHorse, HorseIDs] = await GetDicHorseInfomation(lstRaceID, dicRace, ProgressBar)
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

    const shell = new PythonShell('./src/python/whilepredict.py')
    const predictrows: IFPredictRows = await GetPredictData(
        HorseIDs,
        lstRaceID,
        dicRace,
        dicHorse,
        shell,
        ProgressBar
        )
    for (const strkey of Object.keys(predictrows)) {
        const RaceID = Number(strkey)
        const results: {
            HorseID: number,
            HorseNo: number
            predict :number
        }[] = []
        const Horses = predictrows[RaceID].Horse
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
        const prm: PrmPredictRegister[] = []
        for (const result of results) {
            const HorseNo = result.HorseNo
            if (Horses[HorseNo] == undefined) {
                continue
            }
            rank++
            prm.push(
                new PrmPredictRegister(
                    RaceID,
                    HorseNo,
                    rank
                )
            )
        }
        const sql = new RegisterPredict(prm)
        sql.BulkInsert('predict')
    }
}