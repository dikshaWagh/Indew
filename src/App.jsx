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
  const [hasResponded, setHasResponded] = useState(false);
  const [infoBoxContent, setInfoBoxContent] = useState('');
  const [matchedPhones, setMatchedPhones] = useState([]);
  const [wikiInfo, setWikiInfo] = useState(null);



  const smartphoneMallData = {
    stores: [
      {
        name: "TechWorld Electronics",
        floor: 1,
        shopNumber: "101",
        products: [
          {
            brand: "Samsung",
            model: "Galaxy S25 Ultra",
            specs: {
              processor: "Snapdragon 8 Gen 3",
              screen: "6.8 inch AMOLED",
              camera: "200MP triple camera",
              battery: "5000 mAh",
              storage: "512GB",
              os: "Android 15"
            },
            price: "$1199",
            image: "https://m.media-amazon.com/images/I/71P85R392uL.jpg"
          },
          {
            brand: "Google",
            model: "Pixel 9 Pro",
            specs: {
              processor: "Google Tensor G4",
              screen: "6.7 inch OLED",
              camera: "50MP dual camera",
              battery: "4800 mAh",
              storage: "256GB",
              os: "Android 15"
            },
            price: "$899",
            image: "https://rukminim2.flixcart.com/image/704/844/xif0q/mobile/q/b/g/-original-imah3zznscgh3fgk.jpeg?q=90&crop=false"
          }
        ]
      },
      {
        name: "Mobile Hub",
        floor: 2,
        shopNumber: "205",
        products: [
          {
            brand: "Apple",
            model: "iPhone 16 Pro Max",
            specs: {
              processor: "Apple A18 Bionic",
              screen: "6.7 inch OLED",
              camera: "48MP triple camera",
              battery: "4300 mAh",
              storage: "512GB",
              os: "iOS 19"
            },
            price: "$1399",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwnjRu2piR1q7hR_dy4OVQsuY2aPXU8rOhpg&s"
          },
          {
            brand: "OnePlus",
            model: "OnePlus 13",
            specs: {
              processor: "Snapdragon 8 Gen 3",
              screen: "6.7 inch AMOLED",
              camera: "50MP triple camera",
              battery: "4800 mAh",
              storage: "256GB",
              os: "Android 15"
            },
            price: "$799",
            image: "https://image01-in.oneplus.net/media/202412/17/052a246708df8233d079b3502aeeb327.png"
          }
        ]
      },
      {
        name: "SmartPhone Stop",
        floor: 3,
        shopNumber: "310",
        products: [
          {
            brand: "Xiaomi",
            model: "Xiaomi 15 Ultra",
            specs: {
              processor: "Snapdragon 8 Gen 3+",
              screen: "6.7 inch AMOLED",
              camera: "200MP quad camera",
              battery: "5000 mAh",
              storage: "512GB",
              os: "Android 15"
            },
            price: "$1099",
            image: "https://m.media-amazon.com/images/I/81ql3U3xAwL._UF894,1000_QL80_.jpg"
          },
          {
            brand: "Google",
            model: "Pixel 9a",
            specs: {
              processor: "Google Tensor G4 Lite",
              screen: "6.2 inch OLED",
              camera: "48MP single camera",
              battery: "4400 mAh",
              storage: "128GB",
              os: "Android 15"
            },
            price: "$499",
            image: "https://rukminim2.flixcart.com/image/704/844/xif0q/mobile/x/b/u/-original-imahadxg2fazkzub.jpeg?q=90&crop=false"
          }
        ]
      },
      {
        name: "Elite Mobiles",
        floor: 1,
        shopNumber: "115",
        products: [
          {
            brand: "Honor",
            model: "Magic 7 Pro",
            specs: {
              processor: "Snapdragon 8 Gen 3",
              screen: "6.8 inch OLED",
              camera: "50MP triple camera",
              battery: "5100 mAh",
              storage: "512GB",
              os: "Android 15"
            },
            price: "$949",
            image: "https://s.alicdn.com/@sc04/kf/H277b22f528d44272a2de7980d4cc4c2al.png_720x720q50.png"
          },
          {
            brand: "Vivo",
            model: "T4 Ultra",
            specs: {
              processor: "MediaTek Dimensity 9300 Plus",
              screen: "6.67 inch AMOLED",
              camera: "50MP triple camera",
              battery: "5500 mAh",
              storage: "256GB",
              os: "Android 15"
            },
            price: "$699",
            image: "https://rukminim2.flixcart.com/image/704/844/xif0q/mobile/6/9/g/-original-imahd57gjjk4tx87.jpeg?q=90&crop=false"
          }
        ]
      },
      {
        name: "Premium Phone Palace",
        floor: 2,
        shopNumber: "220",
        products: [
          {
            brand: "Samsung",
            model: "Galaxy Z Flip 7",
            specs: {
              processor: "Snapdragon 8 Gen 3",
              screen: "6.7 inch foldable AMOLED",
              camera: "50MP dual camera",
              battery: "3700 mAh",
              storage: "256GB",
              os: "Android 15"
            },
            price: "$1099",
            image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202505/galaxy-z-flip-7-143812385-16x9_0.png?VersionId=bwgf10c6Zp5kveq0H3G2bdq9vUv_T7xM&size=690:388"
          },
          {
            brand: "OPPO",
            model: "Reno14 Pro",
            specs: {
              processor: "MediaTek Dimensity 8450",
              screen: "6.83 inch OLED",
              camera: "50MP triple camera",
              battery: "6200 mAh",
              storage: "256GB",
              os: "Android 15"
            },
            price: "$749",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTya5BFx6Wj3jAlE3F2BnCxcxiPAXzy3dRH6Q&s"
          }
        ]
      }
    ]
  };

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
      speakResponse(response);
      const duration = estimateResponseDuration(response);
      triggerGifResponse(duration);
    } catch (error) {
      console.error('Gemini Error:', error);
      setResponseText("Oops! Something went wrong.");
      triggerGifResponse(3000);
    } finally {
      setIsLoading(false);
    }
    setInfoBoxContent(`You asked about: "${userText}". Here's some extra info coming soon...`);
    // Detect phones from user input
const lowerText = userText.toLowerCase();
const matched = [];

smartphoneMallData.stores.forEach(store => {
  store.products.forEach(product => {
    if (
      lowerText.includes(product.brand.toLowerCase()) ||
      lowerText.includes(product.model.toLowerCase()) ||
      lowerText.includes("mobile") ||
      lowerText.includes("phone")
    ) {
      matched.push({ ...product, store: store.name, floor: store.floor, shopNumber: store.shopNumber });
    }
  });
});

setMatchedPhones(matched);
await fetchWikipediaSummary(userText);


  };

  const triggerGifResponse = (duration) => {
    setShowResponse(true);
    setHasResponded(true); 
    setTimeout(() => {
      setShowResponse(false);
    }, duration);
  };
  const fetchWikipediaSummary = async (query) => {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.title && data.extract) {
      setWikiInfo({
        title: data.title,
        extract: data.extract,
        image: data.thumbnail?.source || null
      });
    } else {
      setWikiInfo(null);
    }
  } catch (error) {
    console.error("Wikipedia fetch failed:", error);
    setWikiInfo(null);
  }
};

  return (
    <div className="speech-container">
      {isSpeaking && !showResponse && (
        <h2>Speak something and the character will respond</h2>
      )}

      <div className={`video-wrapper ${hasResponded ? 'minimized' : ''}`}>
        <img src={showResponse ? responseGif : listeningGif} alt="GIF" className="gif" />
      </div>
      {/* {hasResponded && (
  <div className="empty-center-box">
    {matchedPhones.length > 0 ? (
      matchedPhones.map((phone, index) => (
        <div key={index} className="phone-card">
          <img src={phone.image} alt={phone.model} />
          <h4>{phone.brand} {phone.model}</h4>
          <p><strong>Store:</strong> {phone.store}</p>
          <p><strong>Price:</strong> {phone.price}</p>
          <p><strong>Specs:</strong> {phone.specs.processor}, {phone.specs.screen}, {phone.specs.camera}</p>
        </div>
      ))
    ) : (
      <p>No mobile matches found for your query.</p>
    )}
  </div>
)} */}

  {hasResponded && (
  <div className="empty-center-box">
    {wikiInfo ? (
      <>
        {wikiInfo.image && <img src={wikiInfo.image} alt={wikiInfo.title} className="wiki-image" />}
        <h3>{wikiInfo.title}</h3>
        <p>{wikiInfo.extract}</p>
      </>
    ) : (
      <p>No related info found.</p>
    )}
  </div>
)}




      {responseText && (
        <div className="left-response">
          <strong>Gemini:</strong> {responseText}
        </div>
      )}

      <div className="button-row">
        {!showResponse && (
          <button onClick={startListening} disabled={isSpeaking || isLoading}>
            {isSpeaking ? 'Listening...' : isLoading ? 'Responding...' : 'Start Speaking'}
          </button>
        )}

        {hasResponded && (
          <button onClick={() => setHasResponded(false)}>
            Reset View
          </button>
        )}
      </div>

    </div>

  );
};

export default SpeechVideoPlayer;
