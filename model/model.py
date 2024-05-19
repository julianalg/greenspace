

# Import necessary libraries
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
# Python Web Server
from flask import Flask, request
import requests
import jsonify

# Load the dataset
from sklearn.svm import SVC
import warnings
# from flask import Flask, request, jsonify
from sklearn.tree import DecisionTreeClassifier
warnings.filterwarnings("ignore")

# Load the Iris dataset
data = pd.read_csv('model/data/sandiego.csv')
data = data.drop(["City"], axis=1)
X = data.drop("Has Park", axis=1)  # Features
y = data["Has Park"] # Labels

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
# Initialize the SVM model
model = DecisionTreeClassifier()
# Train the model on the training data
model.fit(X_train, y_train)

# Make predictions on the test data
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)
class_report = classification_report(y_test, y_pred)

# Output the evaluation metrics
# print(f'Accuracy: {accuracy:.2f}')
# print('Confusion Matrix:')
# print(conf_matrix)
# print('Classification Report:')
# print(class_report)

# load LA data
# FIXING OVERFITTING DATA, MEAN SQUARED ERROR AND MEAN ABSOLUTE ERROR
def MSE(y,pred):
    return np.mean((y-pred)**2)
    
def MAE(y,pred):
    return np.mean(abs(y-pred))# load LA data

prediction = np.array([round(i) for i in model.predict(X_train)])
MSE(y_train,prediction)
MAE(y_train,prediction)

prediction = np.array([round(i) for i in model.predict(X_test)])
MSE(y_test,prediction)
MAE(y_test,prediction)

# FIXING OVERFITTING DATA, CROSS-VALIDATION
from sklearn.model_selection import KFold, cross_val_score
kfold = KFold(n_splits = 10)
score_ten = cross_val_score(model,X,y, cv=kfold)
print("10-Fold Cross Validation Scores are: {}".format(score_ten))
print("Average 10-Fold Cross Validation score: {}".format(score_ten.mean()))

rmse_score = abs(cross_val_score(model,X,y, scoring = 'neg_root_mean_squared_error', cv=kfold))
print("RMSE Average 10-Fold Cross Validation Error: {}".format(rmse_score.mean()))

# LOADING LA DATA
data = pd.read_csv('model/data/la.csv').drop(["City"], axis=1)

# Modify the land type column
data['Land Type'] = data['Land Type'].replace({'Rural': 1, 'Suburban': 2, 'Urban': 3})

# Regenerate prediction if percentage of 1 in y_pred array is more than 90%
X = data
y_pred = model.predict(X)
if np.mean(y_pred == 1) > 0.9:
    y_pred = model.predict(X)
else: 
    print(y_pred)

joblib.dump(model, 'model.pkl')

app = Flask(__name__)
model = joblib.load('model.pkl')

@app.route("/<city>")
def predict(city):
    df = pd.read_csv('model/data/la.csv')
    df = df.query(f"City == '{city}'")
    print(df)
    df = df.drop(["City"], axis=1)
    df['Land Type'] = df['Land Type'].replace({'Rural': 1, 'Suburban': 2, 'Urban': 3})
    predictions = model.predict(df)
    print(predictions)
    print(df)
    df.insert(0, "City", city, True)
    print(df)
    print(df.insert(0, "Has Park", predictions, True))
    print(df)

    return df.to_json()

if __name__ == '__main___':
    app.run(debug=True)

