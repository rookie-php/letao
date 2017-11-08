$(function(){

    //关闭进度环
    // NProgress.configure({ showSpinner: false });
    //加载进度条
    $(document).ajaxStart(function(){
        //使用进度条插件
        NProgress.start();
    })


    $(document).ajaxStop(function(){
        //使用进度条插件
        NProgress.done();
    })
})