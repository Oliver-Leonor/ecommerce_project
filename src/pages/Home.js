import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../CSS/Home.css'

const Home = () => {
  return (
    <div className='home'>
      <Row>
        <Col className='p-5'>
          <h2>Digital Shop</h2>
          <p>Bring the latest in Tech</p>
          <Link to='/products'>
            <Button variant='primary' className='btn'>
              Order Now!
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default Home
