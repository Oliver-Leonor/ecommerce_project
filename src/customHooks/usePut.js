import { useState } from 'react'

const usePut = (url) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const putData = async (data) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return [loading, error, putData]
}

export default usePut
