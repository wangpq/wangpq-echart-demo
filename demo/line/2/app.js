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
        this.day30ActiveRegisterUser();
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
    // 30日内的活跃人数+注册人数
    day30ActiveRegisterUser : function(){ 
        var self=this , node=$("#demo");
        /*
        var setting={
            type : "post",
            url : "http://www.gztpay.com:65009/appStat/Stat/day30RegisterAndActiveUser",
            success : function(data){  
                self.loadEndFn(node);
                var data=JSON.parse(data);
                */
                if( data.status==="success" && data.list.length>0){
                    var xData=[],yData1=[],yData2=[],arr=data.list;
                    for(var i=0,l=arr.length;i<l;i++){
                        if(arr[i].day!==GztUtil.getToday()){
                            xData.push(arr[i].day);
                            yData1.push(arr[i].activeUserCount || 0);
                            yData2.push(arr[i].registerUserCount || 0);
                        }
                    }
                    var options={
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
                        },
                        textStyle : {
                            color:"#fff"
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: {
                            left: '2%',
                            right: '2%',
                            top: '12%',
                            bottom: '14%',
                            padding : 20,
                            containLabel: true
                        },
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
                        },
                        xAxis:  {
                            name : "日",
                            type: 'category',
                            boundaryGap: false,
                            axisLine :{
                                lineStyle : {
                                    color: '#a3a2ab'
                                }
                            },
                            data: xData,
                            axisTick: {
                                show :false
                            }
                        },
                        yAxis: {
                            name : "人",
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} '
                            },
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
                        },
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
                    };
                    GztUtil.renderChart("demo",options);
                }else{
                    self.tipsFn(node,self.config.ajaxErrorText);
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