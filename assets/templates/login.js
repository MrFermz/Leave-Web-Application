function templateLogin() {
    let markup  =   `
        <div>LOGIN</div>
        <input id="username" type="text" placeholder="Username" onchange="onChange()">
        <input id="password" type="password" placeholder="Password" onchange="onChange()">
        <input id="submit" type="submit" value="Login" onclick="onLogin()">
        <input id="token" type="button" value="Token" onclick="checkToken()">
    `
    return markup
}
