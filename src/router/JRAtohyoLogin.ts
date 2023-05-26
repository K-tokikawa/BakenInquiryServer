import express from "express"
import process from '../process/JRAtohyoLogin'
const router: express.Router = express.Router();
// curl http://localhost:9999/GetJRAtohyoData -H "Content-Type:application/json" -d "{\"UID\":\"12345678\",\"PWD\":\"****\",\"PARS\":\"20XX\"}"
router.post('/JRAtohyoLogin', function (req, res, next) {
    const UID: number = Number(req.body.UID)
    const PWD: number = Number(req.body.PWD)
    const PARS: number = Number(req.body.PARS)
    process(UID, PWD, PARS)
        .then(result => {
            res.send(result)
        })
})
export default router