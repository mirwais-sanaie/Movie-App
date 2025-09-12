interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerKey: string | null;
}

function TrailerModal({ isOpen, onClose, trailerKey }: TrailerModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-lg overflow-hidden w-[90%] max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <button
          className="absolute top-2 right-2 text-white text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TrailerModal;
