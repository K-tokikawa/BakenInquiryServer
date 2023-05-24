import iconv from 'iconv-lite'
import JRAtohyoClass from '../class/JRAtohyoClass'
import JRABettingRaceResultClass from '../class/JRABettingRaceResultClass'
import { AxiosBase } from '../class/AxiosBase'
import AxiosResponseClass from '../class/AxiosResponseClass'
import JRADayBettingtohyoClass from '../class/JRADayBettingtohyoClass'

export default async function process(jsessionid: string, m: string) {
    const csvdata: [string[]] = await GetJRAtohyoCSVData(jsessionid, m)

    const lstJRAtohyo: JRAtohyoClass[] = GetJRAtohyoData(csvdata)
    return DayRaceResult(lstJRAtohyo)
}

async function GetJRAtohyoCSVData(jsessionid: string, m: string) {
    const headers = { "Content-Type": "application/x-www-form-urlencoded", "Cookie": `JSESSIONID=${jsessionid}` }
    // セッションで使用されているCookieを取得
    const axios020 = new AxiosBase('https://www.nvinq.jra.go.jp/jra/servlet/JRAWeb020')
    const res020 = await axios020.POST({ m: m }, { headers: headers, withCredentials: true })
    const axiosres020 = res020 as AxiosResponseClass
    const data = axiosres020.Data
    let p = Promise.resolve()
    const csvdata: [string[]] = [[]]
    data.split('JRAWeb030')
        .filter(row => row.match(/name="DATE"/))
        .forEach(row => {
            (p = p.then(async() => {
                const date = row.match(/(?<="DATE" value=").*?(?=")/)?.[0]
                const m = row.match(/(?<="m" value=").*?(?=")/)?.[0]
                if (typeof (date) == 'string' && typeof (m) == 'string') {
                    const axios030 = new AxiosBase('https://www.nvinq.jra.go.jp/jra/servlet/JRAWeb030')
                    await axios030.POST({ DATE: date, FROM: '020', m: m }, { headers: headers, withCredentials: true })
                    const axios = new AxiosBase('https://www.nvinq.jra.go.jp/jra/servlet/JRACSVDownload')
                    const rescsv = await axios.POST({ DATE: date, FROM: '030', m: m, DLTYPE: 1 }, { headers: headers, responseType: 'arraybuffer', withCredentials: true })
                    const axiosrescsv = rescsv as AxiosResponseClass
                    const csv = iconv.decode(Buffer.from(axiosrescsv.Data), 'Shift_JIS').split('\n')
                    csvdata.push(csv)
                }
            })
            )
        })
    await p
    return csvdata
}

function GetJRAtohyoData(csvdata: [string[]]) {
    const indexHeader = 0
    const lstJRAtohyo: JRAtohyoClass[] = []
    csvdata.forEach((data: string[]) => {
        const dataCSVrows = data.length
        data.forEach((csvrow: string, index: number) => {
            const row = csvrow.split(',')
            if (index != indexHeader && index < dataCSVrows - 2) {
                const tohyorow = new JRAtohyoClass(
                    row[JRAtohyoClass.index日付],
                    row[JRAtohyoClass.index受付番号],
                    row[JRAtohyoClass.index通番],
                    row[JRAtohyoClass.index場名],
                    row[JRAtohyoClass.index曜日],
                    row[JRAtohyoClass.indexレース],
                    row[JRAtohyoClass.index式別],
                    row[JRAtohyoClass.index馬_組番],
                    row[JRAtohyoClass.index購入金額],
                    row[JRAtohyoClass.index的中_返還],
                    row[JRAtohyoClass.index払戻単価],
                    row[JRAtohyoClass.index払戻_返還金額]
                )
                lstJRAtohyo.push(tohyorow)
            } else {
                // 何もしない
            }
        });
    })
    return lstJRAtohyo
}

async function DayRaceResult(lstJRAtohyo: JRAtohyoClass[]) {
    const dic: JRADayBettingtohyoClass = new JRADayBettingtohyoClass()
    lstJRAtohyo.forEach((row: JRAtohyoClass) => {
        const 日付 = row.日付
        const レース = row.日付 + row.場名 + row.レース

        if (dic.Dic[日付] == undefined) {
            dic.SetDicDay(日付, {})
            dic.SetDicRace(日付, レース, new JRABettingRaceResultClass())
            dic.SetDicRace(日付, レース, DetailResult(row, dic, 日付, レース)) 
        } else {
            if (dic.Dic[日付][レース] == undefined) {
                dic.SetDicRace(日付, レース, new JRABettingRaceResultClass())
                dic.SetDicRace(日付, レース, DetailResult(row, dic, 日付, レース)) 
            } else {
                dic.SetDicRace(日付, レース, DetailResult(row, dic, 日付, レース)) 
            }
        }
    })
    dic.CalcBetandHitRace()
    return dic
}

function DetailResult(row: JRAtohyoClass, dic: JRADayBettingtohyoClass, 日付: string, レース: string) {
    const dicResult: JRABettingRaceResultClass = dic.Dic[日付][レース]

    const 式別 = row.式別
    const 払戻金額 = Number(row.払戻_返還金額)
    let 購入金額 = 0
    let 購入点数 = 1
    const ary購入金額 = row.購入金額.split('／')
    if (ary購入金額.length == 1) {
        購入金額 = Number(ary購入金額[0])
    } else {
        購入金額 = Number(ary購入金額[1])
        購入点数 = Number(ary購入金額[1]) / Number(ary購入金額[0])
    }

    const 的中点数 = row.的中_返還.split('的中').length - 1

    dicResult.addcountReturnTotal(的中点数)
    dicResult.addcountBetTotal(購入点数)
    dic.addcountReturnTotal((的中点数))
    dic.addcountBetTotal(購入点数)

    dicResult.addReturnTotal(払戻金額)
    dicResult.addBetTotal(購入金額)
    dic.addReturnTotal(払戻金額)
    dic.addBetTotal(購入金額)
    if (式別.search(JRABettingRaceResultClass.search単勝) == 0) {
        dicResult.addReturn単勝(払戻金額)
        dicResult.addcountReturn単勝(的中点数)
        dicResult.addBet単勝(購入金額)
        dicResult.addcountBet単勝(購入点数)

        dic.addReturn単勝(払戻金額)
        dic.addcountReturn単勝(的中点数)
        dic.addBet単勝(購入金額)
        dic.addcountBet単勝(購入点数)

    } else if (式別.search(JRABettingRaceResultClass.search複勝) == 0) {
        dicResult.addReturn複勝(払戻金額)
        dicResult.addcountReturn複勝(的中点数)
        dicResult.addBet複勝(購入金額)
        dicResult.addcountBet複勝(購入点数)

        dic.addReturn複勝(払戻金額)
        dic.addcountReturn複勝(的中点数)
        dic.addBet複勝(購入金額)
        dic.addcountBet複勝(購入点数)

    } else if (式別.search(JRABettingRaceResultClass.search馬連) == 0) {
        dicResult.addReturn馬連(払戻金額)
        dicResult.addcountReturn馬連(的中点数)
        dicResult.addBet馬連(購入金額)
        dicResult.addcountBet馬連(購入点数)

        dic.addReturn馬連(払戻金額)
        dic.addcountReturn馬連(的中点数)
        dic.addBet馬連(購入金額)
        dic.addcountBet馬連(購入点数)

    } else if (式別.search(JRABettingRaceResultClass.search馬単) == 0) {
        dicResult.addReturn馬単(払戻金額)
        dicResult.addcountReturn馬単(的中点数)
        dicResult.addBet馬単(購入金額)
        dicResult.addcountBet馬単(購入点数)

        dic.addReturn馬単(払戻金額)
        dic.addcountReturn馬単(的中点数)
        dic.addBet馬単(購入金額)
        dic.addcountBet馬単(購入点数)

    } else if (式別.search(JRABettingRaceResultClass.searchワイド) == 0) {
        dicResult.addReturnワイド(払戻金額)
        dicResult.addcountReturnワイド(的中点数)
        dicResult.addBetワイド(購入金額)
        dicResult.addcountBetワイド(購入点数)

        dic.addReturnワイド(払戻金額)
        dic.addcountReturnワイド(的中点数)
        dic.addBetワイド(購入金額)
        dic.addcountBetワイド(購入点数)

    } else if (式別.search(JRABettingRaceResultClass.search枠連) == 0) {
        dicResult.addReturn枠連(払戻金額)
        dicResult.addcountReturn枠連(的中点数)
        dicResult.addBet枠連(購入金額)
        dicResult.addcountBet枠連(購入点数)

        dic.addReturn枠連(払戻金額)
        dic.addcountReturn枠連(的中点数)
        dic.addBet枠連(購入金額)
        dic.addcountBet枠連(購入点数)

    } else if (式別.search(JRABettingRaceResultClass.search三連複) == 0) {
        dicResult.addReturn三連複(払戻金額)
        dicResult.addcountReturn三連複(的中点数)
        dicResult.addBet三連複(購入金額)
        dicResult.addcountBet三連複(購入点数)

        dic.addReturn三連複(払戻金額)
        dic.addcountReturn三連複(的中点数)
        dic.addBet三連複(購入金額)
        dic.addcountBet三連複(購入点数)

    } else if (式別.search(JRABettingRaceResultClass.search三連単) == 0) {
        dicResult.addReturn三連単(払戻金額)
        dicResult.addcountReturn三連単(的中点数)
        dicResult.addBet三連単(購入金額)
        dicResult.addcountBet三連単(購入点数)

        dic.addReturn三連単(払戻金額)
        dic.addcountReturn三連単(的中点数)
        dic.addBet三連単(購入金額)
        dic.addcountBet三連単(購入点数)

    } else {
        console.log(式別)
    }
    return dicResult
}