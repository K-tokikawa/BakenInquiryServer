export default class PrmStudyData {
    private m_IDs: number[] | null
    constructor(IDs: number[]) {
        this.m_IDs = IDs
    }

    public get IDs() { return this.m_IDs}
}