$(function () {
    //获取传过来的参数
    var id = tools.getParameterVal('id');
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {
            // console.log(data);
            $('.mui-scroll').html(template('Tmp', data));
            // 要重新初始化轮播图
            //轮播图创建
            mui('.mui-slider').slider({
                interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 给尺码注册点击事件
            $('.proSize span').on('click',function(){
                // console.log(123);
                $(this).addClass('now').siblings().removeClass('now');
            })

            // 初始化数字输入框
            mui('.mui-numbox').numbox();

            // 给加入购物车添加点击事件
            $('.btn-add-car').on('click',function(){
                if(!$('.proSize span').hasClass('now')){
                    mui.toast('请选择尺码');
                    return false;
                }
                //获取尺码 
                var size = $('.proSize span.now').text();
                // console.log(size);
                //获取数量
                var num = $('.mui-input-numbox').val();
                // console.log(num);
                //发送ajax 根据返回的数据判断是否已经登录
                $.ajax({
                    type: 'post',
                    url: '/cart/addCart',
                    data: {
                        productId: id,
                        num: num,
                        size: size
                    },
                    success: function(data){
                        tools.checkLogin(data);
                        if(data.success){

                            //说明已经登录
                            mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
                                if(e.index==0){
                                    //去购物车
                                    location.href = "shopcart.html";
                                }
                            })
                        }
                    }
                })

            })
        }
    })
})