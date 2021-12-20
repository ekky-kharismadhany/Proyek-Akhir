import piskle
from pandas import read_csv, Series
import numpy as np  
import os
from .FileService import FileService

class ClassificationService:

    def __init__(self) -> None:
        self.dataset = None
        self.result = None
        self.csv_file = None

    def load_csv(self):
        filepath: str = f"{os.getcwd()}/uploads/sampled_1000_dataset.csv"
        self.dataset = read_csv(filepath)
        self.dataset = self.dataset.drop(['Unnamed: 0'], axis=1)

    def tanH_scaler(self, df):
        scaled_df = df.copy()
        for col in df.columns:
            if scaled_df[col].std() != 0.0:
                scaled_df[col] = 0.5*(np.tanh(0.01*((scaled_df[col] - np.mean(scaled_df[col]) / np.std(scaled_df[col]))))+1)
        return scaled_df


    def normalize(self):
        self.dataset = self.tanH_scaler(self.dataset)


    def predict(self):
        fs = FileService()
        model = piskle.load(f"{os.getcwd()}/model/decision_tree.pskl")
        self.result = model.predict(self.dataset)
        self.result = fs.csv_handler(self.result)


    def get_result(self):
        self.load_csv()
        self.normalize()
        self.predict()
        return self.result