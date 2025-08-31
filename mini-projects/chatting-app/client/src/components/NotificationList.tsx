import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils";
import Icon from "./Icon";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      setIsLoading(true);
      const result = await fetchWithAuth(`/notifications`);

      if (!result.success) {
        console.error("알림 목록 조회 실패");
      }

      setNotifications(result.data.notifications);
      setIsLoading(false);
    };

    getNotifications();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <div>알림 목록</div>
      <div className="flex flex-col flex-1">
        {isLoading && (
          <div className="flex items-center justify-center flex-1 w-full h-full">
            <Icon name="autorenew" className="text-2xl animate-spin" />
          </div>
        )}
        {!isLoading && notifications.map((notification) => <div>알림</div>)}
      </div>
    </div>
  );
};

export default NotificationList;
