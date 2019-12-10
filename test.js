const test = require('ava')
const TimeoutController = require('./')
const delay = require('delay')

const callCounter = () => {
  let count = 0
  const counter = function () {
    count++
  }
  counter.getCount = () => count
  return counter
}

test('aborts when the timer expires', async t => {
  const timeoutController = new TimeoutController(50)
  const counter = callCounter()
  timeoutController.signal.addEventListener('abort', counter)

  await delay(70)
  t.is(timeoutController.signal.aborted, true)
  t.is(counter.getCount(), 1)
})

test('can be manually aborted', async t => {
  const timeoutController = new TimeoutController(50)
  const counter = callCounter()
  timeoutController.signal.addEventListener('abort', counter)

  timeoutController.abort()
  await delay(70)
  t.is(timeoutController.signal.aborted, true)
  t.is(counter.getCount(), 1)
})

test('can clear the timeout', async t => {
  const timeoutController = new TimeoutController(50)

  timeoutController.clear()
  await delay(70)

  t.is(timeoutController.signal.aborted, false)
})
