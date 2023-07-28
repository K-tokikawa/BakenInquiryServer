export interface IFPredictTreeNode{
    key: string,
    data: {
        'RaceID': string
        'HorseNo': string,
        'Name': string
        'Predict': string
    }
}

export interface IFPredictParentTreeNode{
    key: number,
    data:{
        'RaceID': string,
        'HorseNo': string
        'Name': string
        'Predict': string
    },
    children: IFPredictTreeNode[]
}