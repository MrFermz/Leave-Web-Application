function templateLogin() {
    let markup  = `
        <div class="card top">
            <div class="container-login">
                <input class="input-text" id="username" type="text" placeholder="Username" onchange="onChange()">
                <input class="input-text" id="password" type="password" placeholder="Password" onchange="onChange()">
                <p id="message"></p>
            </div>
            <!--<input class="input-button" id="token" type="button" value="Token" onclick="checkToken()">-->
            <input class="input-button" id="submit" type="submit" value="Login" onclick="onLogin()">
        </div>
    `
    return markup
}