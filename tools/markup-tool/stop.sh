#!/bin/bash
kill -9 $(lsof -i tcp:1107 -t)