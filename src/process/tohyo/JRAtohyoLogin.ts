import { AxiosBase } from '../../class/AxiosBase'
import AxiosResponseClass from '../../class/AxiosResponseClass'

export default async function process(UID: number, PWD: number, PARS: number) {
    console.log(`access:UID ${UID} PWD ${PWD} PARS ${PARS}`)
    return await JRAtohyoLogin(UID, PWD, PARS)
}

async function JRAtohyoLogin(UID: number, PWD: number, PARS: number) {
    const axios010: AxiosBase = new AxiosBase('https://www.nvinq.jra.go.jp/jra/servlet/JRAWeb010')
    const res010 = await axios010.POST({ UID: UID, PWD: PWD, PARS: PARS, FROM: '000' }, { headers: { "Content-Type": "application/x-www-form-urlencoded" }, withCredentials: true, })
    const axiosres010 = res010 as AxiosResponseClass
    const data010 = axiosres010.Data
    let value = ''
    let jsessionid = ''
    if (typeof (data010) == 'string') {
        const page = data010.split('\n')
        const name_m = page.filter(row => row.match(/name/))[0]
        const m = name_m.match(/(?<=value=").*?(?=")/)?.[0]
        if (typeof (m) == 'string') {
            value = m
        }
        const name_ID = page.filter(row => row.match(/jsessionid/))[0]
        const ID = name_ID.match(/(?<=jsessionid=).*?(?=")/)?.[0]
        if (typeof (ID) == 'string') {
            jsessionid = ID
        }
    }
    // セッションで使用されているCookieを取得
    return {'jsessionid': jsessionid, 'm': value}
}

