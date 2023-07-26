import SQLBase from "../../class/SQLBase"
import EntAchievementData from "../Entity/EntAchievementData"
import PrmStudyData from "../param/PrmStudyData"
export default class GetAchievementData extends SQLBase<EntAchievementData[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntAchievementData[]> {
        const sql = `
select
    *
from AchievementTable as AT
where
    AT.RaceID in (${this.parameter?.IDs})`
        return await this.ExecGet(sql)
    }
}
