export default interface IFPredictRows{
    [RaceID: number]: {
        Round: number,
        Ground: string,
        Venue: string,
        Horse: {
            [HorseNo: number] : {
                HorseName: string,
                HorseID: number,
                predict: string
            }
        }
    }
}