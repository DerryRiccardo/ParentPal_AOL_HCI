document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.querySelector('.send-btn');
    
    // Sample responses for the chatbot
    const botResponses = [
        "Parenting can be challenging at times. What specific aspect are you looking for help with?",
        "Many parents face this issue. Have you tried setting clear boundaries?",
        "It's important to remember that each child develops at their own pace.",
        "Taking time for self-care is crucial for being an effective parent.",
        "Have you considered talking to your child about how this makes you feel?",
        "Research suggests that positive reinforcement often works better than punishment.",
        "That's a great question about child development. At this age, it's normal to see..."
    ];
    
    // Function to add a new message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if (isUser) {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="bubble">
                        <p>${text}</p>
                    </div>
                </div>
                <span class="timestamp">${timestamp}</span>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <img src="/assets/pp.svg" alt="Bot" class="avatar">
                    <div class="bubble">
                        <p>${text}</p>
                    </div>
                </div>
                <span class="timestamp">${timestamp}</span>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to handle user sending a message
    function handleSendMessage() {
        const message = userInput.value.trim();
        
        if (message !== '') {
            addMessage(message, true);
            
            userInput.value = '';
            
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * botResponses.length);
                const botReply = botResponses[randomIndex];
                
                addMessage(botReply);
            }, 1000);
        }
    }
    
    // Event listener for send button click
    sendButton.addEventListener('click', handleSendMessage);
    
    // Event listener for Enter key press in input field
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // Event listeners for other buttons (for demo purposes)
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span').textContent;
            addMessage(`You selected "${buttonText}" option. How can I help with that?`);
        });
    });
    
    const micButton = document.querySelector('.mic-btn');
    micButton.addEventListener('click', function() {
        addMessage("Voice input is not available in this demo version.");
    });
    
    const addButton = document.querySelector('.add-btn');
    addButton.addEventListener('click', function() {
        addMessage("You can attach files or images in the full version.");
    });
});