import SQLBase from "../../class/SQLBase"
import EntRaceIDs from "../Entity/EntRaceIDs"
import PrmStudyData from "../param/PrmStudyData"
export default class UpdateSystemID extends SQLBase<EntRaceIDs[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntRaceIDs[]> {
        const sql = `
update SYSTEMCurrentID set CurrentID = ${this.parameter?.param1} where ID = ${this.parameter?.param2}
`
        return await this.ExecGet(sql)
    }
}
