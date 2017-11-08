//echars插件 生成饼状图
var myChart = echarts.init(document.querySelector('.echars_left'));

// 指定图表的配置项和数据
var option = {
    title: {
      text: '2017年注册人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1499, 800, 2000, 1300, 1600]
    }]
  };

  myChart.setOption(option);


var myChart1 = echarts.init(document.querySelector('.echars_right'));
var option1 = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['李宁','耐克','新百伦','安踏','阿迪达斯']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:3325, name:'李宁'},
                {value:3120, name:'耐克'},
                {value:2234, name:'新百伦'},
                {value:1235, name:'安踏'},
                {value:1548, name:'阿迪达斯'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);