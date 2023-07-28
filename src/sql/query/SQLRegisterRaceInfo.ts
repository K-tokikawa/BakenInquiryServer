import SQLBase from "../../class/SQLBase"; 
import PrmRaceInfo from "../param/PrmRaceInfo"; 
export default class SQLRegisterRaceInfo extends SQLBase<number>
{
    private parameter: PrmRaceInfo[];
    constructor(prm: PrmRaceInfo[])
    {
        super()
        this.parameter = prm
    }

    public async Execsql(): Promise<number> {
        const sql = `
INSERT INTO RaceInfomation VALUES (
    ${this.parameter[0].ID},
    '${this.parameter[0].RaceID}',
    '${this.parameter[0].Venue}',
    ${this.parameter[0].Year},
    ${this.parameter[0].Hold},
    ${this.parameter[0].Day},
    ${this.parameter[0].Round},
    ${this.parameter[0].Range},
    ${this.parameter[0].Direction},
    ${this.parameter[0].Ground},
    ${this.parameter[0].Weather},
    ${this.parameter[0].GroundCondition}
)
`
        await this.ExecRegister(sql)
        return 0
    }

    public async BulkInsert(filename: string)
    {
        let lines: string[] = []
        this.parameter.forEach(row => {
            const line =
                `${row.ID},"${row.RaceID}","${row.Venue}",${row.Year},${row.Hold},${row.Day},${row.HoldMonth},${row.HoldDay},${row.Round},${row.Range},${row.Direction != null ? row.Direction : ''},${row.Ground},${row.Weather},${row.GroundCondition},`
            line.replace('null', '')
            lines.push(line)
        })
        this.ExecBulkInsert('RaceInfomation', lines, `\\\\192.168.102.163\\Itemp\\${filename}.csv`)
    }
}