import { useCallback, useState, useEffect, RefObject } from 'react'

const useClientRect = <T extends HTMLElement>(ref: RefObject<T | null>) => {
  if (!ref) return null

  const [rect, setRect] = useState<DOMRect | null>(null)

  const updateRect = useCallback(() => {
    if (ref.current) {
      const clientRect = ref.current.getBoundingClientRect()
      setRect(clientRect)
    } else {
      setRect(null)
    }
  }, [ref])

  useEffect(() => {
    updateRect()
    window.addEventListener('resize', updateRect)
    return () => window.removeEventListener('resize', updateRect)
  }, [updateRect])

  return rect
}

export default useClientRect