$(function() {
	initData();
});

function initData() {
	$("#advance_config_div").hide();
	$("#advance_config1_div").hide();
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.ACTIVESCAN_NEWTASK_GET_ENGINE_URL;
	var params = {};
	loadDataByAjax(url, params, loadEngineSuccess);
}

function loadEngineSuccess(data) {
	var checkboxOptions = "";
	for ( var i = 0; i < data.length; i++) {
		var d = data[i];
		checkboxOptions += '<label> <input type="checkbox" class="role-check" value="'
				+ d.type_name
				+ '" name="scan_engine">'
				+ d.type_name
				+ '</label>&nbsp;&nbsp;&nbsp;';
	}
	$("#scan_engine_div").html(checkboxOptions);
}

function changeSet(id) {
	if ($("#" + id + "_div").is(":hidden")) {
		$("#" + id + "_button").html("收起&nbsp;<b>-</b>");
		$("#" + id + "_div").show();
	} else {
		$("#" + id + "_button").html("设置&nbsp;<b>+</b>");
		$("#" + id + "_div").hide();
	}
}

// 新建任务
function newtask() {
	var domain = $("#domain").val();
	var scan_in = $("#scan_in").val();
	var cookie = $("#cookie").val();
	var user_agent = $("#user_agent").val();

	var scan_engine_array = new Array();
	$("[name='scan_engine']").each(function() {
		if ($(this).prop('checked')) {
			scan_engine_array.push($(this).val());
		}
	});
	var scan_engines = scan_engine_array.join(",");

	if (isStrNull(domain)) {
		alert("请填写域名!");
		$("#domain").focus();
		return false;
	}

	if (isStrNull(scan_in)) {
		alert("请填写扫描入口!");
		$("#scan_in").focus();
		return false;
	}

	if (isStrNull(scan_engines)) {
		alert("请选择扫描引擎!");
		$("#scan_engine").focus();
		return false;
	}

	// 对数值进行提交
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.ACTIVESCAN_NEWTASK_NEWTASK_URL;
	var params = {
		domain : domain,
		entry : scan_in,
		scanner : scan_engines,
		cookie : cookie,
		useragent : user_agent
	};
	loadDataByAjax(url, params, newTaskSuccess);
}

function newTaskSuccess(data) {
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("新建任务成功!");
		clearNewTask();
	}
}

function clearNewTask() {
	$("#domain").val("");
	$("#scan_in").val("");
	$("#cookie").val("");
	$("#user_agent").val("");
	$("[name='scan_engine']").each(function() {
		$(this).attr('checked', false);
	});
}

function batchImportUrl() {
	var cookie1=$("#cookie1").val();
	var user_agent1=$("#user_agent1").val();
	if(typeof FileReader=='undefined'){
		alert("您的浏览器不支持FileReader!");
	}
	var file = $("#file").prop('files')[0];
	var reader = new FileReader();
	reader.onload = function(event) {
	    var contents = event.target.result;
	    var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.ACTIVESCAN_NEWTASK_IMPORTURL_URL;
	    alert($.base64.encode(contents));
	    var params = {
			cookie : cookie1,
			user_agent : user_agent1,
			contents : $.base64.encode(contents)
	    };
	    loadDataByAjax(url, params, batchImportUrlSuccess);
	};
	reader.onerror = function(event) {
		alert("File could not be read! Code " + event.target.error.code);
	};
	reader.readAsText(file);
}

function batchImportUrlSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("导入成功!");
		clearBatchImportUrl();
	}
}

function clearBatchImportUrl() {
	$("#cookie1").val("");
	$("#user_agent1").val("");
	$("#file").val("");
}
