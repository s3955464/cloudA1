import React, { useState, useEffect } from "react";

function Notification({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Call onClose function after notification duration
    }, 3000); // Set duration for notification to be visible (3 seconds)

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? <div className="notification">{message}</div> : null;
}
export default Notification;