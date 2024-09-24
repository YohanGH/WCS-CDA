// Practices 0

const messsageText: string  = "Hello Bob!"; // you should type on this line
const messageCreatedAt: Date = new Date();

function stringifyMessage(text: string, createdAt: Date) {
	return `${text}, the ${createdAt.toLocaleDateString()}`;
}


// Practices 1

type Message = {
    from: string;
    message: string;
    isRead?: Boolean;
}

const message1: Message = { from: "Bob", message: "Hello Alice!", isRead: true };
const message2: Message = { from: "Alice", message: "Hi Bob!" };

// Practices 2

const messages: Message[] = [message1, message2];
function readMessages(messages: Message[]): number {
	// put some logic to set isRead to true on all messages
	messages.forEach(message => message.isRead = true);
    return messages.length;
}
readMessages(messages);

// Practices 3

type Notif = {
    at: number;
    state: "unread" | "read";
}

const notification1: Notif = { at: 1694011133, state: "unread" };
const notification2: Notif = { at: 1694011532, state: "read" };

// Practices 4

function readNotificationOrMessage(notificationOrMessage: Message | Notif) { // type this line
	// put some logic here to mark as read a message or a notif
	// this function does NOT return anything

    if ( "isRead" in notificationOrMessage) {
        notificationOrMessage.isRead = true
    }
     else if ("state" in notificationOrMessage) {
        notificationOrMessage.state = "read";
     }
}
