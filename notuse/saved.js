// for fetch

/*
const fetch = require("node-fetch")

const configUrl = "https://raw.githubusercontent.com/trongnd32/wakeupflag/main/Flag.txt"
fetch(configUrl, {
    headers: {
        "Content-Type": "application/octet-stream",
    },
    credentials: 'include'
})
    .then(res => res.json())
    .then(data => console.log(data))
*/

// for read and modify registry
/*
const { enumerateValues, HKEY, RegistryValueType } = require('registry-js')

const values = enumerateValues(
    HKEY.HKEY_LOCAL_MACHINE,
    'SOFTWARE\\Microsoft\\Windows\\CurrentVersion'
)
*/