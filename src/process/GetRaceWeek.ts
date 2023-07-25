import FileUtil from '../FileUtil'
import { AxiosBase } from '../class/AxiosBase'
import iconv from 'iconv-lite'
import ClassRace from '../class/ClassRace'
import GetVenueMaxHold from '../sql/query/GetVenueMaxHold'
import GetVenueMaxDay from '../sql/query/GetVenueMaxDay'
export default async function process() {
    return await GetRaceWeek()
}

async function GetRaceWeek() {
    const date = new Date()
    const Year = date.getFullYear()
    const Month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    const Day = date.getDate() + 4 < 10 ? `0${date.getDate() + 4}` : `${date.getDate() + 4}`
    const dateID = `${Year}${Month}${Day}`

    const url = `https://race.netkeiba.com/top/race_list.html?kaisai_date=${dateID}`
    const axios: AxiosBase = new AxiosBase(url)
    const page = await axios.GET() as Buffer
    const pageElement = iconv.decode(page, 'eucjp')
    for (const strkey of Object.keys(ClassRace.VaneuMatch)) {
        const VenueNum = Number(strkey)
        if (pageElement.match(ClassRace.VaneuMatch[VenueNum])) {
            const sqlHold = new GetVenueMaxHold(Year, VenueNum)
            const lstHold = await sqlHold.Execsql()
            const Hold = lstHold[0].Hold
            let strHold = Hold < 10 ? `0${Hold}` : `${Hold}`

            const sqlDay = new GetVenueMaxDay(Year, VenueNum, Hold)
            const lstDay = await sqlDay.Execsql()
            const Day = lstDay[0].Day + 2
            let strDay = Day + 1 < 10 ? `0${Day + 1}` : `${Day + 1}`

            // 開催が合っているかの確認
            // 11Rなのはページが用意されている確率が高いから
            const RaceID = `${Year}${ClassRace.VenueCode[VenueNum]}${strHold}${strDay}11`
            const memberurl = `https://race.netkeiba.com/race/shutuba.html?race_id=${RaceID}&rf=race_submenu`
            const axios: AxiosBase = new AxiosBase(memberurl)
            const page = await axios.GET() as Buffer
            const pageElement = iconv.decode(page, 'eucjp')
            if (!pageElement.match(/RaceName/)) {
                strHold = Hold + 1 < 10 ? `0${Hold + 1}` : `${Hold + 1}`
                strDay = '02'
            }

            const Rounds = ['01','02','03','04','05','06','07','08','09','10','11','12']
            for (const Round of Rounds) {
                const RaceID = `${Year}${ClassRace.VenueCode[VenueNum]}${strHold}${strDay}${Round}`
                const memberurl = `https://race.netkeiba.com/race/shutuba.html?race_id=${RaceID}&rf=race_submenu`
                const axios: AxiosBase = new AxiosBase(memberurl)
                const page = await axios.GET() as Buffer
                const pageElement = iconv.decode(page, 'eucjp')
                if (pageElement.match(/RaceName/)) {
                    const pages = pageElement.split('\n')
                    FileUtil.OutputFile(pages, `${RaceID}.txtt`)
                    let range = 0
                    let ground = 0
                    let direction = 0
                    for (const line of pages) {
                        if (line.match(/span class="Turf"/)) {
                            // 距離
                            if (line.match(/\d{4}/)) {
                                range = Number(line.match(/\d{4}/)?.[0])
                            }
                            // 芝orダート
                            if (line.match(/芝/)) {
                                ground = 1
                            } else if (line.match(/ダ/)) {
                                ground = 2
                            } else if (line.match(/障/)) {
                                ground = 3
                            }
                    
                            // 向き
                            if (line.match(/右/)) {
                                direction = 1
                            } else if (line.match(/左/)) {
                                direction = 2
                            } else if (line.match(/直線/)) {
                                direction = 3
                            }
                            return [range, ground, direction]
                        }
                        if (line.match(/晴/)) {
                            return 1
                        }
                        if (line.match(/曇/)) {
                            return 2
                        }
                        if (line.match(/雨/)) {
                            return 3
                        }
                        if (line.match(/雪/)) {
                            return 3
                        }
                    }
                }
            }
        }
    }
    return true
}

function PageAnalysis(pages: string[]) {
    let range = 0
    let ground = 0
    let direction = 0
    let weather = 0
    let grouncondition = 0
    for (const line of pages) {
        if (line.match(/span class="Turf"/)) {
            // 距離
            if (line.match(/\d{4}/)) {
                range = Number(line.match(/\d{4}/)?.[0])
            }
            // 芝orダート
            if (line.match(/芝/)) {
                ground = 1
            } else if (line.match(/ダ/)) {
                ground = 2
            } else if (line.match(/障/)) {
                ground = 3
            }
    
            // 向き
            if (line.match(/右/)) {
                direction = 1
            } else if (line.match(/左/)) {
                direction = 2
            } else if (line.match(/直線/)) {
                direction = 3
            }
        }
        if (line.match(/晴/)) {
            weather = 1
        }
        if (line.match(/曇/)) {
            weather = 2
        }
        if (line.match(/雨/)) {
            weather = 3
        }
        if (line.match(/雪/)) {
            weather = 4
        }

        if (line.match(/良/)){
            grouncondition = 1
        }
        if (line.match(/稍/)){
            grouncondition = 2
        }
        if (line.match(/重/)){
            grouncondition = 3
        }
        if (line.match(/不/)){
            grouncondition = 4
        }
    }
}