import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils";
import Icon from "./Icon";
import { useNotificationStore } from "../stores";

const NotificationList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );
  const deleteNotification = useNotificationStore(
    (state) => state.deleteNotification
  );

  useEffect(() => {
    const getNotifications = async () => {
      setIsLoading(true);
      const result = await fetchWithAuth(`/notifications`);

      if (!result.success) {
        console.error("알림 목록 조회 실패");
        return;
      }

      setNotifications(result.data.notifications);
      setIsLoading(false);
    };

    getNotifications();
  }, []);

  const handleDeleteAll = async () => {
    try {
      const result = await fetchWithAuth("/notifications", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.success) {
        console.error("전체 삭제 실패");
        return;
      }

      setNotifications([]);
    } catch (error) {
      console.error("전체 삭제 실패", error);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      const result = await fetchWithAuth(`/notifications/${notificationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.success) {
        console.error("삭제 실패");
        return;
      }
    } catch (error) {
      console.error("삭제 실패");
    }

    deleteNotification(notificationId);
  };

  return (
    <div className="flex flex-col flex-1">
      <div>알림 목록</div>
      <div className="flex flex-col flex-1">
        <div className="flex justify-between p-2">
          <span className="space-x-2">
            <button>전체</button>
            <button>친구</button>
            <button>메시지</button>
          </span>
          <span>
            <button onClick={handleDeleteAll}>전체 삭제</button>
          </span>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center flex-1 w-full h-full">
            <Icon name="autorenew" className="text-2xl animate-spin" />
          </div>
        )}
        {!isLoading &&
          notifications.map((notification) => (
            <div className="flex justify-between">
              <p>알림</p>
              <span onClick={() => handleDelete(notification.notificationId)}>
                <Icon name="close" />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotificationList;
