import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const FormUser = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState([])

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      city: '',
      profile_picture: ''
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required()
        .min(4, "Name trop court"),
      password: Yup.string()
        .required()
        .min(4, "password trop court")
    }),
    onSubmit: values => {
      fetch('http://localhost:5000/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(response => response.json())
      .then(data => {
        if (data.errors) {
          setErrors(data.errors)
        } else {
          navigate('/')
        }
      })
    }
  })

  console.log(formik.errors)

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.errors.name && <p>{formik.errors.name}</p>}

      <br />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.errors.password && <p>{formik.errors.password}</p>}
      
      <br />
      <label>City</label>
      <input
        type="text"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
      />

      <br />
      <label>Profile picture</label>
      <input
        type="text"
        name="profile_picture"
        value={formik.values.profile_picture}
        onChange={formik.handleChange}
      />

      <br />
      <button type="submit">Submit</button>

      {errors.map(error => (
        <p>{error.msg}</p>
      ))}
    </form>
  )
}

export default FormUser