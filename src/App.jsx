import React, { useState } from 'react';
import listeningGif from './assets/gif2.gif';
import responseGif from './assets/gif1.gif';
import { generateGeminiResponse } from './gemini';
import './App.css';

const SpeechVideoPlayer = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsSpeaking(true);
      setTranscript('');
      setResponseText('');
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      callGeminiAndRespond(speechResult);
    };

    recognition.onend = () => {
      setIsSpeaking(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        setTranscript('');
        setResponseText("Hmm... I didn't hear anything, but I'm still here!");
        triggerGifResponse(3000);
      } else {
        setResponseText("Something went wrong. Try again.");
        triggerGifResponse(3000);
      }
    };

    recognition.start();
  };

  // 🔊 Text-to-Speech function
  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 1; 
    synth.speak(utterance);
  };

  const estimateResponseDuration = (text) => {
    const words = text.trim().split(/\s+/).length;
    const avgWordsPerSecond = 2;
    return (words / avgWordsPerSecond) * 1000;
  };

  const callGeminiAndRespond = async (userText) => {
    try {
      setIsLoading(true);
      const prompt = `Please reply only in Hindi without translation: ${userText}`;
      const response = await generateGeminiResponse(prompt);

      if (!response || response.trim() === '') {
        setResponseText("माफ़ कीजिए, कृपया फिर से कहें।");
        triggerGifResponse(2000);
        setIsLoading(false);
        return;
      }

      setResponseText(response);
      speakResponse(response); // 🔊 Speak it out
      const duration = estimateResponseDuration(response);
      triggerGifResponse(duration);
    } catch (error) {
      console.error('Gemini Error:', error);
      setResponseText("Oops! Something went wrong.");
      triggerGifResponse(3000);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerGifResponse = (duration) => {
    setShowResponse(true);
    setTimeout(() => {
      setShowResponse(false);
    }, duration);
  };

  return (
    <div className="speech-container">
      <h2>Speak something and the character will respond</h2>

      <div className="video-wrapper">
        {!showResponse ? (
          <img src={listeningGif} alt="Listening" className="gif" />
        ) : (
          <img src={responseGif} alt="Responding" className="gif" />
        )}
      </div>

      <button onClick={startListening} disabled={isSpeaking || showResponse || isLoading}>
        {isSpeaking ? 'Listening...' : isLoading ? 'Responding...' : 'Start Speaking'}
      </button>

      {transcript && (
        <div className="transcript">
          <strong>You said:</strong> {transcript}
        </div>
      )}

      {responseText && (
        <div className="transcript">
          <strong>Gemini:</strong> {responseText}
        </div>
      )}
    </div>
  );
};

export default SpeechVideoPlayer;
