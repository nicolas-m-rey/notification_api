import consumer from "channels/consumer"

consumer.subscriptions.create("NotificationsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("connected to notifications channel")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    this.displayNotification(data);
  },

  displayNotification(data) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Notification granted");
      var notification = new Notification(data.title, { body: data.body });
    } else if (Notification.permission !== "denied") {
      console.log("Notification permissions need to be requested");
    } else {
      console.warn("Notification denied");
    }
  },
});
