//application id got from MTA analysis
var MTA_APP_ID = '500370651'; //常规统计id
var MTA_EVENT_ID = ''; //自定义事件id，可选填

var MTA_API_BASE = "https://pingtas.qq.com/pingd", MTA_VAR_PREFIX = "_mta_"; function getNetworkType(a) { wx.getNetworkType({ success: function (b) { a(b.networkType) } }) } function getSystemInfo() { var a = wx.getSystemInfoSync(); return { adt: a.model, scl: a.pixelRatio, scr: a.windowWidth + "x" + a.windowHeight, lg: a.language, fl: a.version } } function getUID() { try { return wx.getStorageSync(MTA_VAR_PREFIX + "auid") } catch (a) { } } function setUID() { try { var a = getRandom(); wx.setStorageSync(MTA_VAR_PREFIX + "auid", a); return a } catch (b) { } }
function getRandom(a) { return (a || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10 } function getPagePath() { try { var a = getCurrentPages(), b = "/"; 0 < a.length && (b = a.pop().__route__); return b } catch (e) { console.log("get current page path error:" + e) } } function getMainInfo() { var a = { dm: "wechat.apps.xx", url: getPagePath(), pvi: "", ty: 2 }, b = getUID(); b || (a.ty = 1, b = setUID()); a.pvi = b; return a }
function getBasicInfo() { var a = getSystemInfo(); getNetworkType(function (a) { wx.setStorageSync(MTA_VAR_PREFIX + "ntdata", a) }); a.ct = wx.getStorageSync(MTA_VAR_PREFIX + "ntdata") || "4g"; return a } function getExtentInfo() { return { r2: MTA_APP_ID } }
module.exports = {
    rptMain: function () { if ("" != MTA_APP_ID) { for (var a = [], b = 0, e = [getMainInfo(), getBasicInfo(), getExtentInfo(), { random: +new Date }], d = e.length; b < d; b++)for (var f in e[b]) e[b].hasOwnProperty(f) && a.push(f + "=" + (e[b][f] || "")); var c = new Image; c.onload = c.onerror = c.onabort = function () { c = c.onload = c.onerror = c.onabort = null }; c.src = MTA_API_BASE + "?" + a.join("&").toLowerCase() } }, eventStat: function (a, b) {
        if ("" != MTA_EVENT_ID) {
            var e = [], d = getMainInfo(), f = getExtentInfo(); d.dm = "wxapps.click"; d.url = a; f.r2 = MTA_EVENT_ID;
            f.r5 = function (a) { a = "undefined" === typeof a ? {} : a; var b = [], c; for (c in a) a.hasOwnProperty(c) && b.push(c + "=" + a[c]); return b.join(";") } (b); for (var c = 0, d = [d, getBasicInfo(), f, { random: +new Date }], f = d.length; c < f; c++)for (var h in d[c]) d[c].hasOwnProperty(h) && e.push(h + "=" + (d[c][h] || "")); var g = new Image; g.onload = g.onerror = g.onabort = function () { g = g.onload = g.onerror = g.onabort = null }; g.src = MTA_API_BASE + "?" + e.join("&").toLowerCase()
        }
    }
};