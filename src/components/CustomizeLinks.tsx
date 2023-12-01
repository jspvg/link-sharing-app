import useProfileContext from "../hooks/useProfileContext";
import LinkForm from "./forms/LinkForm";

const CustomizeLinks = () => {
  const { profile, addLink, editLink, removeLink } = useProfileContext();

  const handleAddLink = () => {
    const newLink = {
      id: Math.random().toString(36).substring(2, 15),
      platform: {
        id: 0,
        name: "",
        logo: "",
        color: "",
      },
      link: "",
    };
    addLink(newLink);
  };

  const handleSaveLinks = () => {
    profile.userLinks.forEach((link) => {
      editLink(link.id, link);
    });
  };

  const handleRemoveLink = (linkId: string) => {
    removeLink(linkId);
  };

  return (
    <>
      <div className="customize-header">
        <h1>Customize your links</h1>
        <p className="header-p">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
        <button
          className="nav-link nav-preview link-button"
          onClick={handleAddLink}
        >
          + Add new link
        </button>
      </div>
      <div
        className={`customize-body ${profile.userLinks.length ? "" : "gap-24"}`}
      >
        {profile.userLinks.length ? (
          <>
            {profile.userLinks.map((link, index) => (
              <LinkForm
                key={link.id}
                index={index}
                link={link}
                onDelete={() => handleRemoveLink(link.id)}
              />
            ))}
          </>
        ) : (
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
        )}
      </div>
      <div className="save-button">
        <button className="button" onClick={handleSaveLinks}>
          Save
        </button>
      </div>
    </>
  );
};

export default CustomizeLinks;
