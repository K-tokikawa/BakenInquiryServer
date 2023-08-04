import SQLBase from "../../class/SQLBase";
import PrmRegisterRaceHorseInfo from "../param/PrmRegisterRaceHorseInfo";
export default class SQLRegisterRaceHorseInfo extends SQLBase<number>
{
    private parameter: PrmRegisterRaceHorseInfo[];
    constructor(prm: PrmRegisterRaceHorseInfo[])
    {
        super()
        this.parameter = prm
    }

    public async Execsql(): Promise<number> {
        const sql = `
            INSERT INTO RaceHorseInfomation VALUES (
                ${this.parameter[0].ID}
                '${this.parameter[0].netkeibaRaceID}'
                ${this.parameter[0].Rank}
                ${this.parameter[0].Remarks}
                '${this.parameter[0].netkeibaID}'
                ${this.parameter[0].GateNo}
                ${this.parameter[0].HorseNo}
                ${this.parameter[0].HorseAge}
                ${this.parameter[0].HorseGender}
                ${this.parameter[0].Weight}
                '${this.parameter[0].JockeyID}'
                ${this.parameter[0].GoalTime}
                ${this.parameter[0].Passage1}
                ${this.parameter[0].Passage2}
                ${this.parameter[0].Passage3}
                ${this.parameter[0].Passage4}
                ${this.parameter[0].SpurtTime}
                ${this.parameter[0].Popularity}
                ${this.parameter[0].HorseWeight}
                '${this.parameter[0].Fluctuation}'
                ${this.parameter[0].Barn}
                ${this.parameter[0].TrainerID}
            )
        `
        await this.ExecRegister(sql)
        return 0
    }

    public async BulkInsert(filename: string)
    {
        const lines: string[] = []
        this.parameter.forEach(row => {
            const ID             = row.ID
            const RaceID         = row.RaceID
            const netkeibaRaceID = row.netkeibaRaceID
            const Rank           = row.Rank    != null ? row.Rank    : ''
            const Remarks        = row.Remarks != null ? row.Remarks : ''
            const HorseID        = row.HorseID
            const netkeibaID     = row.netkeibaID
            const GateNo         = row.GateNo
            const HorseNo        = row.HorseNo
            const HorseAge       = row.HorseAge
            const HorseGender    = row.HorseGender
            const Weight         = row.Weight
            const JockeyID       = row.JockeyID
            const GoalTime       = row.GoalTime    != null ? row.GoalTime    : ''
            const Passage1       = row.Passage1    != null ? row.Passage1    : ''
            const Passage2       = row.Passage2    != null ? row.Passage2    : ''
            const Passage3       = row.Passage3    != null ? row.Passage3    : ''
            const Passage4       = row.Passage4    != null ? row.Passage4    : ''
            const SpurtTime      = row.SpurtTime   != null ? row.SpurtTime   : ''
            const Popularity     = row.Popularity  != null ? row.Popularity  : ''
            const HorseWeight    = row.HorseWeight != null ? row.HorseWeight : ''
            const Fluctuation    = row.Fluctuation
            const Barn           = row.Barn
            const TrainerID      = row.TrainerID
            const RaceRemark     = row.RaceRemarks != null ? row.RaceRemarks : ''
            const line = 
                `${ID},${RaceID},${netkeibaRaceID},${Rank},${HorseID},${netkeibaID},${GateNo},${HorseNo},${HorseAge},${HorseGender},${Weight},${JockeyID},${GoalTime},${Passage1},${Passage2},${Passage3},${Passage4},${SpurtTime},${Popularity},${HorseWeight},${Fluctuation},${Remarks},${RaceRemark},${Barn},${TrainerID},,`
            // line.replace(/null/, '')
            lines.push(line)
        })
        await this.ExecBulkInsert('RaceHorseInfomation', lines, `${__dirname}\\${filename}.csv`)
    }
}