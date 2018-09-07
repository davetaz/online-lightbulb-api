const express = require('express'); // Library than creates and manages REST requests
const ejs = require('ejs'); // Library to render HTML pages for web browsers
var json2csv = require('json2csv'); // Library to create CSV for output

const app = express(); // Initialise the REST app
app.use(express.static('public'))
var bulbs = [];

for (i=1;i<11;i++) {
    bulbs[i] = {};
    bulbs[i].isOn = false;
}

/* 
 * Function to handle the users REST request
 */
function returnState(req,res) {
    // Work out what the client asked for, the ".ext" specified always overrides content negotiation
    ext = req.params["ext"];
    bulbId = req.params["bulbId"];
    // If there is no extension specified then manage it via content negoition, yay!
    if (!ext) {
        ext = req.accepts(['json','csv','html']);
    }

    // Return the data to the user in a format they asked for
    // CSV, JSON or by default HTML (web page)
    result = [];
    url = "bulb.html";
    if (bulbId) {
        result.push({"bulbId": bulbId, "isOn": bulbs[bulbId].isOn });
    } else {
        url = "grid.html";
        for (i=1;i<11;i++) {
            result.push({"bulbId": i, "isOn": bulbs[i].isOn });
        }
    }
    if (ext == "csv") {
        res.set('Content-Type', 'text/csv');
        res.send(json2csv({data: result}));
    } else if (ext == "json") {
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(result,null,4));
    } else {
        ejs.renderFile(__dirname + '/' + url, { path: req.path, query: req.query, bulbId: bulbId }, function(err,data) {
            res.send(data);
        });
    }
};


/* 
 * Function to handle the users REST request
 */
function switchOnOff(req,res,state) {
    bulbId = req.params["bulbId"];
    if (state == "on") {
        bulbs[bulbId].isOn = true;
    } else {
        bulbs[bulbId].isOn = false;
    }
    returnState(req,res);
};


app.get('/bulbs.:ext',function(req,res) { returnState(req,res); })
app.get('/bulbs',function(req,res) { returnState(req,res); })
app.get('/bulbs/:bulbId.:ext',function(req,res) { returnState(req,res); })
app.get('/bulbs/:bulbId',function(req,res) { returnState(req,res); })
app.get('/bulbs/:bulbId/on',function(req,res) { switchOnOff(req,res,"on"); })
app.get('/bulbs/:bulbId/off',function(req,res) { switchOnOff(req,res,"off"); })
app.put('/bulbs/:bulbId/on',function(req,res) { switchOnOff(req,res,"on"); })
app.put('/bulbs/:bulbId/off',function(req,res) { switchOnOff(req,res,"off"); })

/*
 * Set the available REST endpoints and how to handle them
 */
app.get('/', function(req,res) { showBulb(req,res); });

/*
 * Start the app!
 */
app.listen(8080, () => console.log('Example app listening on port 8080!'));