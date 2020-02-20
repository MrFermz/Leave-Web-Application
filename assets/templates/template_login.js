function templateLogin() {
    let markup  = `
        <div class=" center">
            <div class="container-login">
                <input class="input-text" id="username" type="text" placeholder="Username" onchange="onChange()">
                <input class="input-text" id="password" type="password" placeholder="Password" onchange="onChange()">
                <p id="message"></p>
                <input class="input-button" id="submit" type="submit" value="Login" onclick="onLogin()">
                <input class="input-button" id="token" type="button" value="Token" onclick="checkToken()">
            </div>
        </div>
    `
    return markup
}