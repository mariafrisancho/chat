console.log("javascript en el frontend");
// socket del cliente
const socketClient=io();
const userName=document.getElementById("userName");
const inputMsg=document.getElementById("inputMsg");
const sendMsg=document.getElementById("sendMsg");
const chatPanel=document.getElementById("chatPanel");

let user; // variable de identidad del usuario

Swal.fire({
    title:'chat',
    text:'Por favor, ingresa tu nombre de usuario',
    input:'text',
    inputValidator:(value)=>{
        return !value && 'debes ingresar el nombre del usuario para continuar'

    },
    allowOutsideClick:false,
    allowEscapeKey:false
}

).then((inputValue)=>{
    
    user=inputValue.value;
    userName.innerHTML= user;
    socketClient.emit("authenticated",user);

});

sendMsg.addEventListener("click",()=>{
    const msg = {user:user, message:inputMsg.value};
    console.log(msg);
    socketClient.emit("msgChat", msg);
    inputMsg.value="";
});
// recibe el historial del chat del servidor

socketClient.on("chatHistory",(dataServer)=>{
    console.log(dataServer);
    let msgElements="";
    dataServer.forEach(elem => {
        msgElements+=`<p>Usuario: ${elem.user}>>>>${elem.message}</p>`
    });
    chatPanel.innerHTML=msgElements;
});
socketClient.on("newUser",(data)=>{
    if(user){
        Swal.fire({
            text:data,
            toast:true,
            position:"top-right"
        });

    }
   

});