export const nonNull = <T>(value: T): value is Exclude<T, null> =>
  value !== null