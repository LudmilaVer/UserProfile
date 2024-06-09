import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://randomuser.me/api/');
      setUser(response.data.results[0]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleColorChange = () => {
    setBgColor(getRandomColor());
  };

  return (
    <div className={styles.userProfile} style={{ backgroundColor: bgColor }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        user && (
          <div className={styles.userInfo}>
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <h2>{user.name.first} {user.name.last}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <button onClick={fetchUser}>Load New User</button>
            <button onClick={handleColorChange}>Change Background Color</button>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;
