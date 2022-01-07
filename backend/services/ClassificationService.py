import piskle
from pandas import read_csv
from enum import Enum, auto
import numpy as np
import os

from .MetricService import MetricService


class AttackType(Enum):
    Benign = auto()
    FTP_Bruteforce = auto()
    SSH_BruteForce = auto()
    DDOS_Attack_HOIC = auto()
    Bot = auto()
    DoS_Attack_Golden_Eye = auto()
    DoS_Attack_Slowloris = auto()
    DDoS_Attack_LOIC_UDP = auto()
    BruteForce_Web = auto()
    BruteForce_XSS = auto()
    SQL_Injection = auto()


class ClassificationService:

    def __init__(self) -> None:
        self.dataset = None
        self.result = None
        self.test = None
        self.csv_file = None

    def load_csv(self):
        filepath: str = f"{os.getcwd()}/uploads/sampled_1000_dataset.csv"
        self.dataset = read_csv(filepath)
        self.test = self.dataset['Label']
        self.dataset = self.dataset.drop(['Unnamed: 0', 'Label'], axis=1)

    def tanH_scaler(self, df):
        scaled_df = df.copy()
        for col in df.columns:
            if scaled_df[col].std() != 0.0:
                scaled_df[col] = 0.5*(np.tanh(0.01*((scaled_df[col] -
                                      np.mean(scaled_df[col]) / np.std(scaled_df[col]))))+1)
        return scaled_df

    def normalize(self):
        self.dataset = self.tanH_scaler(self.dataset)

    def predict(self):
        model = piskle.load(f"{os.getcwd()}/model/decision_tree.pskl")
        return model.predict(self.dataset)

    def get_result(self):
        self.load_csv()
        self.normalize()
        return self.predict()

    def get_metric(self):
        ms = MetricService()
        pred = self.get_result()
        test = self.test.tolist()
        accuracy, precision, recall = ms.get_metric(test, pred)
        return {
            'accuracy': accuracy,
            'recall': recall,
            'precision': precision
        }

    def get_result_by_attack_type(self):
        result = np.array(self.get_result())
        return {
            AttackType.Benign.name: int((result == AttackType.Benign.value).sum()),
            AttackType.FTP_Bruteforce.name: int((result == AttackType.FTP_Bruteforce.value).sum()),
            AttackType.SSH_BruteForce.name: int((result == AttackType.SSH_BruteForce.value).sum()),
            AttackType.DDOS_Attack_HOIC.name: int((result == AttackType.DDOS_Attack_HOIC.value).sum()),
            AttackType.Bot.name: int((result == AttackType.Bot.value).sum()),
            AttackType.DoS_Attack_Golden_Eye.name: int((result == AttackType.DoS_Attack_Golden_Eye.value).sum()),
            AttackType.DoS_Attack_Slowloris.name: int((result == AttackType.DoS_Attack_Slowloris.value).sum()),
            AttackType.DDoS_Attack_LOIC_UDP.name: int((result == AttackType.DDoS_Attack_LOIC_UDP.value).sum()),
            AttackType.BruteForce_Web.name: int((result == AttackType.BruteForce_Web.value).sum()),
            AttackType.BruteForce_XSS.name: int((result == AttackType.BruteForce_XSS.value).sum()),
            AttackType.SQL_Injection.name: int(
                (result == AttackType.SQL_Injection.value).sum())
        }
