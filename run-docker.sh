#!/bin/bash

docker run \
   -e GOOGLE_APPLICATION_CREDENTIALS=/app/commune-7ae28-firebase-adminsdk-ejtzb-c1bc450c1a.json \
   -v $GOOGLE_APPLICATION_CREDENTIALS:/app/commune-7ae28-firebase-adminsdk-ejtzb-c1bc450c1a.json:ro events-backend

