export default class PrmStudyData {
    private m_IDs: number[] | null
    private m_param1: number | null
    private m_param2: number | null
    private m_param3: number | null
    private m_param4: number | number[] | null
    constructor(IDs: number[], param1: number | null = null, param2: number | null = null, param3: number | null = null, param4: number | number[] | null = null) {
        this.m_IDs = IDs
        this.m_param1 = param1
        this.m_param2 = param2
        this.m_param3 = param3
        this.m_param4 = param4
    }

    public get IDs() { return this.m_IDs}
    public get param1() { return this.m_param1}
    public get param2() { return this.m_param2}
    public get param3() { return this.m_param3}
    public get param4() { return this.m_param4}
}