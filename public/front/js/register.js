$(function () {
    //给获取验证码注册点击事件 发送ajax 模拟获取验证码
    $('.getCode').on('click', function (e) {
        e.preventDefault();
        // console.log(12);
        var $this = $(this);
        $.ajax({
            type: 'get',
            url: '/user/vCode',
            success: function (data) {
                console.log(data.vCode);
                //禁用按钮 更改文本
                $this.text('验证码发送中....').addClass('now').prop('disabled', true);
                //进入倒计时
                var time = 5;
                var timeId = setInterval(function () {
                    time--;
                    $this.text(time + '秒后再次发送');
                    //倒计时结束 回复

                    if (time <= 0) {
                        $this.text('获取验证码').removeClass('now').prop('disabled', false);
                        clearInterval(timeId);
                    }
                }, 1000)
            }
        })
    })

    // 注册按钮注册点击事件
    $('.lt-register').on('click',function(e){
        e.preventDefault();
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        var repassword = $('[name="repassword"]').val();
        var mobile = $('[name="mobile"]').val();
        var vCode = $('[name="vCode"]').val();
        if(!username){
            mui.toast('请输入用户名');
            return false;
        }
        if(!password){
            mui.toast('请输入密码');
            return false;
        }
        if(!repassword){
            mui.toast('请输入确认密码');
            return false;
        }
        if(password!=repassword){
            mui.toast('两次密码不一致!请重新输入');
            return false;
        }
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast('请输入正确的手机号');
            return false;
        }
        if(!vCode){
            mui.toast('请输入验证码');
            return false;
        }
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function(data){
                console.log(data);
                if(data.success){
                    mui.toast('恭喜你注册成功!一秒后跳转到登录页面');
                    setTimeout(function(){
                        location.href = 'login.html';
                    },1000)
                }else{
                    mui.toast(data.message);
                    return false;
                }
            }
        })
    })
})