var Pusher = require('pusher');

var pusher = new Pusher({
  appId: YOUR_APP_ID,
  key: YOUR_APP_KEY,
  secret: YOUR_APP_SECRET,
  cluster: YOUR_CLUSTER,
  useTLS: true
});

var chunkSize = 8;  // artificially small! Set it to more like 9000

function triggerChunked(channel, event, data) {
  var str = JSON.stringify(data);
  var msgId = Math.random() + '';
  for (var i = 0; i*chunkSize < str.length; i++) {
    // TODO: use pusher.triggerBatch for better performance
    pusher.trigger(channel, "chunked-" + event, { 
      id: msgId, 
      index: i, 
      chunk: str.substr(i*chunkSize, chunkSize), 
      final: chunkSize*(i+1) >= str.length
    });
  }
}

triggerChunked("my-channel", "my-event", {
  "message": "hello world"
});

