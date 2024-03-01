import { NavLink, useMatch } from 'react-router-dom';

interface NavLinkItemProps {
  to: string;
  alt: string;
  src: {
    active?: string;
    inactive: string;
  };
  text: string;
}

const NavLinkItem = ({ to, alt, src, text }: NavLinkItemProps) => {
  const match = useMatch(to);
  return (
    <NavLink className={`nav-link ${match ? 'active' : ''}`} to={to}>
      <img alt={alt} src={match ? src.active : src.inactive} />
      <p>{text}</p>
    </NavLink>
  );
};

export default NavLinkItem;
