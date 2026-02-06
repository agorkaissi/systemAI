# Import libraries
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load the Iris dataset
iris = load_iris()
X = iris.data      # features: sepal_length, sepal_width, petal_length, petal_width
y = iris.target    # labels/classes: 0=setosa, 1=versicolor, 2=virginica

#  Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

#  Create the classifier (Random Forest)
model = RandomForestClassifier(n_estimators=100, random_state=42)

#  Train the model on the training data
model.fit(X_train, y_train)

#  Evaluate the model on the test data
y_pred = model.predict(X_test)
print("Model accuracy:", accuracy_score(y_test, y_pred))

#  Save the trained model to a .joblib file
joblib.dump(model, "iris_model.joblib")
print("Model saved as iris_model.joblib")