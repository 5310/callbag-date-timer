const test = require('tape')

const forEach = require('callbag-for-each')
const pipe = require('callbag-pipe')

const timer = require('./')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test('callbag-date-timer', (t) => {
  t.plan(4)
  {
    const actual = []

    pipe(timer(new Date(Date.now() + 10)), forEach(data => actual.push(data)))

    delay(20).then(() => {
      t.same(actual, [0], 'works with start Date')
    })
  }
  {
    const actual = []

    pipe(timer(new Date(Date.now() + 20), 10), forEach(data => actual.push(data)))

    delay(60).then(() => {
      t.same(actual, [0, 1, 2, 3], 'works with an optional period argument')
    })
  }
  {
    const actual = []

    pipe(timer(new Date(Date.now() - 20), 10), forEach(data => actual.push(data)))

    delay(60).then(() => {
      t.same(actual, [2, 3, 4, 5, 6], 'works with start Date in the past with a period')
    })
  }
  {
    const actual = []

    pipe(timer(Date.now() - 10), forEach(data => actual.push(data)))

    delay(20).then(() => {
      t.same(actual, [], 'does nothing with a start Date in the past if no period given')
    })
  }

  delay(1000).then(() => process.exit(0)) // needed due to leftover timeouts
})
