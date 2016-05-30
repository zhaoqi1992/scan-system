$(function() {
	initDateRange("datepicker");
	queryData();
});

function queryData(){
	var name = $("#name").val();
	var type = $("#type").val();
	var datepicker = $("#datepicker").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.P2_ASSET_TASK_GETALLTASK;
	var columns =  [
	                { "title": "<input type='checkbox' onclick='selectAll(this);'>&nbsp;全选", "mData" : "task_id", "mRender" : formatCheck},
	                { "title": "名称","mData" : "name"},
	                { "title": "类型" ,"mData" : "type"},
	                { "title": "扫描端口" ,"mData" : "port"},
	                { "title": "状态" ,"mData" : "status", "mRender" : formatStatus},
	                { "title": "进度" ,"mData" : "process"},
	                { "title": "发现条数","mData" : "result_count", "mRender" :  formatResultCount },
	                { "title": "创建时间","mData" : "create_time" },
	                { "title": "完成时间","mData" : "end_time" },
	                { "title": "下次启动时间","mData" : "next_time"},
	                { "title": "操作","mData" : "task_id" ,"mRender" : formatOption}
	            ];
	var params = [
	              {name : "name", value : name},
	              {name : "type", value : type},
	              {name : "time", value : datepicker}
	              ];
	commonDataTables("table", url, columns, params, true, false);
}

function formatResultCount(data, type, full){
	var taskid = full['task_id'];
	var url = getBaseUrl() + "?&u=asset/asset.html&taskid="+taskid;
	if(parseInt(data)>0){
		return data + "&nbsp;[<a href='"+url+"'>查看结果</a>]"
	}
	return data;
}

function formatOption(data, type, full){
	var status = full['status'];
	if(status=='-1'){
		return "<a href='javascript:void(0);' onclick='updateStatus(\""+data+"\",0)'>继续</a>";
	}else if(status=='1'){
		return "<a href='javascript:void(0);' onclick='updateStatus(\""+data+"\",1)'>暂停</a>";
	}
	return "";
}

function formatCheck(data, type, full){
	return "<input type='checkbox' value='"+data+"' name='stask'>";
}

function formatStatus(data){
	var status = "";
	switch (data) {
	case 0:
		status = "未开始";
		break;
	case 1:
		status = "正在扫描";
		break;
	case 2:
		status = "已完成";
		break;
	case -1:
		status = "暂停";
	default:
		break;
	}
	return status;
}

function updateStatus(taskid, status){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_ASSET_TASK_MODIFYSTATUS;
	var params = {
			task_id : taskid,
			pause : status
	};
	loadDataByAjax(url, params, updateStatusSuccess);
}

function updateStatusSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已提交!");
		queryData();
	}
}

function selectAll(obj){
	if($(obj).prop("checked")){ //全选
		$('input[name="stask"]').prop('checked','true');
	}else{
		$('input[name="stask"]').removeAttr('checked');
	}
}

function delTask(){
	var taskArray = new Array();
	$("input[name='stask']").each(function(){
		if($(this).prop('checked')){
			taskArray.push($(this).val());
		}
	});
	if(null==taskArray || taskArray.length<1){
		alert("请选择要删除的任务!");
		return false;
	}
	var taskids = taskArray.join(",");
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.P2_ASSET_TASK_DELTASK;
	var params = {
			task_id : taskids
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

