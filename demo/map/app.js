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
        this.views();
    },
    views : function(){
        // 贵阳地图
        this.guiYangMap();
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
    guiYangMap : function(){
        var self=this;
        var geoData = [];
        var geoCoordMap = {};
        /*
        $.ajax({
            url: 'https://pay.cecurs.com/UCPService/OpenPlatform/seller/timquery',
            type:'get',
            success : function(res){
                var data=JSON.parse(res);
                */
                if(data && data.seller && data.seller.length>0){
                    data.seller.forEach(function(dom,index){
                        geoData.push({
                            name: dom.userid,
                            value : GztUtil.randomNum(100,200)
                        });
                        geoCoordMap[dom.userid]=[dom.lon,dom.lat]
                    })
                    self.renderDataToMap(geoData,geoCoordMap);
                }
                /*
            }
        });
        */
    },
    renderDataToMap : function(data,geoCoordMap){
        var self=this;
        var myChart =  echarts.init(document.getElementById('demo'));
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        var option = {
            geo: {
                map: 'guiyang',
                label: {
                    emphasis: {
                        show: true
                    }
                },
                left: "0%",
                right: "0%",
                top : "0%",
                bottom : "0%" ,
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: 'transparent',
                        borderColor: 'transparent',
                        color :"transparent"
                    },
                    emphasis: {
                        areaColor: 'transparent'
                    }
                }
            },
            series: [
                {
                    left: "0%",
                    right: "0%",
                    top : "0%",
                    bottom : "0%" ,
                    type: 'map',
                    map: "guiyang" ,
                    itemStyle: {
                        normal: {
                            borderWidth :1,
                            borderColor :"#525268",
                            shadowColor : "#525268",
                            shadowBlur :3
                        },
                        emphasis: {
                            areaColor: '#fff',
                        }
                    },
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data : [
                        {
                            name:'清镇市',
                            itemStyle: {
                                normal: {
                                    color :"#c7ecff"
                                }
                            }
                        },
                        {
                            name:'修文县',
                            itemStyle: {
                                normal: {
                                    color :"#d9e9a8"
                                }
                            }
                        },
                        {
                            name:'息烽县',
                            itemStyle: {
                                normal: {
                                    color :"#fad6bc"
                                }
                            }
                        },
                        {
                            name:'开阳县',
                            itemStyle: {
                                normal: {
                                    color :"#80b3d0"
                                }
                            }
                        },
                        {
                            name:'乌当区',
                            itemStyle: {
                                normal: {
                                    color :"#fff876"
                                }
                            }
                        },
                        {
                            name:'南明区',
                            itemStyle: {
                                normal: {
                                    color :"#c7c0d2"
                                }
                            }
                        },
                        {
                            name:'白云区',
                            itemStyle: {
                                normal: {
                                    color :"#f59893"
                                }
                            }
                        },
                        {
                            name:'观山湖区',
                            itemStyle: {
                                normal: {
                                    color :"#89d9ce"
                                }
                            }
                        },
                        {
                            name:'云岩区',
                            itemStyle: {
                                normal: {
                                    color :"#ccb48e"
                                }
                            }
                        },
                        {
                            name:'花溪区',
                            itemStyle: {
                                normal: {
                                    color :"#9cca9b"
                                }
                            }
                        }
                    ]
                },
                {
                    name: 'guiyanggeo',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6)),
                    symbolSize: function (val) {
                        return val[2] / 15;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: false,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color : {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.1,
                                colorStops: [
                                    {
                                        offset: 0, color: '#03edfc'
                                    },
                                    {
                                        offset: 1, color: '#b0315f'
                                    }
                                ],
                                globalCoord: false
                            },
                            shadowBlur: 30,
                            shadowColor: '#fff'
                        }
                    },
                    zlevel: 1
                }
            ]
        };
        myChart.setOption(option);
        myChart.on('click', function (data) {
            self.area=data.name;
            self.areaTotalNums();
            self.areaTopFiveMerchant();
        })
    },


}

$(function(){
    app.init();
})