$(function(){
    // 当前页
    var currentPage = 1;
    // 每页显示条数
    var pageSize = 10;
    // 获取地址栏参数
    var key = tools.getParameterVal('key');
    // console.log(key);
    var data = {};
    data.page = currentPage;
    data.pageSize = pageSize;
    data.proName = key;

    function render(){
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: data,
            success: function(data){
                console.log(data);
                $('.product ul').html(template('Tmp',data));
            }
        })
    }

    render();

})