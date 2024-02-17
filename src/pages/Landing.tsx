const Landing = () => {
  return (
    <div className="body-landing">
      <div className="page-landing">
        <h2>Share all your links with one!</h2>
        <div className="landing-align">
          <p>
            Don't have an account?
            <a href="/register" style={{ margin: '0 0.3rem' }}>
              Register here
            </a>
          </p>
        </div>
        <div className="landing-align">
          <p>
            Already have an account?
            <a href="/login" style={{ margin: '0 0.3rem' }}>
              Login
            </a>
          </p>
          <p>
            and go to your
            <a href="/" style={{ margin: '0 0.3rem' }}>
              profile
            </a>
            to continue where you've left off!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
