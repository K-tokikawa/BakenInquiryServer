export default interface IFDicAchievement{
    [RaceIDs: number]: {
        [HorseID: number] : {
            Achievement: string
        }
    }
}