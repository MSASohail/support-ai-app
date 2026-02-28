const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock-key',
    dangerouslyAllowBrowser: true // For this backend service, though typically not needed
});

const isMock = !process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here';

const generateResponse = async (context, userMessage) => {
    if (isMock) {
        console.log('🤖 Using Mock AI Response');
        return new Promise(resolve => setTimeout(() => resolve(`[Mock AI] This is a simulated response to: "${userMessage}". Please add a valid OpenAI Keys to .env for real responses.`), 1000));
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: `You are a helpful customer support AI. Context: ${context}` },
                { role: 'user', content: userMessage }
            ],
            model: 'gpt-3.5-turbo',
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('OpenAI Error:', error);
        return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
};

const categorizeTicket = async (description) => {
    if (isMock) {
        const categories = ['Technical', 'Billing', 'Delivery', 'General'];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'Categorize the following support ticket into one of these: Technical, Billing, Delivery, General. Return ONLY the category name.' },
                { role: 'user', content: description }
            ],
            model: 'gpt-3.5-turbo',
        });
        return completion.choices[0].message.content.trim();
    } catch (error) {
        return 'General';
    }
};

const suggestReply = async (ticketHistory) => {
    if (isMock) {
        return "Based on the history, I suggest asking the customer for their order number.";
    }

    // Implementation for real suggestions based on message history
    // Simplified for now
    return generateResponse("You are an assistant helping a support agent draft a reply.", JSON.stringify(ticketHistory));
};

module.exports = { generateResponse, categorizeTicket, suggestReply };
