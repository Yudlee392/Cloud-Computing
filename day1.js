const express = require('express')
const app = express()
const port = 3030
const path = require('path');

/* app.get('/', function (req, res, next) {
    var options = {
        root: path.join(__dirname)
    };

    var fileName = 'day1.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});
*/

const requestDay = function (req, res, next) {
    const days = ["Input from 1 to 7", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    req.requestDay = days[2];
}

app.use(requestDay);
app.get('/', (req, res) => {
    responseText += `<small>Requested at: ${req.requestDay}</small>`
    res.send(responseText);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})