import React, { useState } from 'react'
import { Row, Col, Card, Button, Modal } from 'react-bootstrap'

export default function ProductCard({ products, title }) {
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  const handleClose = () => setShowModal(false)
  const handleShow = (img) => {
    setSelectedImage(img)
    setShowModal(true)
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
                <Card.Text>&#8369;{product.price}</Card.Text>
                <Button>Order</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <img src={selectedImage} alt='Full Size' style={{ width: '100%' }} />
        </Modal.Body>
      </Modal>
    </div>
  )
}
