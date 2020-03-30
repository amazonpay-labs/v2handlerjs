/**
 * Settings
 */
// Log Level
console.log = console.log.bind(null, '[LOG]');
console.error = console.error.bind(null, '[ERR]');

//V2 Api Interface
const V2Handler = require('./handler/v2Handler');

/**
 * Main Logic 
 */
exports.handler = (event, context, callback) => {
    try {
        console.log(`[request]${event.body}`);
        
        const request = JSON.parse(event.body);

        const apiName = request.action.toLowerCase();
        delete request["action"];

        let headers = null;
        if(request.idempotencyKey) {
            headers = {
                'x-amz-pay-idempotency-key': request.idempotencyKey
            };
            delete request["idempotencyKey"];
        }
        
        const apiCall = V2Handler.execute(apiName, request, headers);
        
        apiCall.then(res => {
            console.log(`[response]${res.body}`);
            context.succeed(new Response(200, res.body));
        }).catch(err => {
            console.error(err);
            console.error(err.stack);
            const message = err.message ? err.message : err.body ? err.body : "unknown error";
            
            context.done(null, new Response(500, {"message": `${apiName}: An unexpected error has occurred.`, "error": message}));
        });
        
    } catch(err) {
        console.error(err);
        const message = err.message ? err.message : err.body ? err.body : "unknown error.";
        
        context.done(null, new Response(500, {"message": "An unexpected error has occurred", "error": message}));
    }

};

class Response {
    constructor(statusCode, body, headers) {
        this.statusCode = statusCode ? statusCode : 500;
        this.headers = headers ? headers : {};
        this.body = body ? body : "";
    }
}