import socket from 'socket.io'
import connect from './connect'
import messages from './message'
import rooms from './room'
import userRegistration from './userRegistration'


/**
 * Socket.IO server middleware.
 *
 * @param {Object} server - The server.
 */
function io(server) {
  const io = socket(server);
    // client connected
  io.on('connection', (socket) => {
      console.log('client connected');

      userRegistration(io, socket)
      
      // perform initial actions on connect
      connect(io, socket)

      // perform  actions on messages
      messages(io, socket)

      // perform  actions on rooms
      rooms(io, socket)

  })
}

module.exports = io;
