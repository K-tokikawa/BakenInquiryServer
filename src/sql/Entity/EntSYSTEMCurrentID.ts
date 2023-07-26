export default class EntSYSTEMCurrentID
{
    private m_ID        : number
    private m_IDName    : string
    private m_CurrentID : number
    private m_Remarks_number1 : number
    private m_Remarks_number2 : number
    private m_Remarks_number3 : number
    private m_Remarks_number4 : number
    private m_Remarks_number5 : number
    private m_Remarks_string1 : string
    private m_Remarks_string2 : string
    private m_Remarks_string3 : string
    private m_Remarks_string4 : string
    private m_Remarks_string5 : string
    constructor(
        ID: number,
        IDName: string,
        CurrentID: number,
        Remarks_number1: number,
        Remarks_number2: number,
        Remarks_number3: number,
        Remarks_number4: number,
        Remarks_number5: number,
        Remarks_string1: string,
        Remarks_string2: string,
        Remarks_string3: string,
        Remarks_string4: string,
        Remarks_string5: string
    )
    {
        this.m_ID        = ID
        this.m_IDName    = IDName
        this.m_CurrentID = CurrentID
        this.m_Remarks_number1 = Remarks_number1
        this.m_Remarks_number2 = Remarks_number2
        this.m_Remarks_number3 = Remarks_number3
        this.m_Remarks_number4 = Remarks_number4
        this.m_Remarks_number5 = Remarks_number5
        this.m_Remarks_string1 = Remarks_string1
        this.m_Remarks_string2 = Remarks_string2
        this.m_Remarks_string3 = Remarks_string3
        this.m_Remarks_string4 = Remarks_string4
        this.m_Remarks_string5 = Remarks_string5
    }
    public get ID              () { return this.m_ID              }
    public get IDName          () { return this.m_IDName          }
    public get CurrentID       () { return this.m_CurrentID       }
    public get Remarks_number1 () { return this.m_Remarks_number1 }
    public get Remarks_number2 () { return this.m_Remarks_number2 }
    public get Remarks_number3 () { return this.m_Remarks_number3 }
    public get Remarks_number4 () { return this.m_Remarks_number4 }
    public get Remarks_number5 () { return this.m_Remarks_number5 }
    public get Remarks_string1 () { return this.m_Remarks_string1 }
    public get Remarks_string2 () { return this.m_Remarks_string2 }
    public get Remarks_string3 () { return this.m_Remarks_string3 }
    public get Remarks_string4 () { return this.m_Remarks_string4 }
    public get Remarks_string5 () { return this.m_Remarks_string5 }

    public set ID              (value: number) { this.m_ID        = value }
    public set IDName          (value: string) { this.m_IDName    = value }
    public set CurrentID       (value: number) { this.m_CurrentID = value }
    public set Remarks_number1 (value: number) { this.m_Remarks_number1 = value }
    public set Remarks_number2 (value: number) { this.m_Remarks_number2 = value }
    public set Remarks_number3 (value: number) { this.m_Remarks_number3 = value }
    public set Remarks_number4 (value: number) { this.m_Remarks_number4 = value }
    public set Remarks_number5 (value: number) { this.m_Remarks_number5 = value }
    public set Remarks_string1 (value: string) { this.m_Remarks_string1 = value }
    public set Remarks_string2 (value: string) { this.m_Remarks_string2 = value }
    public set Remarks_string3 (value: string) { this.m_Remarks_string3 = value }
    public set Remarks_string4 (value: string) { this.m_Remarks_string4 = value }
    public set Remarks_string5 (value: string) { this.m_Remarks_string5 = value }

}