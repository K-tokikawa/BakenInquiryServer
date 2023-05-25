import JRABettingRaceResultClass from "./JRABettingRaceResultClass"
interface dictionary {
    readonly [key: string | number]: JRABettingRaceResultClass
}

export default class JRADayBettingtohyoClass extends JRABettingRaceResultClass {
    private dic: dictionary
    private betrace: number
    private hitrace: number
    constructor() {
        super()
        this.dic = {}
        this.betrace = 0
        this.hitrace = 0
    }
    public get Dic() { return this.dic }
    public get Betrace() { return this.betrace}
    public get Hitrace() { return this.hitrace}

    public SetDic(value: dictionary) {
        this.dic = value
    }
    public SetDicRace(key: string, value: JRABettingRaceResultClass ) {
        const temp = this.dic as { [key: string | number]: JRABettingRaceResultClass }
        temp[key] = value
        this.SetDic(temp)
    }

    public CalcBetandHitCount() {
        Object.keys(this.dic).forEach((key: string) => {
            this.betrace++
            const race = this.dic[key]
            if (race.CountReturnTotal > 0) {
                this.hitrace++
            }
        })
    }
}