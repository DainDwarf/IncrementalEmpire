#!/bin/bash
set -euo pipefail

git rm assets/*
ember build --environment production -o dist/
cp dist/index.html .
cp dist/robots.txt .
cp -r dist/assets .
git add index.html robots.txt assets/*
