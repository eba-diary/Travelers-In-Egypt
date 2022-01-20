/**
 * Module that provides an error that can be handled by the error handler with a custom HTTP status
 * and error message
 * @module errorhandler
 */

 const { response } = require("express");

 class HandleableError extends Error {
   /**
    * Creates a handleable error
    * @param {Number} httpStatus   HTTP status code
    * @param {String} message      Error message
    */
   constructor(httpStatus, message) {
     super();
     this.httpStatus = httpStatus;
     this.message = message;
   }
 }

 /**
  * Handles either a HandleableError, responding with a status and message based on that or
  * if it's another kind of error, responding with 500 status code and generic server error message
  * @param {Error}     err Error object
  * @param {Response}  res Response object
  */
 const handleError = (err, res) => {
   let status;
   let responseBody;
   if ("httpStatus" in err) {
     status = err.httpStatus;
     responseBody = {status, message: err.message}
   } else {
     status = 500;
     responseBody = {status, message: "Internal server error"}
   }
   res.status(status)
     .type("json")
     .send(responseBody);
 };

 module.exports = {HandleableError, handleError};