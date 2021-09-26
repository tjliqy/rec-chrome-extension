chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.from == 'content') {
        sendResponse("background: 我收到了你的来信");
        let win = chrome.extension.getBackgroundPage()
        win.data = req.info
    }
});
// if (tmp != null) {
//     chrome.runtime.sendMessage({
//         from: 'background',
//         info: tmp
//     }, res => {
//         // 答复
//         console.log('background: send success!', res)
//     })
// }
