//初始化MUI scroll控件
mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//轮播图创建
mui('.mui-slider').slider({
    interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
});

// 工具函数
var tools = {
    getParameter: function () {
        //获取地址栏参数
        var urlParameter = decodeURI(location.search);
        //删除最前的?
        var newParameter = urlParameter.slice(1);
        //把字符串分割成数组
        var arr = newParameter.split('&');
        // console.log(arr);
        //声明一个空对象 =号左边的作为属性存起来 =号右边的作为值 存起来
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            obj[arr[i].split('=')[0]] = arr[i].split('=')[1];
        }
        return obj;
    },
    getParameterVal: function (key) {
        return this.getParameter()[key];
    },
    checkLogin: function (data) {
        if (data.error == 400) {
            //说明未登录
            mui.toast('你还未登录,即将跳转到登录页面');
            setTimeout(function () {
                location.href = "login.html?retUrl=" + location.href;
            }, 1000)
        }
    }
}

// console.log(tools.getParameterVal('key'));