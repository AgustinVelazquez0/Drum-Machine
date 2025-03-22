import "../styles/DrumPad.css";

const DrumPad = ({ keyTrigger, soundName, url, playSound }) => {
  return (
    <button
      className="drum-pad"
      id={soundName}
      onClick={() => playSound(keyTrigger)}
    >
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url}></audio>
    </button>
  );
};

export default DrumPad;
