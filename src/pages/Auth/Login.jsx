import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaYoutube } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext.jsx'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      login({ email, password })
      navigate('/')
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <FaYoutube className="auth-logo-icon" />
          <span className="auth-logo-text">YouTube</span>
        </div>

        <h1 className="auth-title">Kirish</h1>
        <p className="auth-subtitle">YouTube-ni davom ettirish uchun</p>

        <form className="auth-form" onSubmit={onSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Parol</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="auth-submit" disabled={busy}>
            Kirish
          </button>
        </form>

        <p className="auth-footer">
          Hisobingiz yo'qmi?
          <Link to="/register">Ro'yxatdan o'tish</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
