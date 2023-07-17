(function(){

    const app = document.querySelector(".app")
    const socket = io();
    const themeButton = document.querySelector("#theme-btn");
    const themeButton1 = document.querySelector("#theme-btn1");
    let uname;

    app.querySelector(".join-screen #join-user").addEventListener("click", function(){
        let username = app.querySelector(".join-screen #username").value;
        if(username.length == 0){
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        app.querySelector(".join-screen").classList.remove("active");
        app.querySelector(".chat-screen").classList.add("active");
    })

    app.querySelector(".chat-screen #send-message").addEventListener("click", function(){
        let message = app.querySelector(".chat-screen #message-input").value;
        if(message.length == 0){
            return;
        }
        renderMessage("my", {
            username:uname,
            text:message
        });
        socket.emit("chat",{
            username:uname,
            text:message
        });
        app.querySelector(".chat-screen #message-input").value = "";
    });


    app.querySelector(".chat-screen #exit-chat").addEventListener("click", function(){
        socket.emit("exituser", uname);
        window.location.href = window.location.href;
    })

    socket.on("update", function(update){
        renderMessage("update", update)
    });

    socket.on("chat", function(message){
        renderMessage("other", message)
    });

    function renderMessage(type, message){
        let messageConatiner = app.querySelector(".chat-screen .messages");
        if(type == "my"){
            let el = document.createElement("div");
            el.setAttribute("class", "message my-message");
            el.innerHTML = `
                <div>
                    <div class="name">You</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageConatiner.appendChild(el);
        }else if(type == "other"){
            let el = document.createElement("div");
            el.setAttribute("class", "message other-message");
            el.innerHTML = `
                <div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>
            `;
            messageConatiner.appendChild(el);
        }else if(type == "update"){
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
            messageConatiner.appendChild(el);
        }
        messageConatiner.scrollTop = messageConatiner.scrollHeight - messageConatiner.clientHeight;
    }


    themeButton.addEventListener("click", () =>{
        // toggle the class of boddy to change the theme of the body and save the updated theme to the storage 
        document.body.classList.toggle("light-mode");
        themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
    })
    
    themeButton1.addEventListener("click", () =>{
        // toggle the class of boddy to change the theme of the body and save the updated theme to the local storage 
        document.body.classList.toggle("light-mode");
        themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
    })

})();


