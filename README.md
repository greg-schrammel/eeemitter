## eeemiter

yet another js event emitter

- ✅ Super simple and small
- 🥳 Typesafe
- 📦 Zero deps

```sh
npm install eeemitter

yarn add eeemitter

pnpm add eeemitter
```

### Usage

```ts
import { createEventEmitter } from 'eeemitter'

type MyEvents = { type: 'foo'; payload: string } | { type: 'bar'; payload: { foo: 'lalala' } }

const events = createEventEmitter<MyEvents>()

// register listener
const unsubscribe = events.on('bar', (payload) => {
  // payload type infered from event type
  payload.foo
})

// emit event, typesafe, autocompleted, payload is string...
events.emit('foo', 'bar')

// once: auto unsubscribes after first execution
events.once('foo', (s) => s)

// remove listeners by event type
event.remove('bar')

// clear all listeners
event.clear()
```
