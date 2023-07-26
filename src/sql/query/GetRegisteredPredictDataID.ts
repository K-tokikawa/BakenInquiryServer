
import SQLBase from "../../class/SQLBase";
import EntRaceIDs from "../Entity/EntRaceIDs";
export default class GetRegisteredPredictDataID extends SQLBase<EntRaceIDs[]>
{
    constructor()
    {
        super()
    }

    public async Execsql(): Promise<EntRaceIDs[]> {
        const sql =
`select
    RaceID
from (
    select
        RaceID
    from RotationTable
    union
    select
        RaceID
    from AchievementTable
    union
    select
        RaceID
    from AptitudeTable
) as RaceID
group by
    RaceID
    `
        return await this.ExecGet(sql) as EntRaceIDs[]
    }
}