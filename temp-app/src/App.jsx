import { useMemo, useState } from 'react'
import { subscribeEmail } from './lib/subscribeAdapter'

function App() {
  const [logoFailed, setLogoFailed] = useState(false)
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState('idle')
  const [message, setMessage] = useState('')

  const isEmailValid = useMemo(() => {
    if (!email) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }, [email])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isEmailValid) {
      setFormState('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setFormState('loading')
    setMessage('')

    const result = await subscribeEmail(email)

    if (result.ok) {
      setFormState('success')
      setMessage(result.message)
      setEmail('')
      return
    }

    setFormState('error')
    setMessage(result.message)
  }

  return (
    <div className="page">
      <div className="noise" aria-hidden="true"></div>
      <div className="ambient ambient-a" aria-hidden="true"></div>
      <div className="ambient ambient-b" aria-hidden="true"></div>

      <a
        href="https://instagram.com/shivayaa_couture"
        target="_blank"
        rel="noreferrer"
        className="instagram-only"
        aria-label="Visit Shivayaa Couture on Instagram"
      >
        @shivayaa_couture
      </a>

      <main className="hero">
        <div className="top-logo">
          <img src="/logo.png" alt="Shivayaa Couture logo" />
        </div>

        <div className="wordmark-backdrop" aria-hidden="true">
          <span>SHIVAYAA</span>
          <small>COUTURE</small>
        </div>

        <div className="logo-ghost" aria-hidden="true">
          {!logoFailed ? (
            <img
              src="/brand-logo.png"
              alt=""
              className="ghost-image"
              onError={() => setLogoFailed(true)}
            />
          ) : null}
        </div>

        <h1>COMING SOON</h1>

        <p className="body-copy">
          Stay tuned for an elevated couture reveal in signature green tones.
          Join our private list for first access to the Shivayaa Couture launch.
        </p>

        <form className="subscribe" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <span className="mail-dot" aria-hidden="true">@</span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your Email ID"
            aria-invalid={formState === 'error'}
            required
          />
          <button type="submit" disabled={formState === 'loading'}>
            {formState === 'loading' ? 'Submitting...' : 'NOTIFY ME'}
          </button>
        </form>

        {message && (
          <p
            className={`form-message ${formState === 'success' ? 'ok' : 'bad'}`}
            role={formState === 'error' ? 'alert' : 'status'}
          >
            {message}
          </p>
        )}
      </main>
    </div>
  )
}

export default App
