document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const chatButton = document.getElementById('chatButton');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatSuggestions = document.getElementById('chatSuggestions');
    const toggleSuggestions = document.getElementById('toggleSuggestions');

    // Toggle chat container visibility with dropdown animation
    chatButton.addEventListener('click', function() {
        if (!chatContainer.classList.contains('active')) {
            // Opening the chat
            chatContainer.classList.add('active');
            chatContainer.style.transform = 'translateY(20px)';
            chatContainer.style.opacity = '0';
            
            // Trigger reflow to ensure the animation works
            void chatContainer.offsetWidth;
            
            // Apply the animation
            chatContainer.style.transform = 'translateY(0)';
            chatContainer.style.opacity = '1';
            
            // Clear inline styles after transition completes
            setTimeout(() => {
                chatContainer.style.transform = '';
                chatContainer.style.opacity = '';
            }, 300);
        } else {
            // Closing the chat
            chatContainer.style.transform = 'translateY(20px)';
            chatContainer.style.opacity = '0';
            
            // Remove active class after transition completes
            setTimeout(() => {
                chatContainer.classList.remove('active');
                // Reset the inline styles
                chatContainer.style.transform = '';
                chatContainer.style.opacity = '';
            }, 300);
        }
    });

    // Close chat container with animation
    chatClose.addEventListener('click', function() {
        chatContainer.style.transform = 'translateY(20px)';
        chatContainer.style.opacity = '0';
        
        // Remove active class after transition completes
        setTimeout(() => {
            chatContainer.classList.remove('active');
            // Reset the inline styles
            chatContainer.style.transform = '';
            chatContainer.style.opacity = '';
        }, 300);
    });

    // Send message function
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Add user message to chat
            addMessage(message, 'user');
            
            // Clear input field
            userInput.value = '';
            
            // Simulate bot response after a short delay
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 800);
        }
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendUserMessage);

    // Send message on Enter key press
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });

    // Toggle suggestions visibility
    function toggleSuggestionsVisibility() {
        chatSuggestions.classList.toggle('collapsed');
        toggleSuggestions.classList.toggle('collapsed');
        
        // Scroll to bottom of chat after animation completes
        setTimeout(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 300);
    }
    
    // Toggle on button click
    toggleSuggestions.addEventListener('click', toggleSuggestionsVisibility);
    
    // Toggle on header click
    document.querySelector('.suggestions-header').addEventListener('click', function(e) {
        // Don't trigger if clicking directly on the button (to avoid double toggle)
        if (e.target !== toggleSuggestions && !toggleSuggestions.contains(e.target)) {
            toggleSuggestionsVisibility();
        }
    });
    
    // Handle suggestion button clicks
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.textContent;
            addMessage(message, 'user');
            
            // Simulate bot response after a short delay
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 800);
        });
    });

    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        const paragraph = document.createElement('p');
        paragraph.textContent = message;
        
        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(contentDiv);
        chatBody.appendChild(messageDiv);
        
        // Scroll to bottom of chat
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Get bot response based on user message
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('mountain bliss')) {
            return "Mountain Bliss is nestled along Bhavli Dam Road in Bhagat Wadi, Pimpri Sado. It offers vastu-compliant resort plots with sweeping Sahyadri mountain views. Plot sizes range from 1,000 to 5,000 sq ft, starting at ₹1,200 per sq ft.";
        } else if (message.includes('amenities')) {
            return "Our projects offer various amenities including 24/7 security, well-maintained roads, water supply, electricity connections, and beautiful landscaped gardens. Each project has its own unique features - would you like to know about a specific project?";
        } else if (message.includes('book') || message.includes('site visit')) {
            return "You can book a site visit by filling out the contact form on our website or by calling us at +91 9876543210. Our team will arrange a convenient time for your visit.";
        } else if (message.includes('payment') || message.includes('plans')) {
            return "We offer flexible payment plans including lump sum payment with special discounts, installment plans, and bank financing options. Would you like to speak with our sales representative for more details?";
        } else if (message.includes('beautiful bhavali')) {
            return "Beautiful Bhavali is located near Gavhande and features waterfront plots overlooking the dam and valley. Plot sizes range from 1,200 to 4,000 sq ft, with prices starting at ₹1,100 per sq ft.";
        } else if (message.includes('sunscape')) {
            return "Sunscape is situated on Bhavli Dam Ring Road in Waghyachiwadi. It offers elevated plateau plots with sunrise vistas, 24/7 security, and ready infrastructure. Plot sizes range from 900 to 3,500 sq ft, starting at ₹1,150 per sq ft.";
        } else if (message.includes('contact') || message.includes('call') || message.includes('phone')) {
            return "You can reach us at +91 9876543210 or email us at info@sankalplandmark.com. Our office is located in Igatpuri, Nashik, Maharashtra.";
        } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I assist you with Sankalp Landmark's properties today?";
        } else {
            return "Thank you for your message. For more specific information, please call us at +91 9876543210 or visit our office. Would you like to know about any of our projects?";
        }
    }
});