#!/bin/bash

cd web

npm run build

cd ../

vsce package
