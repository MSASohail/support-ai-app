export const mockTickets = [
    {
        _id: "650c1f1e1c9d440000a1b2c3",
        title: "Login issues on mobile app",
        customerName: "Alice Johnson",
        customerEmail: "alice@example.com",
        status: "Open",
        category: "Technical",
        createdAt: "2023-10-25T10:00:00Z",
        messages: [
            {
                _id: "msg_1",
                sender: "user",
                content: "I can't log in to the mobile app. It keeps saying 'Network Error'.",
                createdAt: "2023-10-25T10:00:00Z"
            },
            {
                _id: "msg_2",
                sender: "ai",
                content: "I'm sorry to hear that. Have you tried reinstalling the app or checking your internet connection?",
                createdAt: "2023-10-25T10:00:05Z"
            }
        ]
    },
    {
        _id: "650c1f1e1c9d440000a1b2c4",
        title: "Billing question",
        customerName: "Bob Smith",
        customerEmail: "bob@example.com",
        status: "In Progress",
        category: "Billing",
        createdAt: "2023-10-24T14:30:00Z",
        messages: [
            {
                _id: "msg_3",
                sender: "user",
                content: "I was charged twice for this month's subscription.",
                createdAt: "2023-10-24T14:30:00Z"
            },
            {
                _id: "msg_4",
                sender: "agent",
                content: "Hi Bob, let me check your transaction history for you.",
                createdAt: "2023-10-24T14:45:00Z"
            }
        ]
    },
    {
        _id: "650c1f1e1c9d440000a1b2c5",
        title: "Feature Request: Dark Mode",
        customerName: "Charlie Brown",
        customerEmail: "charlie@example.com",
        status: "Open",
        category: "Feature Request",
        createdAt: "2023-10-26T09:15:00Z",
        messages: [
            {
                _id: "msg_5",
                sender: "user",
                content: "Is there a dark mode option coming soon? My eyes hurt at night.",
                createdAt: "2023-10-26T09:15:00Z"
            }
        ]
    }
];
