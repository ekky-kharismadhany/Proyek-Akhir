from logging import error
from flask import Flask, request, jsonify
from services.LocationService import LocationService
from services.UploadService import UploadService
import os

app = Flask(__name__)


@app.route("/")
def index():
    welcome = {"message": "Hello world"}
    return jsonify(welcome)


@app.route("/classification/csv", methods=['POST'])
def upload_csv():
    if request.files:
        upload_service = UploadService()
        file = request.files['filename']
        status, message = upload_service.upload_handler(file)
        return jsonify({
            'status': status,
            'message': message
            })


@app.route("/location", methods=['POST'])
def location():
    ip: str = request.json['ip']
    location = LocationService()
    location.set_ip(ip)
    location.set_location_by_ip()
    result: dict[str:str] = location.get_map_location()
    return jsonify({
        'status' : True,
        'message': result
    })


if __name__ == "__main__":
    app.config['FILE_UPLOAD'] = os.getcwd() + "/uploads/"
    app.debug = True
    if not os.path.isdir(app.config['FILE_UPLOAD']):
        raise RuntimeError("Upload path does not exist")
    app.run()