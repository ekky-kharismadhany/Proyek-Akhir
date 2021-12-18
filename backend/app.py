from logging import error
from flask import Flask, request, jsonify
from services.LocationService import LocationService
import os

app = Flask(__name__)


@app.route("/")
def index():
    welcome = {"message": "Hello world"}
    return jsonify(welcome)


@app.route("/classification/csv", methods=['POST'])
def loads_csv():
    if request.files:
        uploaded_file = request.files['filename']
        file_path = os.path.join(app.config['FILE_UPLOAD'], uploaded_file.filename)
        uploaded_file.save(file_path)

@app.route("/location", methods=['GET', 'POST'])
def location():
    location = LocationService(ip="8.8.8.8")
    if request.method == 'GET':
        return jsonify(location.get_map_location())
    else:
        respond = location.get_location_by_ip()
        return jsonify(respond)


if __name__ == "__main__":
    app.config['FILE_UPLOAD'] =  os.getcwd() + "/uploads/"
    app.debug = True
    if not os.path.isdir(app.config['FILE_UPLOAD']):
        raise RuntimeError("Upload path does not exist")
    app.run()