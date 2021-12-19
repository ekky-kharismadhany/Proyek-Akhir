from logging import error
from flask import Flask, request, jsonify
from services.LocationService import LocationService
import os

app = Flask(__name__)
location = LocationService()


@app.route("/")
def index():
    welcome = {"message": "Hello world"}
    return jsonify(welcome)


@app.route("/classification/csv", methods=['POST'])
def upload_csv():
    if request.files:
        uploaded_file = request.files['filename']
        file_path = os.path.join(app.config['FILE_UPLOAD'], uploaded_file.filename)
        uploaded_file.save(file_path)
        return jsonify({
            'message': 'success'
        })

@app.route("/location", methods=['GET', 'POST'])
def location():
    if request.method == 'GET':
        # location = LocationService()
        # print(location.get_latitude())
        return jsonify(location.get_map_location())
    else:
        ip:str = request.json['ip']
        # location = LocationService(ip=ip)
        location.set_ip(ip)
        respond = location.get_location_by_ip()
        return jsonify(respond)


if __name__ == "__main__":
    app.config['FILE_UPLOAD'] =  os.getcwd() + "/uploads/"
    app.debug = True
    if not os.path.isdir(app.config['FILE_UPLOAD']):
        raise RuntimeError("Upload path does not exist")
    app.run()