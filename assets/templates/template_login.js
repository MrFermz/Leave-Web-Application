function templateLogin() {
    let markup  = `
        <div class="container-login">
            <div class="card2">
                <div class="container-sub">
                    <input class="input-text" id="username" type="text" placeholder="Username" onchange="onChange()" onkeydown="handleEnter(event)">
                    <input class="input-text" id="password" type="password" placeholder="Password" onchange="onChange()" onkeydown="handleEnter(event)">
                    <p id="message"></p>
                </div>
                <input class="input-button" id="submit" type="submit" value="Login" onclick="onLogin()">
            </div>
        </div>
        <div class="copy-right">© Copyright 2020</div>
    `
    return markup
}