export default interface IFDicHorseInfomation{
    [RaceID: number]: {
        [HorseID: number]: {
            Jockey: number,
            Rank: number,
            HorseName: string,
            HorseNo: number
            HorseAge: number,
            HorseGender: number,
            HorseWeight: number,
            Weight: number,
            TrainerID: number,
            Fluctuation: number,
            Popularity: number
        }
    }
}