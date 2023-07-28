import SQLBase from "../../class/SQLBase"
import EntRaceIDs from "../Entity/EntRaceIDs"
import PrmStudyData from "../param/PrmStudyData"
export default class GetRace extends SQLBase<EntRaceIDs[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntRaceIDs[]> {
        const sql = `
select
      ID as RaceID
from RaceInfomation as RI
where
    RI.Year = ${this.parameter?.param1}
    and RI.HoldMonth = ${this.parameter?.param2}
    and RI.HoldDay = ${this.parameter?.param3}
    and RI.Venue in (${this.parameter?.param4})
`
        return await this.ExecGet(sql)
    }
}
