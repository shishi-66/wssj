var count = 1;
var pageNum=0;
var pageSize=10;
function getBaseCondition(){
	var obj = {};
    obj["pageNo"]=pageNum;
    obj["pageSiz"]=pageSize;
    return obj;
}
var scroll = mui('.mui-scroll-wrapper').scroll();
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		down: {
			callback: pulldownRefresh
		},
		up: {
			contentrefresh: '正在加载...',
			contentnomore: '没有更多数据了',
			callback: pullupRefresh
		}
	}
});
function doMobileSearch(){
	count = 1;
	pageNum=0;
	mui('#pullrefresh').pullRefresh().refresh(true);
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().pullupLoading();
	    scroll.reLayout(); //重新计算布局值，最大滚动的高度等等
	    mui('#pullrefresh').pullRefresh().scrollTo(0,0,100);
	}, 500);
}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {		
	setTimeout(function() {					
		pageNum=pageNum+1;
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(pageNum >count); //参数为true代表没有更多数据了。
		toGetDataList(); 
	}, 1000);
}
/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		pageNum=1;
		toGetDataList(); 
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		mui('#pullrefresh').pullRefresh().refresh(true);
	}, 1000);
}
if (mui.os.plus) {
	mui.plusReady(function() {
		setTimeout(function() {
			mui('#pullrefresh').pullRefresh().pullupLoading();
		}, 500);

	});
} else {
	mui.ready(function() {
		mui('#pullrefresh').pullRefresh().pullupLoading();
	});
}