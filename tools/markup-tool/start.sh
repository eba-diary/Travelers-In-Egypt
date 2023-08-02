#!/bin/bash

echo "Activating virtual environment"
. venv/bin/activate

echo "Installing dependencies"
pip install --upgrade pip
pip install -r requirements.txt --no-cache-dir


GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}"
cat << "EOF"
   _____ _             _   _                _____                 _          
  / ____| |           | | (_)              / ____|               (_)         
 | (___ | |_ __ _ _ __| |_ _ _ __   __ _  | (___   ___ _ ____   ___  ___ ___ 
  \___ \| __/ _` | '__| __| | '_ \ / _` |  \___ \ / _ \ '__\ \ / / |/ __/ _ \
  ____) | || (_| | |  | |_| | | | | (_| |  ____) |  __/ |   \ V /| | (_|  __/
 |_____/ \__\__,_|_|   \__|_|_| |_|\__, | |_____/ \___|_|    \_/ |_|\___\___|
                                    __/ |                                    
                                   |___/                                                         
EOF
echo -e "${NC}"

python -m app &