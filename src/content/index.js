// Chrome提供的大部分API是不支持在content_scripts中运行
// sendMessage onMessage 是可以使用

// let current_user =document.getElementsByClassName('name')[0]["childNodes"][0]
let current_user = document.getElementsByClassName('user-icon')[1]['children'][0]['children'][1]['childNodes'][0].data
console.log('获取到的元素内容为', current_user)
chrome.runtime.sendMessage({
    from: 'content',
    info: current_user
}, res => {
    // 答复
    // console.log('content: receive success', res)
})