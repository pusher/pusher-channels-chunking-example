# Pusher Channels chunked events example

Pusher Channels limits the event size to 10kb.
One approach to work around this limit is to "chunk" your events.
This example shows how.
See `chunked.js` for a server that chunks the event,
and see `client.html` for a client that recombines those chunks.