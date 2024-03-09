export default class PrmPredictRegister{
    public m_RaceID: number
    public m_HorseNo: number
    public m_Predict: number
    public m_Rank: number
    constructor(
        RaceID: number,
        HorseNo: number,
        Predict: number,
        Rank: number
    ){
        this.m_RaceID = RaceID
        this.m_HorseNo = HorseNo
        this.m_Predict = Predict
        this.m_Rank = Rank
    }

    public get RaceID(){ return this.m_RaceID}
    public get HorseNo(){ return this.m_HorseNo}
    public get Predict(){ return this.m_Predict}
    public get Rank(){ return this.m_Rank}
}