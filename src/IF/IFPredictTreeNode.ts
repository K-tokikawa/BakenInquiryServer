export interface IFPredictTreeNode{
    key: string,
    data: {
        'RaceID': string
        'HorseNo': string,
        'Name': string,
        'Predict': string,
        'Rank': string
    }
}

export interface IFPredictParentTreeNode{
    key: number,
    data:{
        'RaceID': string,
        'HorseNo': string
        'Name': string
        'Predict': string
        'Rank': string
    },
    children: IFPredictTreeNode[]
}