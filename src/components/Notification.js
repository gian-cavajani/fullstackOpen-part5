const Notification = ({ message }) => {
  if (message.code === null) {
    return null;
  } else if (message.code === 'error') {
    return <div className="error">{message.message}</div>;
  } else if (message.code === 'ok') {
    return <div className="ok">{message.message}</div>;
  }
};

export default Notification;
