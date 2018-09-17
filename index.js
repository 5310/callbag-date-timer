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
      delay = period - elapsed % period
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
