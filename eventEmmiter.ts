export type Event = { type: string; payload?: unknown }

type InferPayload<E extends Event, Type> = E extends {
  type: Type
  payload: infer A extends E['payload']
}
  ? A
  : undefined

type EmitFunction<E extends Event> = <
  T extends E['type'],
  Payload extends InferPayload<E, T> extends undefined ? [payload?: never] : [payload: Payload],
>(
  event: T,
  ...args: Payload
) => void

type SubscribeFunction<E extends Event> = <
  T extends E['type'],
  Payload extends InferPayload<E, T>,
  Fn extends E extends { type: T; payload: Payload } ? (payload: Payload) => void : VoidFunction,
>(
  event: T,
  fn: Fn,
) => () => void

export const createEventEmmiter = <E extends Event>() => {
  const listeners: Record<string, Set<(payload: E['payload']) => void>> = {}

  const on: SubscribeFunction<E> = (event, fn) => {
    listeners[event] ??= new Set()
    listeners[event].add(fn)
    return () => {
      listeners[event].delete(fn)
    }
  }

  const once: SubscribeFunction<E> = (event, fn) => {
    const unsubscribe = on(event, ((payload: any) => {
      unsubscribe()
      ;(fn as any)(payload)
    }) as any)
    return unsubscribe
  }

  const emit: EmitFunction<E> = (event, ...args) => listeners[event]?.forEach((fn) => fn(args[0]))

  const remove = (event: E['type']) => delete listeners[event]

  function clear() {
    Object.keys(listeners).forEach((key) => {
      listeners[key].clear()
    })
  }

  return { listeners, on, once, emit, clear, remove }
}
