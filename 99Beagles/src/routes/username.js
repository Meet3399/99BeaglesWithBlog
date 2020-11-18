global.fetch = require('node-fetch');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');


const poolData = {
    UserPoolId: "ap-south-1_XoSVXEE6X",
    ClientId: "1gnasru3ip9m5fsonvakbc58te"
};
const pool_region = "ap-south-1";

export async function post(req, res) {
    res.setHeader('Content-Type', 'application/json');
    request({
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
        json: true
    }, function (error, response, body) {
        //console.log(error , response , body)
        if (!error && response.statusCode === 200) {
            const pems = {};
            var keys = body['keys'];
            for (var i = 0; i < keys.length; i++) {
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent };
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            //Validating the jwt tokens
            var decodedJwt = jwt.decode(req.body.token, { complete: true });
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                res.json('Please login');
            }
            const { header } = decodedJwt;
            const { kid } = header
            //console.log(kid)
            var pem = pems[kid];
            //console.log(pem)
            if (!pem) {
                console.log('Invalid token');
                res.json('Please login with correct credentials');
            }
            jwt.verify(req.body.token, pem, function (err, payload) {
                if (err) {
                    console.log("Invalid Token in verification");
                    res.json('Please login with correct credentials');
                } else {
                    // console.log(payload.name)
                    res.send(payload)
                    // console.log("Valid Token.");


                }
            })
        }
        else {
            console.log("Error! Unable to download JWKs");
            res.send(error)
        }
    });

}