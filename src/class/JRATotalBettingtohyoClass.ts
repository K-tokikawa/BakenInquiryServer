import JRABettingRaceResultClass from "./JRABettingRaceResultClass"
import JRADayBettingtohyoClass from "./JRADayBettingtohyoClass"
export interface DicDayRascetohyo {
    readonly [key: string | number]: JRADayBettingtohyoClass
}
export default class JRATotalBettingtohyoClass extends JRABettingRaceResultClass {
    private dic: DicDayRascetohyo
    constructor() {
        super()
        this.dic = {}
    }

    public SetDic(value: DicDayRascetohyo) { this.dic = value }
    public initDicDay(key: string) {
        const temp = this.dic as { [key: string | number]: JRADayBettingtohyoClass }
        temp[key] = new JRADayBettingtohyoClass()
        this.SetDic(temp)
    }
    public SetDicRace(keyDate: string, value: JRADayBettingtohyoClass) {
        const temp = this.dic as { [key: string | number]: JRADayBettingtohyoClass }
        temp[keyDate] = value
        this.SetDic(temp)
    }

    public CalcBetandHitCount() {
        Object.keys(this.dic).forEach((key: string) => {
            const dayvalue = this.dic[key]
            dayvalue.CalcBetandHitCount()
            this.countBet単勝race += dayvalue.CountBet単勝race
            this.countBet複勝race += dayvalue.CountBet複勝race
            this.countBet馬連race += dayvalue.CountBet馬連race
            this.countBet枠連race += dayvalue.CountBet枠連race
            this.countBet馬単race += dayvalue.CountBet馬単race
            this.countBetワイドrace += dayvalue.CountBetワイドrace
            this.countBet三連複race += dayvalue.CountBet三連複race
            this.countBet三連単race += dayvalue.CountBet三連単race
            this.countBetTotalrace += dayvalue.CountBetTotalrace
            this.countReturn単勝race += dayvalue.CountReturn単勝race
            this.countReturn複勝race += dayvalue.CountReturn複勝race
            this.countReturn馬連race += dayvalue.CountReturn馬連race
            this.countReturn枠連race += dayvalue.CountReturn枠連race
            this.countReturn馬単race += dayvalue.CountReturn馬単race
            this.countReturnワイドrace += dayvalue.CountReturnワイドrace
            this.countReturn三連複race += dayvalue.CountReturn三連複race
            this.countReturn三連単race += dayvalue.CountReturn三連単race
            this.countReturnTotalrace += dayvalue.CountReturnTotalrace
        })
    }

    public get Dic() { return this.dic }
}