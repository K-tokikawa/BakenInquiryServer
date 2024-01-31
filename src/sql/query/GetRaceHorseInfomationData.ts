import SQLBase from "../../class/SQLBase"
import EntRaceHorseInfomationData from "../Entity/EntRaceHorseInfomationData"
import PrmStudyData from "../param/PrmStudyData"
export default class GetRaceHorseInfomationData extends SQLBase<EntRaceHorseInfomationData[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntRaceHorseInfomationData[]> {
        const sql = `
select
      RaceID
    , HorseID
    , HM.Name
    , Rank
    , HorseNo
    , JM.ID as JockeyID
    , HorseAge
    , HorseGender
    , HorseWeight
    , Weight
    , TrainerID
    , Fluctuation
    , Popularity
    , Remark
from RaceHorseInfomation as RHI
    left outer join HorseMaster as HM
        on HM.ID = RHI.HorseID
    left outer join JockeyMaster as JM
        on JM.JockeyID = RHI.JockeyID
where
    RHI.RaceID in (${this.parameter?.IDs})
    and RHI.HorseID is not null`
        return await this.ExecGet(sql)
    }
}
