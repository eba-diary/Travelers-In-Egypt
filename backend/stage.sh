#!/bin/bash

if [ ! -d "env" ]
then
    python3 -m venv env
fi

source env/bin/activate

pip3 install --upgrade pip
pip3 install -r requirements.txt

gunicorn -b :8080 app:app