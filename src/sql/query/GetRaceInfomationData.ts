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
    , case convert(int, Venue) when 1 then '札幌'
                               when 2 then '函館'
                               when 3 then '福島'
                               when 4 then '新潟'
                               when 5 then '東京'
                               when 6 then '中山'
                               when 7 then '中京'
                               when 8 then '京都'
                               when 9 then '阪神'
                               when 10 then '小倉'
                               else '' 
      end as VenueName
    , Direction
    , Range
    , Ground
    , case Ground when 1 then '芝' 
                  when 2 then 'ダート'
                  else '' 
      end as GroundName
    , GroundCondition
    , Weather
    , HoldMonth
    , Hold
    , Day
    , convert(datetime, convert(nvarchar, RI.Year) + '-' + convert(nvarchar, RI.HoldMonth) + '-' + convert(nvarchar, RI.HoldDay)) as HoldDay
    , Round
    , RHI.hc
from RaceInfomation as RI
    left outer join( 
        select
            RHI.RaceID
            , count(isnull(RHI.HorseID, 0)) as hc
        from RaceHorseInfomation as RHI
        where
            RHI.HorseID is not null
        group by
            RHI.RaceID
    ) as RHI
        on RHI.RaceID = RI.ID
    left outer join( 
        select
            RHI.RaceID
            , count(RHI.HorseID) as hc
        from RaceHorseInfomation as RHI
			left outer join BloodTable as BT
				on BT.ID = RHI.HorseID
                and RHI.HorseID is not null
		where
			BT.ID is not null
        group by
            RHI.RaceID
    ) as BT
        on BT.RaceID = RI.ID
where
    RI.ID in (${this.parameter?.IDs})
    and RI.Direction is not null
`
        return await this.ExecGet(sql)
    }
}


