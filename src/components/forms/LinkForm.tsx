import { useEffect, useState } from "react";
import { Platform } from "../../lib/types";
import { fetchPlatforms } from "../../lib/api";
import Dropdown from "../elements/Dropdown";

const LinkForm = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlatforms();
        setPlatforms(data);
      } catch (err) {
        console.error("Data could not be fetched: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <form className="link-form">
      <div className="form-header">
        <h2>Link #</h2>
        <p>
          <button>Remove</button>
        </p>
      </div>

      <label>Platform</label>
      <Dropdown platforms={platforms} />
      <label>Link</label>
      <input
        type="url"
        className="element-input"
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
    </form>
  );
};

export default LinkForm;
