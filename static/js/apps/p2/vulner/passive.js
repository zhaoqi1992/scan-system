var scanner_type;
var scanner;
$(function() {
	initData();
});
function initData() {
	loadStrategy();
	$('#switch-div').on('switch-change', function(e, data) {
		var value = data.value;
		if(value==true){
			$("#enable").val(1);
		}else{
			$("#enable").val(0);
		}
	});
	$("input[name='wblist']").change(function(){
		$("#black_or_white").val($(this).val());
		$("#wblist").val("");
	});
	loadDefaultConfig();
}

function loadDefaultConfig(){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_PASSIVE_GETCONFIG;
	var params = {};
	loadDataByAjax(url, params, loadDefaultConfigSuccess);
}

function loadDefaultConfigSuccess(data){
	var config = data;
	var enable = config.enable;
	var whitelist = config.whitelist;
	var blacklist = config.blacklist;
	var policy = config.policy;
	scanner_type = config.scanner_type;
	scanner = config.scanner;
	if (enable == 1) {
		$('#switch-div').bootstrapSwitch('setState', true);
	} else {
		$('#switch-div').bootstrapSwitch('setState', false);
	}
	$("#enable").val(enable);

	$("#policy").val(policy);

	// 选中的active
	$("input[name='wblist']").parent().removeClass("active");
	if (null != whitelist && "" != whitelist) {
		$("input[name='wblist'][value='white']").parent().addClass("active");
		$("#wblist").val(whitelist);
		$("#black_or_white").val("white");
	} else {
		$("input[name='wblist'][value='black']").parent().addClass("active");
		$("#wblist").text(blacklist);
		$("#black_or_white").val("black");
	}

	// 加载配置
	loadScanEngine();
}

//加载扫描引擎
function loadScanEngine(){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_PASSIVE_ENGINES;
	var params = {};
	loadDataByAjax(url, params, loadScanEngineSuccess);
}

//加载引擎成功
function loadScanEngineSuccess(data) {
	$("#engine_div").html("");
	var scanner_type_array = scanner_type.split(",");
	for ( var i = 0; i < data.length; i++) {
		var d = data[i];
		var name = d.name;
		var engines = d.engines.split(",");
		var nodes = new Array();
		var div_id = "enginetree" + i;
		$("#engine_div").append("<div class='col-sm-6' id='" + div_id + "'></div>");

		for ( var j = 0; j < engines.length; j++) {
			var engine = engines[j];
			var engineid = "" + i + j;
			var content = "<span id='"
					+ engineid
					+ "' type='c'>"
					+ engine
					+ "</span>";

			// 这里得判断子引擎是否被选中
			var cchecked = false;
			for ( var k = 0; k < scanner.length; k++) {
				var s = scanner[k];
				if (s.name == engine) {// 匹配成功
					cchecked = true;
				}
			}

			nodes.push({
				selectable : false,
				text : content,
				state : {
					checked : cchecked
				}
			});
		}
		var tree_name = "<span type='p'>" + name + "</span>";

		var pchecked = false;
		if ($.inArray(name, scanner_type_array) >= 0) {// 说明默认被选中了
			pchecked = true;
		}
		var tree = getTreeView(tree_name, nodes, pchecked, true);
		$('#' + div_id).treeview({
			data : tree,
			showCheckbox : true
		});
	}
}

//加载扫描策略
function loadStrategy(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.STRATEGY_LIST_URL;
	var params = {
	};
	loadDataByAjax(url, params, loadStrategySuccess);
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
	var enable = $("#enable").val();
	var policy = $("#policy").val();
	var black_or_white = $("#black_or_white").val();
	var wblist = $("#wblist").val();
	var whitelist = "";
	var blacklist = '';
	if(black_or_white=="white"){
		whitelist = wblist;
	}else{
		blacklist = wblist;
	}
	//检测引擎
	var pengines = new Array();
	var cengines = new Array();
	$("#engine_div .glyphicon-check").each(
				function() {
						// 获取到了被选中的引擎,需要判断类型，然后拼成字段传过去
						var engine = $(this).next().text();
						var type = $(this).next().attr("type");
						if (type == 'p') {
							pengines.push(engine);
						} else { // 子类
							cengines.push('{"name" : "' + engine+ '"}');
						}
				});
	
	//参数合法性判断
	if((null==pengines || pengines.length<1) && (null==cengines || cengines.length<1)){
		alert("请选择检测引擎!");
		return false;
	}
	if(null==policy||""==policy.trim()){
		alert("请选择扫描策略!");
		$("#policy").focus();
		return false;
	}
	if(null==wblist||""==wblist.trim()){
		alert("请填写白名单/黑名单!");
		$("#wblist").focus();
		return false;
	}
	
	//保存配置
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_PASSIVE_SAVECONFIG;
	var params = {
			enable : enable,
			scanner_type : pengines.join(","),
			scanner : "[" + cengines.join(",") + "]",
			policy : policy,
			blacklist : blacklist,
			whitelist : whitelist
		};
	loadDataByAjax(url, params, saveSuccess);
}

function saveSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已保存!");
	}
}

