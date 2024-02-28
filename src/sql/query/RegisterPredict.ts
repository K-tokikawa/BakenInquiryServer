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
            INSERT INTO RaceHorseInfomation VALUES (
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
            const Rank           = row.Rank    != null ? row.Rank    : 'null'
            const HorseNo        = row.HorseNo
            const line = 
                `${RaceID},${HorseNo},${Rank}`
            // line.replace(/null/, '')
            lines.push(line)
        })
        await this.ExecBulkInsert('RacePredict', lines, `D:\\data\\${filename}.csv`)
    }
}