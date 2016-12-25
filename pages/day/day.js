var utils = require('../../utils/util');
var currentProvince; // 滚轮当前指向的省
var currentCity;
var currentArea;



const date = new Date();
const years = [];
const months = [];
const days = [];

const p=[];
const a=[];
const c=[];

var riqi;
var val;
for (let i = 1990; i <= date.getFullYear(); i++) {
    years.push(i)
}

for (let i = 1; i <= 12; i++) {
    months.push(i)
}

for (let i = 1; i <= 31; i++) {
    days.push(i)
}

Page({
    data: {
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 2,
        days: days,
        day: 2
    },
    onLoad: function (options) {
	    var dataC=utils.getData();
	    // p.push(dataC.p);//province
	    a.push(dataC.a);//area
	    c.push(dataC.c);//city

	    for (let i = 0; i < dataC.p.length; i++) {
		    p.push(dataC.p);
	    }

	    console.log(p[0]);
    },
    bindChange: function (e) {
        val = e.detail.value;
        riqi = this.data;
        /*this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
        })*/
    },
	yes:function () {
		if (!currentProvince) {
			currentProvince = p[0];
			currentCity = c[currentProvince][0];
			currentArea = a[currentCity][0];
		}
		this.setData({
			showOrHide: 'show',
			years: p[0],
			months: c[0][currentProvince],
			days: a[0][currentCity]
		})
	},
    enter: function () {
    	if(typeof(riqi)=="undefined" ){
		    this.setData({
			    nian: 1994,
			    yue: 1,
			    ri: 1
		    })
	    }else {
		    this.setData({
			    nian: riqi.year,
			    yue: riqi.month,
			    ri: riqi.day
		    })
	    }

    }
});