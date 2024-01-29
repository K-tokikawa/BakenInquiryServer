export default interface IFAptitude{
    [RaceIDs: number]: {
        [HorseID: number] : {
            Aptitude: string
        }
    }
}