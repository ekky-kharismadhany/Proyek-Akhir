import requests

from pattern.SingletonMeta import SingletonMeta


class LocationService(metaclass=SingletonMeta):

    def set_latitude(self, latitide: str):
        self.latitude = latitide

    def get_latitude(self):
        return self.latitude

    def set_longitude(self, longitude: str):
        self.longitude = longitude

    def get_longitude(self):
        return self.longitude

    def set_ip(self, ip:str):
        self.ip = ip

    def get_ip(self):
        return self.ip

    def set_location_by_ip(self):
        respond = requests.get("https://ipwhois.app/json/" + self.ip)
        if respond.ok and respond.status_code == 200:
            json_data = respond.json()
            self.set_latitude(json_data['latitude'])
            self.set_longitude(json_data['longitude'])
        else:
            self.longitude("")
            self.longitude("")

    def get_map_location(self):
        payload = {
            'latitude': self.get_latitude(),
            'longitude': self.get_longitude()
        }
        return payload
