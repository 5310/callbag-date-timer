callbag-date-timer
------------------

Callbag source that after given Date emits numbers in sequence to a specified period.

[![npm version](https://badge.fury.io/js/callbag-date-timer.svg)](https://badge.fury.io/js/callbag-date-timer) 
[![Build Status](https://travis-ci.org/5310/callbag-date-timer.svg?branch=master)](https://travis-ci.org/5310/callbag-date-timer)

## Examples

### Emitting Sometime in the Future

```js
import forEach from 'callbag-for-each'
import pipe from 'callbag-pipe'
import timer from 'callbag-date-timer'

const date = new Date(Date.now() + 10000)

pipe(
  timer(date),
  forEach(value => {
    // will log 0
    console.log(value)
  }),
)
```

### Starting a Period Sometime in the Future

```js
import forEach from 'callbag-for-each'
import pipe from 'callbag-pipe'
import timer from 'callbag-date-timer'

const date = new Date(Date.now() + 10000)

pipe(
  timer(date, 2000),
  forEach(value => {
    // will log 0 1 2 3 4 ...
    console.log(value)
  }),
)
```

### Starting in the Past

```js
import forEach from 'callbag-for-each'
import pipe from 'callbag-pipe'
import timer from 'callbag-date-timer'

const date = new Date(Date.now() - 10000)

pipe(
  timer(date, 2000),
  forEach(value => {
    // will log 5 6 7 8 9 ...
    console.log(value)
  }),
)
```
