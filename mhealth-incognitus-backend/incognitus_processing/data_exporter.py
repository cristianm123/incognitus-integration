import json
import os
from incognitus_processing.mysql_service import MySQLService
from incognitus_processing import mysql_host, mysql_user, mysql_password, mysql_database
from incognitus_processing.data_handler import DataHandler


class DataExporter(DataHandler):
    """
    A class for exporting processed data to a MySQL database.

    Inherits from DataHandler class.

    Attributes:
        input_directory (str): The base directory for input data.
        mysql (MySQLService): An instance of MySQLService for database interaction.

    Methods:
        __init__(self, input_directory):
            Initializes a DataExporter instance with the specified input directory.

        execute(self):
            Exports processed data to a MySQL database.
    """

    def __init__(self, input_directory):
        """
        Initializes a DataExporter instance.

        Args:
            input_directory (str): The base directory for input data.
        """
        super().__init__(input_directory)
        self.mysql = MySQLService(mysql_host, mysql_user, mysql_password, mysql_database)

    def execute(self):
        """
        Exports processed data to a MySQL database.
        """
        for file in os.listdir(self._input_directory):
            patient = self._load_json_file('/'.join([self._input_directory, file]))
            evaluations = patient.pop('evaluations')

            if not self.mysql.patient_exist(patient['numberId']):
                self.mysql.insert_values('patient', patient)

            for evaluation in evaluations.values():
                evaluation['patientNumberId'] = patient['numberId']
                evaluation['questions'] = json.dumps(evaluation['questions'], ensure_ascii=False)
                self.mysql.insert_values('evaluation', evaluation)

            self.mysql.commit_changes()

        self._clean_directory()


if __name__ == '__main__':
    os.chdir('../')
    dp = DataExporter('output')
    dp.execute()
