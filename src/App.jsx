import { useState, useEffect } from "react"
import axios from "axios"

const API_URL = "http://localhost:8001"

export default function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    const response = await axios.get(`${API_URL}/messages`)
    setMessages(response.data)
  }

  async function postMessage() {
    if (!name || !message) return
    setLoading(true)
    await axios.post(`${API_URL}/messages`, { name, message })
    setName("")
    setMessage("")
    await fetchMessages()
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "24px" }}>Message Board</h1>

      <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px", marginBottom: "32px" }}>
        <input
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }}
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "6px", border: "1px solid #ddd", boxSizing: "border-box" }}
        />
        <button
          onClick={postMessage}
          disabled={loading}
          style={{ background: "#000", color: "#fff", padding: "10px 24px", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      <div>
        {messages.length === 0 && <p style={{ color: "#999" }}>No messages yet. Be the first!</p>}
        {messages.map(msg => (
          <div key={msg.id} style={{ borderBottom: "1px solid #eee", padding: "16px 0" }}>
            <p style={{ fontWeight: "bold", marginBottom: "4px" }}>{msg.name}</p>
            <p style={{ color: "#333", marginBottom: "4px" }}>{msg.message}</p>
            <p style={{ color: "#999", fontSize: "12px" }}>{msg.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  )
}