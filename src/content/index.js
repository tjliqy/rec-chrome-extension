// Chrome提供的大部分API是不支持在content_scripts中运行
// sendMessage onMessage 是可以使用

// let current_user =document.getElementsByClassName('name')[0]["childNodes"][0]
let current_user = document.getElementsByClassName('user-icon')[1]['children'][0]['children'][1]['childNodes'][0].data
console.log('获取到的元素内容为', current_user)
// let tempNode = document.createElement('iframe');
// console.log(1,tempNode)
// tempNode.setAttribute('src','popup.html');
// console.log(tempNode)
// document.body.append(tempNode);

chrome.runtime.sendMessage({
    from: 'content',
    info: current_user
}, res => {
    // 答复
    console.log('content: receive success', res)
})


let newsListDom = document.querySelector("#root > div > div.main-content > div.left-container > div > div > div:nth-child(2)")
for (let i = 0; i < newsListDom.children.length; i++) {
    newsListDom.children[i].getElementsByTagName('a')[0].onclick(function (){
        console.log('clicked')
    })
}

