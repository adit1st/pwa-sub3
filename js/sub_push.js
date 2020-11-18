navigator.serviceWorker.ready.then(() => {
  if (('PushManager' in window)) {
      navigator.serviceWorker.getRegistration().then(function (registration) {
          registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BO3qsXDfXLpjjuOJPLUXqWFwpjiVVcEv31D5Um-mBiu71ITrRhAlGE5u-F5Xte67Llrs7Kks53axraV98t7QxMI")
          }).then(function (subscribe) {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
          }).catch(function (e) {
              console.error('Tidak dapat melakukan subscribe ', e.message);
          });
      });
  }
});