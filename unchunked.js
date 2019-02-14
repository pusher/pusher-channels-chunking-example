var Pusher = require('pusher');

var pusher = new Pusher({
  appId: YOUR_APP_ID,
  key: YOUR_APP_KEY,
  secret: YOUR_APP_SECRET,
  cluster: YOUR_CLUSTER,
  useTLS: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
});
