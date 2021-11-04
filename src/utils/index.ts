import { useState, useEffect } from 'react'

export const isFalsy = (value: any) => (value === 0 ? false : !value)
export const cleanObject = (object: object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key]
    // @ts-ignore
    if (isFalsy(value)) delete result[key]
  })
  return result
}

export const useDebounce = (value: any, delay?: number) => {
  const [newValue, setNewValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setNewValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return newValue
}
