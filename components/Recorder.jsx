import { useState } from "react";

const Recorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = () => {
    setIsRecording(true);
    audioChunks = [];
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        // Llamamos a la función que nos pasa App.jsx
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob); // Aquí ejecutamos la función
        }
      };
      mediaRecorder.start();
    });
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Grabar
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Detener
      </button>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/wav" />
        </audio>
      )}
    </div>
  );
};

export default Recorder;
