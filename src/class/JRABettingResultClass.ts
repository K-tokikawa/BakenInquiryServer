import { zenkaku2Hankaku, pricecomma } from "../process/util"
export default class JRABettingResultClass{
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

    private betRace単勝: string[]
    private betRace複勝: string[]
    private betRace馬連: string[]
    private betRace枠連: string[]
    private betRace馬単: string[]
    private betRaceワイド: string[]
    private betRace三連複: string[]
    private betRace三連単: string[]
    private betRace: string[]
    private returnRace単勝: string[]
    private returnRace複勝: string[]
    private returnRace馬連: string[]
    private returnRace枠連: string[]
    private returnRace馬単: string[]
    private returnRaceワイド: string[]
    private returnRace三連複: string[]
    private returnRace三連単: string[]
    private returnRace: string[]

    private numbetRace単勝: number
    private numbetRace複勝: number
    private numbetRace馬連: number
    private numbetRace枠連: number
    private numbetRace馬単: number
    private numbetRaceワイド: number
    private numbetRace三連複: number
    private numbetRace三連単: number
    private numbetRace: number
    private numreturnRace単勝: number
    private numreturnRace複勝: number
    private numreturnRace馬連: number
    private numreturnRace枠連: number
    private numreturnRace馬単: number
    private numreturnRaceワイド: number
    private numreturnRace三連複: number
    private numreturnRace三連単: number
    private numreturnRace: number

    public addAll(value: JRABettingResultClass) {
        this.addReturn(value)
        this.addcountReturn(value)
        this.addBet(value)
        this.addcountBet(value)
        this.concatBetRace(value)
        this.concatReturnRace(value)
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
    public addBet(value: JRABettingResultClass) {
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
    public addReturn(value: JRABettingResultClass) {
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
    public addcountBet(value: JRABettingResultClass) {
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
    public addcountReturn(value: JRABettingResultClass) {
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

    public pushBetRace単勝(val: string) { this.betRace単勝.push(val)}
    public pushBetRace複勝(val: string) { this.betRace複勝.push(val)}
    public pushBetRace馬連(val: string) { this.betRace馬連.push(val)}
    public pushBetRace枠連(val: string) { this.betRace枠連.push(val)}
    public pushBetRace馬単(val: string) { this.betRace馬単.push(val)}
    public pushBetRaceワイド(val: string) { this.betRaceワイド.push(val)}
    public pushBetRace三連複(val: string) { this.betRace三連複.push(val)}
    public pushBetRace三連単(val: string) { this.betRace三連単.push(val)}
    public pushBetRace(val: string) { this.betRace.push(val) }

    public pushReturnRace単勝(val: string) { this.returnRace単勝.push(val) }
    public pushReturnRace複勝(val: string) { this.returnRace複勝.push(val) }
    public pushReturnRace馬連(val: string) { this.returnRace馬連.push(val) }
    public pushReturnRace枠連(val: string) { this.returnRace枠連.push(val) }
    public pushReturnRace馬単(val: string) { this.returnRace馬単.push(val) }
    public pushReturnRaceワイド(val: string) { this.returnRaceワイド.push(val) }
    public pushReturnRace三連複(val: string) { this.returnRace三連複.push(val) }
    public pushReturnRace三連単(val: string) { this.returnRace三連単.push(val) }
    public pushReturnRace(val: string) { this.returnRace.push(val) }

    public concatBetRace単勝(val: Readonly<string[]>) { 
        this.betRace単勝 = this.betRace単勝.concat(val)
        this.numbetRace単勝 = this.betRace単勝.length
    }
    public concatBetRace複勝(val: Readonly<string[]>) { 
        this.betRace複勝 = this.betRace複勝.concat(val)
        this.numbetRace複勝 = this.betRace複勝.length
    }
    public concatBetRace馬連(val: Readonly<string[]>) { 
        this.betRace馬連 = this.betRace馬連.concat(val)
        this.numbetRace馬連 = this.betRace馬連.length
    }
    public concatBetRace枠連(val: Readonly<string[]>) { 
        this.betRace枠連 = this.betRace枠連.concat(val)
        this.numbetRace枠連 = this.betRace枠連.length
    }
    public concatBetRace馬単(val: Readonly<string[]>) { 
        this.betRace馬単 = this.betRace馬単.concat(val)
        this.numbetRace馬単 = this.betRace馬単.length
    }
    public concatBetRaceワイド(val: Readonly<string[]>) { 
        this.betRaceワイド = this.betRaceワイド.concat(val)
        this.numbetRaceワイド = this.betRaceワイド.length
    }
    public concatBetRace三連複(val: Readonly<string[]>) { 
        this.betRace三連複 = this.betRace三連複.concat(val)
        this.numbetRace三連複 = this.betRace三連複.length
    }
    public concatBetRace三連単(val: Readonly<string[]>) { 
        this.betRace三連単 = this.betRace三連単.concat(val)
        this.numbetRace三連単 = this.betRace三連単.length
    }
    public concatBetRaceAll(val: Readonly<string[]>) { 
        this.betRace = this.betRace.concat(val)
        this.numbetRace = this.betRace.length
    }
    public concatBetRace(value: JRABettingResultClass) {
        this.concatBetRace単勝(value.BetRace単勝)
        this.concatBetRace複勝(value.BetRace複勝)
        this.concatBetRace馬連(value.BetRace馬連)
        this.concatBetRace枠連(value.BetRace枠連)
        this.concatBetRace馬単(value.BetRace馬単)
        this.concatBetRaceワイド(value.BetRaceワイド)
        this.concatBetRace三連複(value.BetRace三連複)
        this.concatBetRace三連単(value.BetRace三連単)
        this.concatBetRaceAll(value.BetRace)
    }
    public concatReturnRace単勝(val: Readonly<string[]>) {
        this.returnRace単勝 = this.returnRace単勝.concat(val)
        this.numreturnRace単勝 = this.returnRace単勝.length
    }
    public concatReturnRace複勝(val: Readonly<string[]>) {
        this.returnRace複勝 = this.returnRace複勝.concat(val)
        this.numreturnRace複勝 = this.returnRace複勝.length
    }
    public concatReturnRace馬連(val: Readonly<string[]>) {
        this.returnRace馬連 = this.returnRace馬連.concat(val)
        this.numreturnRace馬連 = this.returnRace馬連.length
    }
    public concatReturnRace枠連(val: Readonly<string[]>) {
        this.returnRace枠連 = this.returnRace枠連.concat(val)
        this.numreturnRace枠連 = this.returnRace枠連.length
    }
    public concatReturnRace馬単(val: Readonly<string[]>) {
        this.returnRace馬単 = this.returnRace馬単.concat(val)
        this.numreturnRace馬単 = this.returnRace馬単.length
    }
    public concatReturnRaceワイド(val: Readonly<string[]>) {
        this.returnRaceワイド = this.returnRaceワイド.concat(val)
        this.numreturnRaceワイド = this.returnRaceワイド.length
    }
    public concatReturnRace三連複(val: Readonly<string[]>) {
        this.returnRace三連複 = this.returnRace三連複.concat(val)
        this.numreturnRace三連複 = this.returnRace三連複.length
    }
    public concatReturnRace三連単(val: Readonly<string[]>) {
        this.returnRace三連単 = this.returnRace三連単.concat(val)
        this.numreturnRace三連単 = this.returnRace三連単.length
    }
    public concatReturnRaceAll(val: Readonly<string[]>) {
        this.returnRace = this.returnRace.concat(val)
        this.numreturnRace = this.returnRace.length
    }
    public concatReturnRace(value: JRABettingResultClass) {
        this.concatReturnRace単勝(value.ReturnRace単勝)
        this.concatReturnRace複勝(value.ReturnRace複勝)
        this.concatReturnRace馬連(value.ReturnRace馬連)
        this.concatReturnRace枠連(value.ReturnRace枠連)
        this.concatReturnRace馬単(value.ReturnRace馬単)
        this.concatReturnRaceワイド(value.ReturnRaceワイド)
        this.concatReturnRace三連複(value.ReturnRace三連複)
        this.concatReturnRace三連単(value.ReturnRace三連単)
        this.concatReturnRaceAll(value.ReturnRace)
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

        this.betRace単勝 = []
        this.betRace複勝 = []
        this.betRace馬連 = []
        this.betRace枠連 = []
        this.betRace馬単 = []
        this.betRaceワイド = []
        this.betRace三連複 = []
        this.betRace三連単 = []
        this.betRace = []

        this.returnRace単勝 = []
        this.returnRace複勝 = []
        this.returnRace馬連 = []
        this.returnRace枠連 = []
        this.returnRace馬単 = []
        this.returnRaceワイド = []
        this.returnRace三連複 = []
        this.returnRace三連単 = []
        this.returnRace = []

        this.numbetRace単勝 = 0
        this.numbetRace複勝 = 0
        this.numbetRace馬連 = 0
        this.numbetRace枠連 = 0
        this.numbetRace馬単 = 0
        this.numbetRaceワイド = 0
        this.numbetRace三連複 = 0
        this.numbetRace三連単 = 0
        this.numbetRace = 0

        this.numreturnRace単勝 = 0
        this.numreturnRace複勝 = 0
        this.numreturnRace馬連 = 0
        this.numreturnRace枠連 = 0
        this.numreturnRace馬単 = 0
        this.numreturnRaceワイド = 0
        this.numreturnRace三連複 = 0
        this.numreturnRace三連単 = 0
        this.numreturnRace = 0
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

    public get BetRace単勝(){ return this.betRace単勝 as unknown as Readonly<string[]>}
    public get BetRace複勝(){ return this.betRace複勝 as unknown as Readonly<string[]>}
    public get BetRace馬連(){ return this.betRace馬連 as unknown as Readonly<string[]>}
    public get BetRace枠連(){ return this.betRace枠連 as unknown as Readonly<string[]>}
    public get BetRace馬単(){ return this.betRace馬単 as unknown as Readonly<string[]>}
    public get BetRaceワイド(){ return this.betRaceワイド as unknown as Readonly<string[]>}
    public get BetRace三連複(){ return this.betRace三連複 as unknown as Readonly<string[]>}
    public get BetRace三連単(){ return this.betRace三連単 as unknown as Readonly<string[]>}
    public get BetRace() { return this.betRace as unknown as Readonly<string[]> }

    public get ReturnRace単勝() { return this.returnRace単勝 as unknown as Readonly<string[]> }
    public get ReturnRace複勝() { return this.returnRace複勝 as unknown as Readonly<string[]> }
    public get ReturnRace馬連() { return this.returnRace馬連 as unknown as Readonly<string[]> }
    public get ReturnRace枠連() { return this.returnRace枠連 as unknown as Readonly<string[]> }
    public get ReturnRace馬単() { return this.returnRace馬単 as unknown as Readonly<string[]> }
    public get ReturnRaceワイド() { return this.returnRaceワイド as unknown as Readonly<string[]> }
    public get ReturnRace三連複() { return this.returnRace三連複 as unknown as Readonly<string[]> }
    public get ReturnRace三連単() { return this.returnRace三連単 as unknown as Readonly<string[]> }
    public get ReturnRace() { return this.returnRace as unknown as Readonly<string[]> }

    toJson = () => {
        return {
            TotalBet単勝: this.totalBet単勝,
            TotalBet複勝: this.totalBet複勝,
            TotalBet馬連: this.totalBet馬連,
            TotalBet枠連: this.totalBet枠連,
            TotalBet馬単: this.totalBet馬単,
            TotalBetワイド: this.totalBetワイド,
            TotalBet三連複: this.totalBet三連複,
            TotalBet三連単: this.totalBet三連単,
            TotalBet: this.totalBet,
            TotalReturn単勝: this.totalReturn単勝,
            TotalReturn複勝: this.totalReturn複勝,
            TotalReturn馬連: this.totalReturn馬連,
            TotalReturn枠連: this.totalReturn枠連,
            TotalReturn馬単: this.totalReturn馬単,
            TotalReturnワイド: this.totalReturnワイド,
            TotalReturn三連複: this.totalReturn三連複,
            TotalReturn三連単: this.totalReturn三連単,
            TotalReturn: this.totalReturn,
            CountBet単勝: this.countBet単勝,
            CountBet複勝: this.countBet複勝,
            CountBet馬連: this.countBet馬連,
            CountBet枠連: this.countBet枠連,
            CountBet馬単: this.countBet馬単,
            CountBetワイド: this.countBetワイド,
            CountBet三連複: this.countBet三連複,
            CountBet三連単: this.countBet三連単,
            CountBetTotal: this.countBetTotal,
            CountReturn単勝: this.countReturn単勝,
            CountReturn複勝: this.countReturn複勝,
            CountReturn馬連: this.countReturn馬連,
            CountReturn枠連: this.countReturn枠連,
            CountReturn馬単: this.countReturn馬単,
            CountReturnワイド: this.countReturnワイド,
            CountReturn三連複: this.countReturn三連複,
            CountReturn三連単: this.countReturn三連単,
            CountReturnTotal: this.countReturnTotal,
            BetRace単勝: this.numbetRace単勝,
            BetRace複勝: this.numbetRace複勝,
            BetRace馬連: this.numbetRace馬連,
            BetRace枠連: this.numbetRace枠連,
            BetRace馬単: this.numbetRace馬単,
            BetRaceワイド: this.numbetRaceワイド,
            BetRace三連複: this.numbetRace三連複,
            BetRace三連単: this.numbetRace三連単,
            BetRace: this.numbetRace,
            ReturnRace単勝: this.numreturnRace単勝,
            ReturnRace複勝: this.numreturnRace複勝,
            ReturnRace馬連: this.numreturnRace馬連,
            ReturnRace枠連: this.numreturnRace枠連,
            ReturnRace馬単: this.numreturnRace馬単,
            ReturnRaceワイド: this.numreturnRaceワイド,
            ReturnRace三連複: this.numreturnRace三連複,
            ReturnRace三連単: this.numreturnRace三連単,
            ReturnRace: this.numreturnRace,
        }
    }
}
