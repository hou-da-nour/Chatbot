import { useRef } from "react";


export const ChatForm = ({chatHistory , setChatHistory , generateBotResponse}) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();   //Getting the input value and removing whitespaces
        if(!userMessage) return;
        inputRef.current.value = "";   // Cleaning the message input after getting the value


        // Update chat history with the user's message
        setChatHistory(history => [...history , { role: "user" , text : userMessage}]);

        //  Delay 600 ms before showing "Thinking..." and generating
        setTimeout(() => {
            // Add a " Thinking..." placeholder for the bot's mssage
            setChatHistory((history) => [
              ...history,
              { role: "model", isTyping: true } // Utilisation d'une propriété spéciale pour l'animation
            ]);

            // Call the Function to generate the Bot's response
            generateBotResponse([...chatHistory,{ role: "user" , text : userMessage}]);
        } , 600 );
    };
  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
        <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};
