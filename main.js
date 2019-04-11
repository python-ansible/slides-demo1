// 主体
let len = $('.images > img').length
let n
init()
let timer = setInterval(() => {
    makeLeave(getImage(n))
        .one('transitionend', (e) => {
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImage(n + 1))
    n += 1
}, 3000)

//解决 setInterval 变慢
//+ 窗口不可见时停止轮播 浏览器会偷懒
document.addEventListener('visibilitychange', function (e) {
    if (document.hidden){
        window.clearInterval(timer)
    } else {
        timer = setInterval(() => {
            makeLeave(getImage(n))
                .one('transitionend', (e) => {
                    makeEnter($(e.currentTarget))
                })
            makeCurrent(getImage(n + 1))
            n += 1
        }, 3000)
    }
})

// 功能函数
function makeLeave($node) {
    return $node.removeClass('current').addClass('leave')
}

function makeEnter($node) {
    return $node.removeClass('leave').addClass('enter')
}

function makeCurrent($node) {
    return $node.remove('enter').addClass('current')
}

function getImage(n) {
    return $(`.images > img:nth-child(${x(n)})`)
}

function init() {
    n = 1
    $(`.images > img:nth-child(${n})`).addClass('current')
        .siblings().addClass('enter')
}

function x(n) {
    if (n > len) {
        n = n % len
        if (n === 0) {
            n = len
        }
    }
    return n
}
