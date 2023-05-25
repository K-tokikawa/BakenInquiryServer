import JRABettingRaceResultClass from "./JRABettingRaceResultClass"
import JRADayBettingtohyoClass from "./JRADayBettingtohyoClass"
interface DicDayRascetohyo {
    readonly [key: string | number]: JRADayBettingtohyoClass
}
export default class JRATotalBettingtohyoClass extends JRABettingRaceResultClass {
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

    public get Dic() { return this.dic }
}