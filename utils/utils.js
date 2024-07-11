
class TextUtils {
	IsTelNo(value) {
		var reg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
		return reg.test(value);
	}
	IsMobileNo(no){
		var reg = /^1[3456789]\d{9}$/;
		if(reg.test(no)) { return true; }
		return false;
	}
	MobileNoBlur(no){
		var reg = /^(\d{3})\d{4}(\d{4})$/;
		return no.replace(reg, "$1****$2")
	}
	IsEmail(value) {
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		return reg.test(value);
	}
	isNumber(val) {
	    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
	    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
	    if(regPos.test(val) || regNeg.test(val)) { return true; }
		return false;
	}
	IsObjectId(id){
		// var RegExp = /[A-Fa-f0-9]\d{23}$/;
		var RegExp = /^[0-9a-fA-F]{24}$/;
		return RegExp.test(id);
	}
	TimeAdjust(time){
		if(!time || time == "") { return ""; }
		time = time.replace("T", " ");
		let i = time.indexOf("+");
		if(i > 0) { time = time.substring(0, i); }
	}
	//{}
	format(pattern, ...args){
		for (var i = 0; i < args.length; i++) {       
			var reg = new RegExp("\\{" + i + "\\}", "gm");             
			pattern = pattern.replace(reg, arguments[i + 1]);
		}
		return pattern;
	}
	InitDateFormatter(){
		// 对Date的扩展，将 Date 转化为指定格式的String
		// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
		// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
		// 例子：
		// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
		// (new Date()).Format("yyyy-M-d h:m:s.S")   ==> 2006-7-2 8:9:4.18
		
		Date.prototype.Format = function (fmt) {
			var o = {
				"M+": this.getMonth() + 1, //月份
				"d+": this.getDate(), //日
				"h+": this.getHours(), //小时
				"m+": this.getMinutes(), //分
				"s+": this.getSeconds(), //秒
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度
				"S": this.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt)){
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			} 
			for (var k in o){
				if (new RegExp("(" + k + ")").test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
			return fmt;
		}
		Date.prototype.format = Date.prototype.Format;
	}
	formatNo(no, len){
		return (Array(len).join(0) + no).slice(-len);
	}
	obj2urlQuery(obj){
		if(!obj) { return; }
		let args = [];
		for (let i in obj) {
			let key = encodeURIComponent(i);
			let value = encodeURIComponent(obj[i]);
			args.push(key + '=' + value);
		}
		let argstr = args.join('&');
		return argstr;
	}
	urlParse(url) {
		if(!url) { return {}; }
		let tmp = url;
		let pend = {};
		let index = 0;
		if((index = tmp.indexOf("?")) >= 0) {
		  pend.Host = tmp.substr(0, index);
		  tmp = tmp.substr(index+1);
		}
		// while(tmp&&(index = tmp.indexOf("=")) >= 0){
		while(tmp&&tmp.length > 0){
		  index = tmp.indexOf("=");
		  if(index < 0) { index = tmp.length; }
		  let fld = tmp.substr(0, index);
		  tmp = tmp.substr(index+1);
		  let val = "";
		  if((index = tmp.indexOf("&")) >= 0){
			val = tmp.substr(0, index);
			tmp = tmp.substr(index+1);
		  }else{
			val = tmp;
			tmp = "";
		  }
		  pend[`${fld}`] = val;
		}
		return pend;
	}
}
const TEXT = new TextUtils();

const ARRAY = {
	filter: function(ar, guard, field=""){
		let array = [];
		ar.forEach((it, __) => {
			let tmp = it;
			if(field && field != ""){ tmp = it[field]; }
			if(tmp && tmp.indexOf(guard) >= 0){ array.push(it); }
		});
		return array;
	},
}



export {
	TEXT,
	ARRAY,
}