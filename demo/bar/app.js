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
        this.totalAmountOfCounty();
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
    // 地区交易数量排行
    totalAmountOfCounty : function(){
        var self=this
        var node=$("#demo");
        /*
        var setting={
            url : "http://www.gztpay.com:65009/crashStat/Stat/totalAmountOfCounty",
            type : "post",
            success : function(data){ 
                var data=JSON.parse(data);
                */
                if(data.status==="success" && data.trade.length>0){
                    var xData=[],yData=[],arr=data.trade;
                    for(var i=0,l=5;i<l;i++){
                        if(arr[i].name!==null){
                            xData.push(arr[i].name);
                            yData.push(arr[i].total);
                        }
                    }
                    var options = {
                        color: ['#d24c78'],
                        textStyle : {
                            color:"#fff"
                        },
                        color: ['#ba6de0'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '4%',
                            right: '4%',
                            top: '6%',
                            bottom: '1%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : xData,
                                axisLine :{
                                    lineStyle : {
                                        color: '#a3a2ab'
                                    }
                                },
                                axisTick: {
                                    alignWithLabel: true
                                },
                                axisTick: {
                                    show :false
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                axisLine :{
                                    lineStyle : {
                                        color: '#a3a2ab'
                                    }
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
                            }
                        ],
                        series : [
                            {
                                name : "交易金额",
                                type:'bar',
                                barWidth: '10',
                                data:yData,
                                itemStyle: {
                                    normal: {
                                        barBorderRadius: 10,
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#d04878'},
                                                {offset: 1, color: '#f0ae70'}
                                            ]
                                        )
                                    }
                                }
                            }
                        ]
                    };
                    GztUtil.renderChart("demo",options);
                }
                /*
            },
            beforeSend : function(){
                self.loadingFn(node,self.config.loadText);
            }
        }
        $.ajax(setting);
        */
    }
}


$(function(){
    app.init();
})