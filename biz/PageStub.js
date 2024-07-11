
const UPDATE_THRES = 3 * 60 * 1000 //3mins 更新一次页面
// const UPDATE_THRES = 10 * 1000 //
const PAGES = new Map();	// route:{lastUpdateTime, updateThres}
var userAid = null

function getRoute(host){
	// let pages = host.getCurrentPages();
	// let pages = getCurrentPages();
	// let curRoute = pages[pages.length - 1].route;
	let curRoute = host.$mp.page.route;
	return curRoute;
}
function register(host, thres = UPDATE_THRES){
	let curRoute = getRoute(host);
	let stub = PAGES.get(curRoute);
	if(!stub){
		PAGES.set(curRoute, {
			lastUpdateTime: 0,
			updateThres: thres,
		});
	}
}

function refresh(host){
	let curRoute = getRoute(host);
	let stub = PAGES.get(curRoute);
	if(!stub){
		register(host);
		console.log("[PageStub]", `${curRoute} & register!`);
		stub = PAGES.get(curRoute);
	}
	let user = uni.getStorageSync('User');
	let aid = user && user.Data ? user.Data.Aid : "";
	let current = new Date().getTime();
	var refresh = userAid != aid || current - stub.lastUpdateTime > stub.updateThres;
	if (aid != userAid) { 
		userAid = aid; 
		PAGES.forEach((stub, route) => {
			stub.lastUpdateTime = 0;
		})
	}
	if(refresh) { stub.lastUpdateTime = current; }
	console.log("[PageStub]", `${curRoute} & refresh? ${refresh}`);
	return refresh;
}
function invalid(host){
	if(host){
		let curRoute = getRoute(host);
		let stub = PAGES.get(curRoute);
		if(stub){
			stub.lastUpdateTime = 0;
			return true;
		}
		return false;
	}
	PAGES.clear();
	return true;
}
function invalidLast(cnt = 1){
	let pages = getCurrentPages();  //获取所有页面栈实例列表
	if(!cnt || cnt <= 0) { cnt = 1; }
	if(cnt >= pages.length) { return; }
	let index = pages.length - cnt - 1;
	let prevPage = pages[index]; //
	let route = prevPage ? prevPage.route : null;
	if(route) { 
		let stub = PAGES.get(route);
		if(stub){ stub.lastUpdateTime = 0; return true; }
	}
}
function notifyLast(method, ...args){
	let pages = getCurrentPages();  //获取所有页面栈实例列表
	let prevPage = pages[ pages.length - 2 ]; //
	let func = null;
	if(prevPage && prevPage.$vm){ func = prevPage.$vm[method]; }
	console.debug(`PageStub: ${pages?pages.length:0}`, pages);
	if(func){ func(...args); }
}

export default {
	register,
	refresh,
	invalid,
	invalidLast,
	notifyLast,
}