import JRABettingRaceResultClass from "./JRABettingRaceResultClass"
interface dictionary {
    readonly [key: string | number]: JRABettingRaceResultClass
}
interface DicDayRascetohyo {
    readonly [key: string | number]: dictionary
}
export default class JRADayBettingtohyoClass extends JRABettingRaceResultClass {
    private dic: DicDayRascetohyo
    private betrace: number
    private hitrace:number
    constructor() {
        super()
        this.dic = {}
        this.betrace = 0
        this.hitrace = 0
    }

    public SetDic(value: DicDayRascetohyo) { this.dic = value }
    public SetDicDay(key: string, value: { [key: string | number]: JRABettingRaceResultClass }) {
        let temp = this.dic as { [key: string | number]: dictionary }
        temp[key] = value
        this.SetDic(temp)
    }
    public SetDicRace(keyDate: string, keyRace: string, value: JRABettingRaceResultClass) {
        let temp = this.dic as { [key: string | number]: { [key: string | number]: JRABettingRaceResultClass } }
        temp[keyDate][keyRace] = value
        this.SetDic(temp)
    }
    public CalcBetandHitRace() {
        Object.keys(this.Dic).forEach((keyDate: string) => {
            Object.keys(this.Dic[keyDate]).forEach((keyRace: string) => {
                this.betrace++
                if (this.Dic[keyDate][keyRace].CountReturnTotal > 0) {
                    this.hitrace++
                }
            })
        })
    }

    public get Dic() { return this.dic }
}