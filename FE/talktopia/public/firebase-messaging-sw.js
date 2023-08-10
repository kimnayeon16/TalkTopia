importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBDUbGRVP_9RXX8rZCj4CYA8sAXicLBI6Y",
  authDomain: "mytest-bcbb9.firebaseapp.com",
  projectId: "mytest-bcbb9",
  storageBucket: "mytest-bcbb9.appspot.com",
  messagingSenderId: "804412954342",
  appId: "1:804412954342:web:e37fc11792859e55704d27",
  measurementId: "G-R5Y8XJJ3MN"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  
  // 메인 스레드에 메시지를 전달하여 모달을 표시하도록 합니다.
  clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
  }).then(clientList => {
    if (clientList.length > 0) {
      clientList[0].postMessage(payload);
    }
  });
});