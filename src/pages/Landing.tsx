const Landing = () => {
  return (
    <div className="body-landing">
      <div className="page-landing">
        <h2>Share all your links with one!</h2>
        <p>
          Don't have an account?
          <a href="/register" style={{ margin: '0 1rem' }}>
            Register here
          </a>
        </p>
        <p>
          Already have an account?
          <a href="/login" style={{ margin: '0 1rem' }}>
            Login
          </a>
          and go to your
          <a href="/" style={{ margin: '0 1rem' }}>
            profile
          </a>
          to continue where you've left off!
        </p>
      </div>
    </div>
  );
};

export default Landing;
