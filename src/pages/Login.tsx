import Logo from "../components/Logo";

const Login = () => {
  return (
    <section>
      <Logo />
      <div className="login-body">
        <div className="login-header">
          <h2 className="login-h2">Login</h2>
          <p>Add you details below to get back into the app</p>
        </div>

        <form action="/" className="login-form">
          <div className="element-input">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="eg. alex@email.com"
            />
          </div>
          <div className="element-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button className="button">Login</button>
          <p>
            Don't have an account? <a href="/register">Create account</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
