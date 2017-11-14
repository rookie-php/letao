$(function () {
    //发送ajax获取数据
    $.ajax({
        type: 'get',
        url: '/user/queryUserMessage',
        success: function (data) {
            if (data.error == 400) {
                //说明未登录
                mui.toast('你还未登录,即将跳转到登录页面');
                setTimeout(function () {
                    location.href = "login.html?retUrl=" + location.href;
                }, 1000)
            }
            $('.user-info').html(template('Tmp', data));
        }
    })

    //给退出按钮注册事件
    $('.btn-logout').on('click', function () {
        // console.log(12);
        //发送ajax
        $.ajax({
            type: 'get',
            url: '/user/logout',
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    mui.toast('退出成功');
                    setTimeout(function () {
                        location.href = 'login.html';
                    }, 1000)
                }
            }
        })
    })
})