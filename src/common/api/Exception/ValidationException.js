import Exception from './Exception'

class ValidationException extends Exception {
  constructor (errors, message, id) {
    super(message, id)
    // console.warn('Errors ', JSON.stringify(errors))
    this.errors = errors
  }
}

export default ValidationException
