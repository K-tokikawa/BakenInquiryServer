import SQLBase from "../../class/SQLBase"
import EntAptitudeData from "../Entity/EntAptitudeData"
import PrmStudyData from "../param/PrmStudyData"
export default class GetAptitudeData extends SQLBase<EntAptitudeData[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntAptitudeData[]> {
        const sql = `
select
    *
from AptitudeTable as AT
where
    AT.RaceID in (${this.parameter?.IDs})`
        return await this.ExecGet(sql)
    }
}
