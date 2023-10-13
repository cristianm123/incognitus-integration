#!/bin/bash
mc config host add myminio http://minio:9000 "${MINIO_ROOT_USER}" "${MINIO_ROOT_PASSWORD}"
mc mb myminio/"${RAW_BUCKET}"
mc mb myminio/"${END_BUCKET}"
mc admin user svcacct add \
  --access-key "${MINIO_ACCESS_KEY}" \
  --secret-key "${MINIO_SECRET_KEY}" \
  myminio "${MINIO_ROOT_USER}"
sleep 10
mc admin config set myminio/ notify_webhook:incognitus-server \
   endpoint="http://incognitus:5000/incognitus/process" \
&& mc admin service restart myminio
mc event add \
  --event "put" \
  --suffix upload.completed \
  myminio/"${RAW_BUCKET}" \
  arn:minio:sqs::incognitus-server:webhook
mc anonymous set public myminio/incognitus-processed-data