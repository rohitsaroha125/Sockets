import logo from './logo.svg';
import {useEffect, useState} from 'react'
import { io } from "socket.io-client";
import './App.css';

const socket=io.connect('http://localhost:5000')

function App() {
  const [msg, setMsg] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage=() => {
    socket.emit("send_message",{message:msg})
  }

  const handleMessage=(e) => {
    setMsg(e.target.value)
  }

  useEffect(() => {
    socket.on("coming_message",(data) => {
      setMessages((prevState) => {
        return [...prevState, data.message]
      })
    })
  }, [socket])

  return (
    <div className="App" style={{
      marginTop:'45px'
    }}>
      <input type="text" placeholder="message" onChange={handleMessage} value={msg} />
      <button onClick={sendMessage}>Submit</button>
      {
        messages.map((message, i) => {
          return <p key={i}>{message}</p>
        })
      }
    </div>
  );
}

export default App;
