self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Nova notificação";
  const body = data.body || "Você tem uma nova notificação";

  event.waitUntil(
    (async () => {
      await self.registration.showNotification(title, { body });
      const clientList = await self.clients.matchAll({
        includeUncontrolled: true,
        type: "window",
      });
      for (const client of clientList) {
        client.postMessage({ title, body });
      }
    })()
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
