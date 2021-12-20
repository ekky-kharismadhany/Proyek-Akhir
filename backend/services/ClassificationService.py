from pandas.core.frame import DataFrame
from pandas.io.parsers import TextFileReader
import piskle
from pandas import read_csv
import numpy as np  
import os

class ClassificationService:

    def __init__(self) -> None:
        self.dataset: DataFrame = None
        self.result = None

    def load_csv(self):
        filepath: str = os.getcwd() + "/model/train_set.csv"
        self.dataset = read_csv(filepath)
        self.dataset = self.dataset.drop("['Unnamed: 0'], axis=1", axis=1)

    def tanH_scaler(self, df):
        scaled_df = df.copy()
        for col in df.columns:
            if scaled_df[col].std() != 0.0:
                scaled_df[col] = 0.5*(np.tanh(0.01*((scaled_df[col] - np.mean(scaled_df[col]) / np.std(scaled_df[col]))))+1)
        return scaled_df


    def normalize(self):
        self.dataset = self.tanH_scaler(self.dataset)


    def predict(self):
        model = piskle.load(os.getcwd + "/model/gini_model.pskl")
        self.result = model.predict(self.dataset)

    def get_result(self):
        return self.result