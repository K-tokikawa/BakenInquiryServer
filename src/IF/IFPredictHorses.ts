export default interface IFPredictHorses{
    [HorseNo: number]: 
    {
        horsepredictdata: string,
        rank: number,
        Name: string,
        HorseID: number,
        cancel: boolean
    }
}