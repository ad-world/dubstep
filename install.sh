#!/bin/bash

# Run this file to create the virtual env and install all backend dependencies

python3 -m venv .venv

source .venv/bin/activate

pip3 install -r backend/requirements.txt
