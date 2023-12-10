import { useFormik } from 'formik';
import * as Yup from 'yup';
import getUser from '@/actions/getUser';
import postSignup from '@/actions/postSignup';
import LoadingIcon from '@/assets/icons/loading.svg';
import Modal from '@/components/layout/Modal';

export default function SignupModal({ onClose, authentication: { data, dispatch } }) {
    const form = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().min(3, 'Must be at least 3 characters').max(32, 'Must be at most 32 characters').matches(/^[A-Za-z0-9_]+$/, 'Must contain only alphanumeric characters').required('Required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').max(1024, 'Must be at most 1024 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Confirm password must be the same as password').required('Required')
        }).required('Required'),
        onSubmit: async (values, { setStatus }) => {
            try {
                const result = await postSignup(values);

                const user = await getUser('@me', result.id);
                if (!user) throw new Error('User not found');

                window.localStorage.setItem('session', result.id);

                onClose();

                dispatch({ type: 'SET_USER', value: user });
            } catch (e) {
                setStatus({ error: e.message });
            }
        }
    });

    const handleKeyDown = (event) => {
        event.stopPropagation();
    };

    return (
        <Modal show={data.showSignupModal} onClose={onClose}>
            <p className="text-2xl font-light text-center">Sign up</p>
            <hr className="m-4 border-neutral-800" />
            <form className="flex flex-col gap-3 mt-8" onSubmit={form.handleSubmit}>
                <div>
                    <label className="block font-bold text-neutral-300" htmlFor="username">Username</label>
                    <input type="text" className="block w-full mt-1 px-3 py-2 rounded bg-transparent border border-neutral-800 hover:border-neutral-700 focus:border-neutral-700 outline-none" id="username" onKeyDown={handleKeyDown} onChange={form.handleChange} onBlur={form.handleBlur} />
                    {
                        form.errors.username
                            ? <p className="text-sm text-red-400 mt-1">{form.errors.username}</p>
                            : null
                    }
                </div>
                <div>
                    <label className="block font-bold text-neutral-300" htmlFor="password">Password</label>
                    <input type="password" className="block w-full mt-1 px-3 py-2 rounded bg-transparent border border-neutral-800 hover:border-neutral-700 focus:border-neutral-700 outline-none" id="password" onKeyDown={handleKeyDown} onChange={form.handleChange} onBlur={form.handleBlur} />
                    {
                        form.errors.password
                            ? <p className="text-sm text-red-400 mt-1">{form.errors.password}</p>
                            : null
                    }
                </div>
                <div>
                    <label className="block font-bold text-neutral-300" htmlFor="confirmPassword">Confirm password</label>
                    <input type="password" className="block w-full mt-1 px-3 py-2 rounded bg-transparent border border-neutral-800 hover:border-neutral-700 focus:border-neutral-700 outline-none" id="confirmPassword" onKeyDown={handleKeyDown} onChange={form.handleChange} onBlur={form.handleBlur} />
                    {
                        form.errors.confirmPassword
                            ? <p className="text-sm text-red-400 mt-1">{form.errors.confirmPassword}</p>
                            : null
                    }
                </div>
                <button type="submit" className={`flex justify-center w-full px-3 py-2 rounded bg-neutral-800 ${form.isValid && !form.isSubmitting ? 'hover:bg-neutral-700' : ''}`} disabled={!form.isValid || form.isSubmitting}>
                    {
                        form.isSubmitting
                            ? <LoadingIcon width="24" height="24" />
                            : <span>Submit</span>
                    }
                </button>
                {
                    form.status?.error
                        ? <p className="text-sm text-red-400">{form.status.error}</p>
                        : null
                }
            </form>
        </Modal>
    );
}