const Notification = ({ message, status }) => {
  if (message === null) {
    return null;
  }
  let messageStyle;
  if (status === "success") {
    messageStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      borderColor: "green",
    };
  } else {
    messageStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      borderColor: "red",
    };
  }

  return <div style={messageStyle}>{message}</div>;
};

export default Notification;
