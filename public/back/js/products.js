$(function () {

    //当前页
    var currentPage = 1;
    //每页显示条数
    var pageSize = 4;

    function render() {
        //发送ajax获取数据
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                $('tbody').html(template('Tmp-list', data));

                // 分页展示
                $('#page').bootstrapPaginator({

                    //声明bootstrap版本
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: currentPage,
                    //总页数
                    totalPages: Math.ceil(data.total / pageSize),
                    //注册点击事件
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render();

    // 添加分类注册点击事件
    $('.btn_add').on('click', function () {
        // 弹出模态框
        $('#addModal').modal('show');
        //发送ajax
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
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

    // 给下拉菜单的每一项注册点击事件
    $('.dropdown-menu').on('click', 'a', function () {
        //改变dropdown_text的内容
        $('.dropdown_text').text($(this).text());
        //把自定的属性的值id 赋值给隐藏域
        $('#brandId').val($(this).data('id'));
        // 手动把校验状态改为成功
        $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })

    // 表单校验
    $('form').bootstrapValidator({
        //全部校验 包括隐藏域
        excluded: [],
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //规则
        fields: {
            //校验的属性
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请正确输入库存数量'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请正确输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品价格'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请正确输入商品价格'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码 例如(35-55)'
                    },
                    regexp: {
                        regexp: /^\d+-\d+$/,
                        message: '请正确输入商品尺码'
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传三张商品图片'
                    }
                }
            }

        }
    })

    // 初始化图片上传插件
    $('#fileupload').fileupload({
        //知道返回的数据类型
        dataType: 'json',
        //上传完成后的回调函数
        done: function (e, data) {
            // console.log(data); 
            $('form .img').append('<img src="' + data.result.picAddr + '" data-addr="' + data.result.picAddr + '" data-name="' + data.result.picName + '" width="100" height="100" alt="">');
            // 根据img的个数来判断是否要把校验状态改为成功
            // console.log($('form img').length);
            if ($('form img').length == 3) {
                $('form').data('bootstrapValidator').updateStatus('productLogo', 'VALID');
            } else {
                $('form').data('bootstrapValidator').updateStatus('productLogo', 'INVALID');
            }
            // 给每个img标签注册双击事件 双击删除自己
            $('form img').on('dblclick', function () {
                $(this).remove();
                // 再次根据img标签的数量 来判断是否要把校验状态改为成功 
                if ($('form img').length == 3) {
                    $('form').data('bootstrapValidator').updateStatus('productLogo', 'VALID');
                } else {
                    $('form').data('bootstrapValidator').updateStatus('productLogo', 'INVALID');
                }
            })

        }
    })

    // 表单校验完成
    $('form').on('success.form.bv', function () {
        //拼接数据
        var data = $('form').serialize();
        // console.log(data); 
        // brandId=18&proName=1&proDesc=23&num=22&price=23&oldPrice=23&size=22-22&productLogo=
        var imgArr = $('form img');
        data += '&picName1='+imgArr[0].dataset.name+'&picAddr1'+imgArr[0].dataset.addr;
        // console.log(data);
        //发送ajax
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            success: function(data){
                // console.log(data);
                if(data.success){
                    //说明提交成功
                    //关闭模态框
                    $('#addModal').modal('hide');
                    //表单里的所有输入框都重置
                    $('form')[0].reset();
                    //把隐藏域的id重置
                    $('#brandId').val('');
                    //把文本更改
                    $('.dropdown_text').text('请选择二级分类');
                    // 重置校验样式
                    $('form').data('bootstrapValidator').resetForm();
                    //重置productLogo
                    $('#productLogo').val('');
                    //所以图片删除自身
                    $('form img').remove();
                    //跳转会第一页
                    currentPage = 1;
                    render();
                }
            }
        })
    })

})