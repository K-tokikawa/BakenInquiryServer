import { AxiosBase } from '../../class/AxiosBase'
import iconv from 'iconv-lite'
import { formatNumber } from '../util'

export default async function GetRaceCode(today: string) {
  try
  {
    var url = `https://p.keibabook.co.jp/cyuou/nittei/${today}`
    const axios: AxiosBase = new AxiosBase(url)
    const page = await axios.GET() as Buffer
          
    const pageElement = iconv.decode(page, 'utf-8')

    const pages = pageElement.split('\n')
    var racecode = []
    for (var line of pages){
      var info = line.match(/(\d+)回([^0-9]+)(\d+)日/)
      if (info){
        var hold = formatNumber(Number(info[1]))
        var venue = GetCode(info[2])
        var holdday = formatNumber(Number(info[3]))
        var date = new Date()
        var Year = date.getFullYear()
        var code = `${Year}${venue}${hold}${holdday}`
        racecode.push(code)
      }
    }
    return racecode
  }catch(e)
  {
    console.log(e)
    throw e
  }
}
function GetCode(venue: string){
  var sapporo = /札幌/
  var hakodate = /函館/
  var hukushima = /福島/
  var nigata = /新潟/
  var tokyo = /東京/
  var nakayama = /中山/
  var tyukyo = /中京/
  var kyoto = /京都/
  var hanshin = /阪神/
  var kokura = /小倉/
  if (venue.match(sapporo)){
    return '01'
  } else if (venue.match(hakodate)){
    return '02'
  } else if (venue.match(hukushima)){
    return '03'
  } else if (venue.match(nigata)){
    return '04'
  } else if (venue.match(tokyo)){
    return '05'
  } else if (venue.match(nakayama)){
    return '06'
  } else if (venue.match(tyukyo)){
    return '07'
  } else if (venue.match(kyoto)){
    return '08'
  } else if (venue.match(hanshin)){
    return '09'
  } else if (venue.match(kokura)){
    return '10'
  } else {
    return ''
  }
}
