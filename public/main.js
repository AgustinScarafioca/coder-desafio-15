const socket = io()

const authorSchema = new normalizr.schema.Entity("author",{},{idAttribute: "email"});
const messageSchema = new normalizr.schema.Entity("message", {
    author: authorSchema
})
const messagesSchema = new normalizr.schema.Entity("messages", {
    messages: [messageSchema]
})

socket.on('compression', data => {
    const html = `<strong>${"Porcentaje de compresion: " +data}</strong>`
    document.getElementById("compresion").innerHTML = html
})


socket.on('messages', data =>{
    const html = data.map(msj =>{
        return `<div>
        <strong>${msj.author.name}</strong>
        <strong>${msj.author.fyh}</strong>
        <em>${msj.text}</em>
        </div>
        `
    })
    .join(" ")

    document.getElementById('messages').innerHTML = html
})

function addMessage(){
    const message = {
        author: {
            email: document.getElementById("email").value,
            name: document.getElementById("nombreChat").value,
            lastname: document.getElementById("apellido").value,
            age: document.getElementById("edad").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
        },
        text: document.getElementById("text").value
    }

    socket.emit('new-message', message)

}