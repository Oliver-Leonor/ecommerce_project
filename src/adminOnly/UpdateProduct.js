import { useState } from 'react'

const UpdateProduct = ({ product }) => {
  const [name, setName] = useState(product?.name || '')
  const [description, setDescription] = useState(product?.description || '')
  const [price, setPrice] = useState(product?.price || '')
  const [isLoadingg, setIsLoading] = useState(false)
  const id = product?._id

  const handleSubmit = async (e) => {
    setIsLoading(true)

    try {
      const res = await fetch(
        `https://capstone2-leonor.onrender.com/products/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ name, description, price }),
        }
      )
      if (!res.ok) {
        throw new Error(res.statusText)
      }
    } catch (err) {
      console.error(err)
    }
    setIsLoading(false)
    alert('Product has been edited!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type='text'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button type='submit'>Update Product</button>

      {isLoadingg && <h5>Product is updating...</h5>}
    </form>
  )
}

export default UpdateProduct
