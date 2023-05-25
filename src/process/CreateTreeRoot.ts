import JRATotalBettingtohyoClass, { DicDayRascetohyo } from "../class/JRATotalBettingtohyoClass";
import IFInquiryTreeNode from '../IF/IFInquiryTreeNode'

interface ItemDetailResult {
    [key: string | number]: number
}
interface ItemResult {
    [key: string | number]: ItemDetailResult
}
interface DayResult {
    [key: string | number]: ItemResult
}

const items = ["単勝", "複勝", "馬連", "枠連", "ワイド", "馬単", "三連複", "三連単", "total"]

export default function CreateTreeRoot(data: JRATotalBettingtohyoClass) {
    const values = GetData(data)
    return {
        "root":
            values
    }
}

function GetData(data: JRATotalBettingtohyoClass) {

    GetDayData(data.Dic)
    const values: IFInquiryTreeNode[] = []
    items.forEach((item: string, index: number) => {
        let TotalBet = 0
        let TotalReturn = 0
        let CountBet = 0
        let CountReturn = 0
        switch (item) {
            case "単勝":
                TotalBet = data.TotalBet単勝
                TotalReturn = data.TotalReturn単勝
                CountBet = data.CountBet単勝
                CountReturn = data.CountReturn単勝
            break
            case "複勝":
                TotalBet = data.TotalBet複勝
                TotalReturn = data.TotalReturn複勝
                CountBet = data.CountBet複勝
                CountReturn = data.CountReturn複勝
            break
            case "馬連":
                TotalBet = data.TotalBet馬連
                TotalReturn = data.TotalReturn馬連
                CountBet = data.CountBet馬連
                CountReturn = data.CountReturn馬連
            break
            case "枠連":
                TotalBet = data.TotalBet枠連
                TotalReturn = data.TotalReturn枠連
                CountBet = data.CountBet枠連
                CountReturn = data.CountReturn枠連
            break
            case "ワイド":
                TotalBet = data.TotalBetワイド
                TotalReturn = data.TotalReturnワイド
                CountBet = data.CountBetワイド
                CountReturn = data.CountReturnワイド
            break
            case "馬単":
                TotalBet = data.TotalBet馬単
                TotalReturn = data.TotalReturn馬単
                CountBet = data.CountBet馬単
                CountReturn = data.CountReturn馬単
            break
            case "三連複":
                TotalBet = data.TotalBet三連複
                TotalReturn = data.TotalReturn三連複
                CountBet = data.CountBet三連複
                CountReturn = data.CountReturn三連複
            break
            case "三連単":
                TotalBet = data.TotalBet三連単
                TotalReturn = data.TotalReturn三連単
                CountBet = data.CountBet三連単
                CountReturn = data.CountReturn三連単
            break
            case "total":
                TotalBet = data.TotalBet
                TotalReturn = data.TotalReturn
                CountBet = data.CountBetTotal
                CountReturn = data.CountReturnTotal
            break
        }
        const value: IFInquiryTreeNode = {
            key: `${index}`,
            data: {
                "項目": item,
                "TotalBet": `${TotalBet}`,
                "TotalReturn": `${TotalReturn}`,
                "CountBet": `${CountBet}`,
                "CountReturn": `${CountReturn}`
            }
        }
        values.push(value)
    })
    return values
}

function GetDayData(data: DicDayRascetohyo) {
    Object.keys(data).forEach((key: string) => {
        const race = data[key]
        console.log(race)
    })
}
