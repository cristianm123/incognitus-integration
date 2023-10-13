import json
from collections.abc import Iterable
import shutil


class DataHandler:
    """
    A class for handling JSON data manipulation and file operations.

    Attributes:
        input_directory (str): The base directory for input data.

    Methods:
        __init__(self, input_directory):
            Initializes a DataHandler instance with the specified input directory.

        _clean_directory(self):
            Cleans up the input directory and removes its contents.

        _remove_keys(self, dictionary, keys_to_remove):
            Removes specified keys from a dictionary.

        _load_json_file(file_path):
            Loads JSON data from a file and returns it as a Python dictionary.

        _save_json_file(data, file_path):
            Saves JSON data (Python dictionary) to a file.

        execute(self):
            Placeholder method for performing data handling operations.
    """

    def __init__(self, input_directory):
        """
        Initializes a DataHandler instance.

        Args:
            input_directory (str): The base directory for input data.
        """
        self._input_directory = input_directory

    def _clean_directory(self):
        """
        Cleans up the input directory by removing its contents.
        """
        shutil.rmtree(self._input_directory.split('/')[0])

    @staticmethod
    def _remove_keys(dictionary, keys_to_remove):
        """
        Removes specified keys from a dictionary.

        Args:
            dictionary (dict): The dictionary from which keys will be removed.
            keys_to_remove (Iterable or str): The keys to be removed.

        Returns:
            dict: The modified dictionary with keys removed.
        """
        if isinstance(keys_to_remove, Iterable):
            for key in keys_to_remove:
                del dictionary[key]
        else:
            del dictionary[keys_to_remove]
        return dictionary

    @staticmethod
    def _load_json_file(file_path):
        """
        Loads JSON data from a file and returns it as a Python dictionary.

        Args:
            file_path (str): The path to the JSON file.

        Returns:
            dict: The loaded JSON data as a Python dictionary.
        """
        with open(file_path, encoding='utf-8') as f:
            data = json.load(f)
        return data

    @staticmethod
    def _save_json_file(data, file_path):
        """
        Saves JSON data (Python dictionary) to a file.

        Args:
            data (dict): The data to be saved.
            file_path (str): The path to the target JSON file.
        """
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def execute(self):
        """
        Placeholder method for performing data handling operations.
        Subclasses should implement their own version of this method.
        """
        pass
