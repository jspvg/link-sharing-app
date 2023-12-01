import { useEffect, useState } from "react";
import { Platform, Link } from "../../lib/types";
import { fetchPlatforms } from "../../lib/api";
import Dropdown from "../elements/Dropdown";

interface LinkFormProps {
  index: number;
  link: Link;
  onDelete: () => void;
}

const LinkForm = ({ index, link, onDelete }: LinkFormProps) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platform, setPlatform] = useState<Platform | null>(link.platform);
  const [linkUrl, setLinkUrl] = useState(link.link);

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
        <h2>Link #{index + 1}</h2>
        <p>
          <button onClick={onDelete}>Remove</button>
        </p>
      </div>

      <label>Platform</label>
      <Dropdown
        platforms={platforms}
        selectedPlatform={platform}
        onSelect={setPlatform}
      />
      <label>Link</label>
      <input
        type="url"
        className="element-input"
        placeholder="e.g. https://www.github.com/johnappleseed"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
      />
    </form>
  );
};

export default LinkForm;
