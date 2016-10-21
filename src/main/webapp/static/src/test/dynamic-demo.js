module.exports = function(req, res, next) {
    var Mock = require('mockjs');
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    });
//res.write('Hello world ');

// set custom header.
// res.setHeader('xxxx', 'xxx');

res.end(JSON.stringify(data, null, 4));
};