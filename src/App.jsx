import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import { ChatForm } from "./components/ChatForm";
import { ChatMessage } from "./components/ChatMessage";
import chatbotImage from "./assets/images/chatbot-icon.jpg";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]); 
  const [showChatbot, setShowChatbot] = useState(false); 

  const [isLoading, setIsLoading] = useState(false); //  l’animation de chargement

  const chatBodyRef = useRef(null); // Ajout du ref pour le scroll

  // Fonction pour générer une réponse du bot (exemple temporaire)
  const generateBotResponse = (history) => {
    console.log(history);
  };

  // Vérifier si `showChatbot` change
  useEffect(() => {
    console.log("Chatbot visible :", showChatbot);
  }, [showChatbot]);

  //  Scroller automatiquement vers le bas à chaque mise à jour de `chatHistory`
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);


    //  Fonction qui gère l’envoi d’un message et active le chargement
    const handleSendMessage = (message) => {
      if (!message.trim()) return;
  
      setChatHistory([...chatHistory, { role: "user", text: message }]); // Ajouter le message de l’utilisateur
      setIsLoading(true); // ✅ Activer l’animation de chargement
  
      // Simuler un délai avant la réponse du chatbot
      setTimeout(() => {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "bot", text: "Je réfléchis à votre question... 🤔" },
        ]);
        setIsLoading(false); // ✅ Désactiver l’animation
      }, 2000);
    };
  

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      {/*  Bouton pour ouvrir/fermer le chatbot */}
      <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
        {showChatbot ? (
          <span className="material-symbols-rounded">close</span>
        ) : (
          <img src={chatbotImage} className="chatbot-icon" alt="Chatbot Icon" />
        )}
      </button>

      {/*  Chatbot Popup */}
      {showChatbot && (
        <div className="chatbot-popup">
          {/* Chatbot Header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <div className="intro-text">
                <h2 className="logo-text">Chatbot Assistant</h2>
                <p> ● En ligne </p>
              </div>
            </div>
            <button onClick={() => setShowChatbot((prev) => !prev)} className="material-symbols-rounded">Keyboard_arrow_down</button>
          </div>

          {/* Chatbot Body avec scroll automatique */}
          <div className="chat-body" ref={chatBodyRef}>
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Bonjour ! 👋<br /> Je suis votre assistant virtuel BEA. Comment puis-je vous aider aujourd’hui ?
              </p>
            </div>

            {/*  Rendu dynamique des messages */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}

            {/*  Affichage de l'animation quand isLoading est activé */}
            {isLoading && (
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text typing-animation">...</p>
              </div>
            )}
          </div>


          {/* Chatbot Footer */}
          <div className="chat-footer">
            <ChatForm 
              chatHistory={chatHistory} 
              setChatHistory={setChatHistory} 
              generateBotResponse={generateBotResponse} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
