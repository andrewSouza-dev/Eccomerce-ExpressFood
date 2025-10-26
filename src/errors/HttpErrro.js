class HttpError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status


        // Captura o stack trace corretamente (boa prática)
        if (Error.captureStackTrace) {
        Error.captureStackTrace(this, HttpError)
        }
    }   
}

module.exports = HttpError