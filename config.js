/**
 * v2 api configration
 */ 
module.exports = {
    getApiClientArgs : getApiClientArgs
};

function getApiClientArgs() {

    let config = {
        publicKeyId: process.env.PublicKeyId,
        privateKey: process.env.PrivateKey.replace(/\\n/g, '\n'),
        region: process.env.Region ? process.env.Region.toLowerCase() : 'jp'
    };

    if(toBoolean(process.env.Sandbox))
        config.sandbox = true;

    return config;
}

function toBoolean(boolean) {
    const sandbox = boolean || 'true';
    return sandbox.toLowerCase() === 'true';
}