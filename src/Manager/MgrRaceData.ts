import ClassPassageData from "../class/ClassPassageData"
import ClassRaceHorseData from "../class/ClassRaceHorseData"
import EntRaceHorseStudyData from "../sql/Entity/EntRaceHorseStudyData"
import ClassAchievementData from "../class/ClassAchievementData"
import ClassHorseData from "../class/ClassHorseData"
import simpleProgress from "../process/ProgressBar"
import PrmStudyData from "../sql/param/PrmStudyData"
import GetRaceHorseStudyData from "../sql/query/GetRaceHorseStudyData"
import DeletePredictRecord from "../sql/query/DeletePredictRecord"
import BulkInsert from "../sql/query/BulkInsert"
import FileUtil from "../FileUtil"

export default class MgrRaceData{
    private m_RaceData: EntRaceHorseStudyData[]
    private m_PredictRaceID: number[]
    private m_dic: {
        [HorseID: number]: {
            data: ClassHorseData
        }
    }
    private m_insertDic: {
        strAchievement: string[],
        data: string[],
        strPassage: string[]
    }

    constructor(RaceData: EntRaceHorseStudyData[], PredictRaceID: number[]) {
        this.m_RaceData = RaceData
        this.m_PredictRaceID = PredictRaceID
        this.m_dic = {}
        this.m_insertDic = {strAchievement: [], data: [], strPassage: []}
    }

    public get dic(){return this.m_dic}
    public get insertDic() { return this.m_insertDic }

    async addStudyData(RaceData: EntRaceHorseStudyData[]){
        const newdata = this.m_RaceData.concat(RaceData)
        this.m_RaceData = newdata
    }

    async dicCreate(){
        const dic = this.m_dic
        console.log('start')
        const ProgressBar = simpleProgress()
        const progress = ProgressBar(this.m_RaceData.length, 20, 'Blood_Jockey')
        for(const row of this.m_RaceData) {
            progress(1)
            const data = new ClassRaceHorseData(
                row,
                0
            )
            const Rank = row.Rank
            const RaceID = row.RaceID
            const HorseID = row.HorseID
            const num = row.num
            const HorseNo = row.HorseNo
            const dicHorse = dic[HorseID]
            if (dicHorse == undefined) {
                dic[HorseID] = {data: new ClassHorseData()}
            }
            const horseData = dic[HorseID].data
            const PassageData = new ClassPassageData(data)
            const AchievementData = new ClassAchievementData(data)
            horseData.setRaceIDnumPairs(RaceID, num, HorseNo)
            horseData.setHorseData(num, PassageData, AchievementData, [], RaceID, Rank)
            horseData.HorseData[num].RotationData.push(data)

            if (num - 1 > 0) {
                horseData.HorseData[num - 1].RotationData.push(data)
            }
            if (num - 2 > 0) {
                horseData.HorseData[num - 2].RotationData.push(data)
            }
            if (num - 3 > 0) {
                horseData.HorseData[num - 3].RotationData.push(data)
            }
            if (num - 4 > 0) {
                horseData.HorseData[num - 4].RotationData.push(data)
            }
            if (num - 5 > 0) {
                horseData.HorseData[num - 5].RotationData.push(data)
            }
        }
        const predictprogress = ProgressBar(Object.keys(dic).length, 20, 'predict')
        let HorseIDs: number[] = []
        for (const keyHorseID of Object.keys(dic)){
            predictprogress(1)
            const HorseID = Number(keyHorseID)
            HorseIDs.push(HorseID)
            if (HorseIDs.length % 5 == 0){
                await Promise.all([
                    this.CreateRacePredict(HorseIDs[0]),
                    this.CreateRacePredict(HorseIDs[1]),
                    this.CreateRacePredict(HorseIDs[2]),
                    this.CreateRacePredict(HorseIDs[3]),
                    this.CreateRacePredict(HorseIDs[4]),
                ])
                HorseIDs = [] // 再度初期化
            }
        }
        // あまり
        for (const id of HorseIDs) {
            await this.CreateRacePredict(id)
        }
    }

    async CreateRacePredict(HorseID: number){
        const dic = this.m_dic
        const horseData = dic[HorseID].data
        const entitys: {[num: number]: {PassageData: ClassPassageData, AchievementData: ClassAchievementData, RotationData: ClassRaceHorseData[], RaceID: number, Rank: number}} = horseData.HorseData
        for (const keynum of Object.keys(entitys)){
            const num = Number(keynum)
            const Passageentity = entitys[num].PassageData
            const Achievemententity = entitys[num].AchievementData
            const RaceHorseData = entitys[num].RotationData
            const RaceID = entitys[num].RaceID
            // Rotation
            let data = ''
            if (RaceHorseData.length > 0) {
                for (const value of RaceHorseData){
                    if (data == ''){
                        data += `${HorseID},${RaceID}`
                    } else {
                        data += `,${value.GoalTime}`.replace('null', '')
                        data += `,${value.Venue},${value.HoldMonth},${value.Hold},${value.Day},${value.Range},${value.Ground},${value.GroundCondition},${value.Weather},${value.Weight},${value.TrainerID},${value.HorseGender},${value.HorseWeight},${value.HorseNo},${value.HorseAge},${value.Remarks},${value.RaceRemarks},${value.Fluctuation},${`${value.SpurtTime}`.replace('null', '')},${value.JockeyID != value.JockeyID ? 0 : value.JockeyID},${value.interval}`
                    }
                }
                const empty = ',,,,,,,,,,,,,,,,,,,,,'
                if (RaceHorseData.length == 1){
                    data = data + empty + empty + empty + empty + empty
                }
                if (RaceHorseData.length == 2){
                    data = data + empty + empty + empty + empty
                }
                if (RaceHorseData.length == 3){
                    data = data + empty + empty + empty
                }
                if (RaceHorseData.length == 4){
                    data = data + empty + empty
                }
                if (RaceHorseData.length == 5){
                    data = data + empty
                }
            }

            // aptitude
            let strPassage = `${HorseID},${RaceID}`
            for (const row of this.m_RaceData) {
                // Passage
                if (row.HorseID == HorseID) {
                    // 予測したいレースより前の日付の情報を保持していく
                    if (row.HoldDay.getTime() < Passageentity.represent.HoldDay.getTime()){
                        Passageentity.addPassage1(row.Passage1)
                        Passageentity.addPassage2(row.Passage2)
                        Passageentity.addPassage3(row.Passage3)
                        Passageentity.addPassage4(row.Passage4)
                    }
                }

                if (row.HorseID == HorseID) {
                    // 予測したいレースより前の日付の情報を保持していく
                    if (row.HoldDay.getTime() < Achievemententity.represent.HoldDay.getTime()){
                        const before = row.before == null ? 0 :(row.HoldDay.getTime() - Achievemententity.represent.HoldDay.getTime()) / 86400000
                        const data = new ClassRaceHorseData(
                            row,
                            before
                        )
                        const AchievementData = Achievemententity.getIDAchievementData(data.ID)
                        if (AchievementData == null) {
                            Achievemententity.updateAchievement(data)
                        } else if(AchievementData.GoalTime > data.GoalTime) {
                            Achievemententity.updateAchievement(data)
                        } else {
                            // なにもなし
                        }
                    }
                }
            }
            strPassage += `,${Passageentity.AveragePassage1},${Passageentity.AveragePassage2},${Passageentity.AveragePassage3},${Passageentity.AveragePassage4}`

            // Acievement
            const achievements = entitys[num].AchievementData.achievements
            let strAchievement = `${HorseID},${RaceID}`
            for (const key of Object.keys(achievements)){
                const id = Number(key)
                const achievement = achievements[id]
                if (achievement == null || achievement.GoalTime == null) {
                    const empty = `,,,`
                    strAchievement += empty
                } else {
                    strAchievement += `,${achievement.GoalTime},${achievement.Weight},${achievement.before}`
                }
            }
            this.m_insertDic.strAchievement.push(strAchievement)
            this.m_insertDic.data.push(data)
            this.m_insertDic.strPassage.push(strPassage)
        }
    }

    async Register(){
        const insertDic = this.insertDic
        const Achievement = new BulkInsert(insertDic.strAchievement, 'AchievementTable')
        await Achievement.BulkInsert('AchievementTable_')
        const Aptitude = new BulkInsert(insertDic.strPassage, 'AptitudeTable')
        await Aptitude.BulkInsert('AptitudeTable_')
        const Rotation = new BulkInsert(insertDic.data, 'RotationTable')
        await Rotation.BulkInsert(`RotationTable_`)
    }
}
