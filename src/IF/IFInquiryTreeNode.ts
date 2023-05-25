export interface IFInquiryTreeNode {
    key: string,
    data: {
        "項目": string
        "TotalBet": string
        "TotalReturn": string
        "CountBet": string
        "CountReturn": string
    }
}

export interface IFInquiryParentTreeNode {
    key: string,
    data: {
        "項目": string
        "TotalBet": string
        "TotalReturn": string
        "CountBet": string
        "CountReturn": string
    },
    children: IFInquiryTreeNode[]
}