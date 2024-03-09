import SQLBase from "../../class/SQLBase"
import EntRaceInfomationData from "../Entity/EntRaceInfomationData"
import PrmGetSpecifyDateRaceData from "../param/PrmGetSpecifyDateRaceData"
export default class GetSpecifyDateRaceData extends SQLBase<EntRaceInfomationData[]>
{
    private parameter: PrmGetSpecifyDateRaceData

    constructor(prm: PrmGetSpecifyDateRaceData) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntRaceInfomationData[]> {
        const sql = `
select
    ID
    , Venue
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
    , HoldDay
    , Round
from RaceInfomation as RI
where
    1 = 1
    and Direction is not null
    and not exists (select distinct(RaceID) as RaceID from Predict as Pr where Pr.RaceID = RI.ID)
    ${this.parameter.startDate != null ? ` and (Year >= ${this.parameter.startDate.getFullYear()} and HoldMonth >= ${this.parameter.startDate.getMonth() + 1} and HoldDay >= ${this.parameter.startDate.getDate()})` : `` }
    ${this.parameter.finishDate != null ? ` and (Year <= ${this.parameter.finishDate.getFullYear()} and HoldMonth <= ${this.parameter.finishDate.getMonth() + 1} and HoldDay <= ${this.parameter.finishDate.getDate()})` : `` }
order by
    ID
`
        return await this.ExecGet(sql)
    }
}
