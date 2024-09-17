import fs from 'fs';
import bencode from 'bencode';
import dgram from 'dgram';
import { Buffer } from 'buffer';

// Read and decode the torrent file
const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));

// 1. Extract the tracker URL (announce)
const url = new URL(torrent.announce.toString('utf8'));

// 2. Create a UDP socket
const socket = dgram.createSocket('udp4');

// 3. Prepare a message to send (example message)
const myMsg = Buffer.from('hello?', 'utf8');

// 4. Send the message to the tracker using its host and port
socket.send(myMsg, 0, myMsg.length, url.port, url.hostname, (err) => {
  if (err) {
    console.error('Error sending message:', err);
  } else {
    console.log('Message sent');
  }
});

// 5. Handle response from the tracker
socket.on('message', (msg) => {
  console.log('Message received:', msg);
  // You can decode the tracker response here if necessary
});

// Handle errors on the socket
socket.on('error', (err) => {
  console.error('Socket error:', err);
  socket.close();
});
