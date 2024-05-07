import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInUserService } from '../utils/services';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {
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
        <section>
            <h1>Login</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                <input
                    {...register('email', {
                        required: true,
                        pattern: /^\S+@\S+\.\S+$/i,
                    })}
                    placeholder="Email"
                />
                {errors.email && <span>Email is required</span>}
                {errors.email?.type === 'pattern' && (
                    <span>Invalid email address</span>
                )}
                <input
                    {...register('password', { required: true, minLength: 8 })}
                    type="password"
                    placeholder="Password"
                />
                {errors.password && <span>Password is required</span>}
                {errors.password?.type === 'minLength' && (
                    <span>Password must be at least 8 characters</span>
                )}

                <button type="submit">Register</button>
                {errorMessage ? (
                    <p
                        style={{
                            color: 'red',
                        }}
                    >
                        {errorMessage}
                    </p>
                ) : null}
            </form>
        </section>
    );
};
