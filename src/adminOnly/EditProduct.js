import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import UpdateProduct from '../adminOnly/UpdateProduct'

export default function EditProduct({ products, title }) {
  const [showModal, setShowModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleClose = () => setShowModal(false)

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
          <button>Deactivate</button>
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
