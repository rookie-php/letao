$(function () {
    //获取localStorage,并转换成数组
    function getHistory() {
        //有就获取 没有 就给个空数组
        var history = localStorage.getItem('lt_search_history') || '[]';
        return JSON.parse(history);
    }
    // console.log(getHistory());
    // 根据localStorage数据 渲染页面
    function render() {
        // 获取数据
        var arr = getHistory();
        // console.log(arr);
        // 渲染页面
        $('.lt-history').html(template('Tmp', {
            arr: arr
        }));
    }
    render();

    // 清空历史记录
    $('.lt-history').on('click', '.btn-empty', function () {
        // console.log(2);
        mui.confirm('您确定要清空历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
            if (e.index === 1) {
                // 清空本地数据
                localStorage.removeItem('lt_search_history');
                //重新渲染
                render();
            }
        })

    })

    //单个删除
    $('.lt-history').on('click', '.lt-history-delete', function () {
        // console.log(12);
        //获取索引  知道你要删除的是哪一个
        var index = $(this).data('index');
        mui.confirm('您确定要删除此条记录吗?', '温馨提示', ['否', '是'], function (e) {
            if (e.index === 1) {
                //获取本地数据
                var arr = getHistory();
                //从本地数据中 删除指定数据
                // splice(index,1,add) index 开始索引 1删除数量 add在此位置添加数据
                arr.splice(index, 1);
                // console.log(arr.splice(index,1));
                // console.log(arr);
                // 给本地缓存重新设置数据
                localStorage.setItem('lt_search_history', JSON.stringify(arr));
                // 再次渲染页面
                render();
            }
        })

    })

    // 添加操作
    $('.btn-search').on('click', function () {
        //获取搜索内容 trim() 忽略前后空格
        var content = $('.lt-search input').val().trim();
        // console.log(content);
        //获取本地缓存数据
        var arr = getHistory();
        //添加之前先判断原数据中 是否存有该数据 如果有就删除
        // console.log(arr.indexOf(content));
        if (arr.indexOf(content) > -1) {
            //说明存在
            arr.splice(arr.indexOf(content), 1);
        }
        //判断如果数据长度大于10 则删除最后一个
        if (arr.length >= 10) {
            arr.pop();
        }
        //往里添加数据
        arr.unshift(content);
        // 给本地缓存重新设置数据
        localStorage.setItem('lt_search_history', JSON.stringify(arr));
        //重新渲染
        render();
        // 把输入框清空
        $('.lt-search input').val('');
    })

})