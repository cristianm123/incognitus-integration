import os

buckets_root = "buckets"
minio_endpoint = "minio:9000"
minio_access_key = os.environ.get('MINIO_ACCESS_KEY')
minio_secret_key = os.environ.get('MINIO_SECRET_KEY')
minio_end_bucket = os.environ.get('END_BUCKET')
mysql_host = "mysql"
mysql_user = "root"
mysql_password = os.environ.get('MYSQL_PASSWORD')
mysql_database = "incognitus"
