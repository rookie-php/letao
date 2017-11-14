$(function () {
    //给登录按钮注册点击事件
    $('.btn-login').on('click', function () {
        // console.log(12);
        //获取输入的帐号和密码
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        // console.log(source);
        if (!username) {
            mui.toast('请输入帐号');
            return false;
        }

        if (!password) {
            mui.toast('请输入密码');
            return false;
        }

        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    //获取地址来源
                    var source = location.search;
                    //如果是其他页面跳转到登录页面的 则回跳
                    if (source.indexOf('retUrl') == -1) {
                        mui.toast('登录成功,一秒后跳转');
                        setTimeout(function () {
                            location.href = 'user.html';
                        }, 1000);
                    } else {


                        source = source.replace('?retUrl=', '');
                        //登录成功
                        mui.toast('登录成功,一秒后跳转');
                        setTimeout(function () {
                            location.href = source;
                        }, 1000);
                    }
                    // 如果是直接进入登录页面的

                }
                if (data.error == 403) {
                    mui.toast(data.message);
                    return false;
                }
            }
        });
    })


})