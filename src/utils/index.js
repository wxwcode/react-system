import { useState, useEffect } from 'react'

export const isFalsy = (value) => (value === 0 ? false : !value)
export const cleanObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) delete result[key]
  })
  return result
}

export const useDebounce = (value, delay) => {
  const [newValue, setNewValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setNewValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return newValue
}
