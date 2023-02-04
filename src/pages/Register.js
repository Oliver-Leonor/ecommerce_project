import { useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import UserContext from '../UserContext'
import Swal from 'sweetalert2'

export default function Register() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [fullName, setFullName] = useState('')

  function registerUser(e) {
    e.preventDefault()

    fetch('https://capstone2-leonor.onrender.com/users/checkEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: 'Duplicate email found',
            icon: 'error',
            text: 'Please provide a different email',
          })
        } else {
          fetch('https://capstone2-leonor.onrender.com/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullName,
              email,
              password: password1,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data === true) {
                setFullName('')
                setEmail('')
                setPassword1('')
                setPassword2('')

                Swal.fire({
                  title: 'Registration Sucessful',
                  icon: 'success',
                  text: 'Welcome to my online store',
                })
                navigate('/login')
              } else {
                Swal.fire({
                  title: 'Something went wrong',
                  icon: 'error',
                  text: 'Please try again',
                })
              }
            })
        }
      })

    setEmail('')
    setPassword1('')
    setPassword2('')
    setFullName('')

    alert('Thank you for registering!')
  }

  useEffect(() => {
    if (
      email !== '' &&
      password1 !== '' &&
      password2 !== '' &&
      fullName !== '' &&
      password1 === password2
    ) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [email, password1, password2, fullName])

  if (user.id) {
    return navigate('/products')
  }

  return (
    <Form onSubmit={(e) => registerUser(e)}>
      <Form.Group className='mb-3 form'>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type='name'
          placeholder='Full Name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete='off'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3 form' controlId='userEmail'>
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

      <Form.Group className='mb-3 form' controlId='password1'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          autoComplete='off'
          required
        />
      </Form.Group>

      <Form.Group className='mb-3 form' controlId='password2'>
        <Form.Label>Verify Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Verify Password'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          autoComplete='off'
          required
        />
      </Form.Group>

      {isActive ? (
        <Button variant='primary' type='submit' id='submitBtn'>
          Submit
        </Button>
      ) : (
        <Button variant='primary' type='submit' disabled>
          Submit
        </Button>
      )}
    </Form>
  )
}
