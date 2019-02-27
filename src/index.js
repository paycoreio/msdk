const { fetch } = require("whatwg-fetch");

function SDK(options = {}) {
  try {
    let apiKey = options.apiKey ? options.apiKey : undefined;
    if (!apiKey) {
      throw new Error({
        message: "No API key passed on init"
      });
    }

    let currency = options.currency ? options.currency : undefined;
    let BASE_URL = options.BASE_URL
      ? options.BASE_URL
      : "https://com-dev.paycore.io/public-api";

    // REQUESTS
    /**
     * API request
     * @promise
     * @fulfill {object} paycore data
     * @reject {Error} Network error (if no connection to API)
     * @reject {Error} Paycore error (404 or wrong API key)
     */

    /**
     * API request for merchant public API
     * @param  {string} method      The HTTP method to use
     * @param  {string} endpoint    The API endpoint to request
     *
     * @param  {Object} [data={}]   The HTTP request body (non-GET only)
     * @param  {Object} [params={}] The HTTP query parameters (GET only)
     *
     * @param  {string} [headers={}]    The request headers
     * @return {RequestPromise}
     */

    const request = (
      method,
      endpoint,
      data = {},
      params = {},
      headers = {}
    ) => {
      return fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(data)
      })
        .then(res => {
          //  We use fetch, so we need to convert fetch response to a json
          return res.json();
        })
        .then(data => {
          debugger;
          if (data.errors) {
            throw {
              api: true,
              data: data.errors
            };
          }
          return data;
        })
        .catch(error => {
          if (error.api) {
            throw {
              message: "Api error",
              error: error.data
            };
          } else {
            throw {
              error,
              message: "Network Error"
            };
          }
        });
    };

    const SDK = {
      BASE_URL,
      apiKey,
      currency,
      // API abstraction
      request,

      /**
       * POST  method.
       * @param  {string} endpoint  The endpoint to post
       * @param  {Object} [body={}] The HTTP request body
       * @return {RequestPromise}
       */
      post(endpoint, body, headers) {
        return this.request("POST", endpoint, body, {}, headers);
      },

      /**
       * Payment prerequest .
       * @param  {String} currency  The currency of the amount (3-letter ISO 4217 code). Must be a supported currency.
       * @param  {Number}  Not required amount, can be null or float
       * @return {RequestPromise}
       */

      makePaymentPrerequest(currency, amount) {
        if (!currency && !this.currency) {
          throw {
            message: "Client Validation Error",
            error: "No currency passed"
          };
        }
        const body = {
          public_key: this.apiKey,
          currency: currency ? currency : this.currency ? this.currency : null,
          amount
        };
        return this.post(`${this.BASE_URL}/payment-prerequest`, body, {
          "Content-Type": "application/json"
        });
      },

      /**
       * Payment prerequest .
       * @param  {String} currency  The currency of the amount (3-letter ISO 4217 code). Must be a supported currency.
       * @param  {Number}  Not required amount, can be null or float
       * @return {RequestPromise}
       */

      makePayoutPrerequest(currency, amount) {
        if (!currency) {
          throw {
            message: "Client Validation Error",
            error: "No currency passed"
          };
        }
        const body = {
          public_key: this.apiKey,
          currency,
          amount
        };
        return this.post(`${this.BASE_URL}/payout-prerequest`, body, {
          "Content-Type": "application/json"
        });
      }
    };

    return SDK;
  } catch (e) {
    throw e;
    console.error("Error", e.message);
  }
}

module.exports = SDK;
