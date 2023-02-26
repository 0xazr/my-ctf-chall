#!/bin/bash
docker rm -f web_pasteit
docker build -t web_pasteit . 
docker run --name=web_pasteit --rm -p4512:80 -it web_pasteit
