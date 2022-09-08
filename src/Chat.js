
import React, {useEffect} from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import  axios  from 'axios';

import 'react-chat-widget/lib/styles.css';
import './chatStyle.css'


function Chat() {
  useEffect(() => {
    addResponseMessage("Hey, send any questions you might have here");
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    let apiUrl
    // process.env.REACT_APP_ENV === 'development' ? apiUrl = process.env.REACT_APP_API_URL_DEVELOPMENT : apiUrl = process.env.REACT_APP_API_URL_PRODUCTION
    apiUrl = "http://localhost:8080"
    let res = await axios.post(`${apiUrl}/telegram`, {msg: newMessage})
    console.log('res body', res.data)
    // Now send the message throught the backend API
    let response = res.data ?? 'error receiving your message'
    addResponseMessage(response);
  };

  return (
    // <div className="App">
      <Widget 
        handleNewUserMessage={handleNewUserMessage}
        title="Send us a message"
        subtitle=" &nbsp; To ensure we can get you a response, include your email or telegram handle in your msgs &nbsp;   "
        resizable={true}
      />
    // </div>
  );
}

export default Chat;