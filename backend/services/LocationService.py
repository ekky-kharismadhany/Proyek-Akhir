import requests


class LocationService:
    def __init__(self, ip: str) -> None:
        self.ip: str = ip
        self.latitude: str = None
        self.longitude: str = None

    def set_latitude(self, latitide: str):
        self.latitude = latitide

    def get_latitude(self):
        return self.latitude

    def set_longitude(self, longitude: str):
        self.longitude = longitude

    def get_longitude(self):
        return self.longitude

    def get_location_by_ip(self):
        respond = requests.get("https://ipwhois.app/json/" + self.ip)
        if respond.ok and respond.status_code == 200:
            json_data = respond.json()
            self.set_latitude(json_data['latitude'])
            self.set_longitude(json_data['longitude'])
            return {'status': True}
        else:
            self.longitude("")
            self.longitude("")
            return {'status': False}

    def get_map_location(self):
        payload = {
            'latitude': self.get_latitude(),
            'longitude': self.get_longitude()
        }
        return payload
