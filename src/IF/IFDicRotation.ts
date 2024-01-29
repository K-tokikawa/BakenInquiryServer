export default interface IFDicRotation{
    [RaceIDs: number]: {
        [HorseID: number] : {
            Rotation: string
        }
    }
}