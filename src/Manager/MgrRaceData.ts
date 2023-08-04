import ClassPassageData from "../class/ClassPassageData"
import ClassRaceHorseData from "../class/ClassRaceHorseData"
import EntRaceHorseStudyData from "../sql/Entity/EntRaceHorseStudyData"
import ClassAchievementData from "../class/ClassAchievementData"
import ClassHorseData from "../class/ClassHorseData"
import simpleProgress from "../process/ProgressBar"

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
        strPassage: string[],
        pace: string[]
    }

    constructor(RaceData: EntRaceHorseStudyData[], PredictRaceID: number[]) {
        this.m_RaceData = RaceData
        this.m_PredictRaceID = PredictRaceID
        this.m_dic = {}
        this.m_insertDic = {strAchievement: [], data: [], strPassage: [], pace: []}
    }

    public get dic(){return this.m_dic}
    public get insertDic() { return this.m_insertDic }

    async dicCreate(){
        return new Promise (async (resolve) => {
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
            resolve(true)
        })
    }

    async CreateRacePredict(HorseID: number){
        return new Promise(async (resolve) =>{
            const dic = this.m_dic
            const horseData = dic[HorseID].data
            const entitys: {[num: number]: {PassageData: ClassPassageData, AchievementData: ClassAchievementData, RotationData: ClassRaceHorseData[], RaceID: number, Rank: number}} = horseData.HorseData
            for (const keynum of Object.keys(entitys)){
                const num = Number(keynum)
                const Passageentity = entitys[num].PassageData
                const Achievemententity = entitys[num].AchievementData
                const RaceHorseData = entitys[num].RotationData
                const RaceID = entitys[num].RaceID

                if (!this.m_PredictRaceID.includes(RaceID)) continue;

                // Rotation
                let data = ''
                let pace = ''
                if (RaceHorseData.length > 0) {
                    for (const value of RaceHorseData){
                        if (data == ''){
                            data += `${HorseID},${RaceID}`
                            pace = `${value.RaceID},${value.HorseNo}`
                        } else {
                            data += `,${value.GoalTime}`.replace('null', '')
                            data += `,${value.Venue},${value.HoldMonth},${value.Hold},${value.Day},${value.Range},${value.Ground},${value.GroundCondition},${value.Weather},${value.Pace},${value.Weight},${value.TrainerID},${value.HorseGender},${value.HorseWeight},${value.HorseNo},${value.HorseAge},${value.Remarks},${value.RaceRemarks},${value.Fluctuation},${`${value.SpurtTime}`.replace('null', '')},${value.JockeyID},${value.before}`
                            pace += `,${value.Pace},${value.Passage1},${value.Passage2},${value.Passage3},${value.Passage4}`
                        }
                    }
                    const empty = ',,,,,,,,,,,,,,,,,,,,,,'
                    const paceempty = ',,,,,'
                    if (RaceHorseData.length == 1){
                        data = data + empty + empty + empty + empty + empty
                        pace = pace + paceempty + paceempty + paceempty + paceempty + paceempty + paceempty
                    }
                    if (RaceHorseData.length == 2){
                        data = data + empty + empty + empty + empty
                        pace = pace + paceempty + paceempty + paceempty + paceempty + paceempty
                    }
                    if (RaceHorseData.length == 3){
                        data = data + empty + empty + empty
                        pace = pace + paceempty + paceempty + paceempty + paceempty
                    }
                    if (RaceHorseData.length == 4){
                        data = data + empty + empty
                        pace = pace + paceempty + paceempty + paceempty
                    }
                    if (RaceHorseData.length == 5){
                        data = data + empty
                        pace = pace + paceempty + paceempty
                    }
                    if (RaceHorseData.length == 6) {
                        pace = pace + paceempty
                    }
                    // data = 'rotation,0,' + data
                }
    
                // aptitude
                let strPassage = `${HorseID},${RaceID}`
                for (const row of this.m_RaceData) {
                    // Passage
                    if (row.HorseID == HorseID) {
                        if (row.HoldDay.getTime() < Passageentity.represent.HoldDay.getTime()){
                            Passageentity.addPassage1(row.Passage1)
                            Passageentity.addPassage2(row.Passage2)
                            Passageentity.addPassage3(row.Passage3)
                            Passageentity.addPassage4(row.Passage4)
                        }
                    }
                    if (row.HorseID == HorseID) {
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
                this.m_insertDic.pace.push(pace)
                this.m_insertDic.strAchievement.push(strAchievement)
                this.m_insertDic.data.push(data)
                this.m_insertDic.strPassage.push(strPassage)
            }
            resolve(true)
        })
    }
}
