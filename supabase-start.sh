#!/bin/bash

# Get the IDs of containers with the specified ancestor image
container_ids=$(docker ps -q --filter ancestor=supabase/supabase)

if [ -n "$container_ids" ]; then
  # Stop the containers if there are any
  supabase stop
fi

# Start Supabase
supabase start
