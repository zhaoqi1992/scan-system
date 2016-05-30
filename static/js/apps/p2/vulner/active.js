$(function() {
	initData();
});
function initData() {
	$("#advance_config_div").hide();
	initDatePicker("datepicker","YYYY-MM-DD HH:mm:ss",true);
	
	//加载扫描引擎
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_ACTIVE_ENGINES;
	var params = {};
	loadDataByAjax(url, params, loadScanEngineSuccess);
	
	//加载扫描策略
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.STRATEGY_LIST_URL;
	var params = {
	};
	loadDataByAjax(url, params, loadStrategySuccess);
}


//加载引擎成功
function loadScanEngineSuccess(data) {
	$("#engine_div").html("");
	for ( var i = 0; i < data.length; i++) {
		var d = data[i];
		var name = d.name;
		var engines = d.engines.split(",");
		var nodes = new Array();
		var div_id = "enginetree" + i;
		$("#engine_div").append(
				"<div class='col-sm-6' id='" + div_id + "'></div>");

		for ( var j = 0; j < engines.length; j++) {
			var engine = engines[j];
			var engineid = "" + i + j;
			var content = "<span id='"+ engineid+ "' type='c'>"+engine+ "</span>";
			nodes.push({
				selectable : false,
				text : content
			});
		}
		var tree_name = "<span type='p'>" + name + "</span>";
		var tree = getTreeView(tree_name, nodes);
		$('#' + div_id).treeview({
			data : tree,
			showCheckbox : true
		});
	}
}

function loadStrategySuccess(datas){
	var options = '<option selected="selected" value="">请选择策略</option>';
	for(var i=0; i<datas.length; i++){
		var data = datas[i];
		options += '<option value="'+data.policy_id+'">'+data.policy_name+'</option>';
	}
	$("#policy").html(options);
}

function save(){
	
	//处理周期检测
	var name=$("#name").val();
	var target=$("#target").val();
	var file=$("#file").val();
	var check_day=$("#check_day").val();
	var check_hour=$("#check_hour").val();
	if(null==check_day || ""==check_day)check_day=0;
	if(null==check_hour || ""==check_hour)check_hour=0;
	var hour = parseInt(check_day)*24+parseInt(check_hour);
	alert(hour);
	$("#scan_period").val(hour);
	
	//参数判断
	if(null==name||""==name.trim()){
		alert("请填写扫描名称!");
		$("#name").focus();
		return false;
	}
	if((null==target||""==target.trim()) && (null==file||""==file.trim()) ){
		alert("扫描目标和文件上传至少填写一个!");
		$("#target").focus();
		return false;
	}
	
	//处理扫描引擎
	var pengines = new Array();
	var cengines = new Array();
	$("#engine_div .glyphicon-check").each(function() {
		// 获取到了被选中的引擎,需要判断类型，然后拼成字段传过去
		var engine = $(this).next().text();
		var type = $(this).next().attr("type");
		if (type == 'p') {
			pengines.push(engine);
		} else { // 子类
			cengines.push('{"name" : "'+engine+'"}');
		}
	});
	if((null==pengines || pengines.length<1) && (null==cengines || cengines.length<1)){
		alert("请选择扫描引擎!");
		return false;
	}
	
	$("#scanner_type").val(pengines.join(","));
	$("#scanner").val("[" + cengines.join(",") + "]");
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_ACTIVE_ADDACTIVETASK;
	$("#urlform").attr("action", url);
	$("#urlform").submit();
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