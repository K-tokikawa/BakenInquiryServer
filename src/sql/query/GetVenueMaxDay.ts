import SQLBase from "../../class/SQLBase" 
import EntVenueMaxDay from "../Entity/EntVenueMaxDay"
export default class GetVenueMaxDay extends SQLBase<EntVenueMaxDay[]>
{
    private year: number
    private venue: number
    private hold: number
    constructor(Year: number, Venue: number, Hold: number) {
        super()
        this.year = Year
        this.venue = Venue
        this.hold = Hold
    }
    public async Execsql(): Promise<EntVenueMaxDay[]> {
        const sql = `
select
    max(Day) as Day
from RaceInfomation as RI
where
    RI.Venue = ${this.venue}
    and RI.Year = ${this.year}
    and RI.Hold = ${this.hold}`
        return await this.ExecGet(sql)
    }
}
