import IFPredictHorses from "./IFPredictHorses"

export default interface IFDicPredictData{
    [RaceID: number]: {
        info: string,
        Horses: IFPredictHorses
    }
}