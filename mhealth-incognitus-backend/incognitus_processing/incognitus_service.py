from incognitus_processing.data_exporter import DataExporter
from incognitus_processing.minio_service import MinioService
from incognitus_processing.data_processor import DataProcessor
from incognitus_processing import minio_endpoint, minio_access_key, minio_secret_key, minio_end_bucket, buckets_root
from pathlib import Path


class IncognitusService:
    """
    A service class for processing and exporting data using various components.

    Attributes:
        minio (MinioService): An instance of MinioService for interacting with Minio.

    Methods:
        __init__(self):
            Initializes an IncognitusService instance with Minio configuration.

        process_uploaded_files(self, bucket_name, upload_completed_path):
            Processes uploaded files, performs data processing, and exports data.

        _download_files_from_minio(self, bucket_name, files):
            Downloads files from Minio to a local directory.
    """

    def __init__(self):
        """
        Initializes an IncognitusService instance with Minio configuration.
        """
        self.minio = MinioService(minio_endpoint, minio_access_key, minio_secret_key, False)

    def process_uploaded_files(self, bucket_name, upload_completed_path):
        """
        Processes uploaded files, performs data processing, and exports data.

        Args:
            bucket_name (str): The name of the Minio bucket.
            upload_completed_path (str): The path to the file containing uploaded file names.
        """
        uploaded_files = self.minio.get_file_content(bucket_name, upload_completed_path).split('\n')
        directory = self._download_files_from_minio(bucket_name, uploaded_files)
        data_processor = DataProcessor(directory, "output")
        data_processor.execute()
        for file in data_processor.file_mapping.keys():
            self.minio.copy_object(bucket_name, file, minio_end_bucket, data_processor.file_mapping[file])
        data_exporter = DataExporter("output")
        data_exporter.execute()

    def _download_files_from_minio(self, bucket_name, files):
        """
        Downloads files from Minio to a local directory.

        Args:
            bucket_name (str): The name of the Minio bucket.
            files (list): List of file paths within the bucket.

        Returns:
            str: The local directory where files were downloaded.
        """
        directory = str()
        for file in files:
            directory = '/'.join([buckets_root, *f"{bucket_name}/{file}".split('/')[:-1]])
            Path(directory).mkdir(parents=True, exist_ok=True)
            self.minio.download_file(bucket_name, file, buckets_root)
        return directory
