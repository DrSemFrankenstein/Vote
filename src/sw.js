const CACHE_NAME = "my-pwa-cache-v1";

const FILES_TO_CACHE = [
  "/Vote/",
  "/Vote/index.html",
  "/Vote/assets/style.css",
  "/Vote/assets/main.js",
  // Add other assets like CSS, JS, images, etc.
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Deleting cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("push", (event) => {
  const options = {
    body: event.data.text(),
  };
  event.waitUntil(self.registration.showNotification("Your App Name", options));
});

self.addEventListener("message", (event) => {
  if (event.data.type && event.data.type === "displayNotification") {
    self.registration.showNotification(
      "People Finder Notification.",
      event.data.options
    );
  }
});
