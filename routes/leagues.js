var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', (req, res, next) => {
    res.render('leagues', { title: 'Leagues' });
})

router.get('/data', function(req, res, next) {
    try {
        res.end(fs.readFileSync('./data/leagues.json'));
    } catch (err) {
        res.end('[]');
    }
});


module.exports = router;