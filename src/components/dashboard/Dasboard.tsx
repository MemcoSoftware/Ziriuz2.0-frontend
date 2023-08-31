import React from "react";

export const DashboarCuadroTareas = () => {
  const notificationsList = document.getElementById("notifications-list");

  if (notificationsList) {
    notificationsList.innerHTML = "";

    setTimeout(() => {
      const notifications: string[] = ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 4", "Tarea 5"];

      notifications.forEach((notification) => {
        const li = document.createElement("li");
        li.className = "notification-item";
        li.textContent = notification;
        if (notificationsList) {
          notificationsList.appendChild(li);
        }
      });
    }, 1000);
  }

  return (
    <div></div>
  );
};
