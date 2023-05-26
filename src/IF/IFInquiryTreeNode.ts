export interface IFInquiryTreeNode {
    key: string,
    data: {
        "項目": string
        "TotalBet": string
        "TotalReturn": string
        "ReturnRate": string
        "CountBet": string
        "CountReturn": string
        "HitRate": string
    }
}

export interface IFInquiryParentTreeNode {
    key: string,
    data: {
        "項目": string
        "TotalBet": string
        "TotalReturn": string
        "ReturnRate": string
        "CountBet": string
        "CountReturn": string
        "HitRate": string
    },
    children: IFInquiryTreeNode[]
}