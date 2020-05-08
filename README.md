# v2handlerjs

You can execute amazon pay v2 api on AWS Lambda by using the project.

# Requirements
* AWS lambda
* node.js

# How To Use
## How To Request
set the following json parameter and then execute this project.

### CreateCheckoutSession

#### Request body

```
{
    "action": "CreateCheckoutSession",
    "webCheckoutDetail": {
        "checkoutReviewReturnUrl":"https://a.com/merchant-review-page"
    },
    "storeId":"amzn1.application-oa2-client.xxxStoreId"
}
```

#### Response
[CreateCheckoutSession response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/checkout-session.html#create-checkout-session)

### GetCheckoutSession

#### Request body

```
{
    "action": "GetCheckoutSession",
    "checkoutSessionId": "xxx"
}
```

#### Response
[GetCheckoutSession response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/checkout-session.html#get-checkout-session)

### UpdateCheckoutSession

#### Request body

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

#### Response
[UpdateCheckoutSession response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/checkout-session.html#update-checkout-session)

### CompleteCheckoutSession

#### Request body

```
{
    "action": "CompleteCheckoutSession",
    "checkoutSessionId":"XXX",
    "chargeAmount": {
        "amount":"14.00",
        "currencyCode":"USD"
    }
}
```

#### Response
[CompleteCheckoutSession response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/checkout-session.html#complete-checkout-session)

### GetChargePermission

#### Request body

```
{
    "action": "GetChargePermission",
    "chargePermissionId": "P21-1111111-1111111"
}
```

#### Response
[GetChargePermission response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/charge-permission.html#get-charge-permission)

### UpdateChargePermission

#### Request body

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

#### Response
[UpdateChargePermission response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/charge-permission.html#update-charge-permission)

### CloseChargePermission

#### Request body

```
{
    "action": "CloseChargePermission",
    "chargePermissionId": "P21-1111111-1111111",
    "closureReason":"No more charges required",
    "cancelPendingCharges":false
}
```

#### Response
[CloseChargePermission response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/charge-permission.html#close-charge-permission)

### CreateCharge

#### Request body

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

#### Response
[CreateCharge response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/charge.html#create-charge)

### GetCharge

#### Request body

```
{
    "action": "GetCharge",
    "chargeId": "P21-1111111-1111111-C111111"
}
```

#### Response
[GetCharge response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/charge.html#get-charge)

### CaptureCharge

#### Request body

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

#### Response
[CaptureCharge response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/charge.html#capture-charge)

### CancelCharge

#### Request body

```
{
    "action": "CancelCharge",
    "chargeId": "P21-1111111-1111111-C111111",
    "cancellationReason":"REASON DESCRIPTION"
}
```

#### Response
[CancelCharge response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/charge.html#cancel-charge)

### CreateRefund

#### Request body

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

#### Response
[CreateRefund response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/refund.html#create-refund)

### GetRefund

#### Request body

```
{
    "action": "GetRefund",
    "refundId": "S01-5105180-3221187-R022311"
}
```

#### Response
[GetRefund response](http://amazonpaycheckoutintegrationguide.s3.amazonaws.com/amazon-pay-api-v2/refund.html#get-refund)

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
