let webView = document.getElementById("webview")
let backBtn = document.getElementById("backBtn")
let forwardBtn = document.getElementById("forwardBtn")
let address = document.getElementById("address")
let closeBtn = document.getElementById("closeBtn")
let closeDialog = document.getElementById("open-model")
let acceptCloseAppBtn = document.getElementById("acceptCloseApp")

function onClickGoBack() {
    webView.goBack()
    console.log("pressed back: " + webView.canGoBack())
    
    updateArrow()
}

function onClickGoForward() {
    webView.goForward()
    console.log("pressed forward: " + webView.canGoForward())

    updateArrow()
}

function loadstart() {
    updateArrow()
}

function loadstop() {
    updateArrow()
    address.value = webView.getURL()
}

function updateArrow() {
    if(!webView.canGoForward()) {
        forwardBtn.disabled = true
        console.log("set forward disable")
    } else {
        forwardBtn.disabled = false
        console.log("set forward enable")
    }

    if(!webView.canGoBack()) {
        backBtn.disabled = true
        console.log("set back disable")
    } else {
        backBtn.disabled = false
        console.log("set back enable")
    }
}

function updateURL(event) {
    // console.log("key down: " + event.keyCode)
    if (event.keyCode === 13) {
        address.blur();
        let val = address.value;
        let https = val.slice(0, 8).toLowerCase();
        let http = val.slice(0, 7).toLowerCase();
        if (https === 'https://') {
            webview.loadURL(val);
        } else if (http === 'http://') {
            webview.loadURL(val);
        } else {
            webview.loadURL('http://'+ val);
        }
    }
}

function closeApp() {
    console.log("close app")
    window.close()
}

function keyPress(event) {
    // window.api.send('keypress', event.keyCode)
    console.log("pressed: " + event.keyCode)
    // event.preventDefault();
    switch(event.keyCode) {
        case 17: {break;}
        case 91: {break;}
        case 18: {break;}
    }
}

function openCloseDialog() {
    closeDialog.target();
}

function onFocusAddress() {
    address.select()
}

backBtn.addEventListener('click', onClickGoBack)
forwardBtn.addEventListener('click', onClickGoForward)
webview.addEventListener('did-start-loading', loadstart)
webview.addEventListener('did-stop-loading', loadstop)
address.addEventListener('keydown', updateURL)
address.addEventListener('focus', onFocusAddress)
acceptCloseAppBtn.addEventListener('click', closeApp)
// document.addEventListener('keydown', keyPress)