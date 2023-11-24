const CustomizeLinks = () => {
  const test = false;
  return (
    <div className="customize-div">
      <div className="customize-header">
        <h1>Customize your links</h1>
        <p className="header-p">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button className="nav-link nav-preview link-button">
          + Add new link
        </button>
      </div>
      <div className={`customize-body ${test ? '': 'gap-24'}`}>
        {test ? (
          <>
            <img
              className="customize-img"
              src="../src/assets/customize.svg"
              alt="hand scrolling on phone"
            />
            <h1>Let's get you started</h1>
            <p className="customize-p">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We're here to help
              you share your profiles with everyone!
            </p>
          </>
        ) : (
          <>
            <form className="link-input">
              <h2>Link #</h2>
              <label>Platform</label>
              <select className="select-input element-input">
                <option value="option 1">option 1</option>
                <option value="option 2">option 2</option>
                <option value="option 3">option 3</option>
                <option value="option 4">option 4</option>
              </select>
              <label>Link</label>
              <input type="url" className="element-input" />
            </form>
            <form className="link-input">
              <h2>Link #</h2>
              <label>Platform</label>
              <select className="select-input element-input">
                <option value="option 1">option 1</option>
                <option value="option 2">option 2</option>
                <option value="option 3">option 3</option>
                <option value="option 4">option 4</option>
              </select>
              <label>Link</label>
              <input type="url" className="element-input" />
            </form>
          </>
        )}
      </div>
      <div className="save-button">
        {/* TODO manage disabled state */}
        <button className="button" disabled>
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomizeLinks;
