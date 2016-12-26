var utils = require('../../utils/util');
const p = [];//省
const a = [];//市
const c = [];//区，县
var riqi;//日期
var val;//下标
Page({
	data: {
	},
	onLoad: function (options) {
		var dataC = utils.getData();
		p.push(dataC.p);//province
		a.push(dataC.a);//area
		c.push(dataC.c);//city
		this.setData({
			years: p[0],
			months: c[0][p[0][0]],
			days: a[0][c[0][p[0][0]][0]]
		})
		console.log(c[0][p[0][0]][0]);
	},
	bindChange: function (e) {
		val = e.detail.value;
		riqi = this.data;
		console.log(riqi.years[val[1]]);
		this.setData({
			months:c[0][riqi.years[val[0]]],
			days:a[0][riqi.months[val[1]]]
		 })
	},
	yes: function () {//获取城市信息
		if (typeof(riqi) == "undefined") {
			this.setData({
				nian: "黑龙江省",
				yue:"大兴安岭地区",
				ri: "塔河县"
			})
		} else {
			this.setData({
				nian: this.data.years[val[0]],
				yue: this.data.months[val[1]],
				ri : this.data.days[val[2]]
			})
		}
	},
	cancelPick:function () {

	},
	enterPick:function () {

	},
	enter: function () {
		if (typeof(riqi) == "undefined") {
			this.setData({
				nian: "黑龙江省",
				yue:"大兴安岭地区",
				ri: "塔河县"
			})
		} else {
			this.setData({
				nian: this.data.years[val[0]],
				yue: this.data.months[val[1]],
				ri : this.data.days[val[2]]
			})
		}
	}
});