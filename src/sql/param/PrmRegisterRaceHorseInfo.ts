import BigNumber from "bignumber.js"

export default class PrmRegisterRaceHorseInfo
{
    private m_ID             : number
    private m_RaceID         :number
    private m_netkeibaRaceID : string
    private m_Rank           : number | null
    private m_Remarks        : number | null
    private m_HorseID        : number
    private m_netkeibaID     : string
    private m_GateNo         : number
    private m_HorseNo        : number
    private m_HorseAge       : number
    private m_HorseGender    : number
    private m_Weight         : number
    private m_JockeyID       : string
    private m_GoalTime       : number | null
    private m_Passage1       : number | null
    private m_Passage2       : number | null
    private m_Passage3       : number | null
    private m_Passage4       : number | null
    private m_SpurtTime      : BigNumber | null
    private m_Popularity     : number | null
    private m_HorseWeight    : number | null
    private m_Fluctuation    : string
    private m_Barn           : number
    private m_TrainerID      : string
    private m_RaceRemarks    : number | null

    constructor(
        ID: number,
        RaceID : number,
        netkeibaRaceID : string,
        Rank           : number | null,
        Remarks        : number | null,
        HorseID        : number,
        netkeibaID     : string,
        GateNo         : number,
        HorseNo        : number,
        HorseAge       : number,
        HorseGender    : number,
        Weight         : number,
        JockeyID       : string,
        GoalTime       : number | null,
        Passage1       : number | null,
        Passage2       : number | null,
        Passage3       : number | null,
        Passage4       : number | null,
        SpurtTime      : BigNumber | null,
        Popularity     : number | null,
        HorseWeight    : number | null,
        Fluctuation    : string,
        Barn           : number,
        TrainerID      : string,
        RaceRemarks    : number | null
    )
    {
        this.m_ID             = ID
        this.m_RaceID         = RaceID
        this.m_netkeibaRaceID = netkeibaRaceID
        this.m_Rank           = Rank
        this.m_Remarks        = Remarks
        this.m_HorseID        = HorseID
        this.m_netkeibaID     = netkeibaID
        this.m_GateNo         = GateNo
        this.m_HorseNo        = HorseNo
        this.m_HorseAge       = HorseAge
        this.m_HorseGender    = HorseGender
        this.m_Weight         = Weight
        this.m_JockeyID       = JockeyID
        this.m_GoalTime       = GoalTime
        this.m_Passage1       = Passage1
        this.m_Passage2       = Passage2
        this.m_Passage3       = Passage3
        this.m_Passage4       = Passage4
        this.m_SpurtTime      = SpurtTime
        this.m_Popularity     = Popularity
        this.m_HorseWeight    = HorseWeight
        this.m_Fluctuation    = Fluctuation
        this.m_Barn           = Barn
        this.m_TrainerID      = TrainerID
        this.m_RaceRemarks    = RaceRemarks
    }
    public get ID             () { return this.m_ID             }
    public get RaceID         () { return this.m_RaceID         }
    public get netkeibaRaceID () { return this.m_netkeibaRaceID }
    public get Rank           () { return this.m_Rank           }
    public get Remarks        () { return this.m_Remarks        }
    public get HorseID        () { return this.m_HorseID        }
    public get netkeibaID     () { return this.m_netkeibaID     }
    public get GateNo         () { return this.m_GateNo         }
    public get HorseNo        () { return this.m_HorseNo        }
    public get HorseAge       () { return this.m_HorseAge       }
    public get HorseGender    () { return this.m_HorseGender    }
    public get Weight         () { return this.m_Weight         }
    public get JockeyID       () { return this.m_JockeyID       }
    public get GoalTime       () { return this.m_GoalTime       }
    public get Passage1       () { return this.m_Passage1       }
    public get Passage2       () { return this.m_Passage2       }
    public get Passage3       () { return this.m_Passage3       }
    public get Passage4       () { return this.m_Passage4       }
    public get SpurtTime      () { return this.m_SpurtTime      }
    public get Popularity     () { return this.m_Popularity     }
    public get HorseWeight    () { return this.m_HorseWeight    }
    public get Fluctuation    () { return this.m_Fluctuation    }
    public get Barn           () { return this.m_Barn           }
    public get TrainerID      () { return this.m_TrainerID      }
    public get RaceRemarks    () { return this.m_RaceRemarks    }
}