import express from "express"
import process from '../process/GetJRAtohyoData'
const router: express.Router = express.Router();
// curl http://localhost:9999/GetJRAtohyoData -H "Content-Type:application/json" -d "{\"UID\":\"12345678\",\"PWD\":\"****\",\"PARS\":\"20XX\"}"
router.post('/GetJRAtohyoData', function (req, res, next) {
    const jsessionid: string = req.body.jsessionid
    const m: string = req.body.m

    process(jsessionid, m)
        .then(result => {
            res.send(result)
        })
})
export default router