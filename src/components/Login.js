import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../UserContext'; 
import styles from '../styles/LoginStyle';
import Swal from 'sweetalert2';


export default function Login() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();


  const authenticate = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

    if (data.access) {
      login(data.user);
      localStorage.setItem('access', data.access); 

      Swal.fire({
        title: 'Success!',
        text: 'You are now logged in.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          if (data.user.isAdmin) {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Login failed: ' + data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
          title: 'Error!',
          text: 'Login failed: ' + error,
          icon: 'error',
          confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <div className={styles.container}>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

            <form className={styles.form} onSubmit={authenticate}>
                <div>
                <label htmlFor="email" className={styles.label}>Email address</label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                    />            
                </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <div className="text-sm">
                            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
                        </div>            
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className={styles.button}
                    >
                    Sign in
                    </button>            
                </div>
            </form>
              <p className={styles.signup}>
                  Not a member?{' '}
                  <Link to="/register" className={styles.signupLink}>
                      Register now
                  </Link>
              </p>
        </div>
    </div>
  );
}
