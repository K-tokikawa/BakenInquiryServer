import ClassRaceData from "./ClassRaceHorseData"

export default class ClassPassageData{
    private m_represent: ClassRaceData
    private m_Passage1: number
    private m_Passage2: number
    private m_Passage3: number
    private m_Passage4: number
    private m_AveragePassage1: number
    private m_AveragePassage2: number
    private m_AveragePassage3: number
    private m_AveragePassage4: number
    private m_CountPassage1: number
    private m_CountPassage2: number
    private m_CountPassage3: number
    private m_CountPassage4: number

    constructor(data: ClassRaceData){
        this.m_represent = data
        this.m_Passage1 = 0
        this.m_Passage2 = 0
        this.m_Passage3 = 0
        this.m_Passage4 = 0
        this.m_AveragePassage1 = 0
        this.m_AveragePassage2 = 0
        this.m_AveragePassage3 = 0
        this.m_AveragePassage4 = 0
        this.m_CountPassage1 = 0
        this.m_CountPassage2 = 0
        this.m_CountPassage3 = 0
        this.m_CountPassage4 = 0
    }
    public addPassage1(value: number|null) {
        this.m_Passage1 += (value == null ? 0 : value)
        this.m_CountPassage1 += (value == null ? 0 : 1)
        if (this.m_CountPassage1 != 0){
            this.m_AveragePassage1 = this.m_Passage1 / this.m_CountPassage1 | 0
        }
    }
    public addPassage2(value: number|null) {
        this.m_Passage2 += (value == null ? 0 : value)
        this.m_CountPassage2 += (value == null ? 0 : 1)
        if (this.m_CountPassage2 != 0){
            this.m_AveragePassage2 = this.m_Passage2 / this.m_CountPassage2 | 0
        }
    }
    public addPassage3(value: number|null) {
        this.m_Passage3 += (value == null ? 0 : value)
        this.m_CountPassage3 += (value == null ? 0 : 1)
        if (this.m_CountPassage3 != 0){ 
            this.m_AveragePassage3 = this.m_Passage3 / this.m_CountPassage3 | 0
        }
    }
    public addPassage4(value: number|null) {
        this.m_Passage4 += (value == null ? 0 : value)
        this.m_CountPassage4 += (value == null ? 0 : 1)
        if (this.m_CountPassage4 != 0){
            this.m_AveragePassage4 = this.m_Passage4 / this.m_CountPassage4 | 0
        }
    }
    public get represent() { return this.m_represent}
    public get AveragePassage1() { return this.m_AveragePassage1 }
    public get AveragePassage2() { return this.m_AveragePassage2 }
    public get AveragePassage3() { return this.m_AveragePassage3 }
    public get AveragePassage4() { return this.m_AveragePassage4 }
}