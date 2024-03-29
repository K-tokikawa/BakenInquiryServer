import xgboost as xgb
import pandas as pd
import numpy as np


achievement = '.\\model\\achievement\\model.json'
aptitude = '.\\model\\aptitude\\model.json'
rotation = '.\\model\\rotation\\model.json'
blood = '.\\model\\blood\\model.json'
Jockey = '.\\model\\Jockey\\model.json'
predict = '.\\model\\predict\\model.json'
 

achievementmodel = xgb.Booster()
aptitudemodel = xgb.Booster()
rotationmodel = xgb.Booster()
bloodmodel = xgb.Booster()
jockeymodel = xgb.Booster()
predictmodel = xgb.Booster()

achievementmodel.load_model(achievement)
aptitudemodel.load_model(aptitude)
rotationmodel.load_model(rotation)
bloodmodel.load_model(blood)
jockeymodel.load_model(Jockey)
predictmodel.load_model(predict)

while(True):
    data = input()
    data = data.split(',')
    mode = data[0]
    datas = []
    datas.append(None) 
    for d in data:
        if (d == 'None' or d == 'null'):
            datas.append(None)
        else:
            try:
                datas.append(float(d))
            except ValueError:
                None
    data = pd.DataFrame([pd.Series(data=datas)])
    data = data.drop(data.columns[[0, 0]], axis=1)
    xgb_test = xgb.DMatrix(data)
    if mode == 'achievement':
        y_pred = achievementmodel.predict(xgb_test)
    if mode == 'aptitude':
        y_pred = aptitudemodel.predict(xgb_test)
    if mode == 'rotation':
        y_pred = rotationmodel.predict(xgb_test)
    if mode == 'blood':
        y_pred = bloodmodel.predict(xgb_test)
    if mode == 'Jockey':
        y_pred = jockeymodel.predict(xgb_test)
    if mode == 'predict':
        y_pred = predictmodel.predict(xgb_test)
    print(y_pred)
