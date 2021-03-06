// gitupdate.js

var http = require('http')
var createHandler = require('./git-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'xxx' })
var count = 0

function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function() { callback(resp) });
}

http.createServer(function(req, res) {
    handler(req, res, function(err) {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(9096)

handler.on('error', function(err) {
    console.error('Error:', err.message)
})

handler.on('push', function(event) {
    console.log('receive webhook success')
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
    run_cmd('sh', ['./webhook.sh', event.payload.repository.name], function(text) { console.log(text) });
})

handler.on('merge', function(event) {
    count = count + 1
    console.log('receive merge success ')
    if (count % 3 == 0) {

        console.log('Received a merge event for %s to %s',
            event.payload.repository.name,
            event.payload.ref)
        run_cmd('sh', ['./webhook.sh', event.payload.repository.name], function(text) { console.log(text) });
    }

})

handler.on('issues', function(event) {
    console.log('Received an issue event for %s action=%s: #%d %s',
        event.payload.repository.name,
        event.payload.action,
        event.payload.issue.number,
        event.payload.issue.title)
})