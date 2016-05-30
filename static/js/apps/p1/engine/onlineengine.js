$(function() {
	queryData();
});

function queryData(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ONLINEENGINE_LIST_URL;
	var columns =  [
	                { "title": "引擎名称","mData" : "engine_name" },
	                { "title": "所属分类" ,"mData" : "engine_type_name"},
	                { "title": "连接时间" ,"mData" : "conn_time"},
	                { "title": "心跳时间" ,"mData" : "heart_time"},
	                { "title": "IP" ,"mData" : "ip"},
	                { "title": "CPU" ,"mData" : "cpu"},
	                { "title": "内存使用率" ,"mData" : "memery"},
	                { "title": "操作" ,"mData" : "engine_id", "mRender" : formatOp}
	            ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}

function formatOp(data, type, full){
	var re = "<a href='javascript:void(0);' onclick='delEngine(\""+data+"\");'>删除</a>&nbsp;"
		+ "<a href='javascript:void(0);' data-toggle='modal' data-target='#setEngine' onclick='loadStrategy(\""+data+"\",\""+full['policy_id']+"\",\""+full['desc']+"\",\""+full['policy_enable']+"\");'>配置引擎</a>";
	return re;
}

function delEngine(id){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ONLINEENGINE_DEL_URL;
	var params = {
			engine_id:id
	};
	loadDataByAjax(url, params, updateEngineSuccess);
}

function updateEngineSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已提交!");
		queryData();
	}
}

function loadStrategy(id, strategy, desc, policy_enable){
	$("#desc").val("");
	
	$("#engine_h").val(id);
	$("#strategy_h").val(strategy);
	$("#desc_h").val(desc);
	$("#policy_enable_h").val(policy_enable);
	if(policy_enable=='1'){
		$("#strategydiv").show();
		var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.STRATEGY_LIST_URL;
		var params = {
		};
		loadDataByAjax(url, params, loadStrategySuccess);
	}else{
		$("#strategydiv").hide();
	}
}

function loadStrategySuccess(datas){
	var strategy = $("#strategy_h").val();
	var options = "";
	if(null==strategy||""==strategy.trim()){
		options+='<option value="" selected="selected">请选择策略</option>';
	}else{
		options+='<option value="">请选择策略</option>';
	}
	for(var i=0; i<datas.length; i++){
		var data = datas[i];
		if(strategy==data.policy_id){
			options += '<option selected="selected" value="'+data.policy_id + "_" + data.rule_ids+'">'+data.policy_name+'</option>';
		}else{
			options += '<option value="'+data.policy_id + "_" + data.rule_ids+'">'+data.policy_name+'</option>';
		}
	}
	$("#strategylist").html(options);
}

//配置引擎
function setEngine(){
	var desc = $("#desc").val();
	var id = $("#engine_h").val();
	var policy_enable = $("#policy_enable_h").val();
	var strategy = $("#strategylist").val();
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.ONLINEENGINE_UPDATE_STRATEGY_DESC_URL;
	var params = {
		engine_id : id,
		policy_id : strategy,
		desc : desc
	};
	loadDataByAjax(url, params, setEngineSuccess);
}

function setEngineSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已提交!");
		$("#update-sdk-cancle").click();
	}
}