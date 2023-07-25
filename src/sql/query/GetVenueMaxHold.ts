import SQLBase from "../../class/SQLBase" 
import EntVenueMaxHold from "../Entity/EntVenueMaxHold"
export default class GetVenueMaxHold extends SQLBase<EntVenueMaxHold[]>
{
    private year: number
    private venue: number
    constructor(Year: number, Venue: number) {
        super()
        this.year = Year
        this.venue = Venue
    }
    public async Execsql(): Promise<EntVenueMaxHold[]> {
        const sql = `
select
    max(Hold) as Hold
from RaceInfomation as RI
where
    RI.Venue = ${this.venue}
    and RI.Year = ${this.year}`
        return await this.ExecGet(sql)
    }
}
