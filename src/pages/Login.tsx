import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseSchema } from "../lib/validation/validationSchema";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/api/supabase";

type LoginForm = z.infer<typeof baseSchema>;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(baseSchema),
    mode: "onBlur",
  });

  const loginUser = async (data: LoginForm) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
    } else {
      console.log("Success logging in!");
      navigate("/");
    }
  };

  return (
    <section>
      <Logo />
      <div className="login-body">
        <div className="login-header">
          <h2 className="login-h2">Login</h2>
          <p>Add you details below to get back into the app</p>
        </div>

        <form
          action="submit"
          onSubmit={handleSubmit(loginUser)}
          className="login-form"
        >
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="button">
            Login
          </button>
          <p>
            Don't have an account? <a href="/register">Create account</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
