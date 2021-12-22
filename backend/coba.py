from enum import Enum, auto
import json
from pandas import Series

from services.ClassificationService import ClassificationService

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

cs = ClassificationService()
    
result = cs.get_result()
metric = cs.get_metric()
count = {
            AttackType.Benign.name: int((result == AttackType.Benign.value - 1).sum()),
            AttackType.FTP_Bruteforce.name: int((result == AttackType.Benign.value - 1).sum()),
            AttackType.SSH_BruteForce.name: int((result == AttackType.SSH_BruteForce.value - 1).sum()),
            AttackType.DDOS_Attack_HOIC.name: int((result == AttackType.DDOS_Attack_HOIC.value - 1).sum()),
            AttackType.Bot.name: int((result == AttackType.Bot.value - 1).sum()),
            AttackType.DoS_Attack_Golden_Eye.name: int((result == AttackType.DoS_Attack_Golden_Eye.value - 1).sum()),
            AttackType.DoS_Attack_Slowloris.name: int((result == AttackType.DoS_Attack_Slowloris.value - 1).sum()),
            AttackType.DDoS_Attack_LOIC_UDP.name: int((result == AttackType.DDoS_Attack_LOIC_UDP.value - 1).sum()),
            AttackType.BruteForce_Web.name: int((result == AttackType.BruteForce_Web.value - 1).sum()),
            AttackType.BruteForce_XSS.name: int((result == AttackType.BruteForce_XSS.value - 1).sum()),
            AttackType.SQL_Injection.name: int((result == AttackType.SQL_Injection.value - 1).sum())
        }
print(metric)