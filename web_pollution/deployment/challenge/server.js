const express = require('express');
const bodyParser = require('body-parser');
const secret = require('./secret');
const path = require('path');
const app = express();

app.use(bodyParser.text());
app.use('/static', express.static(path.resolve('static')));

app.get('/', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname });
})

app.post('/register', (req, res) => {
    try {
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
        
        const baseUser = {
            "picture": "profile.jpg"
        }
        
        let newUser = Object.assign(baseUser, user);
        // console.log(newUser.__proto__)
        if(newUser.role === "Admin") {
            return res.send({
                "message": "Here is your flag!",
                secret: secret.value
            });
        }

        else return res.send({
            "message": "No Admin? no flag!"
        });
    } catch (error) {
        console.log(error);
    }
})

const port = 1337;
app.listen(port, () => {
    console.log(`Listening at port:${port}`);
})