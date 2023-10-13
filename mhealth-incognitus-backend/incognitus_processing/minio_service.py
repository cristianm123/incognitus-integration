from minio import Minio
from minio.commonconfig import CopySource


class MinioService:
    """
    A class for interacting with a Minio object storage server.

    Attributes:
        minio_client (minio.Minio): The Minio client instance for communication with the server.

    Methods:
        __init__(self, minio_endpoint, minio_access_key, minio_secret_key, secure):
            Initializes a MinioService instance with the provided credentials.

        download_file(self, bucket_name, object_key, directory):
            Downloads a file from the Minio server and saves it to the specified directory.

        get_file_content(self, bucket_name, object_key):
            Retrieves the content of a file stored in the Minio server as a string.

        copy_object(self, src_bucket, src_object, dest_bucket, dest_object):
            Copies an object from one bucket and object key to another bucket and object key.

    """

    def __init__(self, minio_endpoint, minio_access_key, minio_secret_key, secure):
        """
        Initializes a MinioService instance.

        Args:
            minio_endpoint (str): The URL of the Minio server.
            minio_access_key (str): The access key for connecting to the Minio server.
            minio_secret_key (str): The secret key for connecting to the Minio server.
            secure (bool): True if using HTTPS, False if using HTTP.
        """
        self.minio_client = Minio(
            minio_endpoint,
            access_key=minio_access_key,
            secret_key=minio_secret_key,
            secure=secure
        )

    def download_file(self, bucket_name, object_key, directory):
        """
        Downloads a file from the Minio server and saves it to the specified directory.

        Args:
            bucket_name (str): The name of the bucket containing the file.
            object_key (str): The object key (path) of the file in the bucket.
            directory (str): The directory where the downloaded file will be saved.
        """
        file_data = self.minio_client.get_object(bucket_name, object_key).data
        with open('/'.join([directory, bucket_name, object_key]), 'wb') as f:
            f.write(file_data)

    def get_file_content(self, bucket_name, object_key):
        """
        Retrieves the content of a file stored in the Minio server as a string.

        Args:
            bucket_name (str): The name of the bucket containing the file.
            object_key (str): The object key (path) of the file in the bucket.

        Returns:
            str: The content of the file as a string.
        """
        return self.minio_client.get_object(bucket_name, object_key).data.decode()

    def copy_object(self, src_bucket, src_object, dest_bucket, dest_object):
        """
        Copies an object from one bucket and object key to another bucket and object key.

        Args:
            src_bucket (str): The source bucket containing the object to be copied.
            src_object (str): The object key (path) of the source object.
            dest_bucket (str): The destination bucket for the copied object.
            dest_object (str): The object key (path) of the copied object in the destination bucket.
        """
        self.minio_client.copy_object(dest_bucket, dest_object, CopySource(src_bucket, src_object))
