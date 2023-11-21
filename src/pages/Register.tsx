const Register = () => {
  return (
    <section>
      <div className="logo-header">
        <h2 className="logo-h2">
          <img src="logo.svg" alt="logo" />
          LinkSharing
        </h2>
      </div>
      <div className="login-body">
        <div className="login-header">
          <h2 className="login-h2">Create account</h2>
          <p>Let's get you started showing your links!</p>
        </div>
        <form action="login" className="login-form">
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
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="At least 8 characters"
            />
          </div>
          <div className="element-input">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="At least 8 characters"
            />
          </div>
          <p>Password must contain at least 8 characters</p>
          <button>Create new account</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
