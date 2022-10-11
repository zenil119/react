import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage, FieldArray, FastField} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'


const initialValues =  {
    name: 'Zenil',
    email: '',
    password: '',
    age:'',
    address: '',
    social:{
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['',''],
    phNumbers: ['']
}

const savedValues =  {
    name: 'Zenil',
    email: 'Z@gmail.com',
    password: '123@123',
    age:'21',
    address: 'aa-2 werwd',
    social:{
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['',''],
    phNumbers: ['']
}

const onSubmit = (values, onSubmitProps) => {
    console.log('values :>> ', values);
    console.log('onSubmitProps:>>',onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetFrom()
}

const validationSchema = Yup.object({
    name : Yup.string().required(),
    email : Yup.string().email('Invalid email format').required(),
    password : Yup.string().required(),
    age : Yup.string().required(),
    address: Yup.string().required()
})

// console.log('form values::>', formik.touched)
const NewForm = () => {
    const [formValues, setFormValues] = useState(null)
  return (
    <Formik initialValues={ formValues  || initialValues } validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
        {
            formik => {
                console.log('formik :>> ', formik); 
                return (
                    <Form>
                    <div className='form-control'>
                        <label htmlFor='name'>Name</label>
                        <Field type='text' name='name' id='name'/>
                        <ErrorMessage name='name'  component={TextError}> 
                            {
                                
                                errorMsg => <div className='error'>{errorMsg}</div>
                                
                            }
                        </ErrorMessage>
                    </div>
                    
                    <div className='form-control'>
                        <label htmlFor='email'>E-mail</label>
                        <Field type='email' name='email' id='email'/>
                        <ErrorMessage name='email' component={TextError}>
                            {
                                errorMsg => <div className='error'>{errorMsg}</div>
                            }
                        </ErrorMessage>
                    </div>

                    <div className='form-control'>
                        <label htmlFor='password'>Password</label>
                        <Field type='password' name='password' id='password'/>
                        <ErrorMessage name='password' component={TextError}>
                            {
                                errorMsg => <div className='error'>{errorMsg}</div>
                            }
                        </ErrorMessage>
                    </div>

                    <div className='form-control'>
                        <label htmlFor='age'>Age</label>
                        <Field type='text' name='age' id='age'/>
                        <ErrorMessage name='age' component={TextError}>
                            {
                                errorMsg => <div className='error'>{errorMsg}</div>
                            }
                        </ErrorMessage>
                    </div>

                    <div className='form-control'>
                        <label htmlFor='address'>Address</label>
                        <FastField name='address'>
                            {
                                props => {
                                    const {field, meta} = props
                                    // console.log('Render Prop:>', props)
                                    return (
                                        <>
                                            <input type='text' id='address' {...field}/>
                                            <span className='error'>{meta.touched && meta.error ? <div>{meta.error}</div>: null}</span>
                                        </>
                                        
                                    ) 
                                }
                            }
                        </FastField>
                    </div>

                    <div className='form-control'>
                        <label htmlFor='facebook'>Facebook profile</label>
                        <Field type='text' id='facebook' name='social.facebook'/>
                    </div>

                    <div className='form-control'>
                        <label htmlFor='twitter'>Twitter profile</label>
                        <Field type='text' id='twitter' name='social.twitter'/>
                    </div>

                    <div className='form-control'>
                        <label htmlFor='firstPh'>Primary phone number</label>
                        <Field type='text' id='firstPh' name='phoneNumbers[0]'/>
                    </div>

                    <div className='form-control'>
                        <label htmlFor='twoPh'>Secondary phone number</label>
                        <Field type='text' id='twoPh' name='phoneNumbers[1]'/>
                    </div>

                    <div className='form-control'>
                        <label>List of phone numbers</label>
                        <FieldArray type='text' name='phNumbers'>
                            {
                                (fieldArrayProps) => {
                                    console.log('fieldArrayProps :>> ', fieldArrayProps);
                                    const {push, remove, form} = fieldArrayProps
                                    const {values} = form
                                    const {phNumbers} = values
                                    return (
                                        <div>
                                            {
                                                phNumbers.map((phNumber, index) => (
                                                    <div key={index} className='flex'>
                                                        <Field type='text' name={`phNumbers[${index}]`}/>
                                                        {index > 0 && (
                                                            <button type='button' onClick={() => remove(index)}>-</button>
                                                        )}
                                                        <button type='button' onClick={() => push('')}>+</button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            }
                        </FieldArray>
                    </div>
                    <button type='button' onClick={() => setFormValues(savedValues)}>Load Saved Data</button>        
                    <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                    <button type='reset' onClick={() => setFormValues(initialValues)}>Reset</button>
                </Form>
                )
            }
        }
        
    </Formik>
  )
}

export default NewForm