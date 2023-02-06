# eeemiter

yet another js event emmiter

- 🥳 Typesafe
- 📦 Zero deps

### Usage

```ts
import { createEventEmmiter } from 'eeemiter'

type MyEvents =
  | { type: 'foo'; payload: string }
  | { type: 'bar'; payload: { foo: 'bar' } }

const events = createEventEmmiter<MyEvents>()

// register listener
events.on('bar', (payload) => {
  // payload type infered from event type
  payload.foo // bar
})

// emit event, typesafe, autocompleted, payload is string...
events.emit('foo', 'bar')
```
