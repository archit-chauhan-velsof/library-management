import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = ({ setToken }) => {

    const loginUser = async (values) => {
        const response = await axios.post('http://localhost:8080/login', values);
        return response.data;
    };

    const formik = useFormik({
        initialValues: {
            uName: '',
            password: '',
        },
        validationSchema: yup.object({
            uName: yup
                .string().required('Name is required'),
            password: yup
                .string().min(5, 'Password must be at least 5 characters').required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const token = await loginUser(values);
                setToken(token);
            } catch (error) {
                console.error('Login failed:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <form
            className='flex flex-col w-full h-screen justify-center items-center gap-4'
            onSubmit={formik.handleSubmit}
        >
            <label>
                <p>Username</p>
                <input
                    type="text"
                    className='border rounded-md'
                    id='uName'
                    {...formik.getFieldProps('uName')}
                />
                {formik.touched.uName && formik.errors.uName && (
                    <p className='text-red-500'>{formik.errors.uName}</p>
                )}
            </label>

            <label>
                <p>Password</p>
                <input
                    type="password"
                    className='border rounded-md'
                    id='password'
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className='text-red-500'>{formik.errors.password}</p>
                )}
            </label>

            <div>
                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className='p-3 rounded-md bg-blue-400 hover:bg-blue-500 text-white font-semibold'
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default Login;
