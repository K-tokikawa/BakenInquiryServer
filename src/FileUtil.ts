import fs from 'fs'
import Encoding from 'encoding-japanese'
import iconv from 'iconv-lite';
import simpleProgress from './process/ProgressBar';
export default class FileUtil {

    public static OutputFile(
        lines: string[],
        filePath: string
    ) {
        const ProgressBar = simpleProgress()
        const progress = ProgressBar(lines.length, 20, 'FileOutPut')
        let index = 0
        for (let line of lines){
            progress(1)
            line = line + '\n'
            const arybuf = Encoding.convert(line, {
                from: 'UNICODE',
                to: 'UTF8',
                type: 'arraybuffer',
            });
            if (index == 0) {
                fs.writeFileSync(filePath, Buffer.from(arybuf));
            }
            else {
                fs.appendFileSync(filePath, Buffer.from(arybuf));
            }
            index++
        }
    }

    public static DeleteFile(filePath: string) {
        if (fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }
    }
    public static ReadFileSync(filePath: string): string[] {
        const response = fs.readFileSync(filePath)
        const pageElement = iconv.decode(response as Buffer, 'eucjp')
        const page = pageElement.split('\r\n');
        return page
    }

    public static async ContinueOutputFile(filepath: string, lines: string[]){
        return new Promise((resoleve) => {
            let exist = fs.existsSync(filepath)
            lines.forEach((line: string, index: number) => {
                line = line + '\n'
                const arybuf = Encoding.convert(line, {
                    from: 'UNICODE',
                    to: 'UTF8',
                    type: 'arraybuffer',
                });
    
                if (exist) {
                    fs.appendFileSync(filepath, Buffer.from(arybuf))
                } else {
                    fs.writeFileSync(filepath, Buffer.from(arybuf));
                    exist = fs.existsSync(filepath)
                }
            })
            resoleve(true)
        })
    }
}