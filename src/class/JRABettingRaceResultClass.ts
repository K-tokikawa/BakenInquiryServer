export default class JRABettingRaceResultClass {
    public static search単勝 = /単勝/
    public static search複勝 = /複勝/
    public static search馬連 = /馬連/
    public static search枠連 = /枠連/
    public static search馬単 = /馬単/
    public static searchワイド = /ワイド/
    public static search三連複 = /3連複/
    public static search三連単 = /3連単/

    private totalBet単勝: number
    private totalBet複勝: number
    private totalBet馬連: number
    private totalBet枠連: number
    private totalBet馬単: number
    private totalBetワイド: number
    private totalBet三連複: number
    private totalBet三連単: number
    private totalBet: number

    private totalReturn単勝: number
    private totalReturn複勝: number
    private totalReturn馬連: number
    private totalReturn枠連: number
    private totalReturn馬単: number
    private totalReturnワイド: number
    private totalReturn三連複: number
    private totalReturn三連単: number
    private totalReturn: number

    private countBet単勝 : number
    private countBet複勝 : number
    private countBet馬連 : number
    private countBet枠連 : number
    private countBet馬単 : number
    private countBetワイド: number
    private countBet三連複: number
    private countBet三連単: number
    private countBetTotal: number

    private countReturn単勝: number
    private countReturn複勝: number
    private countReturn馬連: number
    private countReturn枠連: number
    private countReturn馬単: number
    private countReturnワイド: number
    private countReturn三連複: number
    private countReturn三連単: number
    private countReturnTotal: number

    public addAll(value: JRABettingRaceResultClass) {
        this.addReturn(value)
        this.addcountReturn(value)
        this.addBet(value)
        this.addcountBet(value)

    }
    public addBet単勝(val: number) { this.totalBet単勝 += val }
    public addBet複勝(val: number) { this.totalBet複勝 += val }
    public addBet馬連(val: number) { this.totalBet馬連 += val }
    public addBet枠連(val: number) { this.totalBet枠連 += val }
    public addBet馬単(val: number) { this.totalBet馬単 += val }
    public addBetワイド(val: number) { this.totalBetワイド += val }
    public addBet三連複(val: number) { this.totalBet三連複 += val }
    public addBet三連単(val: number) { this.totalBet三連単 += val }
    public addBetTotal(val: number) { this.totalBet += val }
    public addBet(value: JRABettingRaceResultClass) {
        this.addBet単勝(value.TotalBet単勝)
        this.addBet複勝(value.TotalBet複勝)
        this.addBet馬連(value.TotalBet馬連)
        this.addBet枠連(value.TotalBet枠連)
        this.addBet馬単(value.TotalBet馬単)
        this.addBetワイド(value.TotalBetワイド)
        this.addBet三連複(value.TotalBet三連複)
        this.addBet三連単(value.TotalBet三連単)
        this.addBetTotal(value.TotalBet)
    }

    public addReturn単勝(val: number) { this.totalReturn単勝 += val }
    public addReturn複勝(val: number) { this.totalReturn複勝 += val }
    public addReturn馬連(val: number) { this.totalReturn馬連 += val }
    public addReturn枠連(val: number) { this.totalReturn枠連 += val }
    public addReturn馬単(val: number) { this.totalReturn馬単 += val }
    public addReturnワイド(val: number) { this.totalReturnワイド += val }
    public addReturn三連複(val: number) { this.totalReturn三連複 += val }
    public addReturn三連単(val: number) { this.totalReturn三連単 += val }
    public addReturnTotal(val: number) { this.totalReturn += val }
    public addReturn(value: JRABettingRaceResultClass) {
        this.addReturn単勝(value.TotalReturn単勝)
        this.addReturn複勝(value.TotalReturn複勝)
        this.addReturn馬連(value.TotalReturn馬連)
        this.addReturn枠連(value.TotalReturn枠連)
        this.addReturn馬単(value.TotalReturn馬単)
        this.addReturnワイド(value.TotalReturnワイド)
        this.addReturn三連複(value.TotalReturn三連複)
        this.addReturn三連単(value.TotalReturn三連単)
        this.addReturnTotal(value.TotalReturn)
    }

    public addcountBet単勝(val: number) { this.countBet単勝 += val}
    public addcountBet複勝(val: number) { this.countBet複勝 += val}
    public addcountBet馬連(val: number) { this.countBet馬連 += val}
    public addcountBet枠連(val: number) { this.countBet枠連 += val}
    public addcountBet馬単(val: number) { this.countBet馬単 += val}
    public addcountBetワイド(val: number) { this.countBetワイド += val}
    public addcountBet三連複(val: number) { this.countBet三連複 += val}
    public addcountBet三連単(val: number) { this.countBet三連単 += val}
    public addcountBetTotal(val: number) { this.countBetTotal += val }
    public addcountBet(value: JRABettingRaceResultClass) {
        this.addcountBet単勝(value.CountBet単勝)
        this.addcountBet複勝(value.CountBet複勝)
        this.addcountBet馬連(value.CountBet馬連)
        this.addcountBet枠連(value.CountBet枠連)
        this.addcountBet馬単(value.CountBet馬単)
        this.addcountBetワイド(value.CountBetワイド)
        this.addcountBet三連複(value.CountBet三連複)
        this.addcountBet三連単(value.CountBet三連単)
        this.addcountBetTotal(value.CountBetTotal)
    }

    public addcountReturn単勝(val: number) { this.countReturn単勝 += val}
    public addcountReturn複勝(val: number) { this.countReturn複勝 += val}
    public addcountReturn馬連(val: number) { this.countReturn馬連 += val}
    public addcountReturn枠連(val: number) { this.countReturn枠連 += val}
    public addcountReturn馬単(val: number) { this.countReturn馬単 += val}
    public addcountReturnワイド(val: number) { this.countReturnワイド += val}
    public addcountReturn三連複(val: number) { this.countReturn三連複 += val}
    public addcountReturn三連単(val: number) { this.countReturn三連単 += val}
    public addcountReturnTotal(val: number) { this.countReturnTotal += val }
    public addcountReturn(value: JRABettingRaceResultClass) {
        this.addcountReturn単勝(value.CountReturn単勝)
        this.addcountReturn複勝(value.CountReturn複勝)
        this.addcountReturn馬連(value.CountReturn馬連)
        this.addcountReturn枠連(value.CountReturn枠連)
        this.addcountReturn馬単(value.CountReturn馬単)
        this.addcountReturnワイド(value.CountReturnワイド)
        this.addcountReturn三連複(value.CountReturn三連複)
        this.addcountReturn三連単(value.CountReturn三連単)
        this.addcountReturnTotal(value.CountReturnTotal)
    }

    constructor() {
        this.totalBet単勝 = 0
        this.totalBet複勝 = 0
        this.totalBet馬連 = 0
        this.totalBet枠連 = 0
        this.totalBet馬単 = 0
        this.totalBetワイド = 0
        this.totalBet三連複 = 0
        this.totalBet三連単 = 0
        this.totalBet = 0

        this.totalReturn単勝 = 0
        this.totalReturn複勝 = 0
        this.totalReturn馬連 = 0
        this.totalReturn枠連 = 0
        this.totalReturn馬単 = 0
        this.totalReturnワイド = 0
        this.totalReturn三連複 = 0
        this.totalReturn三連単 = 0
        this.totalReturn = 0

        this.countBet単勝 = 0
        this.countBet複勝 = 0
        this.countBet馬連 = 0
        this.countBet枠連 = 0
        this.countBet馬単 = 0
        this.countBetワイド = 0
        this.countBet三連複 = 0
        this.countBet三連単 = 0
        this.countBetTotal = 0
        this.countReturn単勝 = 0
        this.countReturn複勝 = 0
        this.countReturn馬連 = 0
        this.countReturn枠連 = 0
        this.countReturn馬単 = 0
        this.countReturnワイド = 0
        this.countReturn三連複 = 0
        this.countReturn三連単 = 0
        this.countReturnTotal = 0
    }

    public get TotalBet単勝() { return this.totalBet単勝 }
    public get TotalBet複勝() { return this.totalBet複勝 }
    public get TotalBet馬連() { return this.totalBet馬連 }
    public get TotalBet枠連() { return this.totalBet枠連 }
    public get TotalBet馬単() { return this.totalBet馬単 }
    public get TotalBetワイド() { return this.totalBetワイド }
    public get TotalBet三連複() { return this.totalBet三連複 }
    public get TotalBet三連単() { return this.totalBet三連単 }
    public get TotalBet() { return this.totalBet }
    public get TotalReturn単勝() { return this.totalReturn単勝 }
    public get TotalReturn複勝() { return this.totalReturn複勝 }
    public get TotalReturn馬連() { return this.totalReturn馬連 }
    public get TotalReturn枠連() { return this.totalReturn枠連 }
    public get TotalReturn馬単() { return this.totalReturn馬単 }
    public get TotalReturnワイド() { return this.totalReturnワイド }
    public get TotalReturn三連複() { return this.totalReturn三連複 }
    public get TotalReturn三連単() { return this.totalReturn三連単 }
    public get TotalReturn() { return this.totalReturn }

    public get CountBet単勝() { return this.countBet単勝}
    public get CountBet複勝() { return this.countBet複勝}
    public get CountBet馬連() { return this.countBet馬連}
    public get CountBet枠連() { return this.countBet枠連}
    public get CountBet馬単() { return this.countBet馬単}
    public get CountBetワイド() { return this.countBetワイド}
    public get CountBet三連複() { return this.countBet三連複}
    public get CountBet三連単() { return this.countBet三連単}
    public get CountBetTotal() { return this.countBetTotal}
    public get CountReturn単勝() { return this.countReturn単勝}
    public get CountReturn複勝() { return this.countReturn複勝}
    public get CountReturn馬連() { return this.countReturn馬連}
    public get CountReturn枠連() { return this.countReturn枠連}
    public get CountReturn馬単() { return this.countReturn馬単}
    public get CountReturnワイド() { return this.countReturnワイド}
    public get CountReturn三連複() { return this.countReturn三連複}
    public get CountReturn三連単() { return this.countReturn三連単}
    public get CountReturnTotal() { return this.countReturnTotal }
}
