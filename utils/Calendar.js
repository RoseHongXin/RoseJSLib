class Calendar {
	
	__time__ = null;
	constructor(time){
		//new Date("")微信ios小程序 不支持yyyy-MM-ss格式时间处理。
		if(time) { this.__time__ = new Date(time.replace(/-/g, "/")); 
		}else{ this.__time__ = new Date(); }
	}
	getMilliseconds() { return this.__time__ ? this.__time__.getMilliseconds() : 0; }
	getSeconds() { return this.__time__ ? this.__time__.getSeconds() : 0; }
	getMinutes() { return this.__time__ ? this.__time__.getMinutes() : 0; }
	getHours() { return this.__time__ ? this.__time__.getHours() : 0; }
	getDate() { return this.__time__ ? this.__time__.getDate() : 0; }
	getDay() { return this.__time__ ? this.__time__.getDay() : 0; }
	getMonth() { return this.__time__ ? this.__time__.getMonth() : 0; }
	getFullYear() { return this.__time__ ? this.__time__.getFullYear() : 0; }
	getTime() { return this.__time__ ? this.__time__.getTime() : 0; }
	now() { return this.__time__ ? this.__time__.now() : 0; }
	
	setMilliseconds(val) { this.__time__ ? this.__time__.setMilliseconds(val) : 0; }
	setSeconds(val) { this.__time__ ? this.__time__.setSeconds(val) : 0; }
	setMinutes(val) { this.__time__ ? this.__time__.setMinutes(val) : 0; }
	setHours(val) { this.__time__ ? this.__time__.setHours(val) : 0; }
	setDate(val) { this.__time__ ? this.__time__.setDate(val) : 0; }
	setDay(val) { this.__time__ ? this.__time__.setDay(val) : 0; }
	setMonth(val) { this.__time__ ? this.__time__.setMonth(val) : 0; }
	setFullYear(val) { this.__time__ ? this.__time__.setFullYear(val) : 0; }
	setTime(val) { this.__time__ ? this.__time__.setTime(val) : 0; }
	parse(val) { this.__time__ ? this.__time__.setTime(val) : 0; }
	
	__cal(val, base){
		let multi = parseInt(val/base);
		val %= base;
		if(val < 0) { multi -= 1; val += base; }
		return [multi, val];
	}
	
	addMilliseconds(val) { 
		if(!this.__time__) { return; }
		val = this.__cal(val+this.getMilliseconds(), 1000);
		if(val[0] != 0) { this.addSeconds(val[0]); }
		this.setMilliseconds(val[1]);
	}
	addSeconds(val) { 
		if(!this.__time__) { return; }
		val = this.__cal(val+this.getSeconds(), 60);
		if(val[0] != 0) { this.addMinutes(val[0]); }
		this.setSeconds(val[1]);
	}
	addMinutes(val) { 
		if(!this.__time__) { return; }
		val = this.__cal(val+this.getMinutes(), 60);
		if(val[0] != 0) { this.addHours(val[0]); }
		this.setMinutes(val[1]);
	}
	addHours(val) { 
		if(!this.__time__) { return; }
		val = this.__cal(val+this.getHours(), 24);
		if(val[0] != 0) { this.addDate(val[0]); }
		this.setHours(val[1]);
	}
	addDate(val) { 
		if(!this.__time__) { return; }
		let thetime = this.getTime();	//从1970.1.1开始的毫秒数
		thetime += (val * 24 * 3600000);
		this.__time__ = new Date(thetime);
	}
	addMonth(val) { 
		if(!this.__time__) { return; }
		val = this.__cal(val+this.getMonth(), 12);
		if(val[0] != 0) { this.addYear(val[0]); }
		this.setMonth(val[1]);
	}
	addYear(val) { 
		if(!this.__time__) { return; }
		val += this.getFullYear();
		this.setFullYear(val);
	}
	
	equal(calendar){ return this.getTime() == calendar.getTime(); }
	compare(calendar) { 
		let tt = this.getTime();
		let ct = calendar.getTime();
		return tt == ct ? 0 : ( tt > ct ? 1 : -1);
	}
	offsetDays(calendar){
		let tt = this.getTime();
		let ct = calendar.getTime();
		return parseInt((tt-ct) / 24 / 3600000);
	}
	
	toString() {
		return this.format("yyyy-MM-dd hh:mm:ss");
	}
	format(fmt="yyyy-MM-dd") {
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
}

function getInstance(val) { return new Calendar(val); }

export default{
	getInstance,
}