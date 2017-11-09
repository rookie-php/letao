$(function () {

    //关闭进度环
    // NProgress.configure({ showSpinner: false });
    //加载进度条
    $(document).ajaxStart(function () {
        //使用进度条插件
        NProgress.start();
    });


    $(document).ajaxStop(function () {
        //使用进度条插件
        NProgress.done();
    });

    //通过ajax去获取数据 然后判断用户是否已经登录
    //但是要先判断你进入的是哪个页面 如果是登录页面 则正常操作 如果是非登录页面 则发送ajax去验证管理的登录状态
    // console.log(window.location.href.indexOf('login.html'));
    if(window.location.href.indexOf('login.html')<0){
        //证明是非登录页面 需要验证
        $.ajax({
            url: '/employee/checkRootLogin',
            type: 'get',
            success: function (data) {
                // console.log(data);
                //判断是否登录 
                if(data.error===400){
                    alert('请先登录');
                    window.location.href = "login.html";
                }
            }
        })
    }


    // 点击分类管理 切换 二级导航
    $('.child').prev().on('click', function () {
        $(this).next().slideToggle();
    })

    // 点击顶部通栏左边按钮 控制左边公用部分 显示/隐藏
    $('.topbar .pull-left').on('click', function () {
        // console.log(124);
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
    })

    // 点击退出按钮 弹出模态框
    $('.btn_logout').on('click', function () {
        // console.log(1254);
        $('#myModal').modal('handleUpdate')
    })

    // 给确定按钮一个点击事件
    $('.btn_logout_sure').on('click', function () {
        // console.log(1244);
        //发送ajax请求 让服务器删除session
        $.ajax({
            url: '/employee/employeeLogout',
            success: function(data){
                // console.log(data);
                if(data.success){
                    window.location.href = "login.html";
                }
            }
        })

    })
})