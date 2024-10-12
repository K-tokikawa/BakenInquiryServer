import ClassHorse from "./ClassHorse"

export default class ClassRace{
    private m_ID: number
    private m_RaceID: string
    private m_Venue: string
    private m_Year: number
    private m_Hold: number
    private m_Day: number
    private m_HoldMonth: number
    private m_HoldDay: number
    private m_Round: number
    private m_Range: number
    private m_Direction: number
    private m_Ground: number
    private m_Weather: number
    private m_GroundCondition: number
    private m_RaceMasterID: number
    private m_RaceTime: string
    private m_Horse: ClassHorse[]
    constructor(ID: number,RaceID: string,Venue: string,Year: number,Hold: number,Day: number,HoldMonth: number,HoldDay: number,Round: number,Range: number,Direction: number,Ground: number,Weather: number,GroundCondition: number,RaceMasterID: number, RaceTime: string) {
        this.m_ID = ID
        this.m_RaceID = RaceID
        this.m_Venue = Venue
        this.m_Year = Year
        this.m_Hold = Hold
        this.m_Day = Day
        this.m_HoldMonth = HoldMonth
        this.m_HoldDay = HoldDay
        this.m_Round = Round
        this.m_Range = Range
        this.m_Direction = Direction
        this.m_Ground = Ground
        this.m_Weather = Weather
        this.m_GroundCondition = GroundCondition
        this.m_RaceMasterID = RaceMasterID
        this.m_RaceTime = RaceTime
        this.m_Horse = []
    }
    public get ID() { return this.m_ID}
    public get RaceID() { return this.m_RaceID}
    public get Venue() { return this.m_Venue}
    public get Year() { return this.m_Year}
    public get Hold() { return this.m_Hold}
    public get Day() { return this.m_Day}
    public get HoldMonth() { return this.m_HoldMonth}
    public get HoldDay() { return this.m_HoldDay}
    public get Round() { return this.m_Round}
    public get Range() { return this.m_Range}
    public get Direction() { return this.m_Direction}
    public get Ground() { return this.m_Ground}
    public get Weather() { return this.m_Weather}
    public get GroundCondition() { return this.m_GroundCondition}
    public get RaceMasterID() { return this.m_RaceMasterID}
    public get RaceTime() { return this.m_RaceTime}
    public get Horse() { return this.m_Horse}
    public static RaceVenue: {
        [no: number]: string
    } = {
        1 : '札幌',
        2 : '函館',
        3 : '福島',
        4 : '新潟',
        5 : '東京',
        6 : '中山',
        7 : '中京',
        8 : '京都',
        9 : '阪神',
        10 : '小倉',
    }
    
    public static VaneuMatch: {
        [no: number]: RegExp
    } = {
        1:  /札幌/,
        2:  /函館/,
        3:  /福島/,
        4:  /新潟/,
        5:  /東京/,
        6:  /中山/,
        7:  /中京/,
        8:  /京都/,
        9:  /阪神/,
        10: /小倉/,
    }

    public static VenueCode: {
        [no: number]: string
    } = {
        1 : '01',
        2 : '02',
        3 : '03',
        4 : '04',
        5 : '05',
        6 : '06',
        7 : '07',
        8 : '08',
        9 : '09',
        10 : '10'
    }
}