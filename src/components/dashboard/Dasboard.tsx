import React from "react";

export const DashboarCuadroTareas = () => {
  const notificationsList = document.getElementById("notifications-list");

  const fetchNotifications = () => {
    if (notificationsList) {
      notificationsList.innerHTML = "<p>Cargando...</p>"; 

      setTimeout(() => {
        const notifications: string[] = ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 4", "Tarea 5"];

        notificationsList.innerHTML = ""; 

        notifications.forEach((notification) => {
          const li = document.createElement("li");
          li.className = "notification-item";
          li.textContent = notification;
          notificationsList.appendChild(li);
        });
      }, 1000);
    }
  };

  return (
    <div>
      <nav>
        <div className="container">
          <h1 className="title">Pendientes</h1>
          <button onClick={fetchNotifications}>Cargar tareas</button>
          <ul id="notifications-list"></ul>
        </div>
      </nav>
    </div>
  );
};
