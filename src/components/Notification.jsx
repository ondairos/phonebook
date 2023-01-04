import React from "react";

export const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="error">
      {message}
      <p>ERROR MESSAGE HERE</p>
    </div>
  );
};

export default Notification;
