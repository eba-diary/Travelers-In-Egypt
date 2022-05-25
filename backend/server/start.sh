# 

echo "Activating virtual environment"
. venv/bin/activate

# original script to install dependencies
# echo "Installing dependencies"
# pip install --upgrade pip
# pip install -r requirements.txt --no-cache-dir


# added choice to install dependencies because it takes
# a while to download - after the first time of installing,
# skip this step
read -p "Dependencies already installed? (y|n): " res

if [ $res = "n" ]; then
    pip install --upgrade pip
    pip install -r requirements.txt --no-cache-dir
fi

# Could be for windows, double check at meeting
# echo "Starting service"
# python3 -m src.app &

echo "Starting service"
cd src
python3 app.py &
