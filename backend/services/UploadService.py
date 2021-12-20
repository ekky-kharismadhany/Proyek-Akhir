from pattern.SingletonMeta import SingletonMeta
from werkzeug.utils import secure_filename
from os.path import join
from flask import current_app

class UploadService(metaclass=SingletonMeta):

    def __init__(self):
        self.ALLOWED_EXTENSIONS = {'txt', 'csv'}

    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS

    def upload_handler(self, file):
        if file and self.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = join(current_app.config['FILE_UPLOAD'],
                                 filename)
            file.save(file_path)
            return True, "Upload success"
        else:
            return False, "Upload failed"