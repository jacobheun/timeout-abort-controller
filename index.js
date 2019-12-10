const AbortController = require('abort-controller')
const retimer = require('retimer')

class TimeoutController extends AbortController {
  /**
   * @constructor
   * @param {number} ms milliseconds
   */
  constructor (ms) {
    super()
    this._timer = retimer(() => this.abort(), ms)
  }

  /**
   * Aborts the controller and clears the timer
   */
  abort () {
    this._timer.clear()
    return super.abort()
  }

  /**
   * Clears the timer
   */
  clear () {
    this._timer.clear()
  }
}

module.exports = TimeoutController
module.exports.TimeoutController = TimeoutController
