# wangpq-echart-starter

百度echart使用心得

包含了echart的柱状图、饼状图、还有地图，使用echart绘制贵阳地图，能展示出具体模块和名称。

**各省市地图下载**

各省json 下载地址：

http://echarts.baidu.com/download-map.html

各省下面市的json下载地址：

http://ecomfe.github.io/echarts-map-tool/


**常见配置介绍**

```bash
grid: {
    left: '4%',
    right: '4%',
    top: '6%',
    bottom: '1%',
    containLabel: true
}
```
grid用于设置要绘制的chart距离盒子边框的距离


```bash
title: {
    text: '30日内的注册人数趋势图',
    left: "right",
    bottom : 0,
    textStyle: {
        color: '#fff',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontFamily: 'Microsoft YaHei',
        fontSize: 12,
    }
}
```
title用于设置chart的标题。


```bash
xAxis : [
    {
        name : "月份",
        type : 'category',
        data : xData,
        axisLabel:{
            rotate :45
        },
        axisLine :{
            lineStyle : {
                color: '#a3a2ab'
            }
        },
        axisTick: {
            alignWithLabel: true
        }
    }
]
```
xAxis用于设置要绘制的chart X轴的配置参数；

name ：X轴的单位；
data ：数据源；
axisLine.lineStyle设置X轴横线的颜色；axisLabel.rotate 将X轴上文字旋转角度。


```bash
series : [
    {
        name:'流量',
        type:'bar',
        barWidth: '10%',
        data:yData,
        itemStyle: {
            normal: {
                barBorderRadius: 10,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#b860cb'},
                        {offset: 1, color: '#e85b6d'}
                    ]
                )
            }
        }
    }
]
```
series 里面的 itemStyle 可以给chart设置渐变色。


```bash
series: [
    {
        name:'日活跃人数',
        type:'line',
        lineStyle : {
            normal : {
                width:3
            }
        },
        itemStyle : {
            normal : {
                color:"#e4476a"
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#4f2741'
                }, {
                    offset: 1,
                    color: 'transparent'
                }])
            }
        },
        smooth: true,
        data: yData1
    },
    {
        name:'日注册人数',
        type:'line',
        lineStyle : {
            normal : {
                width:3
            }
        },
        itemStyle : {
            normal : {
                color:"#ba6bdd"
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#533569'
                }, {
                    offset: 1,
                    color: 'transparent'
                }])
            }
        },
        smooth: true,
        data: yData2
    }
]
```
折线图的一些设置参数：
name ：为数据名称，与 lengend.data 里面的数据一一对应；
lineStyle ：为折线图的基本样式；
areaStyle ：为折线图包裹的区域的渐变色设置；
smooth ：是否设置为连续的曲线图；


```bash
legend: {
    icon : "roundRect",
    itemWidth:60,
    itemHeight :6,
    data:["日活跃人数","日注册人数"],
    left: "1%",
    bottom: '0',
    textStyle : {
        color : "#fff",
        fontFamily : "SimHei"
    }
}
```
lengend.data数组长度为多少，就有多少个数据需要展示。


更多的的echarts配置用法可以查看官网。
