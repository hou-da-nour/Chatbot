import React from 'react'
import ChatbotIcon from './ChatbotIcon';

export const ChatMessage = ({ chat }) => {
  return (
    // Ajout de la gestion de l'animation lorsque le chatbot est en train de répondre
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}> 
      
      {/* Affichage de l'icône du chatbot uniquement pour les messages du bot */}
      {chat.role === "model" && <ChatbotIcon />}

      {/* Vérification si le chatbot est en train de taper (animation "…") */}
      {chat.isTyping ? (
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <p className="message-text">{chat.text}</p>
      )}
    </div>
  );
};
