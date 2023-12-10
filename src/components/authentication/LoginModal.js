import { useFormik } from 'formik';
import * as Yup from 'yup';
import postLogin from '@/actions/postLogin';
import LoadingIcon from '@/assets/icons/loading.svg';
import Modal from '@/components/layout/Modal';

export default function LoginModal({ authentication: { data }, onClose }) {
    // TODO add password reset form
    // TODO add privacy policy
    // TODO add terms of service

    const form = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().min(3, 'Must be at least 3 characters').max(32, 'Must be at most 32 characters').matches(/^[A-Za-z0-9_]+$/, 'Must contain only alphanumeric characters').required('Required'),
            password: Yup.string().min(6, 'Must be at least 6 characters').max(1024, 'Must be at most 1024 characters').required('Required')
        }).required('Required'),
        onSubmit: async (values, { setStatus }) => {
            try {
                const result = await postLogin(values);

                setStatus({ success: true });
            } catch (e) {
                setStatus({ error: e.message });
            }
        }
    });

    const handleKeyDown = (event) => {
        event.stopPropagation();
    };

    return (
        <Modal show={data.showLoginModal} onClose={onClose}>
            <p className="text-2xl font-light text-center">Log in</p>
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