from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from services.ClassificationService import ClassificationService
from services.LocationService import LocationService
from services.FileService import FileService
import os

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
@cross_origin()
def index():
    welcome = {"message": "Hello world"}
    return jsonify(welcome)


@app.route("/upload", methods=['GET', 'POST'])
@cross_origin()
def upload_csv():
    if request.method == 'POST':
        if request.files:
            file_service = FileService()
            file = request.files['filename']
            status, message = file_service.upload_handler(file)
            return jsonify({
                'status': status,
                'message': message
            })
        return jsonify({
            'status': False,
            'message': 'No file uploaded'
        })
    else:
        classification_service = ClassificationService()
        result = classification_service.get_result()
        response = make_response(result)
        response.headers["Content-Disposition"] = "attachment; filename=export.csv"
        response.headers["Content-type"] = "text/csv"
        return response


@app.route("/classification")
@cross_origin()
def classify():
    classification_service = ClassificationService()
    return jsonify({
        'status': True,
        'result': classification_service.get_result_by_attack_type(),
        'metric': classification_service.get_metric()
    })


@app.route("/location", methods=['POST'])
@cross_origin()
def location():
    ip: str = request.json['ip']
    location = LocationService()
    location.set_ip(ip)
    location.set_location_by_ip()
    result: dict[str:str] = location.get_map_location()
    return jsonify({
        'status': True,
        'message': result
    })


if __name__ == "__main__":
    app.config['FILE_UPLOAD'] = os.getcwd() + "/uploads/"
    app.debug = True
    app.secret_key = '123'
    if not os.path.isdir(app.config['FILE_UPLOAD']):
        raise RuntimeError("Upload path does not exist")
    app.run()
