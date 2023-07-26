export default class PrmGetSYSTEMCurrentID
{
    private m_ID: number | null
    constructor(
        ID: number | null,
    )
    {
        this.m_ID = ID
    }
    public get ID() { return this.m_ID}
}