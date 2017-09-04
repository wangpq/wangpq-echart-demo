var GztUtil={
    renderChart : function(selector,options){
        var dom = document.getElementById(selector);
        var myChart = echarts.init(dom);
        var option = options;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    },
    /**
     * Min<=x<=Max
     */
    randomNum : function(Min, Max){
        var Range = Max - Min
          , Rand = Math.random()
          , num = Min + Math.round(Rand * Range);
        return num;
    },
    /**
     * 转换数字为时间
     * 例如 ：180620 -> 18:06:20
     */
    formatNumToTime : function(num){
        var num=typeof(num)!=="string" ? String(num) : num;
        return num.substr(0,2)+":"+num.substr(2,2)+":"+num.substr(4,2)
    },
    // 生成一个唯一的ID
    uuid : function(){
        var d = new Date().getTime();
        var uuid = 'gyxx_xx_4xx_yxx_xx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    },
    formatTime : function(num){
        var date=new Date()
          , hours=""
          , minutes="";
        date.setTime(num);
        hours=date.getHours();
        minutes=date.getMinutes();
        hours=hours>9 ? hours : "0"+String(hours);
        minutes=minutes>9 ? minutes : "0"+String(minutes);
        return String(hours)+":"+String(minutes);
    },
    getPrevSevenDayDate : function(){
        var date=new Date()
        date.setTime(date.getTime()-6*24*3600*1000);
        var year=date.getFullYear()
          , month=date.getMonth()+1
          , day =date.getDate()

       month= month<10 ? "0"+String(month) : month;
       day= day<10 ? "0"+String(day) : day;
       return year+month+day;
    },
    getToday : function(){
        var date=new Date()
          , year=date.getFullYear()
          , month=date.getMonth()+1
          , day =date.getDate()
        month= month<10 ? "0"+String(month) : month;
        day= day<10 ? "0"+String(day) : day;
        return year+month+day;
    },
    getYearMonth : function(){
        var date=new Date()
          , year=date.getFullYear()
          , month=date.getMonth()+1
          , day =date.getDate()
        month= month<10 ? "0"+String(month) : month;
        return year+month;
    },
    formatFenToYuan : function(num){
       var num=String(num);
       var length=num.length;
       if(length>2){
           return num.substr(0,length-2)
       }else{
           return "0";
       }
    },
    formatFenToWanYuan : function(num){
       var num=String(num);
       var length=num.length;
       if(length>2){
           var m=parseInt(num.substr(0,length-2));
           return parseFloat(m/10000).toFixed(2);
       }else{
           return "0";
       }
    },
    replaceHenToSpace : function(str){
        return str.replace(/-/g, '');
    }
}


var app={
    init : function(){

        var self=this;
        self.config={
            loadSimpleText :  "<i></i><span>加载中...</span>",
            loadText : "<i></i><span>正在努力加载中...</span>", // 加载提示文本
            ajaxErrorText : "对不起,访问数据出错啦！",
            noAjaxDataText : "暂无交易数据！"
        };
        this.views();
    },
    views : function(){
        this.deviceState();
    },
    tipsFn : function(node,text){
        node.addClass("loading").html('<div class="text">'+text+'</div>');
    },
    loadingFn : function(node,text){
        node.addClass("loading").html('<div class="text">'+text+'</div>');
    },
    loadEndFn : function(node){
        node.removeClass("loading").html("");
    },
    // 设备状态
    deviceState : function(){
        var arr=[55,75,35];
        var x10=arr[0]
          , x11=x10+"%"
          , x20=arr[1]
          , x21=x20+"%"
          , x30=arr[2]
          , x31=x30+"%";

        var options = {
            textStyle : {
                color:"#fff"
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a}{d}%",
                show : false
            },
            legend: {
                orient: 'horizontal',
                bottom: "0%",
                data:['CPU使用','内存使用','磁盘使用'],
                icon : "circle",
                textStyle: {
                    color: "#fff"
                }
            },
            series: [
                {
                    name:'CPU使用',
                    type:'pie',
                    selectedMode: 'single',
                    radius: ['20%', '40%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#f343e4'},
                                    {offset: 1, color: '#8742e1'}
                                ]
                            )
                        }
                    },
                    data:[
                        {
                            value:x10,
                            name:x11
                        },
                        {
                            value:100-x10,
                            name:'',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 10,
                                    color: '#19182c'
                                }
                            }
                        }
                    ]
                },
                {
                    name:'内存使用',
                    type:'pie',
                    selectedMode: 'single',
                    radius: ['40%', '60%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#71aee6'},
                                    {offset: 0.5, color: '#5fc09e'},
                                    {offset: 1, color: '#66b9ba'}
                                ]
                            )
                        }
                    },
                    data:[
                        {
                            value:x20,
                            name:x21
                        },
                        {
                            value:100-x20,
                            name:'',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 10,
                                    color: '#19182c'
                                }
                            }
                        }
                    ],


                },
                {
                    name:'磁盘使用',
                    type:'pie',
                    selectedMode: 'single',
                    radius: ['60%', '80%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#fe9060'},
                                    {offset: 1, color: '#fb124d'}
                                ]
                            )
                        }
                    },
                    data:[
                        {
                            value:x30,
                            name:x31
                        },
                        {
                            value:100-x30,
                            name:'',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 10,
                                    color: '#19182c'
                                }
                            }
                        }
                    ]
                },
            ]
        };
        GztUtil.renderChart("demo",options);
    }
}

$(function(){
    app.init();
})