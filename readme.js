/**
 * callbag-date-timer
 * ------------------
 *
 * Callbag source that after given Date emits numbers
 * in sequence to a specified period.
 *
 * `npm install callbag-date-timer`
 *
 * Examples
 * --------
 *
 * Emitting sometime in the future:
 *
 *    import forEach from 'callbag-for-each'
 *    import pipe from 'callbag-pipe'
 *    import timer from 'callbag-date-timer'
 *
 *    const date = new Date(Date.now() + 10000)
 *
 *    pipe(
 *      timer(date),
 *      forEach(value => {
 *        // will log 0
 *        console.log(value)
 *      }),
 *    )
 *
 * Starting a period sometime in the future:
 *
 *    import forEach from 'callbag-for-each'
 *    import pipe from 'callbag-pipe'
 *    import timer from 'callbag-date-timer'
 *
 *    const date = new Date(Date.now() + 10000)
 *
 *    pipe(
 *      timer(date, 2000),
 *      forEach(value => {
 *        // will log 0 1 2 3 4 ...
 *        console.log(value)
 *      }),
 *    )
 *
 * Starting in the past:
 *
 *    import forEach from 'callbag-for-each'
 *    import pipe from 'callbag-pipe'
 *    import timer from 'callbag-date-timer'
 *
 *    const date = new Date(Date.now() - 10000)
 *
 *    pipe(
 *      timer(date, 2000),
 *      forEach(value => {
 *        // will log 5 6 7 8 9 ...
 *        console.log(value)
 *      }),
 *    )
 */

// Taken from: https://github.com/Andarist/callbag-timer
const dateTimer = (delay, period) =>
  (start, sink) => {
    if (start !== 0) return
    let i = 0

    const now = Date.now()
    if (delay < now) {
      if (period === undefined) {
        return
      }
      const elapsed = now - delay
      i = (elapsed / period) | 0
      delay = elapsed % period
    } else {
      delay = delay - now
    }

    let timerId = setTimeout(() => {
      sink(1, i++)

      if (period === undefined) {
        sink(2)
        return
      }

      timerId = setInterval(() => {
        sink(1, i++)
      }, period)
    }, delay)

    sink(0, t => {
      if (t === 2) {
        // timeouts & intervals share the same pool of IDs
        clearTimeout(timerId)
      }
    })
  }

module.exports = dateTimer
