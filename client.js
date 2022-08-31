const socket = io('https://localhost:8000')

const name = prompt("Enter your name")
socket.emit("new-user-joined", name)
const messageContainer = document.getElementById("chat")
function appendMessage(message, pos) {
    const mgs = document.createElement("div")
    mgs.innerHTML = message
    mgs.classList.add("alert")
    mgs.classList.add("text-center")
    if (pos == 'left') {
        mgs.classList.add("alert-primary")
        mgs.classList.add("left")
    }
    else {
        mgs.classList.add("alert-success")
        mgs.classList.add("right")
    }
    messageContainer.appendChild(mgs)

}

socket.on("user-joined", (name) => {
    appendMessage(`${name} joined the chat`, "left")
})

socket.on("user-left", (name) => {
    appendMessage(`${name.name} left the chat`, "left")
})

socket.on("receive", (data) => {
    appendMessage(`${data.name} : ${data.message}`, "left")
})

function sendmessage() {
    const msg = document.getElementById("msg")
    socket.emit("send", msg.value)
    appendMessage(`${msg.value} : You`, "right")
    msg.value = ""

}
