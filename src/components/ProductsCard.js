import React, { useState } from 'react'
import { Row, Col, Card, Button, Modal, Alert } from 'react-bootstrap'

export default function ProductCard({ products, title }) {
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const token = localStorage.getItem('token')

  const handleClose = () => setShowModal(false)
  const handleShow = (img) => {
    setSelectedImage(img)
    setShowModal(true)
  }

  const placeOrder = (product) => {
    fetch('https://capstone2-leonor.onrender.com/users/orders/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product._id,
        productName: product.name,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 5000)
      })
      .catch((err) => console.error(err))
  }

  return (
    <div className='product-list'>
      <h2>{title}</h2>
      <Row>
        {products.map((product) => (
          <Col xs={12} md={6} key={product._id}>
            <Card
              className='cardHighlight2 p-3'
              style={{ height: '400px' }}
              onClick={() => handleShow(`images/${product._id}.png`)}
            >
              <Card.Img
                variant='top'
                src={`images/${product._id}.png`}
                alt={product.name}
                style={{ objectFit: 'cover', height: '200px' }}
                className='prodImg'
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className='text-muted'>
                  {product.description}
                </Card.Subtitle>
                <Card.Subtitle>&#8369;{product.price}</Card.Subtitle>
                <Button onClick={() => placeOrder(product)}>Order</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {showAlert && (
        <Alert
          variant='success'
          style={{
            position: 'fixed',
            top: '0',
            left: '50%',
            transform: 'translate(-50%, 0)',
          }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Order placed successfully!
        </Alert>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <img src={selectedImage} alt='Full Size' style={{ width: '100%' }} />
        </Modal.Body>
      </Modal>
    </div>
  )
}
