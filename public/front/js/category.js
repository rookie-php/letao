$(function () {
    // 分类导航
    // 默认打开的是第一个
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        success: function (data) {
            // console.log(data);
            $('.lt-content-l ul').html(template('Tmp', data));
            renderSecond(data.rows[0].id);
            $('.lt-content-l li').eq(0).addClass('now');
        }
    })


    function renderSecond(id) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function (data) {
                // console.log(data);
                $('.lt-content-r ul').html(template('Tmp2', data));

            }
        })
    }

    $('.lt-content-l').on('click', 'li', function () {
        $(this).addClass('now').siblings().removeClass('now');
        var currentId = $(this).data('id');
        renderSecond(currentId);
        //滚动到顶部
        //获取页面中的滚动实例，有两个，我们需要第二个
        var temp = mui('.mui-scroll-wrapper').scroll()[1];
        //让第二个滚动滚动0，0位置
        temp.scrollTo(0, 0, 500); //100毫秒滚动到顶
    })


})