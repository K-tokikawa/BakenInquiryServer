import JRABettingRaceResultClass from "../../class/JRABettingRaceResultClass";
import JRADayBettingtohyoClass, { dictionary } from "../../class/JRADayBettingtohyoClass";
import JRATotalBettingtohyoClass, { DicDayRascetohyo } from "../../class/JRATotalBettingtohyoClass";
import {IFInquiryTreeNode, IFInquiryParentTreeNode} from '../../IF/IFInquiryTreeNode'

interface ChildrenResult {
    [key: string | number]: IFInquiryTreeNode[]
}

interface RowResult {
    [key: string | number]: IFInquiryTreeNode
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
    const returnrate = Math.round((TotalReturn / TotalBet) * 1000) / 10
    const hitrate = Math.round((CountReturn / CountBet) * 1000) / 10
    return {
        key: index,
        data: {
            "項目": `${項目}`,
            "TotalBet": `${TotalBet}`,
            "TotalReturn": `${TotalReturn}`,
            "ReturnRate": `${returnrate}%`,
            "CountBet": `${CountBet}`,
            "CountReturn": `${CountReturn}`,
            "HitRate": `${hitrate}%`
        }
    }
}

function GetData(data: JRATotalBettingtohyoClass) {
    
    const values: IFInquiryParentTreeNode[] = []
    const Nodedata = GetNodeData(data, null, null)
    const children = GetDayData(data.Dic, null)

    values.push(GetValueParent(Nodedata[indexTotal], children[indexTotal]))
    values.push(GetValueParent(Nodedata[index単勝], children[index単勝]))
    values.push(GetValueParent(Nodedata[index複勝], children[index複勝]))
    values.push(GetValueParent(Nodedata[index馬連], children[index馬連]))
    values.push(GetValueParent(Nodedata[index枠連], children[index枠連]))
    values.push(GetValueParent(Nodedata[indexワイド], children[indexワイド]))
    values.push(GetValueParent(Nodedata[index馬単], children[index馬単]))
    values.push(GetValueParent(Nodedata[index三連複], children[index三連複]))
    values.push(GetValueParent(Nodedata[index三連単], children[index三連単]))
    return values
}


function GetDayData(data: DicDayRascetohyo | dictionary, parentindex: string | null) {
    let values: ChildrenResult = {}
    values[index単勝] = []
    values[index複勝] = []
    values[index馬連] = []
    values[index枠連] = []
    values[indexワイド] = []
    values[index馬単] = []
    values[index三連複] = []
    values[index三連単] = []
    values[indexTotal] = []
    Object.keys(data).forEach((key: string, index: number| null) => {
        const row = data[key]
        const keyindex = parentindex == null ? `${index}` : `${parentindex}-${index}`
        const dayresult = GetNodeData(row, key, keyindex)
        if ('Dic' in row) {
            // リカーシブ注意 ⇚じゃあやるなよって言われてもやってみたかったとしか
            const children: ChildrenResult = GetDayData(row.Dic, keyindex)
            values[index単勝].push(GetValueParent(dayresult[index単勝], children[index単勝]))
            values[index複勝].push(GetValueParent(dayresult[index複勝], children[index複勝]))
            values[index馬連].push(GetValueParent(dayresult[index馬連], children[index馬連]))
            values[index枠連].push(GetValueParent(dayresult[index枠連], children[index枠連]))
            values[indexワイド].push(GetValueParent(dayresult[indexワイド], children[indexワイド]))
            values[index馬単].push(GetValueParent(dayresult[index馬単], children[index馬単]))
            values[index三連複].push(GetValueParent(dayresult[index三連複], children[index三連複]))
            values[index三連単].push(GetValueParent(dayresult[index三連単], children[index三連単]))
            values[indexTotal].push(GetValueParent(dayresult[indexTotal], children[indexTotal]))
        } else {
            values[index単勝].push(dayresult[index単勝])
            values[index複勝].push(dayresult[index複勝])
            values[index馬連].push(dayresult[index馬連])
            values[index枠連].push(dayresult[index枠連])
            values[indexワイド].push(dayresult[indexワイド])
            values[index馬単].push(dayresult[index馬単])
            values[index三連複].push(dayresult[index三連複])
            values[index三連単].push(dayresult[index三連単])
            values[indexTotal].push(dayresult[indexTotal])
        }
    })
    return values
}

function GetNodeData(data: JRABettingRaceResultClass, key: string|null, index: string | null) {
    const values: RowResult = {}

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

    const countBet単勝race = data.CountBet単勝race
    const countBet複勝race = data.CountBet複勝race
    const countBet馬連race = data.CountBet馬連race
    const countBet枠連race = data.CountBet枠連race
    const countBetワイドrace = data.CountBetワイドrace
    const countBet馬単race = data.CountBet馬単race
    const countBet三連複race = data.CountBet三連複race
    const countBet三連単race = data.CountBet三連単race
    const countBetTotalrace = data.CountBetTotalrace

    const countReturn単勝race = data.CountReturn単勝race
    const countReturn複勝race = data.CountReturn複勝race
    const countReturn馬連race = data.CountReturn馬連race
    const countReturn馬単race = data.CountReturn馬単race
    const countReturn枠連race = data.CountReturn枠連race
    const countReturnワイドrace = data.CountReturnワイドrace
    const countReturn三連複race = data.CountReturn三連複race
    const countReturn三連単race = data.CountReturn三連単race
    const countReturnTotalrace = data.CountReturnTotalrace

    const index_単勝 = index == null ? `${index単勝}` : `${index単勝}-${index}`
    const index_複勝 = index == null ? `${index複勝}` : `${index複勝}-${index}`
    const index_馬連 = index == null ? `${index馬連}` : `${index馬連}-${index}`
    const index_枠連 = index == null ? `${index枠連}` : `${index枠連}-${index}`
    const index_ワイド = index == null ? `${indexワイド}` : `${indexワイド}-${index}`
    const index_馬単 = index == null ? `${index馬単}` : `${index馬単}-${index}`
    const index_三連複 = index == null ? `${index三連複}` : `${index三連複}-${index}`
    const index_三連単 = index == null ? `${index三連単}` : `${index三連単}-${index}`
    const index_Total = index == null ? `${indexTotal}` : `${indexTotal}-${index}`

    const key_単勝 = key == null ? '単勝' : key
    const key_複勝 = key == null ? '複勝' : key
    const key_馬連 = key == null ? '馬連' : key
    const key_枠連 = key == null ? '枠連' : key
    const key_ワイド = key == null ? 'ワイド' : key
    const key_馬単 = key == null ? '馬単' : key
    const key_三連複 = key == null ? '三連複' : key
    const key_三連単 = key == null ? '三連単' : key
    const key_Total = key == null ? 'Total' : key

    const valueTotal: IFInquiryTreeNode = GetValue(key_Total, TotalBet, TotalReturn, countBetTotalrace, countReturnTotalrace, index_Total)
    const value単勝: IFInquiryTreeNode = GetValue(key_単勝, TotalBet単勝, TotalReturn単勝, countBet単勝race, countReturn単勝race, index_単勝)
    const value複勝: IFInquiryTreeNode = GetValue(key_複勝, TotalBet複勝, TotalReturn複勝, countBet複勝race, countReturn複勝race, index_複勝)
    const value馬連: IFInquiryTreeNode = GetValue(key_馬連, TotalBet馬連, TotalReturn馬連, countBet馬連race, countReturn馬連race, index_馬連)
    const value枠連: IFInquiryTreeNode = GetValue(key_枠連, TotalBet枠連, TotalReturn枠連, countBet枠連race, countReturn枠連race, index_枠連)
    const valueワイド: IFInquiryTreeNode = GetValue(key_ワイド, TotalBetワイド, TotalReturnワイド, countBetワイドrace, countReturnワイドrace, index_ワイド)
    const value馬単: IFInquiryTreeNode = GetValue(key_馬単, TotalBet馬単, TotalReturn馬単, countBet馬単race, countReturn馬単race, index_馬単)
    const value三連複: IFInquiryTreeNode = GetValue(key_三連複, TotalBet三連複, TotalReturn三連複, countBet三連複race, countReturn三連複race, index_三連複)
    const value三連単: IFInquiryTreeNode = GetValue(key_三連単, TotalBet三連単, TotalReturn三連単, countBet三連単race, countReturn三連単race, index_三連単)

    values[index単勝] = value単勝
    values[index複勝] = value複勝
    values[index馬連] = value馬連
    values[index枠連] = value枠連
    values[indexワイド] = valueワイド
    values[index馬単] = value馬単
    values[index三連複] = value三連複
    values[index三連単] = value三連単
    values[indexTotal] = valueTotal

    return values
}
