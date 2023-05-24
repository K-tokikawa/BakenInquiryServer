export default class JRAtohyoClass{
    public static index日付 = 0
    public static index受付番号 = 1
    public static index通番 = 2
    public static index場名 = 3
    public static index曜日 = 4
    public static indexレース = 5
    public static index式別 = 6
    public static index馬_組番 = 7
    public static index購入金額 = 8
    public static index的中_返還 = 9
    public static index払戻単価 = 10
    public static index払戻_返還金額 = 11

    private _日付 : string
    private _受付番号 : string
    private _通番 : string
    private _場名 : string
    private _曜日 : string
    private _レース : string
    private _式別 : string
    private _馬_組番 : string
    private _購入金額 : string
    private _的中_返還 : string
    private _払戻単価 : string
    private _払戻_返還金額: string

    constructor(
        日付: string,
        受付番号 : string,
        通番 : string,
        場名 : string,
        曜日 : string,
        レース : string,
        式別 : string,
        馬_組番 : string,
        購入金額 : string,
        的中_返還 : string,
        払戻単価 : string,
        払戻_返還金額 : string
    ) {
        this._日付 = 日付
        this._受付番号 = 受付番号
        this._通番 = 通番
        this._場名 = 場名
        this._曜日 = 曜日
        this._レース = レース
        this._式別 = 式別
        this._馬_組番 = 馬_組番
        this._購入金額 = 購入金額
        this._的中_返還 = 的中_返還
        this._払戻単価 = 払戻単価
        this._払戻_返還金額 = 払戻_返還金額
    }

    public get 日付() {return this._日付}
    public get 受付番号() {return this._受付番号}
    public get 通番() {return this._通番}
    public get 場名() {return this._場名}
    public get 曜日() {return this._曜日}
    public get レース() {return this._レース}
    public get 式別() {return this._式別}
    public get 馬_組番() {return this._馬_組番}
    public get 購入金額() {return this._購入金額}
    public get 的中_返還() {return this._的中_返還}
    public get 払戻単価() {return this._払戻単価}
    public get 払戻_返還金額() {return this._払戻_返還金額}

}

