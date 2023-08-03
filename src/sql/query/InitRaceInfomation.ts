import SQLBase from "../../class/SQLBase"
import PrmStudyData from "../param/PrmStudyData"
export default class InitRaceInfomation extends SQLBase<void>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<void> {
        const sql = `
update RaceHorseInfomation set HorseID = HM.HMID
from (
	select
		RHI.ID as RHIID
		, HM.ID as HMID
        , RHI.RaceID
	from RaceHorseInfomation as RHI
		left outer join HorseMaster as HM
			on HM.netkeibaID = RHI.netkeibaID
    where
        RaceID in (${this.parameter?.IDs})
) as HM
where
	HM.RHIID = RaceHorseInfomation.ID

update RaceHorseInfomation set Average = TA.AveID
from (
    select
        RHI.ID
        , TA.ID as AveID
    from TimeAverage as TA
        left outer join (
            select
                RHI.ID
                , RI.[Range]
                , RI.Direction
                , case case when RI.[Year] > 2000 then RHI.HorseAge else RHI.HorseAge - 1 end
                    when 2 then 0
                    when 3 then 1
                    else 2
                end as Age
            from RaceHorseInfomation as RHI
                left outer join RaceInfomation as RI
                    on RI.ID = RHI.RaceID
        ) as RHI
            on RHI.Range = TA.Range
            and RHI.Direction = TA.Direction
            and RHI.Age = TA.Age
    ) as TA
where
    TA.ID = RaceHorseInfomation.ID

`
        await this.ExecGet(sql)
    }
}
