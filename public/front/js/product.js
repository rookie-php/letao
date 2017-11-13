$(function(){
    //获取传过来的参数
    var id = tools.getParameterVal('id');
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function(data){
            // console.log(data);
            $('.mui-scroll').html(template('Tmp',data));
        }
    })
})