$(function () {
    //当前页码数
    var currentPage = 1;
    // 每页显示条数
    var pageSize = 5;

    //渲染页面
    function render() {
        //发送ajax获取数据
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                $('tbody').html(template('Tmp-list', data));
                //初始化分页插件
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
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    render();

    // 模态框
    $('.btn_add').on('click', function () {
        //初始化模态框
        $('#addModal').modal('show');
        //发送ajax获取一级导航数据
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                // console.log(data);
                $('.dropdown-menu').html(template('Tmp-select', data));
            }
        })
    })

    // 给模态框下的下拉菜单的每一项注册点击事件
    $('.dropdown-menu').on('click', 'a', function () {
        // console.log(125);
        $('.dropdown_text').text($(this).text());
        //把一级分类id保存到隐藏域中
        $('#categoryId').val($(this).data('id'));
        // 手动更改校验状态
        $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    //初始化文件上传
    $('#fileupload').fileupload({
        dataType: 'json',
        //文件上传完成时,会执行的回调函数，通过这个回调函数就可以获取到图片的地址
        done: function (e, data) {
            // console.log(data);
            //把路径放进img标签中
            $('#form img').attr('src', data.result.picAddr);
            //把图片路径保存到隐藏域中
            $('#brandLogo').val(data.result.picAddr);
            // 手动更改校验状态
            $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    })

    // 表单校验
    $('form').bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [],
        // 规则
        fields: {
            // 校验的属性
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入品牌名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择一张图片'
                    }
                }
            }
        }
    })

    // 表单校验成功后的回调函数
    $('form').on('success.form.bv', function (e) {
        e.preventDefault();
        // console.log(1224);
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('form').serialize(),
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    //关闭模态框
                    $('#addModal').modal('hide');
                    //重置校验样式
                    $('form').data('bootstrapValidator').resetForm();
                    // 清空每项
                    $('input').val('');
                    //重置
                    $('.dropdown_text').text('请选择一级分类');
                    $('form img').attr('src', './images/none.png');
                    currentPage = 1;
                    render();
                }
            }
        })

    })

    // 点击取消按钮 也重置表单
    $('.btn_cancle').on('click', function () {
        // console.log(124);
        //重置校验样式
        $('form').data('bootstrapValidator').resetForm();
        // 清空每项
        $('input').val('');
        //重置
        $('.dropdown_text').text('请选择一级分类');
        $('form img').attr('src', './images/none.png');
    })
})