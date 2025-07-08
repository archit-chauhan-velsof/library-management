import { useState } from 'react'
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { useFormik } from 'formik';

const Login = ({ setToken }) => {

    const loginUser = async (values) => {
        return fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(data => data.json())
    }

    const onSubmit = async() => {
        console.log('called');
        // e.preventDefault();
        const token = await loginUser({
          values
        });
        setToken(token);
    }


    // schema for the formik
    // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    const basicSchema = yup.object().shape({
        uName: yup.string().min(2, 'Name is too short').max(50, 'Name is too long').required('Name is required'),
        password: yup.string().min(5)
            // .matches(passwordRules, { message: "Please create a stronger password" })
            .required("Required")

    });

    const {values,errors,touched,isSubmitting,handleBlur,handleChange,handleSubmit,} = useFormik({
        initialValues: {
            uName:"",
            password: "",
        },
        validationSchema: basicSchema,
        onSubmit,
    });

    return (
        <form className='flex flex-col w-full h-screen justify-center items-center gap-4' onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" className='border rounded-md' onChange={handleChange} value={values.uName} onBlur={handleBlur} id='uName'/>
                {errors?.uName && touched?.uName && (<p className='font-sm text-red-500'>{errors.uName}</p>)}
            </label>
            <label>
                <p>Password</p>
                <input type="password" className='border rounded-md' onChange={handleChange} value={values.password} onBlur={handleBlur} id='password'/>
                {errors?.password && touched?.password && (<p className='font-sm text-red-500'>{errors.password}</p>)}
            </label>
            <div>
                <button type="submit" disabled={isSubmitting} className='p-3 rounded-md bg-blue-400 hover:bg-blue-500 text-white font-semibold'>Submit</button>
            </div>
        </form>
    )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login