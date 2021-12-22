import numpy as np
from sklearn.metrics import confusion_matrix

class MetricService:
    def accuracy_score(self, actual, predict):
        correct = 0
        for i in range(len(actual)):
            if actual[i] == predict[i]:
                correct += 1
        return correct / float(len(actual))


    def precision_score(self, conf_matrix):
        precision = np.diag(conf_matrix) / np.sum(conf_matrix, axis=0)
        return sum(precision) / len(precision)


    def recall_score(self, conf_matrix):
        recall = np.diag(conf_matrix) / np.sum(conf_matrix, axis=1)
        return sum(recall) / len(recall)

    def get_metric(self, test, pred):
        conf_matrix = confusion_matrix(test, pred)
        accuracy = self.accuracy_score(test, pred)
        precision = self.precision_score(conf_matrix)
        recall = self.recall_score(conf_matrix)
        return [accuracy, precision, recall]
