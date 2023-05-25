import JRATotalBettingtohyoClass, { DicDayRascetohyo } from "../class/JRATotalBettingtohyoClass";
import {IFInquiryTreeNode, IFInquiryParentTreeNode} from '../IF/IFInquiryTreeNode'

interface DayResult {
    [key: string | number]: IFInquiryTreeNode[]
}

const index単勝 = 0
const index複勝 = 1
const index馬連 = 2
const index枠連 = 3
const indexワイド = 4
const index馬単 = 5
const index三連複 = 6
const index三連単 = 7
const indexTotal = 8
    
export default function CreateTreeRoot(data: JRATotalBettingtohyoClass) {
    const values = GetData(data)
    return {
        "root":
            values
    }
}

function GetValueParent(parent: IFInquiryTreeNode, children: IFInquiryTreeNode[]): IFInquiryParentTreeNode {
    return {
        key: parent.key,
        data: parent.data,
        children: children
    }
}


function GetValue(項目: string, TotalBet: number, TotalReturn: number, CountBet: number, CountReturn: number, index: string): IFInquiryTreeNode {
    return {
        key: index,
        data: {
            "項目": `${項目}`,
            "TotalBet": `${TotalBet}`,
            "TotalReturn": `${TotalReturn}`,
            "CountBet": `${CountBet}`,
            "CountReturn": `${CountReturn}`
        }
    }
}

function GetData(data: JRATotalBettingtohyoClass) {
    
    const children = GetDayData(data.Dic)
    const values: IFInquiryParentTreeNode[] = []

    const TotalBet単勝 = data.TotalBet単勝
    const TotalBet複勝 = data.TotalBet複勝
    const TotalBet馬連 = data.TotalBet馬連
    const TotalBet枠連 = data.TotalBet枠連
    const TotalBetワイド = data.TotalBetワイド
    const TotalBet馬単 = data.TotalBet馬単
    const TotalBet三連複 = data.TotalBet三連複
    const TotalBet三連単 = data.TotalBet三連単
    const TotalBet = data.TotalBet

    const TotalReturn単勝 = data.TotalReturn単勝
    const TotalReturn複勝 = data.TotalReturn複勝
    const TotalReturn馬連 = data.TotalReturn馬連
    const TotalReturn枠連 = data.TotalReturn枠連
    const TotalReturnワイド = data.TotalReturnワイド
    const TotalReturn馬単 = data.TotalReturn馬単
    const TotalReturn三連複 = data.TotalReturn三連複
    const TotalReturn三連単 = data.TotalReturn三連単
    const TotalReturn = data.TotalReturn

    const CountBet単勝 = data.CountBet単勝
    const CountBet複勝 = data.CountBet複勝
    const CountBet馬連 = data.CountBet馬連
    const CountBet枠連 = data.CountBet枠連
    const CountBetワイド = data.CountBetワイド
    const CountBet馬単 = data.CountBet馬単
    const CountBet三連複 = data.CountBet三連複
    const CountBet三連単 = data.CountBet三連単
    const CountBetTotal = data.CountBetTotal

    const CountReturn単勝 = data.CountReturn単勝
    const CountReturn複勝 = data.CountReturn複勝
    const CountReturn馬連 = data.CountReturn馬連
    const CountReturn枠連 = data.CountReturn枠連
    const CountReturnワイド = data.CountReturnワイド
    const CountReturn馬単 = data.CountReturn馬単
    const CountReturn三連複 = data.CountReturn三連複
    const CountReturn三連単 = data.CountReturn三連単
    const CountReturnTotal = data.CountReturnTotal

    const value単勝: IFInquiryTreeNode = GetValue("単勝", TotalBet単勝, TotalReturn単勝, CountBet単勝, CountReturn単勝, `${index単勝}`)
    const value複勝: IFInquiryTreeNode = GetValue('複勝', TotalBet複勝, TotalReturn複勝, CountBet複勝, CountReturn複勝, `${index複勝}` )
    const value馬連: IFInquiryTreeNode = GetValue('馬連', TotalBet馬連, TotalReturn馬連, CountBet馬連, CountReturn馬連, `${index馬連}`)
    const value枠連: IFInquiryTreeNode = GetValue('枠連', TotalBet枠連, TotalReturn枠連, CountBet枠連, CountReturn枠連, `${index枠連}`)
    const valueワイド: IFInquiryTreeNode = GetValue('ワイド', TotalBetワイド, TotalReturnワイド, CountBetワイド, CountReturnワイド, `${indexワイド}`)
    const value馬単: IFInquiryTreeNode = GetValue('馬単', TotalBet馬単, TotalReturn馬単, CountBet馬単, CountReturn馬単, `${index馬単}`)
    const value三連複: IFInquiryTreeNode = GetValue('三連複', TotalBet三連複, TotalReturn三連複, CountBet三連複, CountReturn三連複, `${index三連複}`)
    const value三連単: IFInquiryTreeNode = GetValue('三連単', TotalBet三連単, TotalReturn三連単, CountBet三連単, CountReturn三連単, `${index三連単}`)
    const valueTotal: IFInquiryTreeNode = GetValue('Total', TotalBet, TotalReturn, CountBetTotal, CountReturnTotal, `${indexTotal}`)

    values.push(GetValueParent(value単勝, children[index単勝]))
    values.push(GetValueParent(value複勝, children[index複勝]))
    values.push(GetValueParent(value馬連, children[index馬連]))
    values.push(GetValueParent(value枠連, children[index枠連]))
    values.push(GetValueParent(valueワイド, children[indexワイド]))
    values.push(GetValueParent(value馬単, children[index馬単]))
    values.push(GetValueParent(value三連複, children[index三連複]))
    values.push(GetValueParent(value三連単, children[index三連単]))
    values.push(GetValueParent(valueTotal, children[indexTotal]))
    return values
}

function GetDayData(data: DicDayRascetohyo) {
    const values: DayResult = {}
    values[index単勝] = []
    values[index複勝] = []
    values[index馬連] = []
    values[index枠連] = []
    values[indexワイド] = []
    values[index馬単] = []
    values[index三連複] = []
    values[index三連単] = []
    values[indexTotal] = []
    Object.keys(data).forEach((key: string, index: number) => {
        const day = data[key]

        const TotalBet単勝 = day.TotalBet単勝
        const TotalBet複勝 = day.TotalBet複勝
        const TotalBet馬連 = day.TotalBet馬連
        const TotalBet枠連 = day.TotalBet枠連
        const TotalBetワイド = day.TotalBetワイド
        const TotalBet馬単 = day.TotalBet馬単
        const TotalBet三連複 = day.TotalBet三連複
        const TotalBet三連単 = day.TotalBet三連単
        const TotalBet = day.TotalBet
        
        const TotalReturn単勝 = day.TotalReturn単勝
        const TotalReturn複勝 = day.TotalReturn複勝
        const TotalReturn馬連 = day.TotalReturn馬連
        const TotalReturn枠連 = day.TotalReturn枠連
        const TotalReturnワイド = day.TotalReturnワイド
        const TotalReturn馬単 = day.TotalReturn馬単
        const TotalReturn三連複 = day.TotalReturn三連複
        const TotalReturn三連単 = day.TotalReturn三連単
        const TotalReturn = day.TotalReturn
        
        const CountBet単勝 = day.CountBet単勝
        const CountBet複勝 = day.CountBet複勝
        const CountBet馬連 = day.CountBet馬連
        const CountBet枠連 = day.CountBet枠連
        const CountBetワイド = day.CountBetワイド
        const CountBet馬単 = day.CountBet馬単
        const CountBet三連複 = day.CountBet三連複
        const CountBet三連単 = day.CountBet三連単
        const CountBetTotal = day.CountBetTotal

        const CountReturn単勝 = day.CountReturn単勝
        const CountReturn複勝 = day.CountReturn複勝
        const CountReturn馬連 = day.CountReturn馬連
        const CountReturn枠連 = day.CountReturn枠連
        const CountReturnワイド = day.CountReturnワイド
        const CountReturn馬単 = day.CountReturn馬単
        const CountReturn三連複 = day.CountReturn三連複
        const CountReturn三連単 = day.CountReturn三連単
        const CountReturnTotal = day.CountReturnTotal

        const value単勝: IFInquiryTreeNode = GetValue(key, TotalBet単勝, TotalReturn単勝, CountBet単勝, CountReturn単勝, `${index単勝}-${index}`)
        const value複勝: IFInquiryTreeNode = GetValue(key, TotalBet複勝, TotalReturn複勝, CountBet複勝, CountReturn複勝, `${index複勝}-${index}`)
        const value馬連: IFInquiryTreeNode = GetValue(key, TotalBet馬連, TotalReturn馬連, CountBet馬連, CountReturn馬連, `${index馬連}-${index}`)
        const value枠連: IFInquiryTreeNode = GetValue(key, TotalBet枠連, TotalReturn枠連, CountBet枠連, CountReturn枠連, `${index枠連}-${index}`)
        const valueワイド: IFInquiryTreeNode = GetValue(key, TotalBetワイド, TotalReturnワイド, CountBetワイド, CountReturnワイド, `${indexワイド}-${index}`)
        const value馬単: IFInquiryTreeNode = GetValue(key, TotalBet馬単, TotalReturn馬単, CountBet馬単, CountReturn馬単, `${index馬単}-${index}`)
        const value三連複: IFInquiryTreeNode = GetValue(key, TotalBet三連複, TotalReturn三連複, CountBet三連複, CountReturn三連複, `${index三連複}-${index}`)
        const value三連単: IFInquiryTreeNode = GetValue(key, TotalBet三連単, TotalReturn三連単, CountBet三連単, CountReturn三連単, `${index三連単}-${index}`)
        const valueTotal: IFInquiryTreeNode = GetValue(key, TotalBet, TotalReturn, CountBetTotal, CountReturnTotal, `${indexTotal}-${index}`)

        values[index単勝].push(value単勝)
        values[index複勝].push(value複勝)
        values[index馬連].push(value馬連)
        values[index枠連].push(value枠連)
        values[indexワイド].push(valueワイド)
        values[index馬単].push(value馬単)
        values[index三連複].push(value三連複)
        values[index三連単].push(value三連単)
        values[indexTotal].push(valueTotal)
    })
    return values
}
