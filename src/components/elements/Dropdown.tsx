import { useEffect, useRef, useState } from "react";
import { Platform } from "../../lib/types";
import Option from "./Option";
import "../../styles/components/dropdown.scss";

interface DropdownProps {
  platforms: Platform[];
}

const Dropdown = ({ platforms }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<Platform | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSelect = (platform: Platform) => {
    setSelectedOption(platform);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref}>
      <button onClick={handleDropdown} className="dropdown">
        <img src={selectedOption ? selectedOption.logo : ""} alt="" />
        {selectedOption ? selectedOption.name : "Select a platform"}
      </button>
      {isOpen && (
        <div className="options">
          {platforms.map((platform) => (
            <div
              className="option"
              key={platform.id}
              onClick={() => handleSelect(platform)}
            >
              <Option platform={platform} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
