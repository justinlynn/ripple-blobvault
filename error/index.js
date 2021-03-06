var domain = require('domain');
var d = domain.create();
var bindObject = function(obj1,binder) {
    Object.keys(obj1).forEach(function(key) {
        if (obj1.hasOwnProperty(key)) {
            obj1[key] = d.bind(obj1[key]);
        }
    });
}
d.on('error',function (obj) {
    if (obj.res) {
        if (obj.error !== undefined) {
            console.log("API Error",obj.error + " " + new Date());
            obj.res.writeHead(obj.statusCode || 400, {
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': '*' 
            })
            obj.res.end(JSON.stringify({result:'error',message:obj.error.message}));
        }
    }
});
exports.setDomain = function(obj) {
    bindObject(obj);
}
