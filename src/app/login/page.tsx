'use client';

import { useRef, useEffect, useState } from 'react';
import './panda.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function PandaLogin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
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

    const onFocusUsername = () => {
      eyeL.style.cssText = `left:0.75em;top:1.12em;`;
      eyeR.style.cssText = `right:0.75em;top:1.12em;`;
      normalHandStyle();
    };

    const onFocusPassword = () => {
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

    emailRef.current?.addEventListener('focus', onFocusUsername);
    passwordRef.current?.addEventListener('focus', onFocusPassword);
    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Please fill in both fields!");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      alert(`❌ Login failed: ${error.message}`);
    } else {
      router.push("/");
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
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} type="email" id="email" placeholder="Enter your email" required />

          <label htmlFor="password">Password:</label>
          <div className="password-wrapper">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

         <p className="forgot-password" style={{ textAlign: 'right', fontSize: '0.9em', color: '#6c757d' }}>
  <Link href="/forgot-password" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
    Forgot password?
  </Link>
</p>

<p className="signup-link" style={{ textAlign: 'center', fontSize: '0.9em', color: '#535252ff', marginTop: '10px' }}>
  Don’t have an account? <Link href="/signup" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
    Sign up
  </Link>
</p>


          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🐼 Panda Parts */}
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
