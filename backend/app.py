from flask import Flask, request, jsonify
import json

from services.handleClassification import handleClassification
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

@app.route("/location")
def location():
    location = LocationService(ip="8.8.8.8")
    location.get_location_by_ip()
    location = location.get_map_location()
    return jsonify(location)


if __name__ == "__main__":
    app.run()