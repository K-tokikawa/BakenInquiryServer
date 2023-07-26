export default class PrmRaceInfo
{
    private m_ID              : number
    private m_RaceID          : string
    private m_Venue           : string
    private m_Year            : number
    private m_Hold            : number
    private m_Day             : number
    private m_Round           : number
    private m_Range           : number
    private m_Direction       : number | null
    private m_Ground          : number
    private m_Weather         : number
    private m_GroundCondition : number
    private m_HoldMonth       : number
    private m_HoldDay         : number
    constructor(
        ID              : number,
        RaceID          : string,
        Venue           : string,
        Year            : number,
        Hold            : number,
        Day             : number,
        Round           : number,
        Range           : number,
        Direction       : number | null,
        Ground          : number,
        Weather         : number,
        GroundCondition : number,
        HoldMonth       : number,
        HoldDay         : number
    )
    {
        this.m_ID              = ID
        this.m_RaceID          = RaceID
        this.m_Venue           = Venue
        this.m_Year            = Year
        this.m_Hold            = Hold
        this.m_Day             = Day
        this.m_Round           = Round
        this.m_Range           = Range
        this.m_Direction       = Direction
        this.m_Ground          = Ground
        this.m_Weather         = Weather
        this.m_GroundCondition = GroundCondition
        this.m_HoldMonth       = HoldMonth
        this.m_HoldDay         = HoldDay
    }

    public get ID              () { return this.m_ID              }
    public get RaceID          () { return this.m_RaceID          }
    public get Venue           () { return this.m_Venue           }
    public get Year            () { return this.m_Year            }
    public get Hold            () { return this.m_Hold            }
    public get Day             () { return this.m_Day             }
    public get Round           () { return this.m_Round           }
    public get Range           () { return this.m_Range           }
    public get Direction       () { return this.m_Direction       }
    public get Ground          () { return this.m_Ground          }
    public get Weather         () { return this.m_Weather         }
    public get GroundCondition () { return this.m_GroundCondition }
    public get HoldMonth       () { return this.m_HoldMonth       }
    public get HoldDay         () { return this.m_HoldDay         }
}