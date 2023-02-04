import { useState } from 'react'
import usePut from '../customHooks/usePut'

const UpdateProduct = ({ product }) => {
  const [name, setName] = useState(product?.name || '')
  const [description, setDescription] = useState(product?.description || '')
  const [price, setPrice] = useState(product?.price || '')
  const id = product?._id
  const [loading, error, putData] = usePut(
    `https://capstone2-leonor.onrender.com/products/${id}`
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    await putData({ name, description, price })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          type='text'
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type='text'
          id='price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button type='submit'>Update Product</button>

      {loading && <p>Updating product...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  )
}

export default UpdateProduct
