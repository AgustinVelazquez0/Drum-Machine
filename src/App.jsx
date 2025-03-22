import { useEffect } from "react";
import DrumPad from "../components/DrumPad";
import { drumPads } from "./assets/sounds";
import "./App.css";

const App = () => {
  // Función para reproducir el sonido
  const playSound = (key) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0; // Reinicia el sonido
      audio.play();
      const soundName = drumPads.find((pad) => pad.key === key).sound;
      document.getElementById("display").textContent = soundName;
    }
  };

  // Detecta las teclas presionadas
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase();
      if (drumPads.some((pad) => pad.key === key)) {
        playSound(key);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div id="drum-machine">
      <h1>Drum Machine</h1>
      <div id="display">Presiona una tecla</div>

      <div className="pad-container">
        {drumPads.map((pad) => (
          <DrumPad
            key={pad.key}
            keyTrigger={pad.key}
            soundName={pad.sound}
            url={pad.url}
            playSound={playSound}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
