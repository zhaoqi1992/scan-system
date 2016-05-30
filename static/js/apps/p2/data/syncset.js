$(function() {
	$('#switch-div').on('switch-change', function(e, data) {
		var value = data.value;
		if(value==true){
			$("#enable").val(1);
		}else{
			$("#enable").val(0);
		}
	});
	queryData();
});

function queryData() {
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.P2_DATA_SYNCSET_AGENTLIST;
	var columns = [ {
		"title" : "名称",
		"mData" : "name"
	}, {
		"title" : "类别",
		"mData" : "type"
	}, {
		"title" : "ip",
		"mData" : "ip"
	}, {
		"title" : "连接时间",
		"mData" : "conn_time"
	}, {
		"title" : "心跳时间",
		"mData" : "heartbeat_time"
	}, {
		"title" : "是否开启",
		"mData" : "enable",
		"mRender" : formatStatus
	}, {
		"title" : "操作",
		"mData" : "id",
		"mRender" : formatOption
	}, {
		"title" : "域名范围",
		"mData" : "sync_domain",
		"bVisible" : false
	}, {
		"title" : "同步目的",
		"mData" : "target_ip",
		"bVisible" : false
	}, {
		"title" : "同步周期",
		"mData" : "sync_period",
		"bVisible" : false
	}, {
		"title" : "同步间隔",
		"mData" : "sync_interval",
		"bVisible" : false
	} ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}

function formatStatus(data){
	if(data=='1'){
		return "是";
	}else{
		return "否";
	}
}

function formatOption(data, type, full) {
	var enable = full['enable'];
	var sync_domain = full['sync_domain'];
	var target_ip = full['target_ip'];
	var sync_period = full['sync_period'];
	var sync_interval = full['sync_interval'];
	return "<a href='javascript:void(0);' data-toggle='modal' data-target='#setEngine' onclick='syncset(\""
			+ data
			+ "\",\""
			+ enable
			+ "\",\""
			+ sync_domain
			+ "\",\""
			+ target_ip
			+ "\",\""
			+ sync_period
			+ "\",\""
			+ sync_interval
			+ "\")'>配置</a>&nbsp;<a href='javascript:void(0);' onclick='delsync(\""
			+ data + "\")'>删除</a>";
}

function syncset(data, enable, sync_domain, target_ip, sync_period, sync_interval) {
	//是否开启设置默认值
	$("#syncid").val(data);
	$("#syncspan").val(sync_domain);
	$("#synctarget").val(target_ip);
	$("#hour").val(sync_period);
	$("#minutes").val(sync_interval);
	if (enable == 1) {
		$('#switch-div').bootstrapSwitch('setState', true);
	} else {
		$('#switch-div').bootstrapSwitch('setState', false);
	}
	$("#enable").val(enable);
}

function save() {
	var enable = $("#enable").val();
	var syncid = $("#syncid").val();
	var syncspan = $("#syncspan").val();
	var synctarget = $("#synctarget").val();
	var hour = $("#hour").val();
	var minutes = $("#minutes").val();
	
	//参数合法性判断
	if(null==synctarget||""==synctarget.trim()){
		alert("请填写同步目的!");
		$("#synctarget").focus();
		return false;
	}
	if(null==hour||""==hour.trim()){
		alert("请填写同步周期!");
		$("#hour").focus();
		return false;
	}
	if(null==minutes||""==minutes.trim()){
		alert("请填写同步间隔!");
		$("#minutes").focus();
		return false;
	}
	
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.P2_DATA_SYNCSET_UPDATE;
	var params = {
		id : syncid,
		enable : enable,
		domainlist : syncspan,
		target_ip : synctarget,
		sync_period : hour,
		sync_interval : minutes
	};
	loadDataByAjax(url, params, saveSuccess);
}

function saveSuccess(data) {
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已提交!");
		queryData();
		$("#update-sdk-cancle").click();
	}
}

function delsync(data) {
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.P2_DATA_SYNCSET_DEL;
	var params = {
		id : data
	};
	loadDataByAjax(url, params, delsyncSuccess);
}

function delsyncSuccess(data) {
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已删除!");
		queryData();
	}
}

function uploadfile(){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_DATA_SYNCSET_UPLOADFILE;
	$("#urlform").attr("action",url);
	$("#urlform").submit();
}