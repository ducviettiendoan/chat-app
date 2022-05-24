// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
const io = require("socket.io")("https://ducdoanchatapp.web.app",
    { 
    cors: {    
      origin: "*",    
      methods: ["GET", "POST"]  
    }});

// server.listen(5000, () => {
//     console.log('listening on: 5000');
// });

io.on('connection', (socket) => {
    //this id stay the same after refreshing a page (if not socket auto generate new id everytime)
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log(socket.rooms);

    socket.on('send-message', ({recipient, text})=>{
        console.log({recipient, text});
        // Khi chạy event send-message => tất cả recipient trg recipients param sẽ emit event receive-message. Event này
        // trả lại recipients (now là sender của cái text vì lần tiếp theo recipient muốn send-message cho sender hiện tại
        // thì phải đổi recipient thành sender hiện tại (sender sẽ là recipient trg lần tiếp theo and vice-versa))
        recipient.forEach(re => {
            //mỗi recipient đều nhận đc obj includes  recipients, text, sender
            //switch the list of recipients to have the id instead;
            const newRecipients = recipient.filter(r => r!== re);
            newRecipients.push(id);
            socket.broadcast.to(re).emit('receive-message', {
                recipient: newRecipients, text, sender: id
            })
        })
    })
});