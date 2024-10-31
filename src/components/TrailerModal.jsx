
import './TrailerModal.css';

const TrailerModal = ({ trailerKey, onClose }) => {
  if (!trailerKey) return null;

// hide winodw when clicked anywhere
    

  return (
    <div className="trailer-modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">X</button>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
