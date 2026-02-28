const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Message = require('../models/Message');
const aiService = require('../services/aiService');
const { validateTicket, validateMessage, validateStatus, validateId } = require('../middleware/validationMiddleware');

// Create a new ticket
router.post('/tickets', validateTicket, async (req, res, next) => {
    try {
        const { title, description, customerName, customerEmail } = req.body;

        // AI Categorization
        const category = await aiService.categorizeTicket(description);

        const ticket = new Ticket({
            title,
            description,
            customerName,
            customerEmail,
            category,
            status: 'Open'
        });
        await ticket.save();

        // Initial message from customer
        const message = new Message({
            ticketId: ticket._id,
            sender: 'customer',
            content: description
        });
        await message.save();

        // AI Auto-response (optional, maybe only for certain categories or if low confidence)
        // For MVP, if it's "General", maybe AI responds immediately.
        if (category === 'General') {
            const aiResponse = await aiService.generateResponse(description, "Generate a polite initial response to this customer query.");
            const autoReply = new Message({
                ticketId: ticket._id,
                sender: 'ai',
                content: aiResponse
            });
            await autoReply.save();
            ticket.status = 'In Progress'; // AI picked it up
            await ticket.save();
        }

        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
});

// Get all tickets
router.get('/tickets', async (req, res, next) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });
        res.json(tickets);
    } catch (err) {
        next(err);
    }
});

// Get ticket details and messages
router.get('/tickets/:id', validateId, async (req, res, next) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            const error = new Error('Ticket not found');
            error.statusCode = 404;
            return next(error);
        }

        const messages = await Message.find({ ticketId: req.params.id }).sort({ createdAt: 1 });
        res.json({ ticket, messages });
    } catch (err) {
        next(err);
    }
});

// Add a message to a ticket
router.post('/tickets/:id/messages', validateId, validateMessage, async (req, res, next) => {
    try {
        const { content, sender } = req.body;
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            const error = new Error('Ticket not found');
            error.statusCode = 404;
            return next(error);
        }

        const message = new Message({
            ticketId: ticket._id,
            sender,
            content
        });
        await message.save();

        // Update ticket updated time
        ticket.updatedAt = Date.now();
        if (sender === 'agent') {
            ticket.status = 'In Progress'; // Or 'Resolved' if passed
        }
        await ticket.save();

        res.status(201).json(message);
    } catch (err) {
        next(err);
    }
});

// Update ticket status
router.patch('/tickets/:id', validateId, validateStatus, async (req, res, next) => {
    try {
        const { status } = req.body;
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status, updatedAt: Date.now() }, { new: true });
        if (!ticket) {
            const error = new Error('Ticket not found');
            error.statusCode = 404;
            return next(error);
        }
        res.json(ticket);
    } catch (err) {
        next(err);
    }
});

// Get AI suggestion for a reply
router.post('/tickets/:id/suggest', validateId, async (req, res, next) => {
    try {
        const messages = await Message.find({ ticketId: req.params.id }).sort({ createdAt: 1 });
        // Format history for AI
        const history = messages.map(m => `${m.sender}: ${m.content}`).join('\n');

        const suggestion = await aiService.generateResponse(history, "Suggest a professional and helpful response for the support agent to send next.");
        res.json({ suggestion });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
