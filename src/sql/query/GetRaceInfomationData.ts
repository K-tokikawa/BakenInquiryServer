import SQLBase from "../../class/SQLBase"
import EntRaceInfomationData from "../Entity/EntRaceInfomationData"
import PrmStudyData from "../param/PrmStudyData"
export default class GetRaceInfomationData extends SQLBase<EntRaceInfomationData[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntRaceInfomationData[]> {
        const sql = `
select
      ID
    , convert(int, Venue) as Venue
    , Direction
    , Range
    , Ground
    , GroundCondition
    , Weather
    , HoldMonth
    , Hold
    , Day
    , convert(datetime, convert(nvarchar, RI.Year) + '-' + convert(nvarchar, RI.HoldMonth) + '-' + convert(nvarchar, RI.HoldDay)) as HoldDay
    , Round
    , hc
from RaceInfomation as RI
    left outer join( 
        select
            RHI.RaceID
            , count(RHI.HorseID) as hc
        from RaceHorseInfomation as RHI
        group by
            RHI.RaceID
    ) as RHI
        on RHI.RaceID = RI.ID
where
    RI.ID in (${this.parameter?.IDs})
    and RI.Direction is not null`
        return await this.ExecGet(sql)
    }
}


