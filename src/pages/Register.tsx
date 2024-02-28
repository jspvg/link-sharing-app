import { z } from 'zod';
import Logo from '../components/Logo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/api/supabase';
import { useState } from 'react';

const baseSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(25),
});

const schema = baseSchema
  .extend({
    passwordConfirm: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(25),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  });

type RegisterForm = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const [duplicateEmailError, setDuplicateEmailError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const registerUser = async (formData: RegisterForm) => {
    const { email, password } = formData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error signing up:', error.message);
      if (error.message === 'User already registered') {
        setDuplicateEmailError('Email already in use.');
      }
    } else {
      setDuplicateEmailError('');
      navigate('/login');
    }
  };

  return (
    <>
      <Logo />
      <div id="register">
        <form onSubmit={handleSubmit(registerUser)}>
          <h2>Create account</h2>
          <p className="justify-start">
            Let's get you started showing your links!
          </p>

          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="eg. alex@email.com"
            {...register('email')}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          {duplicateEmailError && (
            <span className="error">{duplicateEmailError}</span>
          )}
          <label htmlFor="password">Create Password</label>
          <input
            type="password"
            id="password"
            placeholder="At least 8 characters"
            {...register('password')}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}

          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="At least 8 characters"
            {...register('passwordConfirm')}
          />
          {errors.passwordConfirm && (
            <span className="error">{errors.passwordConfirm.message}</span>
          )}

          <span>Password must contain at least 8 characters</span>
          <button type="submit" id="primary">
            Create new account
          </button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
