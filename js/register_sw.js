 if (!('serviceWorker' in navigator)) {
     console.log("Service worker tidak didukung browser ini.");
 } else {
     registerServiceWorker();
     navigator.serviceWorker.ready.then(() => {
         requestPermission();
     })
 }
 // Register service worker
 function registerServiceWorker() {
     return navigator.serviceWorker.register('sw.js')
         .then(function (registration) {
             console.log('Registrasi service worker berhasil.');
             return registration;
         })
         .catch(function (err) {
             console.error('Registrasi service worker gagal.', err);
         });
 }

 function requestPermission() {
     if ('Notification' in window) {
         Notification.requestPermission().then(function (result) {
             if (result === "denied") {
                 console.log("Fitur notifikasi tidak diijinkan.");
                 return;
             } else if (result === "default") {
                 console.error("Pengguna menutup kotak dialog permintaan ijin.");
                 return;
             }

             navigator.serviceWorker.getRegistration().then(function (reg) {
                 reg.showNotification('Notifikasi diijinkan!');
             });
         });
     }
 }
 
const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

