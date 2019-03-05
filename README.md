# Merchant SDK

Merchant SDK is simple API client

# Installation

## You can use this package over CDN

For that you need to add this script iside your head tag on yout HTML template.

```html
<script src="https://unpkg.com/@paycore/merchant-sdk-js@0.1.1/dist/MerchantSDK.umd.min.js"></script>
```

```html
<script type= text/javascript
const PaycoreClient = new MerchantSDK(
    {
     apiKey: "*****" // Your public API key
    });
></script>
```

## Or via npm\yarn

```bash
yarn add @paycore/merchant-sdk-js
```

```javascript
const MerchantSDK = require("@paycore/merchant-sdk-js");

const client = new MerchantSDK({
  apiKey: "*****" // Your public API key
});

client
  .makePaymentPrerequest("USD")
  .then(res => console.log(res))
  .catch(e => {
    console.error("Error", e);
  });
```

## List of methods
