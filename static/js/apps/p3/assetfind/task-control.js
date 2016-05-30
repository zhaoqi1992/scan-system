$(function() {
	queryData();
});

function queryData(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ASSET_TASK_LIST;
	var columns =  [
                    { "title": "任务名称","mData" : "name", },
                    { "title": "任务类型","mData" : "task_type", "mRender" : formatType},
                    { "title": "任务状态","mData" : "task_status", "mRender" : formatStatus},
                    { "title": "执行类型","mData" : "task_exec_type", "mRender" : formatExecType},
                    { "title": "任务进度","mData" : "task_process", "mRender" : formatProcess},
                    { "title": "结果数量","mData" : "result_count", "mRender" : formatResult},
                    { "title": "开始时间","mData" : "start_time"},
                    { "title": "结束时间","mData" : "end_time"},
                    //{ "title": "下次启动时间","mData" : "next_time"},
                    { "title": "操作","mData" : "task_set_id", "mRender" : formatOp},
                ];
	var params = [
	              //{name : "name", value : name},
	              //{name : "time", value : datepicker}
	              ];
	commonDataTables("table", url, columns, params, true, false);
}

function formatType(data, type, full){
	if(data=="url"){
		return "URL任务";
	}else if(data=="domain"){
		return "域名任务";
	}else if(data=="port"){
		return "端口任务";
	}else{
		return "未知类型";
	}
}

function formatStatus(data, type, full){
	/*-1:取消
	0:等待执行'
	1:正在执行'
	2:完成' */
	if(data=="0"){
		return "<div>&nbsp;&nbsp;<i class=\"fa fa fa-coffee\" aria-hidden=\"true\" style=\"color:#18A689\"></i>队列中...</div>";
	}else if(data=="1"){
		return "<div>&nbsp;&nbsp;<i class=\"fa fa-spinner\" aria-hidden=\"true\" style=\"color:#18A689\"></i>正在执行...</div>";
	}else if(data=="2"){
		return "<div>&nbsp;&nbsp;<i class=\"fa fa-check\" aria-hidden=\"true\" ></i>完成</div>";
	}else{
		return "<div>&nbsp;&nbsp;<i class=\"\" aria-hidden=\"true\" ></i>未知状态:"+data+"</div>";
	}
}

function formatExecType(data, type, full){
	/*普通任务 1:定时任务 2:周期任务 */
	if(data=="0"){
		return "<i class=\"fa fa-meh-o\" style=\"color:#18A689\"></i>普通任务";
	}else if(data=="1"){
		return "<i class=\"fa fa-clock-o\" style=\"color:#18A689\"></i>定时任务";
	}else if(data=="2"){
		return "<i class=\"fa fa-refresh\" style=\"color:#18A689\"></i>周期任务";
	}
}

function formatResult(data, type, full){
	return data;
	/*if(data>0){
		return "<a href='javascript:;' class='btn-small btn-white'><i class='fa fa-search' style=\"color:#18A689\"></i>发现&nbsp;"+data+"&nbsp;</a>";
	}else{
		return data;
	}*/
}

function formatProcess(data, type, full) {
	//var a=parseInt(data)
	//return "<span class=\"pie\">0.52,1.041</span>"+data+"%";
	return data+"%";
}

function formatOp(data, type, full){
	var task_set_id = full['task_set_id'];
	var re = "<div class=''>"
			+"<a href='javascript:;' class='btn-small btn-white'><i class='fa fa-search' style=\"color:#18A689\"></i>查看资产</a>&nbsp;"
			+"<a href='javascript:;' class='btn-small btn-white' onclick='restartTask(\""+task_set_id+"\")'><i class=\"fa fa-rotate-right\" style=\"color:#18A689\"></i> 重新检测</a>&nbsp;"
			+"<a href='javascript:;' class='btn-small btn-white' onclick='delTask(\""+task_set_id+"\")'><i class='fa fa-trash-o' style=\"color:#18A689\"></i>删除任务</a>"
			+"</div></div>"
		;
	return re;
}

function restartTask(task_set_id){
	//alert(task_id);
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.ASSET_TASK_DELTE;
	var params = {
		task_set_id : task_set_id
	};
	loadDataByAjax(url, params, callbackStatus);
}

function delTask(task_set_id){
	//alert(task_id);
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.ASSET_TASK_DELTE;
	var params = {
		task_set_id : task_set_id
	};
	loadDataByAjax(url, params, callbackStatus);
}

function callbackStatus(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	}else {
		alert("Success!");
		queryData();
	}
}