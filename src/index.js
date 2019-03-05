const axios = require("axios");
const qs = require("qs");
/**
 * Initialize the SDK instance
 *
 * @param {String} [options.apiKey] Public API key *required
 * @param {String} [options.currency] Currency *required
 * @param {String} [options.BASE_URL] Base URL
 *
 */
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

    const SDK = {
      BASE_URL,
      apiKey,
      currency,
      axios: axios.create({
        paramsSerializer: qs.stringify
      }),

      /**
       * API request
       * @promise
       * @fulfill {object} paycore data
       * @reject {Error} Network error (if no connection to API)
       * @reject {Error} Paycore error (404 or wrong API key)
       */

      /**
       * API request for merchant public API
       * @param  {string} endpoint    The API endpoint to request
       * @param  {string} method      The HTTP method to use
       *
       * @param  {Object} [params={}] The HTTP query parameters (GET only)
       * @param  {Object} [data={}]   The HTTP request body (non-GET only)
       *
       * @param  {string} [headers={}]    The request headers
       * @return {RequestPromise}
       */

      request(method, endpoint, data = {}, params = {}, headers = {}) {
        // TODO: add validation to passed arguments
        const options = {
          url: endpoint,
          method,
          data,
          headers
        };

        // Axios make auto json parse
        return this.axios
          .request(options)
          .then(res => res.data)
          .then(data => {
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
      },

      /**
       * POST  method
       * @param  {string} endpoint  The endpoint to post
       * @param  {Object} [body={}] The HTTP request body
       * @return {RequestPromise}
       */
      post(endpoint, body, headers) {
        return this.request("POST", endpoint, body, {}, headers);
      },

      /**
       *
       * @param {String} endpoint The endpoint to get
       * @param {Object} params Query parameters
       */

      get(endpoint, params = {}) {
        return this.request("GET", endpoint, params);
      },

      /**
       * Payment prerequest
       * @param  {String} currency  The currency of the amount (3-letter ISO 4217 code). Must be a supported currency.
       * @param  {Number}  Not required amount, can be null or float.
       * @param  {Array}  includes The optional relations for entity (PaymentService, PaymentMethod).
       * @return {RequestPromise}
       */

      makePaymentPrerequest(currency, amount, includes = []) {
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

        let qParams;
        if (includes.length) {
          qParams = qs.stringify({
            include: includes
          });
        }

        return this.post(
          `${this.BASE_URL}/payment-prerequest?${qParams ? qParams : ""}`,
          body,
          {
            "Content-Type": "application/json"
          }
        );
      },

      /**
       * Payment prerequest .
       * @param  {String} currency  The currency of the amount (3-letter ISO 4217 code). Must be a supported currency.
       * @param  {Array}  includes The optional relations for entity (PayoutService, PayoutMethod)
       *
       * @return {RequestPromise}
       */

      makePayoutPrerequest(currency, includes = []) {
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

        let qParams;
        if (includes.length) {
          qParams = qs.stringify({
            include: includes
          });
        }

        return this.post(
          `${this.BASE_URL}/payout-prerequest?${qParams ? qParams : ""}`,
          body,
          {
            "Content-Type": "application/json"
          }
        );
      },

      /**
       * Payout invoice status
       * @param {String} id
       */
      getPayoutInvoiceStatus(id) {
        return this.get(`${this.BASE_URL}/payout-invoices/${id}`);
      },

      /**
       * Payment invoice status
       * @param {String} id
       */

      getPaymentInvoiceStatus(id) {
        return this.get(`${this.BASE_URL}/payment-invoices/${id}`);
      }
    };

    return SDK;
  } catch (e) {
    throw e;
  }
}

module.exports = SDK;
