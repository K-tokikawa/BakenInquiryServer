export default class ClassHorse{
    private m_netkeibaID: string
    private m_GateNo: number
    private m_HorseNo: number
    private m_HorseAge: number
    private m_HorseGender: number
    private m_Weight: number
    private m_JockeyID: string
    private m_Popularity: number
    private m_HorseWeight: number
    private m_Fluctuation: string
    private m_Barn: number
    private m_TrainerID: string
    private m_cancel: boolean
    constructor(netkeibaID: string, GateNo: number, HorseNo: number, HorseAge: number, HorseGender: number, Weight: number, JockeyID: string, Popularity: number, HorseWeight: number, Fluctuation: string, Barn: number, TrainerID: string, cancel: boolean) {
        this.m_netkeibaID = netkeibaID
        this.m_GateNo = GateNo
        this.m_HorseNo = HorseNo
        this.m_HorseAge = HorseAge
        this.m_HorseGender = HorseGender
        this.m_Weight = Weight
        this.m_JockeyID = JockeyID
        this.m_Popularity = Popularity
        this.m_HorseWeight = HorseWeight
        this.m_Fluctuation = Fluctuation
        this.m_Barn = Barn
        this.m_TrainerID = TrainerID
        this.m_cancel = cancel
    }
    public get netkeibaID() { return this.m_netkeibaID}
    public get GateNo() { return this.m_GateNo}
    public get HorseNo() { return this.m_HorseNo}
    public get HorseAge() { return this.m_HorseAge}
    public get HorseGender() { return this.m_HorseGender}
    public get Weight() { return this.m_Weight}
    public get JockeyID() { return this.m_JockeyID}
    public get Popularity() { return this.m_Popularity}
    public get HorseWeight() { return this.m_HorseWeight}
    public get Fluctuation() { return this.m_Fluctuation}
    public get Barn() { return this.m_Barn}
    public get TrainerID() { return this.m_TrainerID}
    public get Cancel() { return this.m_cancel}
}