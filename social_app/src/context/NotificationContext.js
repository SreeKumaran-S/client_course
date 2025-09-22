import { createContext, useContext, useState } from "react";
import Notification from "../components/notify/Notification";

let NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    message: "",
    types: "",
    duration: 3000
  });

  const notify = (message, types = "", duration = 3000) => {
    setNotification({ message, types, duration });
  };

  const hideNotification = () => {
    setNotification({ message: "", types: "" });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Notification
        message={notification.message}
        types={notification.types}
        duration={notification.duration}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
}


export function useNotification() {
  return useContext(NotificationContext);
}
