import express from 'express'
import bodyparser from "body-parser"
import GetJRAtohyoData from "./router/GetJRAtohyoData"
import JRAtohyoLogin from "./router/JRAtohyoLogin"
import GetRacePredict from "./router/GetRacePredict"
import GetHoldVenue from "./router/GetHoldVenue"
export const app = express()
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", 'http://localhost:9099');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
});
app.use(GetJRAtohyoData)
app.use(JRAtohyoLogin)
app.use(GetRacePredict)
app.use(GetHoldVenue)

export default app.listen(9999, () => {
    console.log("App is running at http://localhost:9099")
});