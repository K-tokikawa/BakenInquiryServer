import SQLBase from "../../class/SQLBase"
import PrmStudyData from "../param/PrmStudyData"
import EntBloodStudyData_Blood from "../Entity/EntBloodStudyData_Blood"
export default class GetHorseIDBloodStudyData_Blood extends SQLBase<EntBloodStudyData_Blood[]>
{
    private parameter: PrmStudyData | null

    constructor(prm: PrmStudyData | null) {
        super()
        this.parameter = prm
    }
    public async Execsql(): Promise<EntBloodStudyData_Blood[]> {
        const sql = `
select
        HorseID
      , FID
      , MID
      , FFID
      , FMID
      , MFID
      , MMID
      , FFFID
      , FFMID
      , FMFID
      , FMMID
      , MFFID
      , MFMID
      , MMFID
      , MMMID
      , FFFFID
      , FFFMID
      , FFFFFID
      , FFFFMID
      , FFFMFID
      , FFFMMID
      , FFFFFFID
      , FFFFFMID
      , FFFFMFID
      , FFFFMMID
      , FFFMFFID
      , FFFMFMID
      , FFFMMFID
      , FFFMMMID
      , FFMFID
      , FFMMID
      , FFMFFID
      , FFMFMID
      , FFMMFID
      , FFMMMID
      , FFMFFFID
      , FFMFFMID
      , FFMFMFID
      , FFMFMMID
      , FFMMFFID
      , FFMMFMID
      , FFMMMFID
      , FFMMMMID
      , FMFFID
      , FMFMID
      , FMFFFID
      , FMFFMID
      , FMFMFID
      , FMFMMID
      , FMFFFFID
      , FMFFFMID
      , FMFFMFID
      , FMFFMMID
      , FMFMFFID
      , FMFMFMID
      , FMFMMFID
      , FMFMMMID
      , FMMFID
      , FMMMID
      , FMMFFID
      , FMMFMID
      , FMMMFID
      , FMMMMID
      , FMMFFFID
      , FMMFFMID
      , FMMFMFID
      , FMMFMMID
      , FMMMFFID
      , FMMMFMID
      , FMMMMFID
      , FMMMMMID
      , MFFFID
      , MFFMID
      , MFFFFID
      , MFFFMID
      , MFFMFID
      , MFFMMID
      , MFFFFFID
      , MFFFFMID
      , MFFFMFID
      , MFFFMMID
      , MFFMFFID
      , MFFMFMID
      , MFFMMFID
      , MFFMMMID
      , MFMFID
      , MFMMID
      , MFMFFID
      , MFMFMID
      , MFMMFID
      , MFMMMID
      , MFMFFFID
      , MFMFFMID
      , MFMFMFID
      , MFMFMMID
      , MFMMFFID
      , MFMMFMID
      , MFMMMFID
      , MFMMMMID
      , MMFFID
      , MMFMID
      , MMFFFID
      , MMFFMID
      , MMFMFID
      , MMFMMID
      , MMFFFFID
      , MMFFFMID
      , MMFFMFID
      , MMFFMMID
      , MMFMFFID
      , MMFMFMID
      , MMFMMFID
      , MMFMMMID
      , MMMFID
      , MMMMID
      , MMMFFID
      , MMMFMID
      , MMMMFID
      , MMMMMID
      , MMMFFFID
      , MMMFFMID
      , MMMFMFID
      , MMMFMMID
      , MMMMFFID
      , MMMMFMID
      , MMMMMFID
      , MMMMMMID
      , F_ID_1 as FID1
      , F_ID_2 as FID2
      , F_ID_3 as FID3
      , F_ID_4 as FID4
      , F_ID_5 as FID5
      , F_ID_6 as FID6
      , F_ID_7 as FID7
      , F_ID_8 as FID8
      , F_ID_9 as FID9
      , F_ID_10 as FID10
      , F_ID_11 as FID11
      , F_ID_12 as FID12
      , F_ID_13 as FID13
      , F_ID_14 as FID14
      , F_ID_15 as FID15
      , F_ID_16 as FID16
      , F_ID_17 as FID17
      , F_ID_18 as FID18
      , F_ID_19 as FID19
      , F_ID_20 as FID20
      , F_ID_21 as FID21
      , F_ID_22 as FID22
      , F_ID_23 as FID23
      , F_ID_24 as FID24
      , F_ID_25 as FID25
      , F_ID_26 as FID26
      , F_ID_27 as FID27
      , F_ID_28 as FID28
      , F_ID_29 as FID29
      , F_ID_30 as FID30
      , F_ID_31 as FID31
      , F_ID_32 as FID32
      , F_ID_33 as FID33
      , F_ID_34 as FID34
      , F_ID_35 as FID35
      , F_ID_36 as FID36
      , F_ID_37 as FID37
      , F_ID_38 as FID38
      , F_ID_39 as FID39
      , F_ID_40 as FID40
      , F_ID_41 as FID41
      , F_ID_42 as FID42
      , F_ID_43 as FID43
      , F_ID_44 as FID44
      , F_ID_45 as FID45
      , F_ID_46 as FID46
      , F_ID_47 as FID47
      , F_ID_48 as FID48
      , F_ID_49 as FID49
      , F_ID_50 as FID50
      , F_ID_51 as FID51
      , F_ID_52 as FID52
      , F_ID_53 as FID53
      , F_ID_54 as FID54
      , F_ID_55 as FID55
      , F_ID_56 as FID56
      , F_ID_57 as FID57
      , F_ID_58 as FID58
      , F_ID_59 as FID59
      , F_ID_60 as FID60
      , F_ID_61 as FID61
      , F_ID_62 as FID62
      , F_ID_63 as FID63
      , F_ID_64 as FID64
      , F_ID_65 as FID65
      , F_ID_66 as FID66
      , F_ID_67 as FID67
      , F_ID_68 as FID68
      , F_ID_69 as FID69
      , F_ID_70 as FID70
      , F_ID_71 as FID71
      , F_ID_72 as FID72
      , F_ID_73 as FID73
      , F_ID_74 as FID74
      , F_ID_75 as FID75
      , F_ID_76 as FID76
      , F_ID_77 as FID77
      , F_ID_78 as FID78
      , F_ID_79 as FID79
      , F_ID_80 as FID80
      , F_ID_81 as FID81
      , F_ID_82 as FID82
      , F_ID_83 as FID83
      , F_ID_84 as FID84
      , F_ID_85 as FID85
      , F_ID_86 as FID86
      , F_ID_87 as FID87
      , M_FS_ID_1 as MFSID1
      , M_FS_ID_2 as MFSID2
      , M_FS_ID_3 as MFSID3
      , M_FS_ID_4 as MFSID4
      , M_FS_ID_5 as MFSID5
      , M_FS_ID_6 as MFSID6
      , M_FS_ID_7 as MFSID7
      , M_FS_ID_8 as MFSID8
      , M_FS_ID_9 as MFSID9
      , M_FS_ID_10 as MFSID10
      , M_FS_ID_11 as MFSID11
      , M_FS_ID_12 as MFSID12
      , M_FS_ID_13 as MFSID13
      , M_FS_ID_14 as MFSID14
      , M_FS_ID_15 as MFSID15
      , M_FS_ID_16 as MFSID16
      , M_FS_ID_17 as MFSID17
      , M_FS_ID_18 as MFSID18
      , M_FS_ID_19 as MFSID19
      , M_FS_ID_20 as MFSID20
      , M_FS_ID_21 as MFSID21
      , M_FS_ID_22 as MFSID22
      , M_FS_ID_23 as MFSID23
      , M_FS_ID_24 as MFSID24
      , M_FS_ID_25 as MFSID25
      , M_FS_ID_26 as MFSID26
      , M_FS_ID_27 as MFSID27
      , M_FS_ID_28 as MFSID28
      , M_FS_ID_29 as MFSID29
      , M_FS_ID_30 as MFSID30
      , M_FS_ID_31 as MFSID31
      , M_FS_ID_32 as MFSID32
      , M_FS_ID_33 as MFSID33
      , M_FS_ID_34 as MFSID34
      , M_FS_ID_35 as MFSID35
      , M_FS_ID_36 as MFSID36
      , M_FS_ID_37 as MFSID37
      , M_FS_ID_38 as MFSID38
      , M_FS_ID_39 as MFSID39
      , M_FS_ID_40 as MFSID40
      , M_FS_ID_41 as MFSID41
      , M_FS_ID_42 as MFSID42
      , M_FS_ID_43 as MFSID43
      , M_FS_ID_44 as MFSID44
      , M_FS_ID_45 as MFSID45
      , M_FS_ID_46 as MFSID46
      , M_FS_ID_47 as MFSID47
      , M_FS_ID_48 as MFSID48
      , M_FS_ID_49 as MFSID49
      , M_FS_ID_50 as MFSID50
      , M_FS_ID_51 as MFSID51
      , M_FS_ID_52 as MFSID52
      , M_FS_ID_53 as MFSID53
      , M_FS_ID_54 as MFSID54
      , M_FS_ID_55 as MFSID55
      , M_FS_ID_56 as MFSID56
      , M_FS_ID_57 as MFSID57
      , M_FS_ID_58 as MFSID58
      , M_FS_ID_59 as MFSID59
      , M_FS_ID_60 as MFSID60
      , M_FS_ID_61 as MFSID61
      , M_FS_ID_62 as MFSID62
      , M_FS_ID_63 as MFSID63
      , M_FS_ID_64 as MFSID64
      , M_FS_ID_65 as MFSID65
      , M_FS_ID_66 as MFSID66
      , M_FS_ID_67 as MFSID67
      , M_FS_ID_68 as MFSID68
      , M_FS_ID_69 as MFSID69
      , M_FS_ID_70 as MFSID70
      , M_FS_ID_71 as MFSID71
      , M_FS_ID_72 as MFSID72
      , M_FS_ID_73 as MFSID73
      , M_FS_ID_74 as MFSID74
      , M_FS_ID_75 as MFSID75
      , M_FS_ID_76 as MFSID76
      , M_FS_ID_77 as MFSID77
      , M_FS_ID_78 as MFSID78
      , M_FS_ID_79 as MFSID79
      , M_FS_ID_80 as MFSID80
      , M_FS_ID_81 as MFSID81
      , M_FS_ID_82 as MFSID82
      , M_FS_ID_83 as MFSID83
      , M_FS_ID_84 as MFSID84
      , M_FS_ID_85 as MFSID85
      , M_FS_ID_86 as MFSID86
      , M_FS_ID_87 as MFSID87
      , MM_FS_ID_1 as MMFSID1
      , MM_FS_ID_2 as MMFSID2
      , MM_FS_ID_3 as MMFSID3
      , MM_FS_ID_4 as MMFSID4
      , MM_FS_ID_5 as MMFSID5
      , MM_FS_ID_6 as MMFSID6
      , MM_FS_ID_7 as MMFSID7
      , MM_FS_ID_8 as MMFSID8
      , MM_FS_ID_9 as MMFSID9
      , MM_FS_ID_10 as MMFSID10
      , MM_FS_ID_11 as MMFSID11
      , MM_FS_ID_12 as MMFSID12
      , MM_FS_ID_13 as MMFSID13
      , MM_FS_ID_14 as MMFSID14
      , MM_FS_ID_15 as MMFSID15
      , MM_FS_ID_16 as MMFSID16
      , MM_FS_ID_17 as MMFSID17
      , MM_FS_ID_18 as MMFSID18
      , MM_FS_ID_19 as MMFSID19
      , MM_FS_ID_20 as MMFSID20
      , MM_FS_ID_21 as MMFSID21
      , MM_FS_ID_22 as MMFSID22
      , MM_FS_ID_23 as MMFSID23
      , MM_FS_ID_24 as MMFSID24
      , MM_FS_ID_25 as MMFSID25
      , MM_FS_ID_26 as MMFSID26
      , MM_FS_ID_27 as MMFSID27
      , MM_FS_ID_28 as MMFSID28
      , MM_FS_ID_29 as MMFSID29
      , MM_FS_ID_30 as MMFSID30
      , MM_FS_ID_31 as MMFSID31
      , MM_FS_ID_32 as MMFSID32
      , MM_FS_ID_33 as MMFSID33
      , MM_FS_ID_34 as MMFSID34
      , MM_FS_ID_35 as MMFSID35
      , MM_FS_ID_36 as MMFSID36
      , MM_FS_ID_37 as MMFSID37
      , MM_FS_ID_38 as MMFSID38
      , MM_FS_ID_39 as MMFSID39
      , MM_FS_ID_40 as MMFSID40
      , MM_FS_ID_41 as MMFSID41
      , MM_FS_ID_42 as MMFSID42
      , MM_FS_ID_43 as MMFSID43
      , MM_FS_ID_44 as MMFSID44
      , MM_FS_ID_45 as MMFSID45
      , MM_FS_ID_46 as MMFSID46
      , MM_FS_ID_47 as MMFSID47
      , MM_FS_ID_48 as MMFSID48
      , MM_FS_ID_49 as MMFSID49
      , MM_FS_ID_50 as MMFSID50
      , MM_FS_ID_51 as MMFSID51
      , MM_FS_ID_52 as MMFSID52
      , MM_FS_ID_53 as MMFSID53
      , MM_FS_ID_54 as MMFSID54
      , MM_FS_ID_55 as MMFSID55
      , MM_FS_ID_56 as MMFSID56
      , MM_FS_ID_57 as MMFSID57
      , MM_FS_ID_58 as MMFSID58
      , MM_FS_ID_59 as MMFSID59
      , MM_FS_ID_60 as MMFSID60
      , MM_FS_ID_61 as MMFSID61
      , MM_FS_ID_62 as MMFSID62
      , MM_FS_ID_63 as MMFSID63
      , MM_FS_ID_64 as MMFSID64
      , MM_FS_ID_65 as MMFSID65
      , MM_FS_ID_66 as MMFSID66
      , MM_FS_ID_67 as MMFSID67
      , MM_FS_ID_68 as MMFSID68
      , MM_FS_ID_69 as MMFSID69
      , MM_FS_ID_70 as MMFSID70
      , MM_FS_ID_71 as MMFSID71
      , MM_FS_ID_72 as MMFSID72
      , MM_FS_ID_73 as MMFSID73
      , MM_FS_ID_74 as MMFSID74
      , MM_FS_ID_75 as MMFSID75
      , MM_FS_ID_76 as MMFSID76
      , MM_FS_ID_77 as MMFSID77
      , MM_FS_ID_78 as MMFSID78
      , MM_FS_ID_79 as MMFSID79
      , MM_FS_ID_80 as MMFSID80
      , MM_FS_ID_81 as MMFSID81
      , MM_FS_ID_82 as MMFSID82
      , MM_FS_ID_83 as MMFSID83
      , MM_FS_ID_84 as MMFSID84
      , MM_FS_ID_85 as MMFSID85
      , MM_FS_ID_86 as MMFSID86
      , MM_FS_ID_87 as MMFSID87
  from (
        select
          HM.ID as HorseID
        , BD.FID
        , BD.MID
        , BD.FFID
        , BD.FMID
        , BD.MFID
        , BD.MMID
        , BD.FFFID
        , BD.FFMID
        , BD.FMFID
        , BD.FMMID
        , BD.MFFID
        , BD.MFMID
        , BD.MMFID
        , BD.MMMID
        , BD.FFFFID
        , BD.FFFMID
        , BD.FFFFFID
        , BD.FFFFMID
        , BD.FFFMFID
        , BD.FFFMMID
        , BD.FFFFFFID
        , BD.FFFFFMID
        , BD.FFFFMFID
        , BD.FFFFMMID
        , BD.FFFMFFID
        , BD.FFFMFMID
        , BD.FFFMMFID
        , BD.FFFMMMID
        , BD.FFMFID
        , BD.FFMMID
        , BD.FFMFFID
        , BD.FFMFMID
        , BD.FFMMFID
        , BD.FFMMMID
        , BD.FFMFFFID
        , BD.FFMFFMID
        , BD.FFMFMFID
        , BD.FFMFMMID
        , BD.FFMMFFID
        , BD.FFMMFMID
        , BD.FFMMMFID
        , BD.FFMMMMID
        , BD.FMFFID
        , BD.FMFMID
        , BD.FMFFFID
        , BD.FMFFMID
        , BD.FMFMFID
        , BD.FMFMMID
        , BD.FMFFFFID
        , BD.FMFFFMID
        , BD.FMFFMFID
        , BD.FMFFMMID
        , BD.FMFMFFID
        , BD.FMFMFMID
        , BD.FMFMMFID
        , BD.FMFMMMID
        , BD.FMMFID
        , BD.FMMMID
        , BD.FMMFFID
        , BD.FMMFMID
        , BD.FMMMFID
        , BD.FMMMMID
        , BD.FMMFFFID
        , BD.FMMFFMID
        , BD.FMMFMFID
        , BD.FMMFMMID
        , BD.FMMMFFID
        , BD.FMMMFMID
        , BD.FMMMMFID
        , BD.FMMMMMID
        , BD.MFFFID
        , BD.MFFMID
        , BD.MFFFFID
        , BD.MFFFMID
        , BD.MFFMFID
        , BD.MFFMMID
        , BD.MFFFFFID
        , BD.MFFFFMID
        , BD.MFFFMFID
        , BD.MFFFMMID
        , BD.MFFMFFID
        , BD.MFFMFMID
        , BD.MFFMMFID
        , BD.MFFMMMID
        , BD.MFMFID
        , BD.MFMMID
        , BD.MFMFFID
        , BD.MFMFMID
        , BD.MFMMFID
        , BD.MFMMMID
        , BD.MFMFFFID
        , BD.MFMFFMID
        , BD.MFMFMFID
        , BD.MFMFMMID
        , BD.MFMMFFID
        , BD.MFMMFMID
        , BD.MFMMMFID
        , BD.MFMMMMID
        , BD.MMFFID
        , BD.MMFMID
        , BD.MMFFFID
        , BD.MMFFMID
        , BD.MMFMFID
        , BD.MMFMMID
        , BD.MMFFFFID
        , BD.MMFFFMID
        , BD.MMFFMFID
        , BD.MMFFMMID
        , BD.MMFMFFID
        , BD.MMFMFMID
        , BD.MMFMMFID
        , BD.MMFMMMID
        , BD.MMMFID
        , BD.MMMMID
        , BD.MMMFFID
        , BD.MMMFMID
        , BD.MMMMFID
        , BD.MMMMMID
        , BD.MMMFFFID
        , BD.MMMFFMID
        , BD.MMMFMFID
        , BD.MMMFMMID
        , BD.MMMMFFID
        , BD.MMMMFMID
        , BD.MMMMMFID
        , BD.MMMMMMID
        , FS.ID_1 as F_ID_1
        , FS.ID_2 as F_ID_2
        , FS.ID_3 as F_ID_3
        , FS.ID_4 as F_ID_4
        , FS.ID_5 as F_ID_5
        , FS.ID_6 as F_ID_6
        , FS.ID_7 as F_ID_7
        , FS.ID_8 as F_ID_8
        , FS.ID_9 as F_ID_9
        , FS.ID_10 as F_ID_10
        , FS.ID_11 as F_ID_11
        , FS.ID_12 as F_ID_12
        , FS.ID_13 as F_ID_13
        , FS.ID_14 as F_ID_14
        , FS.ID_15 as F_ID_15
        , FS.ID_16 as F_ID_16
        , FS.ID_17 as F_ID_17
        , FS.ID_18 as F_ID_18
        , FS.ID_19 as F_ID_19
        , FS.ID_20 as F_ID_20
        , FS.ID_21 as F_ID_21
        , FS.ID_22 as F_ID_22
        , FS.ID_23 as F_ID_23
        , FS.ID_24 as F_ID_24
        , FS.ID_25 as F_ID_25
        , FS.ID_26 as F_ID_26
        , FS.ID_27 as F_ID_27
        , FS.ID_28 as F_ID_28
        , FS.ID_29 as F_ID_29
        , FS.ID_30 as F_ID_30
        , FS.ID_31 as F_ID_31
        , FS.ID_32 as F_ID_32
        , FS.ID_33 as F_ID_33
        , FS.ID_34 as F_ID_34
        , FS.ID_35 as F_ID_35
        , FS.ID_36 as F_ID_36
        , FS.ID_37 as F_ID_37
        , FS.ID_38 as F_ID_38
        , FS.ID_39 as F_ID_39
        , FS.ID_40 as F_ID_40
        , FS.ID_41 as F_ID_41
        , FS.ID_42 as F_ID_42
        , FS.ID_43 as F_ID_43
        , FS.ID_44 as F_ID_44
        , FS.ID_45 as F_ID_45
        , FS.ID_46 as F_ID_46
        , FS.ID_47 as F_ID_47
        , FS.ID_48 as F_ID_48
        , FS.ID_49 as F_ID_49
        , FS.ID_50 as F_ID_50
        , FS.ID_51 as F_ID_51
        , FS.ID_52 as F_ID_52
        , FS.ID_53 as F_ID_53
        , FS.ID_54 as F_ID_54
        , FS.ID_55 as F_ID_55
        , FS.ID_56 as F_ID_56
        , FS.ID_57 as F_ID_57
        , FS.ID_58 as F_ID_58
        , FS.ID_59 as F_ID_59
        , FS.ID_60 as F_ID_60
        , FS.ID_61 as F_ID_61
        , FS.ID_62 as F_ID_62
        , FS.ID_63 as F_ID_63
        , FS.ID_64 as F_ID_64
        , FS.ID_65 as F_ID_65
        , FS.ID_66 as F_ID_66
        , FS.ID_67 as F_ID_67
        , FS.ID_68 as F_ID_68
        , FS.ID_69 as F_ID_69
        , FS.ID_70 as F_ID_70
        , FS.ID_71 as F_ID_71
        , FS.ID_72 as F_ID_72
        , FS.ID_73 as F_ID_73
        , FS.ID_74 as F_ID_74
        , FS.ID_75 as F_ID_75
        , FS.ID_76 as F_ID_76
        , FS.ID_77 as F_ID_77
        , FS.ID_78 as F_ID_78
        , FS.ID_79 as F_ID_79
        , FS.ID_80 as F_ID_80
        , FS.ID_81 as F_ID_81
        , FS.ID_82 as F_ID_82
        , FS.ID_83 as F_ID_83
        , FS.ID_84 as F_ID_84
        , FS.ID_85 as F_ID_85
        , FS.ID_86 as F_ID_86
        , FS.ID_87 as F_ID_87
        , M_FS.ID_1 as M_FS_ID_1
        , M_FS.ID_2 as M_FS_ID_2
        , M_FS.ID_3 as M_FS_ID_3
        , M_FS.ID_4 as M_FS_ID_4
        , M_FS.ID_5 as M_FS_ID_5
        , M_FS.ID_6 as M_FS_ID_6
        , M_FS.ID_7 as M_FS_ID_7
        , M_FS.ID_8 as M_FS_ID_8
        , M_FS.ID_9 as M_FS_ID_9
        , M_FS.ID_10 as M_FS_ID_10
        , M_FS.ID_11 as M_FS_ID_11
        , M_FS.ID_12 as M_FS_ID_12
        , M_FS.ID_13 as M_FS_ID_13
        , M_FS.ID_14 as M_FS_ID_14
        , M_FS.ID_15 as M_FS_ID_15
        , M_FS.ID_16 as M_FS_ID_16
        , M_FS.ID_17 as M_FS_ID_17
        , M_FS.ID_18 as M_FS_ID_18
        , M_FS.ID_19 as M_FS_ID_19
        , M_FS.ID_20 as M_FS_ID_20
        , M_FS.ID_21 as M_FS_ID_21
        , M_FS.ID_22 as M_FS_ID_22
        , M_FS.ID_23 as M_FS_ID_23
        , M_FS.ID_24 as M_FS_ID_24
        , M_FS.ID_25 as M_FS_ID_25
        , M_FS.ID_26 as M_FS_ID_26
        , M_FS.ID_27 as M_FS_ID_27
        , M_FS.ID_28 as M_FS_ID_28
        , M_FS.ID_29 as M_FS_ID_29
        , M_FS.ID_30 as M_FS_ID_30
        , M_FS.ID_31 as M_FS_ID_31
        , M_FS.ID_32 as M_FS_ID_32
        , M_FS.ID_33 as M_FS_ID_33
        , M_FS.ID_34 as M_FS_ID_34
        , M_FS.ID_35 as M_FS_ID_35
        , M_FS.ID_36 as M_FS_ID_36
        , M_FS.ID_37 as M_FS_ID_37
        , M_FS.ID_38 as M_FS_ID_38
        , M_FS.ID_39 as M_FS_ID_39
        , M_FS.ID_40 as M_FS_ID_40
        , M_FS.ID_41 as M_FS_ID_41
        , M_FS.ID_42 as M_FS_ID_42
        , M_FS.ID_43 as M_FS_ID_43
        , M_FS.ID_44 as M_FS_ID_44
        , M_FS.ID_45 as M_FS_ID_45
        , M_FS.ID_46 as M_FS_ID_46
        , M_FS.ID_47 as M_FS_ID_47
        , M_FS.ID_48 as M_FS_ID_48
        , M_FS.ID_49 as M_FS_ID_49
        , M_FS.ID_50 as M_FS_ID_50
        , M_FS.ID_51 as M_FS_ID_51
        , M_FS.ID_52 as M_FS_ID_52
        , M_FS.ID_53 as M_FS_ID_53
        , M_FS.ID_54 as M_FS_ID_54
        , M_FS.ID_55 as M_FS_ID_55
        , M_FS.ID_56 as M_FS_ID_56
        , M_FS.ID_57 as M_FS_ID_57
        , M_FS.ID_58 as M_FS_ID_58
        , M_FS.ID_59 as M_FS_ID_59
        , M_FS.ID_60 as M_FS_ID_60
        , M_FS.ID_61 as M_FS_ID_61
        , M_FS.ID_62 as M_FS_ID_62
        , M_FS.ID_63 as M_FS_ID_63
        , M_FS.ID_64 as M_FS_ID_64
        , M_FS.ID_65 as M_FS_ID_65
        , M_FS.ID_66 as M_FS_ID_66
        , M_FS.ID_67 as M_FS_ID_67
        , M_FS.ID_68 as M_FS_ID_68
        , M_FS.ID_69 as M_FS_ID_69
        , M_FS.ID_70 as M_FS_ID_70
        , M_FS.ID_71 as M_FS_ID_71
        , M_FS.ID_72 as M_FS_ID_72
        , M_FS.ID_73 as M_FS_ID_73
        , M_FS.ID_74 as M_FS_ID_74
        , M_FS.ID_75 as M_FS_ID_75
        , M_FS.ID_76 as M_FS_ID_76
        , M_FS.ID_77 as M_FS_ID_77
        , M_FS.ID_78 as M_FS_ID_78
        , M_FS.ID_79 as M_FS_ID_79
        , M_FS.ID_80 as M_FS_ID_80
        , M_FS.ID_81 as M_FS_ID_81
        , M_FS.ID_82 as M_FS_ID_82
        , M_FS.ID_83 as M_FS_ID_83
        , M_FS.ID_84 as M_FS_ID_84
        , M_FS.ID_85 as M_FS_ID_85
        , M_FS.ID_86 as M_FS_ID_86
        , M_FS.ID_87 as M_FS_ID_87
        , MM_FS.ID_1 as MM_FS_ID_1
        , MM_FS.ID_2 as MM_FS_ID_2
        , MM_FS.ID_3 as MM_FS_ID_3
        , MM_FS.ID_4 as MM_FS_ID_4
        , MM_FS.ID_5 as MM_FS_ID_5
        , MM_FS.ID_6 as MM_FS_ID_6
        , MM_FS.ID_7 as MM_FS_ID_7
        , MM_FS.ID_8 as MM_FS_ID_8
        , MM_FS.ID_9 as MM_FS_ID_9
        , MM_FS.ID_10 as MM_FS_ID_10
        , MM_FS.ID_11 as MM_FS_ID_11
        , MM_FS.ID_12 as MM_FS_ID_12
        , MM_FS.ID_13 as MM_FS_ID_13
        , MM_FS.ID_14 as MM_FS_ID_14
        , MM_FS.ID_15 as MM_FS_ID_15
        , MM_FS.ID_16 as MM_FS_ID_16
        , MM_FS.ID_17 as MM_FS_ID_17
        , MM_FS.ID_18 as MM_FS_ID_18
        , MM_FS.ID_19 as MM_FS_ID_19
        , MM_FS.ID_20 as MM_FS_ID_20
        , MM_FS.ID_21 as MM_FS_ID_21
        , MM_FS.ID_22 as MM_FS_ID_22
        , MM_FS.ID_23 as MM_FS_ID_23
        , MM_FS.ID_24 as MM_FS_ID_24
        , MM_FS.ID_25 as MM_FS_ID_25
        , MM_FS.ID_26 as MM_FS_ID_26
        , MM_FS.ID_27 as MM_FS_ID_27
        , MM_FS.ID_28 as MM_FS_ID_28
        , MM_FS.ID_29 as MM_FS_ID_29
        , MM_FS.ID_30 as MM_FS_ID_30
        , MM_FS.ID_31 as MM_FS_ID_31
        , MM_FS.ID_32 as MM_FS_ID_32
        , MM_FS.ID_33 as MM_FS_ID_33
        , MM_FS.ID_34 as MM_FS_ID_34
        , MM_FS.ID_35 as MM_FS_ID_35
        , MM_FS.ID_36 as MM_FS_ID_36
        , MM_FS.ID_37 as MM_FS_ID_37
        , MM_FS.ID_38 as MM_FS_ID_38
        , MM_FS.ID_39 as MM_FS_ID_39
        , MM_FS.ID_40 as MM_FS_ID_40
        , MM_FS.ID_41 as MM_FS_ID_41
        , MM_FS.ID_42 as MM_FS_ID_42
        , MM_FS.ID_43 as MM_FS_ID_43
        , MM_FS.ID_44 as MM_FS_ID_44
        , MM_FS.ID_45 as MM_FS_ID_45
        , MM_FS.ID_46 as MM_FS_ID_46
        , MM_FS.ID_47 as MM_FS_ID_47
        , MM_FS.ID_48 as MM_FS_ID_48
        , MM_FS.ID_49 as MM_FS_ID_49
        , MM_FS.ID_50 as MM_FS_ID_50
        , MM_FS.ID_51 as MM_FS_ID_51
        , MM_FS.ID_52 as MM_FS_ID_52
        , MM_FS.ID_53 as MM_FS_ID_53
        , MM_FS.ID_54 as MM_FS_ID_54
        , MM_FS.ID_55 as MM_FS_ID_55
        , MM_FS.ID_56 as MM_FS_ID_56
        , MM_FS.ID_57 as MM_FS_ID_57
        , MM_FS.ID_58 as MM_FS_ID_58
        , MM_FS.ID_59 as MM_FS_ID_59
        , MM_FS.ID_60 as MM_FS_ID_60
        , MM_FS.ID_61 as MM_FS_ID_61
        , MM_FS.ID_62 as MM_FS_ID_62
        , MM_FS.ID_63 as MM_FS_ID_63
        , MM_FS.ID_64 as MM_FS_ID_64
        , MM_FS.ID_65 as MM_FS_ID_65
        , MM_FS.ID_66 as MM_FS_ID_66
        , MM_FS.ID_67 as MM_FS_ID_67
        , MM_FS.ID_68 as MM_FS_ID_68
        , MM_FS.ID_69 as MM_FS_ID_69
        , MM_FS.ID_70 as MM_FS_ID_70
        , MM_FS.ID_71 as MM_FS_ID_71
        , MM_FS.ID_72 as MM_FS_ID_72
        , MM_FS.ID_73 as MM_FS_ID_73
        , MM_FS.ID_74 as MM_FS_ID_74
        , MM_FS.ID_75 as MM_FS_ID_75
        , MM_FS.ID_76 as MM_FS_ID_76
        , MM_FS.ID_77 as MM_FS_ID_77
        , MM_FS.ID_78 as MM_FS_ID_78
        , MM_FS.ID_79 as MM_FS_ID_79
        , MM_FS.ID_80 as MM_FS_ID_80
        , MM_FS.ID_81 as MM_FS_ID_81
        , MM_FS.ID_82 as MM_FS_ID_82
        , MM_FS.ID_83 as MM_FS_ID_83
        , MM_FS.ID_84 as MM_FS_ID_84
        , MM_FS.ID_85 as MM_FS_ID_85
        , MM_FS.ID_86 as MM_FS_ID_86
        , MM_FS.ID_87 as MM_FS_ID_87
        from HorseMaster as HM
            left outer join BloodTable as BD
                on BD.ID = HM.ID
            -- 父
            left outer join HorseMaster as Father
                on Father.netkeibaID = HM.Father
            left join FatherScore as FS
                on FS.HorseID = Father.ID
            -- 母父
            left outer join HorseMaster as Mother
                on Mother.netkeibaID = HM.Mother
            left outer join HorseMaster as M_Father
                on M_Father.netkeibaID = Mother.Father
            left join FatherScore as M_FS
                on M_FS.HorseID = M_Father.ID
            -- 母母父
            left outer join HorseMaster as M_Mother
                on M_Mother.netkeibaID = Mother.Mother
            left outer join HorseMaster as MM_Father
                on MM_Father.netkeibaID = M_Mother.Father
            left join FatherScore as MM_FS
                on MM_FS.HorseID = MM_Father.ID
        where
            HM.ID in (${this.parameter?.IDs})
  ) as BD
`
        return await this.ExecGet(sql)
    }
}