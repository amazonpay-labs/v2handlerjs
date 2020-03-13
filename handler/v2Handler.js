/**
 * Settings
 */
// V2 api modules
const { v4: uuidv4 } = require('uuid');
const Client = require('../sdk/client');
const {V2Interface, V2Api} = require('./v2Interface');

// v2 api configration
const config = require('../config');

module.exports = {
    execute: execute
};

/**
 * V2 Apis Implements
 */
/** CreateCheckoutSession */
// {
//     "action": "CreateCheckoutSession"
// }
const createCheckoutSession = new V2Api('createcheckoutsession', (request, headers) => {
    const payload = {
        webCheckoutDetail: {
            checkoutReviewReturnUrl: process.env.CheckoutReviewReturnUrl
        },
        storeId: process.env.StoreId
    };
    
    headers = headers || {
        'x-amz-pay-idempotency-key': uuidv4().toString().replace(/-/g, '')
    };

    return apiCall((payClient) => {
        return payClient.createCheckoutSession(payload, headers);
    });
});

/** GetCheckoutSession */
// {
//     "action": "GetCheckoutSession",
//     "checkoutSessionId": "xxx"
// }
const getCheckoutSession = new V2Api('getcheckoutsession', (request, headers) => {
    return apiCall((payClient) => {
        return payClient.getCheckoutSession(request.checkoutSessionId, headers);
    });
});

/** UpdateCheckoutSession */
// {
//     "action": "UpdateCheckoutSession",
//     "checkoutSessionId":"XXX",
//     "webCheckoutDetail": {
//         "checkoutResultReturnUrl":"https://a.com/merchant-confirm-page"
//     },
//     "paymentDetail": {
//         "paymentIntent":"Authorize",
//         "canHandlePendingAuthorization":true,
//         "chargeAmount": {
//             "amount":"100",
//             "currencyCode":"JPY"
//         }
//      },
//     "merchantMetadata": {
//         "merchantReferenceId":"Merchant reference ID",
//         "merchantStoreName":"Merchant store name",
//         "noteToBuyer":"Note to buyer",
//         "customInformation":"Custom information"
//     },
//     "platformId":"AXXXX"
// }
const updateCheckoutSession = new V2Api('updatecheckoutsession', (request, headers) => {
    return apiCall((payClient) => {
        const checkoutSessionId = request.checkoutSessionId;
        delete request["checkoutSessionId"];
        return payClient.updateCheckoutSession(checkoutSessionId, request, headers);
    });
});

/** GetChargePermission */
// {
//     "action": "GetChargePermission",
//     "chargePermissionId": "P21-1111111-1111111"
// }
const getChargePermission = new V2Api('getchargepermission', (request, headers) => {
    return apiCall((payClient) => {
        return payClient.getChargePermission(request.chargePermissionId, headers);
    });
});

/** UpdateChargePermission */
// {
//     "action": "UpdateChargePermission",
//     "chargePermissionId": "P21-1111111-1111111",
//     "merchantMetadata": {
//         "merchantReferenceId":"32-41-323141-32",
//         "merchantStoreName":"AmazonTestStoreFront",
//         "noteToBuyer":"Some Note to buyer",
//         "customInformation":""    
//      }
// }
const updateChargePermission = new V2Api('updatechargepermission', (request, headers) => {
    return apiCall((payClient) => {
        const chargePermissionId = request.chargePermissionId;
        delete request["chargePermissionId"];
        return payClient.updateChargePermission(chargePermissionId, request, headers);
    });
});

/** CloseChargePermission */
// {
//     "action": "CloseChargePermission",
//     "chargePermissionId": "P21-1111111-1111111",
//     "closureReason":"No more charges required",
//     "cancelPendingCharges":false
// }
const closeChargePermission = new V2Api('closechargepermission', (request, headers) => {
    return apiCall((payClient) => {
        const chargePermissionId = request.chargePermissionId;
        delete request["chargePermissionId"];
        return payClient.closeChargePermission(chargePermissionId, request, headers);
    });
});

/** CreateCharge */
// {
//     "action": "CreateCharge",
//     "chargePermissionId":"P21-1111111-1111111",
//     "chargeAmount": {
//         "amount":"1000",
//         "currencyCode":"JPY"
//     },
//     "captureNow":true, // default is false
//     "softDescriptor":"SOFT_DESCRIPTOR",
//     "canHandlePendingAuthorization":false //default is false
// }
const createCharge = new V2Api('createcharge', (request, headers) => {
    return apiCall((payClient) => {
        return payClient.createCharge(request, headers);
    });
});

/** GetCharge */
// {
//     "action": "GetCharge",
//     "chargeId": "P21-1111111-1111111-C111111"
// }
const getCharge = new V2Api('getcharge', (request, headers) => {
    return apiCall((payClient) => {
        return payClient.getCharge(request.chargeId, headers);
    });
});

/** CaptureCharge */
// {
//     "action": "CaptureCharge",
//     "chargeId": "P21-1111111-1111111-C111111",
//     "captureAmount":{
//         "amount":"1000",
//         "currencyCode":"JPY"
//     },
//     "softDescriptor":"SOFT_DESCRIPTOR"
// }
const captureCharge = new V2Api('capturecharge', (request, headers) => {
    return apiCall((payClient) => {
        const chargeId = request.chargeId;
        delete request["chargeId"];
        return payClient.captureCharge(chargeId, request, headers);
    });
});

/** CancelCharge */
// {
//     "action": "CancelCharge",
//     "chargeId": "P21-1111111-1111111-C111111",
//     "cancellationReason":"REASON DESCRIPTION"
// }
const cancelCharge = new V2Api('cancelcharge', (request, headers) => {
    return apiCall((payClient) => {
        const chargeId = request.chargeId;
        delete request["chargeId"];
        return payClient.cancelCharge(chargeId, request, headers);
    });
}); 

/** CreateRefund */
// {
//     "action": "CreateRefund",
//     "chargeId":"S01-5105180-3221187-C056351",
//     "refundAmount": {
//         "amount":"1000",
//         "currencyCode":"JPY"
//     },
//     "softDescriptor":"SOFT_DESCRIPTOR"
// }
const createRefund = new V2Api('createrefund', (request, headers) => {
    return apiCall((payClient) => {
        return payClient.createRefund(request, headers);
    });
}); 

/** GetRefund */
// {
//     "action": "GetRefund",
//     "refundId": "S01-5105180-3221187-R022311"
// }
const getRefund = new V2Api('getrefund', (request, headers) => {
    return apiCall((payClient) => {
        return payClient.getRefund(request.refundId, headers);
    });
});

/**
 * Api caller
 */
function apiCall(apiRequest) {
    try {
        const payClient = new Client.WebStoreClient(config.getArgs());
        return apiRequest(payClient);
    } catch(err) {
        console.error(err);
        throw Error(err);
    }
}

let v2Interface = null;
function execute(apiName, request = {}, headers = {}) {
    if(v2Interface == null) {
        v2Interface = new V2Interface();
        v2Interface.add(
            // checkoutSession
            createCheckoutSession, 
            getCheckoutSession,
            updateCheckoutSession,
            // chrgePermission
            getChargePermission,
            updateChargePermission,
            closeChargePermission,
            // charge
            createCharge,
            getCharge,
            captureCharge,
            cancelCharge,
            // refund
            createRefund,
            getRefund
        );
    }

    try {
        console.log(v2Interface);
        return v2Interface.get(apiName).call(request, headers);
    } catch(err) {
        console.error(err);
        throw Error("Api doesn't exist.");
    }
}