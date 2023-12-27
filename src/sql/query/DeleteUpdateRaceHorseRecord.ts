import SQLBase from "../../class/SQLBase"
import PrmStudyData from "../param/PrmStudyData"
export default class DeleteUpdateRaceHorseRecord extends SQLBase<void>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<void> {
        const sql = `
delete RaceHorseInfomation where RaceID in (${this.parameter?.IDs})
update SYSTEMCurrentID set CurrentID =  RHI.ID
from (
select
	max(ID) as ID
from RaceHorseInfomation
) as RHI
where
	SYSTEMCurrentID.ID = 3
`
        return await this.ExecGet(sql)
    }
}
