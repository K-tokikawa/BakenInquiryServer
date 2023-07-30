export interface IFPredictTreeNode{
    key: string,
    data: {
        'RaceID': string
        'Mark': string
        'HorseNo': string
        'Name': string
        'Predict': string
        'Rank': string
    }
}

export interface IFPredictParentTreeNode{
    key: number,
    data:{
        'RaceID': string
        'Mark': string
        'HorseNo': string
        'Name': string
        'Predict': string
        'Rank': string
        'text': string
    },
    children: IFPredictTreeNode[]
}