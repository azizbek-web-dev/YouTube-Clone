import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaYoutube } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext.jsx'
import './Auth.css'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      register({ name, email, password })
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

        <h1 className="auth-title">Hisob yarating</h1>
        <p className="auth-subtitle">YouTube-ni davom ettirish uchun</p>

        <form className="auth-form" onSubmit={onSubmit}>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label htmlFor="name">Ismingiz</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

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
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" className="auth-submit" disabled={busy}>
            Ro'yxatdan o'tish
          </button>
        </form>

        <p className="auth-footer">
          Hisobingiz bormi?
          <Link to="/login">Kirish</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
