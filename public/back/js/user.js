$(function () {

    //声明变量 保存当前页
    var currentPage = 1;
    //每页显示条数
    var pageSize = 10;

    function render() {
        //请求数据
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                var html = template('Tmp', data);
                $('tbody').html(html);

                // 初始化分页插件
                $('#page').bootstrapPaginator({
                    // 默认是参考bootstrap2版本 由于现在用的是bootstrap 3.x 和ul标签 所以要传下面的参数
                    bootstrapMajorVersion: 3,
                    // 设置控件显示大小
                    size: 'samll',
                    // 设置当前页
                    currentPage: currentPage,
                    // 设置总页数
                    totalPages: Math.ceil(data.total/pageSize),
                    // 控件显示的页码数
                    numberOfPages: 5,
                    // 给页面数注册点击事件
                    onPageClicked: function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        });
    }

    render();

    //点击操作栏按钮 显示模态框
    $('tbody').on('click', '.btn', function () {
        $('#editModal').modal('show');
        // 获取id 
        var id = $(this).parent().data('id');
        // console.log(id);
        // 获取状态
        var isDelete = $(this).hasClass('btn-danger') ? 1 : 0;

        //给确定按钮注册点击事件
        $('.btn_edit').off().on('click', function () {
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (data) {
                    // console.log(data);
                    if (data.success) {
                        // 隐藏模态框
                        $('#editModal').modal('hide');
                        render();
                    }
                }
            })
        })
    })



})