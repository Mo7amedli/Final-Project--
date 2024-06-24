import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import * as signalR from '@microsoft/signalr'
import Cookie from 'cookie-universal';
import { baseUrl } from '../Api/Api';
import { IoMdSend } from "react-icons/io";
import './Chat.css';

//const socket = io('http://localhost:3000'); 

const Chat = () => {
  const { userId, recipientId, recipient } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const connection = useRef(null);
  const messagesRef = useRef(null);
  const cookies = Cookie();
  const token = cookies.get('freelanceCookie');

  useEffect(()=>{
    connection.current = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/Chat`, {
        accessTokenFactory: ()=>token
      })
      .build();

    // Connect to the hub
    connection.current.start()
      .then(() => {
        console.log('Connected to chat hub');
      })
      .catch(err => console.error('Error connecting to chat hub:', err));

    // Handle incoming messages
    connection.current.on('ReceiveMessage', (userId, message) => {
      setMessages([...messages, { sender: userId, content: message }]);
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;  //scroll to the bottom
    });

    fetchMessages();

    return()=>{
      connection.current.stop();
    }
  },[])

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/Chat/GetAllMyMessage?id=${recipientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messageData = response.data;

      // Parse the message data
      const messagesArray = Object.entries(messageData).map(([timestamp, message]) => {
        const [sender, messageContent] = message.split(': ');
        return {
          timestamp: timestamp, 
          senderId:sender.split('_'), 
          content:messageContent 
        };
      });

      setMessages(messagesArray);
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;  //scroll to the bottom
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    connection.current.invoke('sendMessage', userId, recipientId, newMessage).catch(err=>console.error('Error sending message:', err));

    /*const message = {
      sender: userId,
      recipient: recipientId,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };*/

    try {
      await axios.post(`${baseUrl}/api/Chat/SendMessage`, { id: recipientId, message: newMessage }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      // Emit the message to the server
      //socket.emit('sendMessageToServer', message);

      setMessages([...messages, , {senderId:userId, content:newMessage}]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message to api:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Chat with {recipient}
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === userId ? 'sent' : 'received'}`}>
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
  );
};

export default Chat;