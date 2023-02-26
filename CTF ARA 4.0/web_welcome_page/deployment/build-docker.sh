#!/bin/bash
docker rm -f web_welcome_page_client
docker rm -f web_welcome_page_admin
docker build -t web_welcome_page_client client
docker build -t web_welcome_page_admin admin-bot 
docker run -d --name=web_welcome_page_client --rm -p8413:80 -it web_welcome_page_client
docker run --name=web_welcome_page_admin --rm -p8414:80 -it web_welcome_page_admin