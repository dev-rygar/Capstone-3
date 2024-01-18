import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import styles from '../styles/LoginStyle';

export default function Register() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [locationType, setLocationType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        Swal.fire({
            title: 'Error!',
            text: 'Passwords do not match!',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                locationType,
                email,
                password,
                mobileNo
            }),
        });

        const data = await response.json();

        if (response.status === 201) {
            Swal.fire({
                title: 'Success!',
                text: 'Registration successful!',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: `Registration failed: ${data.message}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred during registration. Please try again.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
};


    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className='text-4xl font-medium text-center'>Signup Now</h2>
                <label className={styles.label}>
                    First Name:
                    <input className={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                </label>
                <label className={styles.label}>
                    Last Name:
                    <input className={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                </label>

                <label className={styles.label}>
                    Location Type:
                    <select className={styles.input} value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                        <option value="" disabled>Select Location</option>
                        <option value="Metro Manila">Metro Manila</option>
                        <option value="Province">Province</option>
                    </select>
                </label>

                <label className={styles.label}>
                    Mobile No:
                    <input className={styles.input} type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder="Mobile Number" />
                </label>
                <label className={styles.label}>
                    Email:
                    <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </label>
                <label className={styles.label}>
                    Password:
                    <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </label>
                <label className={styles.label}>
                    Confirm Password:
                    <input className={styles.input} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                </label>
                <button className={styles.button} type="submit">Register</button>
            </form>
            <div className={styles.signup}>
                Already a member? <Link to="/login" className={styles.signupLink}>Login Now</Link>
            </div>
        </div>
    );
}
