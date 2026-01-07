'use client';

import { useRef, useEffect, useState } from 'react';
import './signup.css';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function PandaSignup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const supabase = createClient();

  useEffect(() => {
    /* your existing panda animation code (unchanged) */
    const eyeL = document.querySelector('.eyeball-l') as HTMLElement;
    const eyeR = document.querySelector('.eyeball-r') as HTMLElement;
    const handL = document.querySelector('.hand-l') as HTMLElement;
    const handR = document.querySelector('.hand-r') as HTMLElement;

    const normalEyeStyle = () => {
      eyeL.style.cssText = `left:0.6em;top:0.6em;`;
      eyeR.style.cssText = `right:0.6em;top:0.6em;`;
    };

    const normalHandStyle = () => {
      handL.style.cssText = `height: 2.81em;top:8.4em;left:7.5em;transform: rotate(0deg);`;
      handR.style.cssText = `height: 2.81em;top:8.4em;right:7.5em;transform: rotate(0deg);`;
    };

    const onFocus = () => {
      handL.style.cssText = `height:6.56em;top:3.87em;left:11.75em;transform:rotate(-155deg);`;
      handR.style.cssText = `height:6.56em;top:3.87em;right:11.75em;transform:rotate(155deg);`;
      normalEyeStyle();
    };

    const onClickOutside = (e: MouseEvent) => {
      if (e.target !== emailRef.current && e.target !== passwordRef.current) {
        normalEyeStyle();
        normalHandStyle();
      }
    };

    emailRef.current?.addEventListener('focus', normalHandStyle);
    passwordRef.current?.addEventListener('focus', onFocus);
    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  const validatePassword = (password: string) => {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);
    return hasLower && hasUpper && hasNumber && hasSymbol;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const email = emailRef.current?.value.trim() || '';
    const password = passwordRef.current?.value.trim() || '';

    if (!validatePassword(password)) {
      setError('Password must include uppercase, lowercase, number & symbol.');
      return;
    }

    setLoading(true);

    try {
      // 1) Ask server if email exists (server uses service role key)
      const resp = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await resp.json();

      if (!resp.ok) {
        setError(result?.error || 'Server error while checking email');
        setLoading(false);
        return;
      }

      if (result.exists) {
        setError('❌ Account already exists with this email');
        setLoading(false);
        return;
      }

      // 2) Email does not exist -> proceed with normal sign up (client call)
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:9002/' // change in production
        },
      });

      if (signUpError) {
        setError(`❌ ${signUpError.message}`);
      } else {
        setSuccessMessage('✅ Check your email (and spam folder) to confirm account');
      }
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="websec-header-bar">
        <div className="websec-header-wrapper" onClick={() => window.location.reload()}>
          <img src="/brain.png" alt="Logo" className="websec-logo" />
          <h1 className="websec-gradient-title" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            WebSec GPT
          </h1>
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password:</label>
          <div className="password-wrapper">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Create a password"
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {error && <p style={{ color: 'red', fontSize: '0.85em', marginTop: '0.5em' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green', fontSize: '0.85em', marginTop: '0.5em' }}>{successMessage}</p>}

          <p className="login-link-text">
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#6366f1', textDecoration: 'underline' }}>
              Login
            </Link>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {/* 🐼 Panda Parts unchanged */}
        <div className="ear-l"></div>
        <div className="ear-r"></div>
        <div className="panda-face">
          <div className="blush-l"></div>
          <div className="blush-r"></div>
          <div className="eye-l"><div className="eyeball-l"></div></div>
          <div className="eye-r"><div className="eyeball-r"></div></div>
          <div className="nose"></div>
          <div className="mouth"></div>
        </div>
        <div className="hand-l"></div>
        <div className="hand-r"></div>
        <div className="paw-l"></div>
        <div className="paw-r"></div>
      </div>
    </>
  );
}
