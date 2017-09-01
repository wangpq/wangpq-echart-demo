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
        this.todayTotalTradeNums();
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
    todayTotalTradeNums : function(){
        var self=this
        , node=$("#demo");
        /*
        $.ajax({
            url: "http://www.gztpay.com:65009/crashStat/Stat/queryHourDataBySellerNoByArea",
            type : "post",
            data : JSON.stringify({
                area_prov_name : "贵州省",
                area_city_name : "贵阳市"
            }),
            contentType:'text/plain;charset:UTF-8',
            dataType:'json',
            beforeSend : function(){
                self.loadingFn(node,self.config.loadText);
            },
            success : function(data){  
                */
                if(data && data.status=="SUCCESS" && data.obj){
                    self.loadEndFn(node);
                    var xData=[],yData=[];
                    data.obj.forEach(function(item,index){
                        xData.push(String(item.totalDate)+":00");
                        yData.push(GztUtil.formatFenToWanYuan(item.totalMoney) );
                    })
                    var options={
                        textStyle : {
                            color:"#fff"
                        },
                        tooltip: {
                            trigger: 'axis',
                            formatter: "{a} <br/>{b} : {c}万元"
                        },
                        grid: {
                            left: '5%',
                            right: '7%',
                            top: '12%',
                            bottom: '5%',
                            containLabel: true
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: false,
                            axisLine :{
                                lineStyle : {
                                    color: '#a3a2ab'
                                }
                            },
                            axisTick: {
                                show :false
                            },
                            data: xData
                        },
                        yAxis: {
                            name : "万元",
                            type: 'value',
                            axisLine :{
                                lineStyle : {
                                    color: '#a3a2ab'
                                }
                            },
                            axisLabel: {
                                formatter: '{value} '
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#4d4b5d',
                                    type: 'dashed'
                                }
                            },
                            axisTick: {
                                show :false
                            }
                        },
                        series: [
                            {
                                name:'时交易金额',
                                type:'line',
                                lineStyle : {
                                    normal : {
                                        color : "#f0ae70",
                                        width:4
                                    }
                                },
                                itemStyle : {
                                    normal : {
                                        color:"#f0ae70",
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#614c48'
                                        }, {
                                            offset: 1,
                                            color: 'transparent'
                                        }])
                                    }
                                },
                                smooth: true,
                                data:yData
                            }
                        ]
                    };
                    GztUtil.renderChart("demo",options);
                }
                /*
            },
            error : function(data){
                self.loadingFn(node,self.config.loadText);
            }
        });
        */
    }
}


$(function(){
    app.init();
})