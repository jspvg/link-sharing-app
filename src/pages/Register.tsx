import { z } from "zod";
import Logo from "../components/Logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/api/supabase";

const baseSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(25),
  passwordConfirm: z.string().min(8).max(25),
});

const schema = baseSchema
  .extend({
    passwordConfirm: z.string().min(8).max(25),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type RegisterForm = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const registerUser = async (formData: RegisterForm) => {
    const { email, password } = formData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("Success registration!");
      navigate("/login");
    }
  };

  return (
    <section>
      <Logo />
      <div className="login-body">
        <div className="login-header">
          <h2 className="login-h2">Create account</h2>
          <p>Let's get you started showing your links!</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit(registerUser)}>
          <div className="element-input">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="eg. alex@email.com"
              {...register("email")}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="element-input">
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              id="password"
              placeholder="At least 8 characters"
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <div className="element-input">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              placeholder="At least 8 characters"
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <p className="error">{errors.passwordConfirm.message}</p>
            )}
          </div>
          <p>Password must contain at least 8 characters</p>
          <button type="submit" className="button">
            Create new account
          </button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
