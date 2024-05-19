

# Import necessary libraries
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
from sklearn.svm import SVC
import warnings
from flask import Flask, request, jsonify
warnings.filterwarnings("ignore")

# Load the Iris dataset
data = pd.read_csv('model/data/sandiego.csv')
data = data.drop(["City"], axis=1)
X = data.drop("Has Park", axis=1)  # Features
y = data["Has Park"] # Labels

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
# Initialize the SVM model
model = SVC()
# Train the model on the training dataa
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

# FIXING OVERFITTING DATA 

# load LA data
data = pd.read_csv('model/data/la.csv').drop(["City"], axis=1)

# Modify the land type column
data['Land Type'] = data['Land Type'].replace({'Rural': 1, 'Suburban': 2, 'Urban': 3})

X = data
y_pred = model.predict(X)
print(f'Accuracy: {accuracy:.2f}')

# joblib.dump(model, 'model.pkl')

# # Python Web Server
app = Flask(__name__)

@app.route('/', methods=['POST'])
def predict():
    # Get the request data
    data = request.json
    
    # Preprocess the data (if needed)
    # ...
    
    # Make predictions using the trained model
    predictions = model.predict(data)
    
    # Prepare the response
    response = {
        'predictions': predictions.tolist()
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run()