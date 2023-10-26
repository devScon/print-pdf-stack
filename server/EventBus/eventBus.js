const socketIO  = require("socket.io");
const { addUser, addUserInput, removeUser, removeUserInput } = require("../store/action");
const {store} = require("../store/store");


console.log(store.getState())

const unsubscribe = store.subscribe(() => console.log(`the updated state is ${JSON.stringify(store.getState(), null, 2)}`))

function fetchSecret({id}) {
  const state = store.getState()
  const user = state.users.filter(user => user.id === id)
  if(user.length !== 0) {
    const {secret} = user[0] 
    return secret
  }else{
    return {}
  }
  
}

module.exports = (server) => {
  const io = socketIO(server, {cors: {
    origin: "*"
  }});

  io.on('connection', (socket) => {
    console.log(`A user connected with ${socket.id}`);
    store.dispatch(addUser({user : {id:socket.id}}))
    io.to(socket.id).emit('add-user', {id: socket.id})
    socket.on('user-input', (input) => store.dispatch(addUserInput({id:socket.id, secret: input})))
    socket.on('fetch-secret', (id) => {
      const secret = fetchSecret(id)
      io.to(socket.id).emit('receive-secret', secret)
    })   
    socket.on('disconnect', () => {
      store.dispatch(removeUser({id: socket.id}))
      console.log(`A user with ${socket.id} is disconnected`);
    });
  });

  return io;
};