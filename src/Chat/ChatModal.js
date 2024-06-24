import React, { useEffect, useRef, useState } from 'react'
import { baseUrl } from '../Api/Api';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";
import './Chat.css';

function ChatModal({isOpen, closeModal, userId, recipientId, recipient, token}) {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/Chat/GetAllMyMessage?id=${recipientId}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            });
            const messageData = response.data;

            const messagesArray = Object.entries(messageData).map(([timestamp, message]) => {
                const [senderId, content] = message.split(': '); // Split by colon
                return {
                id: `${timestamp}-${senderId}`, // Generate a unique ID
                timestamp: timestamp,
                senderId: senderId,
                content: content.trim() // Trim any extra spaces
                };
            });
      
            setMessages(messagesArray);
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight; // Scroll to the bottom
        } catch (error) {
        console.error('Error fetching messages:', error);
        }
    };

  // Start fetching messages when modal opens
  useEffect(() => {
    let intervalId;
    if (isOpen) {
      intervalId = setInterval(fetchMessages, 500); // Fetch every 0.5 second
    }

    return () => clearInterval(intervalId); // Clear interval when modal closes
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    try {
        const response = await axios.post(`${baseUrl}/api/Chat/SendMessage`, { id: recipientId, message: newMessage }, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
            },
        });

        const newMessageData = Object.entries(response.data).map(([timestamp, message]) => {
            const [senderId, content] = message.split(': ');
            return {
            id: `${timestamp}-${senderId}`,
            timestamp: timestamp,
            senderId: senderId,
            content: content.trim()
            };
        });
    
        // Update the messages state
        setMessages([...messages, ...newMessageData]); 
        setNewMessage('');
    } catch (error) {
      console.error('Error sending message to api:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
        <div className="modal-dialog" style={{ maxWidth: '700px', marginLeft: '530px' }}>
        <div className="modal-content" >
            <div className="modal-header">
            <h5 className="modal-title">CHAT</h5>
            <button type="button" className="btn-close" onClick={() => {
                closeModal();
                }}>
            </button>
            </div>
            <div className="modal-body"  style={{height: 'auto', maxHeight: '600px', overflowY: 'auto'}}>
            <div className="chat-container" >
                <div className="chat-header">
                    Chat with {recipient}
                </div>
                <div className="chat-messages" ref={messagesRef}>
                    {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.senderId === recipientId ?  'received' : 'sent' }`}>
                        <div className="chat-message-content">
                        <p>{msg.content}</p>
                        <span className="chat-timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="chat-input">
                    <textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}><IoMdSend /></button>
                </div>
                </div>
            </div>
            <div className="modal-footer">
            <button type="button" className='btn btn-secondary' onClick={() => {closeModal()}}>Close</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ChatModal;