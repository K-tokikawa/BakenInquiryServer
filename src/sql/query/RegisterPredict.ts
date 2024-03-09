import SQLBase from "../../class/SQLBase";
import PrmPredictRegister from "../param/PrmPredictRegister";
export default class RegisterPredict extends SQLBase<number>
{
    private parameter: PrmPredictRegister[];
    constructor(prm: PrmPredictRegister[])
    {
        super()
        this.parameter = prm
    }

    public async Execsql(): Promise<number> {
        const sql = `
            INSERT INTO Predict VALUES (
                ${this.parameter[0].RaceID}
                ${this.parameter[0].HorseNo}
                ${this.parameter[0].Rank}
            )
        `
        await this.ExecRegister(sql)
        return 0
    }

    public async BulkInsert(filename: string)
    {
        const lines: string[] = []
        this.parameter.forEach(row => {
            const RaceID         = row.RaceID
            const HorseNo        = row.HorseNo
            const Predict        = row.Predict
            const Rank           = row.Rank    != null ? row.Rank    : 'null'
            const line = 
                `${RaceID},${HorseNo},${Predict},${Rank}`
            // line.replace(/null/, '')
            lines.push(line)
        })
        await this.ExecBulkInsert('Predict', lines, `D:\\data\\${filename}.csv`)
    }
}