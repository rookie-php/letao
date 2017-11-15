$(function () {

    //下拉刷新 发送ajax
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    // console.log(123);
                    //发送ajax 动态获取数据
                    $.ajax({
                        type: 'get',
                        url: '/cart/queryCart',
                        success: function (data) {
                            tools.checkLogin(data);
                            
                            setTimeout(function () {
                                $('.mui-table-view').html(template('Tmp', {
                                    data: data
                                }));
                                $('.lt-total .total').text('00.00');
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                            }, 1000)
                        }
                    })
                }
            }
        }
    });

    // 点击删除按钮 发送ajax
    $('.lt-content').on('tap', '.proDelete', function () {
        //获取当前ID
        var id = $(this).data('id');
        mui.confirm('您确定要删除这件商品吗?', '温馨提示', ['是', '否'], function (e) {
            if (e.index == 0) {
                $.ajax({
                    type: 'get',
                    url: '/cart/deleteCart',
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data.success) {
                            //手动下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        })

    });

    //给编辑按钮注册点击事件
    $('.lt-content').on('tap', '.proEdit', function () {
        // 获取全部自定义的属性值
        var data = this.dataset;
        console.log(data);
        var html = template('Tmp2', data);
        html = html.replace(/\n/g, '');
        mui.confirm(html, '编辑商品', ['确定', '取消'], function (e) {
            if (e.index == 0) {
                //获取尺码 跟数量
                var size = $('.editSize span.now').html();
                var num = $('.mui-input-numbox').val();
                //发送ajax
                $.ajax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                        id: data.id,
                        size: size,
                        num: num
                    },
                    success: function(data){
                        // console.log(data);
                        if(data.success){
                            //手动下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                        }
                    }

                })
            }
        });
        // 初始化数字输入框
        mui('.mui-numbox').numbox();

        // 给每个span注册
        $('.editSize span').on('tap', function () {
            // console.log(12);
            $(this).addClass('now').siblings().removeClass('now');
        })
    });

    // 给input注册点击事件 注意给的事件
    $('.lt-content').on('change','[type="checkbox"]',function(){
        // console.log(123);
        var total = 0;
        $('[type="checkbox"]:checked').each(function(i,e){
            // console.log($(this).data('price')*$(this).data('num'));
            total+=$(this).data('price')*$(this).data('num');
        })
        //把计算好的价格放入订单总金额处
        $('.lt-total .total').text(total.toFixed(2));
    })















})