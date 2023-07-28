import SQLBase from "../../class/SQLBase"
import EntRaceHorseStudyData from "../Entity/EntRaceHorseStudyData"
import PrmStudyData from "../param/PrmStudyData"
export default class GetRaceHorseStudyData extends SQLBase<EntRaceHorseStudyData[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntRaceHorseStudyData[]> {
        const sql = `
select
      HorseID
    , RaceID
    , GoalTime
    , Direction
    , HoldDay
    , HoldMonth
    , Hold
    , Day
    , Weather
    , ID
    , Rank
    , Venue
    , Range
    , Ground
    , GroundCondition
    , Round
    , Weight
    , TrainerID
    , Age
    , Popularity
    , HorseGender
    , isnull(HorseWeight, lead(HorseWeight)over(partition by RHI.HorseID order by RHI.num)) as HorseWeight
    , HorseNo
    , HorseAge
    , Passage1
    , Passage2
    , Passage3
    , Passage4
    , SpurtTime
    , isnull(Fluctuation, 0) as Fluctuation
    , JockeyID
    , lag(RHI.HoldDay)over(partition by RHI.HorseID order by RHI.num) as before
    , num
from (
    select
          RHI.GoalTime - TA.Average as GoalTime
        , RI.ID as RaceID
        , convert(datetime, convert(nvarchar, RI.Year) + '-' + convert(nvarchar, RI.HoldMonth) + '-' + convert(nvarchar, RI.HoldDay)) as HoldDay
        , RHI.OutValue
        , case when RI.Direction = 3 then null else RI.Direction end as Direction
        , RI.HoldMonth
        , RI.Hold
        , RI.Day
        , RI.Weather
        , RM.ID
        , RHI.Rank
        , RI.Range
        , convert(int, RI.Venue) as Venue
        , RI.Ground
        , RI.GroundCondition
        , RI.Round
        , RHI.Weight
        , convert(int, RHI.TrainerID) as TrainerID
        , RHI.HorseAge as Age
        , RHI.Popularity
        , RHI.HorseGender
        , isnull(isnull(HorseWeight, lead(HorseWeight)over(partition by RHI.HorseID order by convert(datetime, convert(nvarchar, RI.Year) + '-' + convert(nvarchar, RI.HoldMonth) + '-' + convert(nvarchar, RI.HoldDay)) desc)), 0) as HorseWeight
        , RHI.HorseNo
        , case when RI.Year > 2000 then RHI.HorseAge else RHI.HorseAge - 1 end as HorseAge
        , RHI.Passage1
        , RHI.Passage2
        , RHI.Passage3
        , RHI.Passage4
        , RHI.SpurtTime
        , convert(int, RHI.Fluctuation) as Fluctuation
        , JM.ID as JockeyID
        , RHI.HorseID
        , ROW_NUMBER()over(partition by RHI.HorseID order by convert(datetime, convert(nvarchar, RI.Year) + '-' + convert(nvarchar, RI.HoldMonth) + '-' + convert(nvarchar, RI.HoldDay)) desc) as num
    from RaceHorseInfomation as RHI
        left outer join RaceInfomation as RI
            on RI.ID = RHI.RaceID
        left outer join RaceMaster as RM
            on RM.ID = RI.RaceMasterID
        left outer join JockeyMaster as JM
            on JM.JockeyID = RHI.JockeyID
        inner join TimeAverage as TA
            on TA.ID = RHI.Average
    where
            RHI.HorseID is not null
        and RI.Direction is not null
) as RHI
where
    RHI.HorseID in (${this.parameter?.IDs})
order by
    RHI.HorseID
`
        return await this.ExecGet(sql)
    }
}