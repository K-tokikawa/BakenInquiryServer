import SQLBase from "../../class/SQLBase"
import EntPaceData from "../Entity/EntPaceData"
import PrmStudyData from "../param/PrmStudyData"
export default class GetPaceData extends SQLBase<EntPaceData[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntPaceData[]> {
        const sql = `
select
	  RT.pace
    , RI.RaceID
    , RHI.HorseNo
	, RI.Venue
	, RI.HoldMonth
	, RI.Hold
	, RI.Day
	, RI.Range
	, RI.Ground
	, RI.GroundCondition
	, RI.Weather
	, RHI.HorseAge
	, RHI.HorseGender
	, RHI.HorseWeight
	, RHI.Fluctuation
	, RHI.Weight
	, RHI.JockeyID
	, Pace_1
	, Passage1_1
	, Passage2_1
	, Passage3_1
	, Passage4_1
	, Pace_2
	, Passage1_2
	, Passage2_2
	, Passage3_2
	, Passage4_2
	, Pace_3
	, Passage1_3
	, Passage2_3
	, Passage3_3
	, Passage4_3
	, Pace_4
	, Passage1_4
	, Passage2_4
	, Passage3_4
	, Passage4_4
	, Pace_5
	, Passage1_5
	, Passage2_5
	, Passage3_5
	, Passage4_5
from RaceInfomation as RI
    left outer join RaceHorseInfomation as RHI
        on RHI.RaceID = RI.ID
    inner join PaceTable as PT
		on PT.RaceID = RI.ID
	left outer join RapTable as RT
		on RT.ID = RI.ID
where
    RI.ID in ${this.parameter?.IDs}`
        return await this.ExecGet(sql)
    }
}
