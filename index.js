const AbortController = require('abort-controller')
const retimer = require('retimer')

class TimeoutController extends AbortController {
  /**
   * @constructor
   * @param {number} ms milliseconds
   */
  constructor (ms) {
    super()
    this._ms = ms
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

  /**
   * Resets the timer
   */
  reset () {
    this._timer.clear()
    this._timer = retimer(() => this.abort(), this._ms)
  }
}

module.exports = TimeoutController
module.exports.TimeoutController = TimeoutController
