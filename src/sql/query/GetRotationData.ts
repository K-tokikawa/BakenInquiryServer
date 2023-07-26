import SQLBase from "../SQLBase"
import EntRotationData from "../entity/EntRotationData"
import PrmStudyData from "../param/PrmStudyData"
export default class GetRotationData extends SQLBase<EntRotationData[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntRotationData[]> {
        const sql = `
select
    *
from RotationTable as RT
where
    RT.RaceID in (${this.parameter?.IDs})`
        return await this.ExecGet(sql)
    }
}
