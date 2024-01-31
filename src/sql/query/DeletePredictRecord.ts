import SQLBase from "../../class/SQLBase"
import PrmStudyData from "../param/PrmStudyData"
export default class DeletePredictRecord extends SQLBase<void>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null = null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<void> {
        const sql = `
delete AchievementTable
delete AptitudeTable
delete RotationTable
delete PaceTable
`
        return await this.ExecGet(sql)
    }
}
