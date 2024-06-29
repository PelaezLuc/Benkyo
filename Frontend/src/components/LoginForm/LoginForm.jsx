import styles from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInUserService } from '../../utils/services';
import { AuthContext } from '../../context/AuthContext';

export function LoginForm() {
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            const authToken = await logInUserService({
                email,
                password,
            });
            login(authToken);
            navigate('/');
            reset();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <section className={styles.section}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div>
                    <h2 className={styles.title}>Login</h2>
                </div>

                <input
                    {...register('email', {
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/i,
                    })}
                    placeholder="Email"
                    className={styles.input}
                />
                {errors.email && <span>Email is required</span>}
                {errors.email?.type === 'pattern' && (
                    <span>Invalid email address</span>
                )}
                <input
                    {...register('password', { required: true, minLength: 8 })}
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                />
                {errors.password && <span>Password is required</span>}
                {errors.password?.type === 'minLength' && (
                    <span>Password must be at least 8 characters</span>
                )}

                <button type="submit" className={styles.button}>
                    Login
                </button>
                {errorMessage ? (
                    <p
                        style={{
                            color: 'red',
                            fontSize: '12px',
                        }}
                    >
                        {errorMessage}
                    </p>
                ) : null}
            </form>
        </section>
    );
}
