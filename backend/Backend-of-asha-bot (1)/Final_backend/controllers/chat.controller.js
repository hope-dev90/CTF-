const Message = require('../models/message.model');
const askOpenAI = require('../services/openai.service');

exports.sendMessage = async (req, res, next) => {
    try {
        const { message, userId } = req.body;

        //  Validate input
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'userId is required'
            });
        }

        if (!message || typeof message !== 'string' || message.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        //  Get chat history (last 10 messages)
        const previousMessages = await Message.find({ userId })
            .select('userMessage botReply') // 🔥 optimization
            .sort({ createdAt: -1 })
            .limit(10);

        //  Format history for OpenAI
        const chatHistory = previousMessages.reverse().flatMap(msg => [
            { role: "user", content: msg.userMessage },
            { role: "assistant", content: msg.botReply }
        ]);

        //  Call AI service
        const aiReply = await askOpenAI(message, chatHistory);

        //  Save message
        const savedMessage = await Message.create({
            userId,
            userMessage: message,
            botReply: aiReply,
        });

        //  Success response (consistent format)
        res.status(200).json({
            success: true,
            data: savedMessage
        });

    } catch (error) {
        next(error);
    }
};

exports.getCareerAdvice = exports.sendMessage;