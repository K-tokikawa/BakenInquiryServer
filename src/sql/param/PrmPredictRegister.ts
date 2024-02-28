export default class PrmPredictRegister{
    public m_RaceID: number
    public m_HorseNo: number
    public m_Rank: number
    constructor(
        RaceID: number,
        HorseNo: number,
        Rank: number
    ){
        this.m_RaceID = 0
        this.m_HorseNo = 0
        this.m_Rank = 0
    }

    public get RaceID(){ return this.m_RaceID}
    public get HorseNo(){ return this.m_HorseNo}
    public get Rank(){ return this.m_Rank}
}