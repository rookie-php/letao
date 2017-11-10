$(function () {

    //保存当前页
    var currentPage = 1;
    //每页显示的条数
    var pageSize = 5;

    //渲染页面
    function render() {
        //发送ajax 获取数据
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                console.log(data);
                $('tbody').html(template('Tmp-list', data));
                // 初始化分页插件
                $('#page').bootstrapPaginator({
                    //指定bootstrap版本
                    bootstrapMajorVersion: 3,
                    // 设置控件显示大小
                    size: 'samll',
                    // 设置当前页
                    currentPage: currentPage,
                    // 设置总页数
                    totalPages: Math.ceil(data.total / pageSize),
                    // 控件显示的页码数
                    numberOfPages: 5,
                    //个页码数注册点击事件
                    onPageClicked: function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    render();

    // 添加分类模态框
    $('.btn_add').on('click',function(){
        //初始化模态框
        $('#addModal').modal('show');
    })

    // 给模态框确定按钮注册事件
    $('.btn_add_sure').on('click',function(e){
        e.preventDefault();
        //发送ajax
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('#form').serialize(),
            success: function(data){
                // console.log(data);
                if(data.success){
                    //关闭模态框
                    $('#addModal').modal('hide');
                    //重置form表单
                    $('#form')[0].reset();
                }
            }
        })
    })

})