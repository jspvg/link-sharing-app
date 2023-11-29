interface PopupProps {
  message: string;
}

const Popup = ({ message }: PopupProps) => {
  return (
    <div className="popup">
      <img src="src/assets/link-gray.svg" alt="" className="popup-img"/>
      {message}
    </div>
  );
};

export default Popup;
