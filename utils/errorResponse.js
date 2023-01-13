class ErrorResponse extends Error {
    constructor(message, statusCode = 400, messageWithField = null) {
        super(message)
        this.statusCode = statusCode
        this.messageWithField = messageWithField
    }
}

module.exports = ErrorResponse
