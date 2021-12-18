from flask import Flask, request, jsonify
import json

from backend.services.ClassificationService import handleClassification
from services.LocationService import LocationService

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

@app.route("/location", methods=['GET', 'POST'])
def location():
    location = LocationService(ip="8.8.8.8")
    if request.method == 'GET':
        return jsonify(location.get_map_location())
    else:
        respond = location.get_location_by_ip()
        return jsonify(respond)


if __name__ == "__main__":
    app.run()