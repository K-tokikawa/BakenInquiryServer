import { PythonShell } from "python-shell"

export function Predict(data: string,shell: PythonShell, name=''): Promise<number | null>{
    return new Promise((resolve, reject) => {
        const datarow = data.split(',')
        const datas = datarow.map(x => {return x == null || x == 'null' ? 'None': x})
        shell.send(`${datas}`)
        let result: number| null = null
        shell.once('message', async function(message){
            result = Number(message.replace('[', '').replace(']', ''))
            resolve(result)
        })
    })

}
