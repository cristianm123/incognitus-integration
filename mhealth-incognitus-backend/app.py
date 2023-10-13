from flask import Flask, request
import urllib.parse
from incognitus_processing.incognitus_service import IncognitusService

app = Flask(__name__)
service = IncognitusService()


@app.route('/incognitus/process', methods=['POST'])
def process_incognitus_files():
    """
    Endpoint for processing Incognitus uploaded files.

    This endpoint receives event data from MinIO triggered when a file is uploaded.
    It processes the uploaded files using the IncognitusService.

    Returns:
        str: A response indicating that the event was received and processed.
    """
    event_data = request.json  # Event data sent by MinIO

    bucket_name = event_data['Records'][0]['s3']['bucket']['name']
    object_key = event_data['Records'][0]['s3']['object']['key']
    object_key = urllib.parse.unquote(object_key, encoding='utf-8', errors='replace')
    service.process_uploaded_files(bucket_name, object_key)

    return 'Event received and processed'


if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
