FROM python:3-alpine

# Install packages
RUN apt-get update \
    && apt-get install -y supervisor \
    && rm -rf /var/lib/apt/lists/*


# Setup app
RUN mkdir -p /app

# Add application
WORKDIR /app
COPY challenge .
RUN mv flag.txt /flag_$(echo $RANDOM|md5sum|head -c 10; echo;).txt
RUN pip install -r requirements.txt

# Setup superivsord
COPY config/supervisord.conf /etc/supervisord.conf

# Expose the port is reachable on
EXPOSE 80

# Start the application
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
