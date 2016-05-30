task_set_id = getUrlParam(document.URL,"task_set_id"); 
$(function() {
	if(null==task_set_id)task_set_id="";
	queryData();
});

function queryData(){
	var domain = $("#domain").val();
	var status = $("#status").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ACTIVESCAN_TASKMANAGER_LIST_URL;
	var columns =  [
	                { "title": "<input type='checkbox' onclick='selectAll(this);'>&nbsp;全选", "mData" : "task_id", "mRender" : formatOp},
	                { "title": "域名","mData" : "domain"},
	                { "title": "状态" ,"mData" : "status", "mRender" : formatStatus},
	                { "title": "创建时间" ,"mData" : "create_time"},
	                { "title": "完成时间" ,"mData" : "end_time"},
	                { "title": "任务ID","mData" : "task_id" , "bVisible": false},
	                { "title": "进度","mData" : "process" , "bVisible": false},
	                { "title": "高危","mData" : "high" , "bVisible": false},
	                { "title": "中危","mData" : "middle" , "bVisible": false},
	                { "title": "低危","mData" : "low" , "bVisible": false},
	                { "title": "低危","mData" : "hits" , "bVisible": false}
	            ];
	var params = [
	              {name : "domain", value : domain},
	              {name : "status", value : status},
	              {name : "sdate", value : ""},
	              {name : "edate", value : ""},
	              {name : "task_set_id", value : task_set_id}
	              ];
	commonDataTables("table", url, columns, params, true, false);
}

function selectAll(obj){
	if($(obj).prop("checked")){ //全选
		$('input[name="stask"]').prop('checked','true');
	}else{
		$('input[name="stask"]').removeAttr('checked');
	}
}

//格式化换行
function formatEntry(data){
	var size = 80;
	if(null!=data&&data.length>size){
		var re = "";
		var len = parseInt(data.length/size);
		for(var i=0; i<len; i++){
			re+= data.substr(i*size,size) + "<br>";
		}
		re+=data.substr(i*size,data.length);
		return  re;
	}
	return data;
}

function formatOp(data, type, full){
	return "<input type='checkbox' value='"+data+"' name='stask'>";
}

function formatStatus(data, type, full){
	var process = full['process'];
	var high = full['high'];
	var middle = full['middle'];
	var low = full['low'];
	var hits = full['hits'];
	var status = null;
	switch (data) {
	case 0:
		status = "未开始&nbsp;<i class='fa fa-info-circle' title='"+hits+"'></i>";
		break;
	case 1:
		status = "<div style='line-height:2;'><i class='fa fa-spinner'></i>&nbsp;进度 "+process+"%&nbsp;<a href='javascript:void(0);' onclick=cancleTask('"+full['task_id']+"')>取消</a>"
			+ "&nbsp;<i class='fa fa-info-circle' title='"+hits+"'></i>"
			+ "<br/>";
		status += showVulner(high, middle, low, full['task_id']);
		status += "</div>";
		break;
	case 2:
		status = "已完成&nbsp;<i class='fa fa-info-circle' title='"+hits+"'></i><br>" + showVulner(high, middle, low, full['task_id']);
		break;
	case -1:
		status = "已停止&nbsp;<i class='fa fa-info-circle' title='"+hits+"'></i>";
		break;
	default:
		break;
	}
	return status;
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
	if(high!=0 || middle!=0 || low!=0){ //存在漏洞
		status+="<a href='javascript:void(0);' onclick='openURL(\"vulner/vulnerlist.html?taskid="+taskid+"\");'>查看结果</a>";
	}
	return status;
}

function cancleTask(taskid){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ACTIVESCAN_TASKMANAGER_CANCEL_URL;
	var params = {
			task_id : taskid,
			task_set_id : task_set_id
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
	+ Common.Constants.ACTIVESCAN_TASKMANAGER_DEL_URL;
	var params = {
			task_id : taskids,
			task_set_id : task_set_id
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