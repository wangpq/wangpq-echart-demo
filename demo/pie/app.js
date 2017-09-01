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
        this.sectorRatioAndIndustryFive();
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
    sectorRatioAndIndustryFive : function(){
        var self=this
          , node=$("#demo");
        /*
        var setting={
            url : "http://www.gztpay.com:65009/crashStat/Stat/totalSellerAndTradeAndMoneyGroupAreaCategoryId",
            type : "post",
            data : JSON.stringify({
                area_prov_name : "贵州省",
                area_city_name : "贵阳市",
                sort_style : "desc"
            }),
            contentType:'text/plain;charset:UTF-8',
			dataType:'json',
            success : function(data){
                */
                if(data && data.status=="SUCCESS" && data.obj){
                    self.sectorConsumptionRatio(data.obj);
                }
                /*
            },
            beforeSend : function(){
                self.loadingFn(node,self.config.loadText);
            }
        }
        $.ajax(setting);
        */
    },
    sectorConsumptionRatio : function(data){
        var arr=[];
        var itemStyleArray=[
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#c063ce'
                            }, {
                                offset: 1, color: '#c35dc0'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#9c65b2'
                            }, {
                                offset: 1, color: '#8172d0'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#9979e0'
                            }, {
                                offset: 1, color: '#b070e0'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#d951a4'
                            }, {
                                offset: 1, color: '#c859b8'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#dd6787'
                            }, {
                                offset: 1, color: '#d35377'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#a660a7'
                            }, {
                                offset: 1, color: '#bd568f'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#7d487e'
                            }, {
                                offset: 1, color: '#d964a6'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#a734a5'
                            }, {
                                offset: 1, color: '#f24cf0'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#754372'
                            }, {
                                offset: 1, color: '#9d5998'
                            }],
                            globalCoord: false
                        }
                    }
                }
            },
            {
                itemStyle : {
                    normal : {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#9a1f92'
                            }, {
                                offset: 1, color: '#9b0b91'
                            }],
                            globalCoord: false
                        }
                    }
                }
            }
        ]

        for(var i=0,l=data.length;i<l;i++){
            if(i<10){
                arr.push({
                    name : data[i].categoryName,
                    value : GztUtil.formatFenToWanYuan(data[i].totalMoney) ,
                    itemStyle : itemStyleArray[i].itemStyle
                })
            }
        }

        var options = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}万元 ({d}%)"
            },
            grid: {
                left: '2%',
                right: '2%',
                top: '2%',
                bottom: '2%',
                containLabel: false
            },
            series : [
                {
                    name: '本市各行业消费比例分布',
                    type: 'pie',
                    radius : '80%',
                    center: ['50%', '50%'],
                    label : {
                        normal : {
                            textStyle : {
                                color:"#fff"
                            }
                        }
                    },
                    labelLine : {
                        normal : {
                            lineStyle : {
                                color:"#fff"
                            }
                        }
                    },
                    data : arr,
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
        GztUtil.renderChart("demo",options);
    }


}

$(function(){
    app.init();
})