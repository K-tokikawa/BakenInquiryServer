export function pricecomma(num: number) {
    const comma = ','
    let count = 0
    let result = ''
    let y = num
    const loop = true
    while (loop) {
        count++
        const x = y % 10
        if (Math.floor(y / 10) == 0) {
            result = `${y}${result}`
            break
        } else {
            y = Math.floor(y / 10)
        }
        result = `${x}${result}`
        if (count % 3 == 0) {
            result = `${comma}${result}`
        }
    }
    return result
}
export function formatNumber(num: number): string {
    // 数字が10以下の場合は二桁にする
    return num.toString().padStart(2, '0');
}

export function zenkaku2Hankaku(str: string | number) {
    if (typeof (str) == 'number') {
        str = String(str)
    }
    return str.replace(/[A-Za-z0-9]/g, function (s: any) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}