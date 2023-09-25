import React, { useEffect } from 'react';
import './styles/UnauthorizedPage.css';

const UnauthorizedPage = () => {
  useEffect(() => {
    const interval = 500;

    function generateLocks() {
      const lock = document.createElement('div');
      const position = generatePosition();
      lock.innerHTML = '<div class="UnauthorizedPage-lock"><div class="UnauthorizedPage-top"></div><div class="UnauthorizedPage-bottom"></div></div>';
      lock.style.top = position[0];
      lock.style.left = position[1];
      lock.className = 'UnauthorizedPage-lock generated';
      document.body.appendChild(lock);
      setTimeout(() => {
        lock.style.opacity = '1';
      }, 100);
      setTimeout(() => {
        lock.parentElement?.removeChild(lock);
      }, 2000);
    }

    function generatePosition() {
      const x = Math.round(Math.random() * 100 - 10) + '%';
      const y = Math.round(Math.random() * 100) + '%';
      return [x, y];
    }

    const lockInterval = setInterval(generateLocks, interval);

    return () => {
      clearInterval(lockInterval);
    };
  }, []);

  return (
    <div className="UnauthorizedPage-container">
      <h1>
        4
        <div className="UnauthorizedPage-lock">
          <div className="UnauthorizedPage-top"></div>
          <div className="UnauthorizedPage-bottom"></div>
        </div>
        3
      </h1>
      <p>Access denied</p>
    </div>
  );
};

export default UnauthorizedPage;
