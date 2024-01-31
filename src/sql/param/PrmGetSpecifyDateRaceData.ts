export default class PrmGetSpecifyDateRaceData {
    private m_startDate: Date | null
    private m_finishDate: Date | null
    constructor(startDate: Date | null = null, finishDate: Date | null = null) {
        this.m_startDate = startDate
        this.m_finishDate = finishDate
    }

    public get startDate() { return this.m_startDate}
    public get finishDate() { return this.m_finishDate}
}