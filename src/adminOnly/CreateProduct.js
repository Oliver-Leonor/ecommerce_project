import Swal from 'sweetalert2'
import { useState } from 'react'

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  })

  const { name, description, price } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addProduct = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        'https://capstone2-leonor.onrender.com/products/addProduct',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ name, description, price }),
        }
      )
      const data = await res.json()
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'Product Added!',
          text: data.message,
        })
      }
      setFormData({ name: '', description: '', price: '' })
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  return (
    <div className='create'>
      <h2>Add a New Product</h2>
      <form onSubmit={addProduct}>
        <label>Product Name</label>
        <input
          type='text'
          name='name'
          required
          value={name}
          onChange={handleChange}
        />
        <label>Description</label>
        <textarea
          name='description'
          required
          value={description}
          onChange={handleChange}
        ></textarea>
        <label>Price</label>
        <input
          type='number'
          name='price'
          required
          value={price}
          onChange={handleChange}
        />
        <button>Add Product</button>
      </form>
    </div>
  )
}

export default CreateProduct
