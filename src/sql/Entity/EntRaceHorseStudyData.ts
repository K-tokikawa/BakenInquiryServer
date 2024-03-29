export default class EntRaceHorseStudyData{
    public RaceID: number
    public HorseID: number
    public GoalTime: number
    public Direction: number
    public HoldDay: Date
    public HoldMonth: number
    public Hold: number
    public Day: number
    public Weather: number
    public ID: number
    public Rank: number
    public Venue: number
    public Range: number
    public Ground: number
    public GroundCondition: number
    public Round: number
    public pace: number
    public Weight: number
    public TrainerID: number
    public Age: number
    public Popularity: number
    public HorseGender: number
    public HorseWeight: number
    public HorseNo: number
    public HorseAge: number
    public Passage1: number | null
    public Passage2: number | null
    public Passage3: number | null
    public Passage4: number | null
    public SpurtTime: number | null
    public Fluctuation: number
    public RaceRemarks: number
    public Remarks: number
    public JockeyID: number
    public before: Date
    public interval: number
    public num: number
    public OutValue: number
    constructor(){
        this.HorseID = 0
        this.RaceID = 0
        this.GoalTime = 0
        this.Direction = 0
        this.HoldDay = new Date()
        this.HoldMonth = 0
        this.Hold = 0
        this.Day = 0
        this.Weather = 0
        this.ID = 0
        this.Rank = 0
        this.Venue = 0
        this.Range = 0
        this.Ground = 0
        this.GroundCondition = 0
        this.Round = 0
        this.pace = 0
        this.Weight = 0
        this.TrainerID = 0
        this.Age = 0
        this.Popularity = 0
        this.HorseGender = 0
        this.HorseWeight = 0
        this.HorseNo = 0
        this.HorseAge = 0
        this.Passage1 = null
        this.Passage2 = null
        this.Passage3 = null
        this.Passage4 = null
        this.SpurtTime = null
        this.Fluctuation = 0
        this.RaceRemarks = 0
        this.Remarks = 0
        this.JockeyID = 0
        this.before = new Date()
        this.interval = 0
        this.num = 0
        this.OutValue = 0
    }
}