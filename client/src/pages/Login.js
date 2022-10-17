import { useContext, useState, useEffect } from 'react'
import { Button, Form, Checkbox } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'
import { LOGIN_USER } from '../utils/graphql'

export default function Login(props) {
  const navigate = useNavigate()

  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, setValues, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  })

  const [remember, setRemember] = useState(values.username ? true : false)

  useEffect(() => {
    const userName = localStorage.getItem('userName')

    if (userName !== null) {
      setValues({ ...values, username: userName })
      setRemember(true)
    }
  }, [])

  useEffect(() => {
    if (remember === true) {
      localStorage.setItem('userName', values.username)
    } else {
      localStorage.removeItem('userName')
    }
  }, [remember, values.username])

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData)
      navigate('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,
  })

  function loginUserCallback() {
    loginUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <div className="login-buttons">
          <Checkbox
            checked={remember}
            onChange={() => setRemember(!remember)}
            label="Remember Me"
            className="remember-button"
          />
          <Button type="submit" color="teal" fluid>
            Login
          </Button>
        </div>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
