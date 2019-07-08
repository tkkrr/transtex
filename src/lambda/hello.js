const request = require('request')
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')


const NAME = process.env.NAME
const KEY = process.env.KEY
const SECRET = process.env.SECRET
const URL = process.env.URL


const oauth = OAuth({
    consumer: {
        key: KEY,
        secret: SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto
            .createHmac('sha1', key)
            .update(base_string)
            .digest('base64')
    },
})
 


exports.handler = (event, context, callback) => {

    const request_data = {
        url: URL,
        method: 'POST',
        data: { 
            key: KEY,
            name: NAME,
            // text: "Goodbye, Bob."
            text: event.queryStringParameters.text
        },
    }
    
    request(
        {
            url: URL,
            method: "POST",
            form: oauth.authorize(request_data),
        },
        (error, response, body) => {
            // console.log(
            //     JSON.parse(body).resultset.result.text
            // )
            const res = {
                statusCode: 200,
                // headers: {
                //     "Content-Type": "application/json",
                //     "Access-Control-Allow-Origin" : "*"
                // },
                body : JSON.parse(body).resultset.result.text,
                // isBase64Encoded: false     
            }
            callback(null, res)
        }
    )
}
