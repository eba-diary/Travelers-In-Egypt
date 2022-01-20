/**
 * @fileoverview check-status.mjs - provides a fetch response status checker that throws if it's not ok
 */

/**
 * Checks if a fetch response is OK, throws otherwise
 * @param {Response} response fetch response
 * @returns {Response} fetch response
 */
 function checkStatus(response) {
  if (response.ok) return response;
  throw Error("Error in request: " + response.statusText)
 }

 export default checkStatus;