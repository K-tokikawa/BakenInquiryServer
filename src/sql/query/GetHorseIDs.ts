import SQLBase from "../../class/SQLBase"
import EntHorseIDsData from "../Entity/EntHorseIDsData"
import PrmStudyData from "../param/PrmStudyData"
export default class GetHorseIDs extends SQLBase<EntHorseIDsData[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntHorseIDsData[]> {
        const sql = `
select
    HorseID
    , num
from (
    select
        RHI.HorseID
        , ROW_NUMBER()over(order by RHI.HorseID) as num
    from (
        select
            RHI.HorseID
        from RaceHorseInfomation as RHI
        where
            RHI.HorseID is not null
            and RHI.RaceID in (
                ${this.parameter?.IDs}
            )
        group by
            RHI.HorseID
    ) as RHI
) as RHI
`
        return await this.ExecGet(sql)
    }
}
