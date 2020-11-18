const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BO3qsXDfXLpjjuOJPLUXqWFwpjiVVcEv31D5Um-mBiu71ITrRhAlGE5u-F5Xte67Llrs7Kks53axraV98t7QxMI",
    "privateKey": "zmXpXsihedellevCsY5_OTs5qrRSnGPQuXlEfEBWmBI"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cSwyzyAWnnI:APA91bGbLAE83e2Y7TDARRJQNbxkZ4dt-N47p7j3fN-d7TLM1nl619hV70BFA0e-2NkMYn62hkqkfZiykqvaab6NH92ONX5hQoiZJmZGmVsh6DKkRrDA9SppfdE-V2nt_KnNAOblENG9",
    "keys": {
        "p256dh": "BEUHGFvdkD2/tWZwrztDaUP6cXYnEVbZnWNTBOVRDBEZNFZEap5oBsskZwd2eHs/ZDCTEJ2EvjQPcO513o17IpA=",
        "auth": "1G497k7KNPZgrWUel39RFQ=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '<FCM Sender ID>',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);