import React from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'

const initialValues =  {
    name: '',
    email: '',
    password: ''
}

const onSubmit = values => {
    console.log('values :>> ', values);
}

const validate = values => {
    let errors = {}
    if(!values.name) {
        errors.name = 'Name must be required'
    }
    if(!values.email) {
        errors.email = 'Email must be required'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'Invalid email format'
    }
    if(!values.password) {
        errors.password = 'Password must required'
    }
    return errors
}

// const validationSchema = Yup.object({
//     name : Yup.string().required('Name must be required'),
//     email : Yup.string().email('Invalid email format').required('Email must be required'),
//     password : Yup.string().required('Password must required'),
// })

const OldForm = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        // validationSchema
    })

    console.log('form values::>', formik.touched)
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <div className='form-control'>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}  />
                {formik.touched.name && formik.errors.name ? (<div className='error'>{formik.errors.name}</div>): null}
            </div>
            
            <div className='form-control'>
                <label htmlFor='email'>E-mail</label>
                <input type='email' name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? (<div className='error'>{formik.errors.email}</div>): null}
            </div>

            <div className='form-control'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? (<div className='error'>{formik.errors.password}</div>): null}
            </div>

            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default OldForm