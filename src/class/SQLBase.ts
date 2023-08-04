import { Connection, Request } from "tedious"
import config from "../../config.json"
import FileUtil from "../FileUtil";

export default abstract class SQLBase<T>{

    protected abstract Execsql(prm: any): Promise<T>

    protected connection: Connection;

    protected constructor() {
        this.connection = new Connection(config['DATABASE']);
    }

    protected async ExecRegister(sql: string): Promise<number> {
        this.connection.connect()
        this.connection.on('connect', () => {
            executeStatement(this.connection, sql)
        })
        return 0
    }

    protected async ExecGet(sql: string): Promise<any> {
        return new Promise((resolve) => {
            this.connection.connect()
            this.connection.on('connect', async () => {
                resolve(await executeStatement(this.connection, sql))
            })
        })
    }
    
    protected async ExecBulkInsert(
        table: string,
        entity: string[],
        filepath: string
    ) {
        FileUtil.OutputFile(entity, filepath)
        const sql =
            `BULK INSERT
    ${table}
FROM '${filepath}'
WITH (
      FORMAT = 'CSV'
    , DATAFILETYPE='char'
    , CODEPAGE = '65001'
    , ROWTERMINATOR = '\n'
    )`
        return new Promise((reject) => {
            this.connection.connect()
            this.connection.on('connect', () => {
                reject(executeStatement(this.connection, sql))
            })
            this.connection.on('end', () => {
                let success = true
                while (success) {
                    try {
                        // FileUtil.DeleteFile(filepath)
                        success = false
                    }
                    catch (error) {

                    }
                }
            })
        })
    }
}


async function executeStatement(connection: Connection, sql: string) {
    const bolFinish = false
    return new Promise(async (resolve) => {
        let rows: obj[] = []
        // console.log('request')
        const request = new Request(sql, function (err: any) {
            if (err) {
                console.log(sql);
                console.log(err);
            }
            connection.close();
        });
        connection.execSql(request);

        request.on('row', (columns: any) => {
            let row: obj = {}
            for (const column of columns) {
                const colName = column.metadata.colName
                const value = column.metadata.type['type'].match(/INT/) ? parseInt(column.value) : column.value
                row[colName] = value
            }
            rows.push(row)
        })
        // 複数行取得の時は、'doneInProc'が取得できたら全行取得完了　※多分
        request.on('doneInProc', function () {
            
        });

        request.on('requestCompleted', () => {
            connection.close();
            connection.close();
            resolve(rows)
        });
    })
}
interface obj {
    [prop: string]: any
}