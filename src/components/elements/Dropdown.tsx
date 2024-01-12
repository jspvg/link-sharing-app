import { useEffect, useRef, useState } from 'react';
import { Platform } from '../../lib/types';
import Option from './Option';
import '../../styles/components/dropdown.scss';

interface DropdownProps {
  platforms: Platform[];
  selectedPlatform: Platform | null;
  onSelect: (platform: Platform | null) => void;
}

const Dropdown = ({ platforms, selectedPlatform, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="dropdown-container">
      <button
        onClick={handleDropdown}
        className={`dropdown ${isOpen ? 'active' : ''}`}
      >
        <img src={selectedPlatform ? selectedPlatform.logo : 'Seelect a platform'} alt="" />
        {selectedPlatform ? selectedPlatform.name : 'Select a platform'}
      </button>
      {isOpen && (
        <div className="options">
          {platforms.map((platform) => (
            <div
              className="option"
              key={platform.id}
              onClick={() => onSelect(platform)}
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
