import SQLBase from "../../class/SQLBase";
import EntSYSTEMCurrentID from "../Entity/EntSYSTEMCurrentID";
import PrmGetSYSTEMCurrentID from "../param/PrmGetSYSTEMCurrentID";
export default class GetSYSTEMCurrentID extends SQLBase<EntSYSTEMCurrentID[]>
{
    private parameter: PrmGetSYSTEMCurrentID;
    constructor(prm: PrmGetSYSTEMCurrentID)
    {
        super()
        this.parameter = prm
    }

    public async Execsql(): Promise<EntSYSTEMCurrentID[]> {
        const sql =
`SELECT
      ID
    , IDName
    , CurrentID
    , Remarks_number1
    , Remarks_number2
    , Remarks_number3
    , Remarks_number4
    , Remarks_number5
    , Remarks_string1
    , Remarks_string2
    , Remarks_string3
    , Remarks_string4
    , Remarks_string5
FROM
    SYSTEMCurrentID
${this.parameter.ID != null ? `WHERE
    ID = ${this.parameter.ID}` : ''
}
    `
        return await this.ExecGet(sql) as EntSYSTEMCurrentID[]
    }
}