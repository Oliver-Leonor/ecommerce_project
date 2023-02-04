import { useState, useEffect } from 'react'

const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [shouldFetch, setShouldFetch] = useState(false)

  const post = async (options) => {
    setIsPending(true)
    setError(null)

    try {
      const res = await fetch(url, {
        method: 'POST',
        ...options,
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json()
      setData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    if (shouldFetch) {
      const fetchData = async () => {
        setIsPending(true)
        setError(null)

        try {
          const res = await fetch(url, {
            method,
            signal: controller.signal,
          })
          if (!res.ok) {
            throw new Error(res.statusText)
          }
          const data = await res.json()
          setData(data)
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message)
          }
        } finally {
          setIsPending(false)
        }
      }

      fetchData()
      return () => {
        controller.abort()
      }
    }
  }, [shouldFetch, url, method])

  return { data, isPending, error, post, setShouldFetch }
}

export default useFetch
