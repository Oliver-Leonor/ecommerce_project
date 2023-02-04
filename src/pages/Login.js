import { Form, Button } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'

export default function Login() {
  const { user, setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()

  useEffect(
    () => setIsActive(email !== '' && password !== ''),
    [email, password]
  )

  function userLogin(e) {
    e.preventDefault()
    fetch(`https://capstone2-leonor.onrender.com/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem('token', data.access)
          retrieveUserDetails(data.access)

          Swal.fire({
            title: 'Start shopping?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Let's go!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Enjoy shopping!',
                'We got the best deal for you',
                'success'
              )
              navigate('/products')
            }
          })
        } else
          Swal.fire({
            title: 'Authentication failed',
            icon: 'error',
            text: 'Please check your login details and try again',
          })
      })
    setEmail('')
    setPassword('')
  }

  const retrieveUserDetails = (token) =>
    fetch('https://capstone2-leonor.onrender.com/users/details', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser({ id: data._id, isAdmin: data.isAdmin }))

  return user.id ? (
    <Navigate to='/' />
  ) : (
    <Form onSubmit={userLogin}>
      <Form.Group className='mb-3 form' controlId='email'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='off'
          required
        />
      </Form.Group>
      <Form.Group className='mb-3 form' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='off'
          required
        />
      </Form.Group>
      <Button variant='success' type='submit' disabled={!isActive}>
        Submit
      </Button>
    </Form>
  )
}
