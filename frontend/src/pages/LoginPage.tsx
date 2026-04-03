import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const LoginPage: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password)
      } else {
        await signInWithEmail(email, password)
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('E-mail ou senha incorretos.')
      } else if (code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.')
      } else if (code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.')
      } else {
        setError('Ocorreu um erro. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch {
      setError('Erro ao entrar com Google. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__header">
          <h1 className="login-card__title">Performance</h1>
          <p className="login-card__subtitle">Sua plataforma de desenvolvimento pessoal</p>
        </div>

        <button className="login-google-btn" onClick={handleGoogle} disabled={loading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
          Entrar com Google
        </button>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <form onSubmit={handleEmailSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isSignUp ? 'Mínimo 6 caracteres' : '••••••••'}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn--primary login-submit-btn" disabled={loading}>
            {loading ? 'Aguarde...' : isSignUp ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        <p className="login-toggle">
          {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
          {' '}
          <button className="login-toggle__btn" onClick={() => { setIsSignUp(!isSignUp); setError(null) }}>
            {isSignUp ? 'Entrar' : 'Criar conta'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
