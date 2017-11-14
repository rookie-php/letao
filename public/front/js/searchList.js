$(function () {
    // 当前页
    var currentPage = 1;
    // 每页显示条数
    var pageSize = 10;
    // 获取地址栏参数
    var key = tools.getParameterVal('key');
    // console.log(key);

    function render() {
        // 如果有now说明是被点击的 获取相应类型 价格或库存
        var type = $('.lt-sort a[data-type].now').data('type');
        //再根据箭头方向判断是升序还是降序排列
        var value = $('.lt-sort a[data-type].now').find('span').hasClass('fa-angle-down') ? 2 : 1;
        // 此对象不能放到外面
        var data = {};
        data.page = currentPage;
        data.pageSize = pageSize;
        data.proName = key;
        //如果有type 说明要排序
        if (type) {
            data[type] = value;
        }
        // console.log(data);
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: data,
            success: function (data) {
                // console.log(data);
                $('.product ul').html(template('Tmp', data));
                //把关键字放到搜索框中
                $('.lt-search input').val(key);
            }
        })
    }

    render();

    // 给搜索按钮注册点击事件  其实此处也应该添加搜索记录的
    $('.btn-search').on('click', function () {
        if($('.lt-search input').val()==''){
            mui.toast('请输入内容',{ duration:'long', type:'div' });
            return false; 
        }
        key = $('.lt-search input').val().trim();
        $('.product ul').html('<div class="loading"></div>');
        setTimeout(function () {
            render();
        }, 1000);
    })

    //给排序的每个按钮注册点击事件
    $('[data-type]').on('click', function () {
        //判断被点击的是否有now类
        if ($(this).hasClass('now')) {
            //有 就要把当前的下箭头变成上箭头
            $(this).find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        } else {
            //没有就要给他加上now这个类
            $(this).addClass('now').siblings().removeClass('now');
            //并且所以的箭头都要变成向下
            $('.lt-sort a').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }

        $('.product ul').html('<div class="loading"></div>');

        setTimeout(function () {
            render();
        }, 1000);

    })


})