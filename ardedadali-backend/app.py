from flask import Flask, request
import json

from services.handleClassification import handleClassification

app = Flask(__name__)


@app.route("/")
def index():
    welcome = {"message": "Hello world"}
    return json.dumps(welcome)


@app.route("/classification", methods=['POST'])
def loads_csv():
    result = handleClassification(request.get_json())
    payload = {"message": result}
    return json.dumps(payload)


if __name__ == "__main__":
    app.run()