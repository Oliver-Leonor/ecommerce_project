import React, { useState } from 'react'
import useGet from '../customHooks/useGet'
import { Button, Modal } from 'react-bootstrap'
import CreateProduct from '../adminOnly/CreateProduct'
import EditProduct from '../adminOnly/EditProduct'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function AdminDashboard() {
  const [show, setShow] = useState(false)
  const {
    data: products,
    isPending,
    error,
  } = useGet('https://capstone2-leonor.onrender.com/products/')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div>
        <h2>Admin Dashboard</h2>
        <Button variant='outline-primary' onClick={handleShow}>
          Add New Product
        </Button>
      </div>
      {error && <div>{error}</div>}
      {isPending && <LoadingSkeleton />}
      {products && <EditProduct products={products} title='All Products' />}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <p
            style={{ position: 'absolute', right: '10px', top: '10px' }}
            onClick={handleClose}
          >
            x
          </p>
        </Modal.Header>
        <Modal.Body>
          <CreateProduct />
        </Modal.Body>
      </Modal>
    </>
  )
}
