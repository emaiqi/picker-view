var config = require('../../utils/config.js')
var mta = require('../../utils/mta_analysis.js')
var utils=require('../../utils/util')
var dataC; // 保存所有城市列表

var allCity; // 保存所有城市列表
var currentProvince; // 滚轮当前指向的省
var currentCity;
var currentArea;
var enterProvince; // 按下确定键后，保存到这里，用于发送请求
var enterCity;
var enterArea;



var remoteAvatar = ''; // 头像路径
var remoteVideo = '';
var remotePics = [];

Page({
	data: {
		shopName: '',
		shopPhone: '',
		shopAddress: '',
		pics: [],
		showOrHide: 'show',
		locationStr:"请选择您的城市",
		shopIntroduce:"",
		nian:'',
		yue:'',
		ri:''
	},
	onLoad: function (options) {
		var that = this;
		var dataC=utils.getData();
		console.log(dataC.p[0]);
		currentProvince = dataC.p[0];
		console.log(currentProvince);
	},
	onReady: function () {
		mta.rptMain();
	},
	showCityPicker: function () {
		if (!currentProvince) {
			currentProvince = dataC.p[0];
			console.log(currentProvince);
			currentCity = dataC.c[currentProvince][0];
			currentArea = dataC.a[currentCity][0];
		}
		this.setData({
			showOrHide: 'show',
			provinces: dataC.p,
			citys: dataC.c[currentProvince],
			areas: dataC.a[currentCity]
		})
	},
	scrollProvince: function (e) {
		var dY = e.detail.scrollTop;
		var a = Math.round(dY / 20); // 移动的整位
		currentProvince = dataC.p[a]; // 选中的省
		currentCity = dataC.c[currentProvince][0] // 选中的城市
		currentArea = dataC.a[currentCity][0]; // 选中的区
		this.setData({
			citys: dataC.c[currentProvince],
			areas: dataC.a[currentCity]
		})
	},
	scrollCity: function (e) {
		var dY = e.detail.scrollTop;
		var a = Math.round(dY / 20); // 移动的整位
		currentCity = dataC.c[currentProvince][a] // 选中的城市
		currentArea = dataC.a[currentCity][0]; // 选中的区
		this.setData({
			areas: dataC.a[currentCity]
		})
	},
	scrollArea: function (e) {
		var dY = e.detail.scrollTop;
		var a = Math.round(dY / 20); // 移动的整位
		currentArea = dataC.a[currentCity][a]; // 选中的区
	},
	cancelPick: function () {
		this.setData({
			showOrHide: 'hide'
		})
	},
	enterPick: function () {
		enterProvince = currentProvince;
		enterCity = currentCity;
		enterArea = currentArea;
		this.setData({
			showOrHide: 'hide',
			locationStr: enterProvince + "  " + enterCity + "  " + enterArea
		})
	},
	formSubmit: function (e) {
		var that = this;
		// 检查所有参数是否完整
		if (!this.data.avatarSrc) {
			wx.showToast({
				title: '头像不能为空',
				duration: 2000
			})
		}
		if (!e.detail.value.shopName) {
			wx.showToast({
				title: '商铺名称不能为空',
				duration: 2000
			})
		}
		if (!e.detail.value.sellerPhone) {
			wx.showToast({
				title: '手机号不能为空',
				duration: 2000
			})
		}
		if (!this.data.locationStr || !e.detail.value.shopAddress) {
			wx.showToast({
				title: '商铺地址不能为空',
				duration: 2000
			})
		}
		if (!e.detail.value.introduction) {
			wx.showToast({
				title: '介绍不能为空',
				duration: 2000
			})
		}
		if (this.data.pics.length < 3) {
			wx.showToast({
				title: '繁育环境照片最少3张',
				duration: 2000
			})
		}
	},
})
