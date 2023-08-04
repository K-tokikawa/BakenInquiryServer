import SQLBase from "../../class/SQLBase"
import PrmStudyData from "../param/PrmStudyData"
export default class DeletePredictRecord extends SQLBase<void>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<void> {
        const sql = `
delete AchievementTable where RaceID in (${this.parameter?.IDs})
delete AptitudeTable where RaceID in (${this.parameter?.IDs})
delete RotationTable where RaceID in (${this.parameter?.IDs})
delete PaceTable where RaceID in (${this.parameter?.IDs})
`
        return await this.ExecGet(sql)
    }
}
