import iconv from 'iconv-lite'
import JRAtohyoClass from '../class/JRAtohyoClass'
import JRABettingResult from '../class/JRABettingResultClass'
import { AxiosBase } from '../class/AxiosBase'
import AxiosResponseClass from '../class/AxiosResponseClass'
interface dictionary {
    [key: string | number]: JRABettingResult
}

export default async function process(jsessionid: string, m: string) {
    const csvdata: [string[]] = await GetJRAtohyoCSVData(jsessionid, m)

    const lstJRAtohyo: JRAtohyoClass[] = GetJRAtohyoData(csvdata)
    const 日別券種購入払戻金額 = DayResult(lstJRAtohyo)
    const totalBettingResult = AllResult(日別券種購入払戻金額)
    return JSON.stringify(totalBettingResult.toJson())
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
            if (index != indexHeader && index != dataCSVrows - 1) {
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
function DayResult(lstJRAtohyo: JRAtohyoClass[]) {
    const dicResult: dictionary = {}
    lstJRAtohyo.forEach((row: JRAtohyoClass) => {
        const 日付 = row.日付
        if (dicResult[日付] == undefined) {
            const resultBetting = new JRABettingResult()
            dicResult[日付] = resultBetting
        }
        dicResult[日付] = DetailResult(row, dicResult[日付])
    })
    return dicResult
}

function AllResult(日別券種購入払戻金額: dictionary) {
    const totalBettingResult = new JRABettingResult()
    Object.keys(日別券種購入払戻金額).forEach((key: string) => {
        const value = 日別券種購入払戻金額[key]
        totalBettingResult.addAll(value)
    })
    return totalBettingResult
}

function DetailResult(row: JRAtohyoClass, dicResult: JRABettingResult) {
    const 式別 = row.式別
    const 払戻金額 = Number(row.払戻_返還金額)
    const Race = `${row.日付}${row.場名}${row.レース}`
    let 購入金額 = 0
    let 購入点数 = 1
    const ary購入金額 = row.購入金額.split('／')
    if (ary購入金額.length == 1) {
        購入金額 = Number(ary購入金額[0])
    } else {
        購入金額 = Number(ary購入金額[1])
        購入点数 = Number(ary購入金額[1]) / Number(ary購入金額[0])
    }
    if (dicResult.BetRace.includes(Race) != true) {
        dicResult.pushBetRace(Race)
    }

    const 的中点数 = row.的中_返還.split('的中').length - 1
    if (的中点数 != 0) {
        dicResult.pushReturnRace(Race)
    }

    dicResult.addReturnTotal(払戻金額)
    dicResult.addcountReturnTotal(的中点数)
    dicResult.addBetTotal(購入金額)
    dicResult.addcountBetTotal(購入点数)
    if (式別.search(JRABettingResult.search単勝) == 0) {
        dicResult.addReturn単勝(払戻金額)
        dicResult.addcountReturn単勝(的中点数)
        dicResult.addBet単勝(購入金額)
        dicResult.addcountBet単勝(購入点数)
        if (dicResult.BetRace単勝.includes(Race) != true) {
            dicResult.pushBetRace単勝(Race)
        }
        if (的中点数 != 0) {
            dicResult.pushReturnRace単勝(Race)
        }

    } else if (式別.search(JRABettingResult.search複勝) == 0) {
        dicResult.addReturn複勝(払戻金額)
        dicResult.addcountReturn複勝(的中点数)
        dicResult.addBet複勝(購入金額)
        dicResult.addcountBet複勝(購入点数)
        if (dicResult.BetRace複勝.includes(Race) != true) {
            dicResult.pushBetRace複勝(Race)
        }
        if (的中点数 != 0) {
            dicResult.pushReturnRace複勝(Race)
        }

    } else if (式別.search(JRABettingResult.search馬連) == 0) {
        dicResult.addReturn馬連(払戻金額)
        dicResult.addcountReturn馬連(的中点数)
        dicResult.addBet馬連(購入金額)
        dicResult.addcountBet馬連(購入点数)
        if (dicResult.BetRace馬連.includes(Race) != true) {
            dicResult.pushBetRace馬連(Race)
        }
        if (的中点数 != 0) {
            dicResult.pushReturnRace馬連(Race)
        }

    } else if (式別.search(JRABettingResult.search馬単) == 0) {
        dicResult.addReturn馬単(払戻金額)
        dicResult.addcountReturn馬単(的中点数)
        dicResult.addBet馬単(購入金額)
        dicResult.addcountBet馬単(購入点数)
        if (dicResult.BetRace馬単.includes(Race) != true) {
            dicResult.pushBetRace馬単(Race)
        }
        if (的中点数 != 0) {
            dicResult.pushReturnRace馬単(Race)
        }

    } else if (式別.search(JRABettingResult.searchワイド) == 0) {
        dicResult.addReturnワイド(払戻金額)
        dicResult.addcountReturnワイド(的中点数)
        dicResult.addBetワイド(購入金額)
        dicResult.addcountBetワイド(購入点数)
        if (dicResult.BetRaceワイド.includes(Race) != true) {
            dicResult.pushBetRaceワイド(Race)
        }
        if (的中点数 != 0) {
            dicResult.pushReturnRaceワイド(Race)
        }

    } else if (式別.search(JRABettingResult.search枠連) == 0) {
        dicResult.addReturn枠連(払戻金額)
        dicResult.addcountReturn枠連(的中点数)
        dicResult.addBet枠連(購入金額)
        dicResult.addcountBet枠連(購入点数)
        if (dicResult.BetRace枠連.includes(Race) != true) {
            dicResult.pushBetRace枠連(Race)
        }
        if (的中点数 != 0) {
            dicResult.pushReturnRace枠連(Race)
        }

    } else if (式別.search(JRABettingResult.search三連複) == 0) {
        dicResult.addReturn三連複(払戻金額)
        dicResult.addcountReturn三連複(的中点数)
        dicResult.addBet三連複(購入金額)
        dicResult.addcountBet三連複(購入点数)
        if (dicResult.BetRace三連複.includes(Race) != true) {
            dicResult.pushBetRace三連複(Race)
        }
        if (的中点数 != 0) {
            dicResult.pushReturnRace三連複(Race)
        }

    } else if (式別.search(JRABettingResult.search三連単) == 0) {
        dicResult.addReturn三連単(払戻金額)
        dicResult.addcountReturn三連単(的中点数)
        dicResult.addBet三連単(購入金額)
        dicResult.addcountBet三連単(購入点数)
        if (dicResult.BetRace三連単.includes(Race) != true) {
            dicResult.pushBetRace三連単(Race)
        }
        if (的中点数 != 0) {
            dicResult.pushReturnRace三連単(Race)
        }

    } else {
        console.log(式別)
    }
    return dicResult
}