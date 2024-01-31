import SQLBase from "../../class/SQLBase"
import EntRaceInfomationData from "../Entity/EntRaceInfomationData"
import PrmGetSpecifyDateRaceData from "../param/PrmGetSpecifyDateRaceData"
export default class GetAchievementData extends SQLBase<EntRaceInfomationData[]>
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
    , VenueName
    , Direction
    , Range
    , Ground
    , GroundName
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
    ${this.parameter.startDate != null ? ` and (Year >= ${this.parameter.startDate.getFullYear()} and HoldMonth >= ${this.parameter.startDate.getMonth() - 1} and HoldDay >= ${this.parameter.startDate.getDay()})` : `` }
    ${this.parameter.finishDate != null ? ` and (Year <= ${this.parameter.finishDate.getFullYear()} and HoldMonth <= ${this.parameter.finishDate.getMonth() - 1} and HoldDay <= ${this.parameter.finishDate.getDay()})` : `` }

`

        return await this.ExecGet(sql)
    }
}
