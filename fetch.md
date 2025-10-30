### kass https://launchschool.com/lessons/1b723bd0/assignments
### kass https://launchschool.com/lessons/1b723bd0/assignments/9beef168

### kass demo an example of using fetch to send a GET request
```js
async function simpleGet() {
  console.log('Fetching resource...');
  const response = await fetch('https://ls-230-xhr-demo.herokuapp.com/status/200');
  console.log('Got the resource!');
  console.log(response.status);
  console.log(response.statusText);
}
```

### what are some properties of a response object you should know?
body, headers, status, statuText, ok, url


### Explain why cant you use `response.body` and show alternatives
```js
const response = await fetch(url);
const plainTextOrHTML = response.text()
const json = response.json()
const blob = response.blob()
```


### kass do you know how to execute code at specific points as a request moves through its life cycle?

```js
```

### kass demonstrate handling successful/unsuccessful requests
```js
```

### kass use fetch to submit a form from a web page
a: you create an instance of FormData that can serialize the form
instead of writing the parsing logic yourself

```js
const formElement = document.querySelector("form"); // select your form
const formData = new FormData(formElement); // create FormData instance from the form

```
fetch("your-endpoint-url", {
  method: "POST",
  body: formData, // send the serialized form data
}).then(response => {
  // handle the response
});

do you know how to send requests using JSON-formatted data?

```js
```

how do you serialize data? 
what does that even mean?
how do you serialize data into
1. query string/url encoding
2. multi-part form data
3. JSON

```js
```

// send Content-Type header with fetch so the server
// can parse it
fetch('http://example.com/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Alice', age: 30})
})


// "create a post on the server"
// "make a POST request to /posts with the required JSON data"

// -> means make a post request using fetch
// you will have to pass an options object to fetch
// like so: fetch(url, options);
