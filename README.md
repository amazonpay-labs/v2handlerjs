# v2handlerjs

You can execute amazon pay v2 api on AWS Lambda by using the project.

# Requirements
* AWS lambda
* node.js

# How To Use
## How To Request
set the following json parameter and then execute this project.

### CreateCheckoutSession

```
{
    "action": "CreateCheckoutSession",
    "webCheckoutDetail": {
        "checkoutReviewReturnUrl":"https://a.com/merchant-review-page"
    },
    "storeId":"amzn1.application-oa2-client.xxxStoreId"
}
```

### GetCheckoutSession

```
{
    "action": "GetCheckoutSession",
    "checkoutSessionId": "xxx"
}
```

### UpdateCheckoutSession

```
{
    "action": "UpdateCheckoutSession",
    "checkoutSessionId":"XXX",
    "webCheckoutDetail": {
        "checkoutResultReturnUrl":"https://a.com/merchant-confirm-page"
    },
    "paymentDetail": {
        "paymentIntent":"Authorize",
        "canHandlePendingAuthorization":true,
        "chargeAmount": {
            "amount":"100",
            "currencyCode":"JPY"
        }
     },
    "merchantMetadata": {
        "merchantReferenceId":"Merchant reference ID",
        "merchantStoreName":"Merchant store name",
        "noteToBuyer":"Note to buyer",
        "customInformation":"Custom information"
    },
    "platformId":"AXXXX"
}
```

### GetChargePermission

```
{
    "action": "GetChargePermission",
    "chargePermissionId": "P21-1111111-1111111"
}
```

### UpdateChargePermission

```
{
    "action": "UpdateChargePermission",
    "chargePermissionId": "P21-1111111-1111111",
    "merchantMetadata": {
        "merchantReferenceId":"32-41-323141-32",
        "merchantStoreName":"AmazonTestStoreFront",
        "noteToBuyer":"Some Note to buyer",
        "customInformation":""    
     }
}
```

### CloseChargePermission

```
{
    "action": "CloseChargePermission",
    "chargePermissionId": "P21-1111111-1111111",
    "closureReason":"No more charges required",
    "cancelPendingCharges":false
}
```

### CreateCharge

```
{
    "action": "CreateCharge",
    "chargePermissionId":"P21-1111111-1111111",
    "chargeAmount": {
        "amount":"1000",
        "currencyCode":"JPY"
    },
    "captureNow":true, default is false
    "softDescriptor":"SOFT_DESCRIPTOR",
    "canHandlePendingAuthorization":false //default is false
}
```

### GetCharge

```
{
    "action": "GetCharge",
    "chargeId": "P21-1111111-1111111-C111111"
}
```

### CaptureCharge

```
{
    "action": "CaptureCharge",
    "chargeId": "P21-1111111-1111111-C111111",
    "captureAmount":{
        "amount":"1000",
        "currencyCode":"JPY"
    },
    "softDescriptor":"SOFT_DESCRIPTOR"
}
```

### CancelCharge

```
{
    "action": "CancelCharge",
    "chargeId": "P21-1111111-1111111-C111111",
    "cancellationReason":"REASON DESCRIPTION"
}
```

### CreateRefund

```
{
    "action": "CreateRefund",
    "chargeId":"S01-5105180-3221187-C056351",
    "refundAmount": {
        "amount":"1000",
        "currencyCode":"JPY"
    },
    "softDescriptor":"SOFT_DESCRIPTOR"
}
```

### GetRefund

```
{
    "action": "GetRefund",
    "refundId": "S01-5105180-3221187-R022311"
}
```

## How To Set idempotencyKey
add ```idempotencyKey``` in your request json parameter.

For example. If you requet CreateCheckoutSession..

```
{
    "action": "CreateCheckoutSession",
    "idempotencyKey": "XXXXXX",
    ...
}
```
