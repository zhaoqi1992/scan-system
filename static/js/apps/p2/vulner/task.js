$(function() {
	initDateRange("datepicker");
	queryData();
});

function queryData(){
	var name = $("#name").val();
	var datepicker = $("#datepicker").val();
	
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.P2_VULNER_TASK_GET_TASKSET;
	var columns =  [
	                { "title": "任务名称","mData" : "name", "mRender" : formatName},
	                { "title": "新建时间","mData" : "create_time"},
	                { "title": "类型" ,"mData" : "task_type"},
	                { "title": "进度" ,"mData" : "status", "mRender" : formatStatus},
	                { "title": "操作" ,"mData" : "task_set_id", "mRender" : formatOp},
	                { "title": "记录数","mData" : "task_num" , "bVisible": false},
	                { "title": "状态","mData" : "status" , "bVisible": false},
	                { "title": "高危","mData" : "high" , "bVisible": false},
	                { "title": "中危","mData" : "middle" , "bVisible": false},
	                { "title": "低危","mData" : "low" , "bVisible": false},
	                { "title": "任务级别","mData" : "info" , "bVisible": false}
	            ];
	var params = [
	              {name : "name", value : name},
	              {name : "time", value : datepicker}
	              ];
	commonDataTables("table", url, columns, params, true, false);
}

function formatName(data, type, full){
	var re = '<div>'+data+'</div>'
			+ '<div><b><i class="fa fa-hand-o-right"></i>&nbsp;共有'+full['task_num']+'条记录</b></div>';
	return re;
}

function formatStatus(data, type, full){
	var process = full['process'];
	var high = full['high'];
	var middle = full['middle'];
	var low = full['low'];
	var status = null;
	switch (data) {
	case 0:
		status = "未开始";
		break;
	case 1://执行中
		status = "<div style='line-height:2;'><i class='fa fa-spinner'></i>&nbsp;进度 "+process+"%&nbsp;<a href='javascript:void(0);' onclick=cancleTask('"+full['task_set_id']+"')>全部取消</a>"
			+ "<br/>";
		status += showVulner(high, middle, low, full['task_id']);
		status += "</div>";
		break;
	case 2:
		status = "已完成<br>" + showVulner(high, middle, low, full['task_id']);
		break;
	case -1:
		status = "取消";
		break;
	default:
		break;
	}
	return status;
	return data;
}

function showVulner(high,middle,low, taskid){
	var status = "";
	if(high!='0' || middle!='0'){
		status += "<span style='color:red;'>";
	}else{
		status += "<span>";
	}
	if(high!='0'){
		status += high + "个高危&nbsp;";
	}
	if(middle!='0'){
		status += middle + "个中危&nbsp;";
	}
	if(low!='0'){
		status += low + "个低危";
	}
	status += "</span>";
//	if(high!=0 || middle!=0 || low!=0){ //存在漏洞
//		status+="<a href='javascript:void(0);' onclick='openURL(\"vulner/vulnerlist.html?taskid="+taskid+"\");'>查看结果</button>";
//	}
	return status;
}

function formatOp(data, type, full){
	var taskurl = getBaseUrl() + "?&u=vulner/taskmanager.html&task_set_id="+data;
	var vulnerurl = getBaseUrl() + "?&u=vulner/vulner.html&task_set_id="+data;
	var re = "<span><a href='"+taskurl+"'>展开列表</a></span>&nbsp;&nbsp;"
			+"<span><a href='"+vulnerurl+"'>漏洞详情</a></span>&nbsp;&nbsp;"
			+"<span><a href='javascript:void(0);' onclick='delTask(\""+data+"\")'>删除</a></span>";
	return re;
}

function cancleTask(taskid){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_TASK_CANCEL_TASK;
	var params = {
			task_set_id : taskid
	};
	loadDataByAjax(url, params, cancleTaskSuccess);
}

function cancleTaskSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已取消任务!");
		queryData();
	}
}

function delTask(taskid){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_TASK_DELTASK;
	var params = {
			task_set_id : taskid
	};
	loadDataByAjax(url, params, delTaskSuccess);
}

function delTaskSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已删除任务!");
		queryData();
	}
}
