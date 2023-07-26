import EntRaceStudyData from "../entity/EntRaceHorseStudyData"

export default class ClassRaceHorseData{
    private m_GoalTime: number
    private m_Direction: number
    private m_Venue: number
    private m_HoldMonth: number
    private m_Hold: number
    private m_Day: number
    private m_Weather: number
    private m_ID: number
    private m_Rank: number
    private m_Range: number
    private m_Ground: number | null
    private m_GroundCondition: number
    private m_Weight: number
    private m_TrainerID: number
    private m_HorseGender: number
    private m_HorseWeight: number
    private m_HorseNo: number
    private m_HorseAge: number
    private m_Passage1: number | null
    private m_Passage2: number | null
    private m_Passage3: number | null
    private m_Passage4: number | null
    private m_SpurtTime: number | null
    private m_Fluctuation: number
    private m_JockeyID: number
    private m_before: number
    private m_HoldDay: Date
    constructor(row: EntRaceStudyData, before: number){
        this.m_GoalTime = row.GoalTime
        this.m_Direction = row.Direction
        this.m_Venue = row.Venue
        this.m_HoldMonth = row.HoldMonth
        this.m_Hold = row.Hold
        this.m_Day = row.Day
        this.m_ID = row.ID
        this.m_Rank = row.Rank
        this.m_Weather = row.Weather
        this.m_Range = row.Range
        this.m_Ground = row.Ground
        this.m_GroundCondition = row.GroundCondition
        this.m_Weight = row.Weight
        this.m_TrainerID = row.TrainerID
        this.m_HorseGender = row.HorseGender
        this.m_HorseWeight = row.HorseWeight
        this.m_HorseNo = row.HorseNo
        this.m_HorseAge = row.HorseAge
        this.m_Passage1 = row.Passage1
        this.m_Passage2 = row.Passage2
        this.m_Passage3 = row.Passage3
        this.m_Passage4 = row.Passage4
        this.m_SpurtTime = row.SpurtTime
        this.m_Fluctuation = row.Fluctuation
        this.m_JockeyID = row.JockeyID
        this.m_before = before
        this.m_HoldDay = row.HoldDay
    }
    public get GoalTime() { return this.m_GoalTime }
    public get Direction() { return this.m_Direction}
    public get Venue() { return this.m_Venue }
    public get HoldMonth() { return this.m_HoldMonth }
    public get Hold() { return this.m_Hold }
    public get Day() { return this.m_Day }
    public get Weather() { return this.m_Weather}
    public get ID() { return this.m_ID }
    public get Rank() {return this.m_Rank}
    public get Range() { return this.m_Range }
    public get Ground() { return this.m_Ground }
    public get GroundCondition() { return this.m_GroundCondition }
    public get Weight() { return this.m_Weight}
    public get TrainerID() { return this.m_TrainerID }
    public get HorseGender() { return this.m_HorseGender }
    public get HorseWeight() { return this.m_HorseWeight }
    public get HorseNo() { return this.m_HorseNo}
    public get HorseAge() { return this.m_HorseAge }
    public get Passage1() { return this.m_Passage1}
    public get Passage2() { return this.m_Passage2}
    public get Passage3() { return this.m_Passage3}
    public get Passage4() { return this.m_Passage4}
    public get SpurtTime() { return this.m_SpurtTime}
    public get Fluctuation() { return this.m_Fluctuation }
    public get JockeyID() { return this.m_JockeyID }
    public get before() { return this.m_before }
    public get HoldDay() { return this.m_HoldDay}
}