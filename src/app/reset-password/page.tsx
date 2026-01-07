'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import '../login/panda.css'; // Assuming this file exists
import Link from 'next/link';

export default function ResetPasswordPage() {
  const supabase = createClient();
  const passwordRef = useRef(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Use this effect to listen for authentication state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // The `PASSWORD_RECOVERY` event is triggered when the user clicks the reset link.
      // At this point, a temporary session is established.
      if (event === 'PASSWORD_RECOVERY' || session) {
        setLoading(false); // Stop loading and show the form
      } else {
        // If there's no session, redirect to login.
        router.push('/login');
      }
    });

    // Cleanup the subscription on component unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [router, supabase.auth]);

  // Handle the panda animation separately to avoid state issues.
  useEffect(() => {
    const eyeL = document.querySelector('.eyeball-l');
    const eyeR = document.querySelector('.eyeball-r');
    const handL = document.querySelector('.hand-l');
    const handR = document.querySelector('.hand-r');

    if (!eyeL || !eyeR || !handL || !handR) return;

    const onFocusPassword = () => {
      handL.style.cssText = `height:6.56em;top:3.87em;left:11.75em;transform:rotate(-155deg);`;
      handR.style.cssText = `height:6.56em;top:3.87em;right:11.75em;transform:rotate(155deg);`;
      eyeL.style.cssText = `left:0.6em;top:0.6em;`;
      eyeR.style.cssText = `right:0.6em;top:0.6em;`;
    };

    const resetPanda = () => {
      handL.style.cssText = `height: 2.81em;top:8.4em;left:7.5em;transform: rotate(0deg);`;
      handR.style.cssText = `height: 2.81em;top:8.4em;right:7.5em;transform: rotate(0deg);`;
    };

    const currentPasswordRef = passwordRef.current;
    if (currentPasswordRef) {
      currentPasswordRef.addEventListener('focus', onFocusPassword);
    }
    document.addEventListener('click', resetPanda);

    return () => {
      if (currentPasswordRef) {
        currentPasswordRef.removeEventListener('focus', onFocusPassword);
      }
      document.removeEventListener('click', resetPanda);
    };
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }

    // Call Supabase to update the user's password.
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage(`❌ Error updating password: ${error.message}`);
    } else {
      setMessage('✅ Password updated successfully! You can now log in with your new password.');
      // After success, redirect the user back to the login page.
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    );
  }

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
          <label htmlFor="password">New Password:</label>
          <div className="password-wrapper">
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button type="submit">Reset Password</button>

          {message && (
            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.9em',
                color: message.startsWith('❌') ? 'red' : 'green',
                textAlign: 'center',
              }}
            >
              {message}
            </p>
          )}

          <p style={{ textAlign: 'center', marginTop: '1em', fontSize: '0.9em' }}>
            <Link href="/login" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
              Back to Login
            </Link>
          </p>
        </form>

        {/* 🐼 Panda Face */}
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