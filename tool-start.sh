#!/bin/bash

function is_port_in_use() {
  local port=$1
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
    return 0
  else
    return 1  
  fi
}

function kill_python_processes() {
  local ports=("$@")
  for port in "${ports[@]}"; do
    if is_port_in_use $port; then
      echo "Killing Python service on port $port"
      kill -9 $(lsof -ti :$port)
    fi
  done
}

python_ports=(5000)

read -p "Do you want to start additional tools? (y/n): " answer

if [[ "$answer" == *y* || "$answer" == *Y* ]]; then
  echo "Checking and killing Python services..."
  kill_python_processes "${python_ports}"

  cd tools/markup-tool

  echo "Running start.sh..."
  chmod +x start.sh 
  source ./start.sh
else
  echo "No additional tools started."
fi

# Optionally, you can add a message indicating that all services are started.
echo "All services started!"
