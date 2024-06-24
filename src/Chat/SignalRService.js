import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Cookie from 'cookie-universal'
const createSignalRConnection = (userId, onMessageReceived) => {
    const cookies = Cookie();
    const token = cookies.get('freelanceCookie');
    const connection = new HubConnectionBuilder()
        .withUrl('/chat', {
            accessTokenFactory: () => (token) // Provide the token if required
        })
        .configureLogging(LogLevel.Information)
        .build();

    connection.on('ReceiveMessage', (senderId, message) => {
        if (onMessageReceived) {
            onMessageReceived(senderId, message);
        }
    });

    connection.start()
        .then(() => console.log('SignalR Connected'))
        .catch(err => console.error('SignalR Connection Error: ', err));

    const sendMessage = (receiverId, message) => {
        connection.invoke('SendMessage', userId, receiverId, message)
            .catch(err => console.error('SignalR SendMessage Error: ', err));
    };

    return { sendMessage };
};

export default createSignalRConnection;