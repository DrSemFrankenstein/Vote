if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/Vote/sw.js', { scope: '/Vote/' })})}