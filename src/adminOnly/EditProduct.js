import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import UpdateProduct from '../adminOnly/UpdateProduct'

export default function EditProduct({ products, title }) {
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productStates, setProductStates] = useState({})

  const handleClose = () => setShowModal(false)

  const archiveProduct = (product) => {
    setProductStates({
      ...productStates,
      [product._id]: !productStates[product._id],
    })
    fetch(
      `https://capstone2-leonor.onrender.com/products/archive/${product._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          isActive: !productStates[product._id],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProductStates({ ...productStates, [product._id]: data.isActive })
      })
  }

  return (
    <div>
      <h2>{title}</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <button
            onClick={() => {
              setSelectedProduct(product)
              setShowModal(true)
            }}
          >
            Edit
          </button>
          <button onClick={() => archiveProduct(product)}>
            {productStates[product._id] ? 'Deactivate' : 'Reactivate'}
          </button>
        </div>
      ))}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateProduct product={selectedProduct} />
        </Modal.Body>
      </Modal>
    </div>
  )
}
