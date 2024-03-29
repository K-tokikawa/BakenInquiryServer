import xgboost as xgb
import pandas as pd
import numpy as np

model = xgb.Booster()
data = input()
data = data.split(',')
mode = data[0]
path = f'.\\model\\{mode}\\model.json'
model.load_model(path)
model.set_param({'tree_method':'gpu_hist'})
datas = []
for d in data:
    if (d == 'None'):
        datas.append(None)
    else:
        try:
            datas.append(float(d))
        except ValueError:
            path
data = pd.DataFrame([pd.Series(data=datas)])
data = data.drop(data.columns[[0, 0]], axis=1)
xgb_test = xgb.DMatrix(data)
y_pred = model.predict(xgb_test)
print(y_pred)