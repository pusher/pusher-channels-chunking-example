// portable function you can copy-paste
function triggerChunked(pusher, channel, event, data) {
  const chunkSize = 8;  // artificially small! Set it to more like 9000
  const str = JSON.stringify(data);
  const msgId = Math.random() + '';
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

// example usage of triggerChunked
var Pusher = require('pusher');
var pusher = new Pusher({
  appId: YOUR_APP_ID,
  key: YOUR_APP_KEY,
  secret: YOUR_APP_SECRET,
  cluster: YOUR_CLUSTER,
  useTLS: true
});
triggerChunked(pusher, "my-channel", "my-event", {
  "message": "hello world"
});
