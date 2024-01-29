export default interface IFDicPredictData{
    [RaceID: number]: {
        info: string,
        Horses: {
            [HorseNo: number]: 
            {
                horsepredictdata: string,
                rank: number,
                Name: string
            }
        }
    }
}