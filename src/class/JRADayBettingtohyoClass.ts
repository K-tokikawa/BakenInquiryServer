import JRABettingRaceResultClass from "./JRABettingRaceResultClass"
export interface dictionary {
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
            const race = this.dic[key]
            if (race.TotalBet単勝 > 0) {race.addcountBet単勝race(); this.countBet単勝race++}
            if (race.TotalBet複勝 > 0) {race.addcountBet複勝race(); this.countBet複勝race++}
            if (race.TotalBet馬連 > 0) {race.addcountBet馬連race(); this.countBet馬連race++}
            if (race.TotalBet枠連 > 0) {race.addcountBet枠連race(); this.countBet枠連race++}
            if (race.TotalBet馬単 > 0) {race.addcountBet馬単race(); this.countBet馬単race++}
            if (race.TotalBetワイド > 0) { race.addcountBetワイドrace(); this.countBetワイドrace++ }
            if (race.TotalBet三連複 > 0) {race.addcountBet三連複race(); this.countBet三連複race++}
            if (race.TotalBet三連単 > 0) {race.addcountBet三連単race(); this.countBet三連単race++}
            if (race.TotalBet > 0) { race.addcountBetTotalrace(); this.countBetTotalrace++ }

            if (race.TotalReturn単勝 > 0) { race.addcountReturn単勝race(); this.countReturn単勝race++ }
            if (race.TotalReturn複勝 > 0) { race.addcountReturn複勝race(); this.countReturn複勝race++ }
            if (race.TotalReturn馬連 > 0) { race.addcountReturn馬連race(); this.countReturn馬連race++ }
            if (race.TotalReturn枠連 > 0) { race.addcountReturn枠連race(); this.countReturn枠連race++ }
            if (race.TotalReturn馬単 > 0) { race.addcountReturn馬単race(); this.countReturn馬単race++ }
            if (race.TotalReturnワイド > 0) { race.addcountReturnワイドrace(); this.countReturnワイドrace++ }
            if (race.TotalReturn三連複 > 0) { race.addcountReturn三連複race(); this.countReturn三連複race++ }
            if (race.TotalReturn三連単 > 0) { race.addcountReturn三連単race(); this.countReturn三連単race++ }
            if (race.TotalReturn > 0) { race.addcountReturnTotalrace(); this.countReturnTotalrace++ }
        })
    }
}