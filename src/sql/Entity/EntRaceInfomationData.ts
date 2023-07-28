export default class EntRaceInfomationData{
    public ID: number
    public Venue: number
    public VenueName: string
    public Direction: number
    public Range: number
    public Ground: number
    public GroundName: string
    public GroundCondition: number
    public Weather: number
    public HoldMonth: number
    public Hold: number
    public Day: number
    public HoldDay: Date
    public Round: number
    public hc: number

    constructor() {
        this.ID = 0
        this.Venue = 0
        this.VenueName = ''
        this.Direction = 0
        this.Range = 0
        this.Ground = 0
        this.GroundName = ''
        this.GroundCondition = 0
        this.Weather = 0
        this.HoldMonth = 0
        this.Hold = 0
        this.Day = 0
        this.HoldDay = new Date()
        this.Round = 0
        this.hc = 0
    }
}