import { useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import { useForm } from '../utils/hooks'
import { REGISTER_USER } from '../utils/graphql'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

export default function Register() {
  const navigate = useNavigate()

  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, selectChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
  })

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData)
      navigate('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,
  })

  function registerUser() {
    addUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Select
          fluid
          label="Gender"
          placeholder="Gender"
          name="gender"
          options={options}
          value={values.gender}
          error={errors.gender ? true : false}
          onChange={selectChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
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
      <div>{JSON.stringify(values)}</div>
    </div>
  )
}
