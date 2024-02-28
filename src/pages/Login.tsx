import { useForm } from 'react-hook-form';
import Logo from '../components/Logo';
import { zodResolver } from '@hookform/resolvers/zod';
import { baseLoginSchema } from '../lib/validation/loginSchema';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/api/supabase';
import { useState } from 'react';
import Popup from '../components/elements/Popup';
import { useUser } from '../hooks/useUser';

type LoginForm = z.infer<typeof baseLoginSchema>;

const Login = () => {
  const { setUser } = useUser();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(baseLoginSchema),
    mode: 'onBlur',
  });

  const loginUser = async (data: LoginForm) => {
    const { email, password } = data;

    const { error, data: userData } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsError(true);
      setErrorMessage(error.message);
      setTimeout(() => setIsError(false), 7000);
    } else {
      setUser(userData.user);
      navigate('/');
    }
  };

  return (
    <>
      <Logo />
      <div id="login">
        <form
          action="submit"
          onSubmit={handleSubmit(loginUser)}
          className="login-form"
        >
          <h2 className="login-h2">Login</h2>
          <p className="justify-start">
            Add you details below to get back into the app
          </p>

          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="eg. alex@email.com"
            {...register('email')}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <button type="submit" id="primary">
            Login
          </button>
          <p>
            Don't have an account? <a href="/register">Create account</a>
          </p>
        </form>
        {isError && <Popup message={errorMessage} />}
      </div>
    </>
  );
};

export default Login;
