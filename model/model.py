# Import necessary libraries
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
# Python Web Server
import Flask 
import request
import jsonify

# Load the dataset
data = pd.read_csv('model/data/sandiego.csv')
data = data.drop(["City"], axis=1)
X = data.drop("Has Park", axis=1)  # Features
y = data["Has Park"] # Labels

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initialize the logistic regression model
model = LogisticRegression(max_iter=200)

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
data = pd.read_csv('model/data/la.csv').drop(["City"], axis=1)

# Modify the land type column
data['Land Type'] = data['Land Type'].replace({'Rural': 1, 'Suburban': 2, 'Urban': 3})

X = data
y_pred = model.predict(X)
print(f'Accuracy: {accuracy:.2f}')

joblib.dump(model, 'model.pkl')

app = Flask(__name__)
model = joblib.load('model.pkl')

def predict():
    data = request.json
    df = pd.DataFrame(data)
    predictions = model.predict(df)
    return jsonify(prediction.tolist())

if __name__ == '__main___':
    app.run(debug=True)
