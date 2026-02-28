const { body, param, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// Ticket validation rules
const validateTicket = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters')
        .escape(),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters')
        .escape(),
    body('customerName')
        .trim()
        .notEmpty().withMessage('Customer name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
        .escape(),
    body('customerEmail')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail(),
    handleValidationErrors
];

// Message validation rules
const validateMessage = [
    body('content')
        .trim()
        .notEmpty().withMessage('Message content is required')
        .isLength({ min: 1, max: 2000 }).withMessage('Message must be between 1 and 2000 characters')
        .escape(),
    body('sender')
        .trim()
        .notEmpty().withMessage('Sender is required')
        .isIn(['customer', 'agent', 'ai']).withMessage('Invalid sender type'),
    handleValidationErrors
];

// Status update validation
const validateStatus = [
    body('status')
        .trim()
        .notEmpty().withMessage('Status is required')
        .isIn(['Open', 'In Progress', 'Resolved']).withMessage('Invalid status'),
    handleValidationErrors
];

// ID parameter validation
const validateId = [
    param('id')
        .trim()
        .notEmpty().withMessage('ID is required')
        .isMongoId().withMessage('Invalid ID format'),
    handleValidationErrors
];

module.exports = {
    validateTicket,
    validateMessage,
    validateStatus,
    validateId,
    handleValidationErrors
};
