import { AxiosBase } from '../class/AxiosBase'
import iconv from 'iconv-lite'
import ClassRace from '../class/ClassRace'
import { PythonShell } from 'python-shell'


export default async function process(Year: number, Month: number, HoldDay: number, shell: PythonShell) {
    const HoldVenue = await GetHoldVenu(Year, Month, HoldDay)

    return HoldVenue

}
async function GetHoldVenu(Year: number, Month: number, HoldDay: number) {

    const strMonth = Month < 10 ? `0${Month}` : `${Month}`
    const strDay = HoldDay < 10 ? `0${HoldDay}` : `${HoldDay}`


    const dateID = `${Year}${strMonth}${strDay}`

    const url = `https://race.netkeiba.com/top/race_list.html?kaisai_date=${dateID}`
    const axios: AxiosBase = new AxiosBase(url)
    const page = await axios.GET() as Buffer
    const pageElement = iconv.decode(page, 'eucjp')
    const HoldVenue: {
        VenueNum: number,
        VenueName: string
    }[] = []
    for (const strkey of Object.keys(ClassRace.VaneuMatch)) {
        const VenueNum = Number(strkey)
        if (pageElement.match(ClassRace.VaneuMatch[VenueNum])) {
            HoldVenue.push({
                VenueNum: VenueNum,
                VenueName: ClassRace.RaceVenue[VenueNum]
            })
        }
    }
    return HoldVenue
}