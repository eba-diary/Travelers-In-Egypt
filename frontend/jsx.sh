#!/bin/bash

# renames js files to jsx

for file in *.js; do
    if [[ -f "$file" ]]; then
        new_name="${file%.js}.jsx"
        mv "$file" "$new_name"
        echo "Renamed: $file -> $new_name"
    fi
done

