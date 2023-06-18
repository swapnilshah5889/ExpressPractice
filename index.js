const express = require('express');

const app = express();
// Middleware to parse JSON and URL-encoded bodies
// const bodyParser = require('body-parser');  
// app.use(bodyParser.urlencoded({ extended: false })); // Handle xxx-form-urlencoded data in post request
// app.use(bodyParser.json()) // Handle json data in post request
const multer = require('multer'); // Handle form-data in post request
const upload = multer();

const port = 3000;


function handleRootURL(req, res) {
    res.send('Hello, World!');
};


function onServerStart() {
    console.log('Server is running on http://localhost:'+port);
}

function handleSearchRequest(req, res) {
    let response = {'data':{}};
    for(key in req.query) {
        console.log(key + " : " + req.query[key]);
        response['data'][key] = req.query[key];
    }
    response['status'] = true;
    res.json(response);
}

function handleSumOfNIntegers(req, res) {
    let data = req.body;
    console.log('Data Received: ' + JSON.stringify(data));
    if('counter' in req.body) {
        let n = req.body.counter;
        let sum = 0;
        for( let i=1; i<=n; i++ ) {
            sum += i;
        }
        res.json({status:true, msg:'Success', data:{'sum':sum}});
    }
    else {
        res.json({status:false, msg:'bad request'});
    }
}

//Calculate sum of first N integers
app.post('/GetSum', upload.none(), handleSumOfNIntegers);

app.post('/Demo', (req, res)=> {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});

// Get Request with Params and JSON Response
app.get('/search', handleSearchRequest);

// Root URL
app.get('/', handleRootURL);

// Start the server
app.listen(port, onServerStart);