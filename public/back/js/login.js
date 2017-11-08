$(function(){
    var $form = $('form');
    
    //调用校验工具方法 校验表单
    $form.bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //规则
        fields: {
            //匹配哪个表单属性 写对应的name值
            username : {
                //写username所有的校验规则
                validators : {
                    //不能是空
                    notEmpty : {
                        //提示消息
                        message : '用户名不能为空'
                    },
                    callback: {
                        message: '用户名错误'
                    }
                }
            },
            password : {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //匹配长度
                    stringLength: {
                        //最小
                        min: 6,
                        //最大
                        max: 12,
                        message: "密码长度为6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }
    })

    //注册校验成功事件
    $form.on('success.form.bv',function(e){
        //阻止默认行为 跳转
        e.preventDefault();
        //发送ajax
        $.ajax({
            url:'/employee/employeeLogin',
            type: 'post',
            data: $form.serialize(),
            success: function(data){
                //判断帐号密码是否正确
                //如果错了 可以updateStatus 手动的把校验状态改为失败
                //有三个参数
                //第一个参数是 字段名 name属性值
                //第二个参数是 要改的校验状态
                //第三个参数是 提示消息
                if(data.error==1000){
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }

                if(data.error==1001){
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
            }
        })
    })


    //重置表单功能 只需要调用插件的 实例调用resetForm方法即可
    $("[type='reset']").on('click',function(){
        $form.data('bootstrapValidator').resetForm();
    })
})