import ClassAchievementData from "./ClassAchievementData"
import ClassPassageData from "./ClassPassageData"
import ClassRaceHorseData from "./ClassRaceHorseData"
export default class ClassHorseData{
    private m_BloodPredict: number | null
    private m_JockeyPredict: number | null
    private m_RaceIDNumPairs: {
        [RaceID: number]: {
            num: number,
            HorseNo: number
        }
    } = {}
    private m_HorseData: {
        [num: number]: {
            PassageData: ClassPassageData, AchievementData: ClassAchievementData, RotationData: ClassRaceHorseData[], RaceID: number, Rank: number
        }}
    private m_Predict:{
        [num: number]: {
            AptitudePredict: number| null, AchievementPredict: number| null, RotationPredict: number| null, RaceID: number, Rank: number
        }}
    constructor(BloodPredict: number | null = null, JockeyPredict: number | null = null) {
        this.m_BloodPredict = BloodPredict
        this.m_JockeyPredict = JockeyPredict
        this.m_RaceIDNumPairs = {}
        this.m_HorseData = {}
        this.m_Predict = {}
    }
    public getNum(RaceID: number) { return this.m_RaceIDNumPairs[RaceID].num }
    public getHorseNo(RaceID: number) { return this.m_RaceIDNumPairs[RaceID].HorseNo }
    public setRaceIDnumPairs(RaceID: number, num: number, HorseNo: number) {
        this.m_RaceIDNumPairs[RaceID] = {num: num, HorseNo: HorseNo}
    }
    public setHorseData(num: number, PassageData: ClassPassageData, AchievementData: ClassAchievementData, RotationData: ClassRaceHorseData[], RaceID: number, Rank: number){
        this.m_HorseData[num] = {
            PassageData: PassageData, AchievementData: AchievementData, RotationData: RotationData, RaceID: RaceID, Rank: Rank
        }
    }
    public setHorsePredict(num: number,AptitudePredict: number| null, AchievementPredict: number| null, RotationPredict: number| null, RaceID: number, Rank: number){
        this.m_Predict[num] = {
            AptitudePredict: AptitudePredict, AchievementPredict: AchievementPredict, RotationPredict: RotationPredict, RaceID: RaceID, Rank: Rank
        }
    }
    public get BloodPredict() { return this.m_BloodPredict }
    public get JockeyPredict() { return this.m_JockeyPredict }
    public get HorseData() { return this.m_HorseData}
    public get PredictData() { return this.m_Predict}
}