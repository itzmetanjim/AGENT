'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client'; // ✅ correct way now
import '../login/panda.css'; // ✅ reuse panda styles

export default function ForgotPasswordPanda() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  const supabase = createClient(); // ✅ create the client inside the component

  useEffect(() => {
    const eyeL = document.querySelector('.eyeball-l') as HTMLElement;
    const eyeR = document.querySelector('.eyeball-r') as HTMLElement;
    const handL = document.querySelector('.hand-l') as HTMLElement;
    const handR = document.querySelector('.hand-r') as HTMLElement;

    const focusEmail = () => {
      eyeL.style.cssText = `left:0.75em;top:1.12em;`;
      eyeR.style.cssText = `right:0.75em;top:1.12em;`;
      handL.style.cssText = `height: 2.81em;top:8.4em;left:7.5em;transform: rotate(0deg);`;
      handR.style.cssText = `height: 2.81em;top:8.4em;right:7.5em;transform: rotate(0deg);`;
    };

    const resetPanda = () => {
      eyeL.style.cssText = `left:0.6em;top:0.6em;`;
      eyeR.style.cssText = `right:0.6em;top:0.6em;`;
    };

    const onClickOutside = (e: MouseEvent) => {
      if (e.target !== emailRef.current) resetPanda();
    };

    emailRef.current?.addEventListener('focus', focusEmail);
    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:9002/reset-password', // change this when deployed
    });

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage('Password reset link sent. Check your email.');
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
        <form onSubmit={handleReset}>
          <label htmlFor="email">Email:</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />

          <p style={{ textAlign: 'center', fontSize: '0.9em', color: '#7f8c8d' }}>
            Remember your password?{' '}
            <Link href="/login" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
              Back to Login
            </Link>
          </p>

          <button type="submit">Send Reset Link</button>

          {message && (
            <p style={{ marginTop: '1rem', fontSize: '0.9em', color: message.startsWith('✅') ? 'green' : 'red' }}>
              {message}
            </p>
          )}
        </form>

        {/* 🐼 Panda Components */}
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
