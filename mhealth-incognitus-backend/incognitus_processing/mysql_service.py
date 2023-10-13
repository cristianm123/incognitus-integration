from datetime import datetime

import pymysql
from dateutil import parser


class MySQLService:
    """
    A class for interacting with a MySQL database using Python.

    Attributes:
        host (str): The host address of the MySQL server.
        user (str): The username for the MySQL connection.
        password (str): The password for the MySQL connection.
        database (str): The name of the database to connect to.
        _connection (pymysql.connections.Connection): The database connection object.
        _cursor (pymysql.cursors.Cursor): The cursor object for executing SQL queries.

    Methods:
        __init__(self, host, user, password, database):
            Initializes a MySQLService instance and establishes a database connection.

        insert_values(self, table, fields: dict):
            Inserts a new row of values into the specified table.

        patient_exist(self, patient_id):
            Checks if a patient with the given patient ID exists in the 'patient' table.

        _parse_field(self, field):
            Parses a field value for insertion into an SQL query.

        _is_valid_date(date_str):
            Checks if a given date string is a valid date.

        commit_changes(self):
            Commits changes and closes the cursor and connection.

    """

    def __init__(self, host, user, password, database):
        """
        Initializes a MySQLService instance.

        Args:
            host (str): The host address of the MySQL server.
            user (str): The username for the MySQL connection.
            password (str): The password for the MySQL connection.
            database (str): The name of the database to connect to.
        """
        self._connection = pymysql.connect(host=host, user=user, password=password, database=database)
        self._cursor = self._connection.cursor()

    def insert_values(self, table, fields: dict):
        """
        Inserts a new row of values into the specified table.

        Args:
            table (str): The name of the table to insert values into.
            fields (dict): A dictionary of field names and their corresponding values.
        """
        values = list(map(self._parse_field, fields.values()))
        placeholders = ', '.join(['%s'] * len(fields))
        query = f"""
        INSERT INTO {table}
        ({', '.join(fields.keys())})
        VALUES ({placeholders})
        """
        self._cursor.execute(query, values)

    def patient_exist(self, patient_id):
        """
        Checks if a patient with the given patient ID exists in the 'patient' table.

        Args:
            patient_id (int): The patient ID to search for.

        Returns:
            bool: True if a patient with the given ID exists, False otherwise.
        """
        query = """
        SELECT COUNT(*) 
        FROM patient 
        WHERE numberId = %s
        """
        self._cursor.execute(query, (str(patient_id),))
        count = self._cursor.fetchone()[0]
        return count > 0

    def _parse_field(self, field):
        """
        Parses a field value for insertion into an SQL query.

        Args:
            field: The value of the field.

        Returns:
            str: The parsed value as a string suitable for an SQL query.
        """
        if isinstance(field, str) and self._is_valid_date(field):
            parsed_date = parser.parse(field)
            if parsed_date.time() != datetime.min.time():
                field = parsed_date.strftime("%Y-%m-%d %H:%M:%S")
            else:
                field = parsed_date.strftime("%Y-%m-%d")
        return field

    @staticmethod
    def _is_valid_date(date_str):
        """
        Checks if a given date string is a valid date.

        Args:
            date_str (str): The date string to validate.

        Returns:
            bool: True if the date string is a valid date, False otherwise.
        """
        try:
            parser.parse(date_str)
            return True
        except ValueError:
            return False

    def commit_changes(self):
        """
        Commits changes to the database and closes the cursor and connection.
        """
        self._connection.commit()
        # self._cursor.close()
        # self._connection.close()
