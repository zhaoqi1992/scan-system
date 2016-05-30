$(function() {
	queryData();
});

function queryData(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ENGINETYPE_LIST_URL;
	var columns =  [
	                { "title": "类别名称","mData" : "type_name" },
	                { "title": "引擎类型" ,"mData" : "engine_type"},
	                { "title": "是否启用" ,"mData" : "enable", "mRender" : formatStatus},
	                { "title": "操作" ,"mData" : "type_id", "mRender" : formatOp}
	            ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}

function formatOp(data, type, full){
	var re = "<a href='javascript:void(0);' onclick='delEngineType(\""+data+"\");'>删除</a>&nbsp;";
	var enable = full['enable'];
	if(enable=='1'){
		re += "<a href='javascript:void(0);' onclick='updateStatus(\""+data+"\",0);'>关闭</a>";
	}else{
		re += "<a href='javascript:void(0);' onclick='updateStatus(\""+data+"\",1);'>启用</a>";
	}
	
	
	return re;
}

function formatStatus(data){
	if(data=='1'){
		return "已启用";
	}else{
		return "未启用";
	}
}

function delEngineType(id){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ENGINETYPE_DEL_URL;
	var params = {
			type_id:id
	};
	loadDataByAjax(url, params, updateEngineTypeSuccess);
}

function updateStatus(id, status){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ENGINETYPE_UPDATESTATUS_URL;
	var params = {
			type_id:id,
			enable:status
	};
	loadDataByAjax(url, params, updateEngineTypeSuccess);
}

function updateEngineTypeSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已提交!");
		queryData();
	}
}

function addEngineType(){
	var name = $("#typename").val();
	var type = $("#type").val();
	var enable = $("#enable").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ENGINETYPE_NEW_URL;
	var params = {
			name:name,
			type:type,
			enable:enable
	};
	loadDataByAjax(url, params, addEngineTypeSuccess);
}

function addEngineTypeSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已添加引擎类别!");
		clearInput();
	}
}

function clearInput(){
	$("#typename").val("");
	$("#type").val("");
	$("#enable").val("");
}