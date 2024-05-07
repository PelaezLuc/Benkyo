import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserService } from '../utils/services';

export const RegisterPage = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            username: '',
            description: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {
        const {
            name,
            username,
            description,
            email,
            password,
            confirmPassword,
        } = data;

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden ');
            return;
        }

        try {
            await registerUserService({
                name,
                username,
                description,
                email,
                password,
            });
            navigate('/login');
            reset();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    return (
        <section>
            <h1>Register</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}
            >
                {' '}
                <input
                    {...register('name', { required: true })}
                    placeholder="Name"
                />
                {errors.name && <span>Name is required</span>}
                <input
                    {...register('username', { required: true })}
                    placeholder="Username"
                />
                {errors.username && <span>Username is required</span>}
                <textarea
                    {...register('description')}
                    placeholder="Roll Description"
                ></textarea>
                {errors.description && <span>Description is required</span>}
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
                <input
                    {...register('confirmPassword', { required: true })}
                    type="password"
                    placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                    <span>Confirm Password is required</span>
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
