import SQLBase from "../../class/SQLBase"
import PrmStudyData from "../param/PrmStudyData"
export default class DeleteRaceRecord extends SQLBase<void>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<void> {
        const sql = `
delete RaceInfomation where ID in (${this.parameter?.IDs});
update SYSTEMCurrentID set CurrentID =  RI.ID
from (
select
	max(ID) as ID
from RaceInfomation
) as RI
where
	SYSTEMCurrentID.ID = 2
`
        return await this.ExecGet(sql)
    }
}
