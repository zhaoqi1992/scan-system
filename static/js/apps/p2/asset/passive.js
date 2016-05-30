var scanner_type;
var scanner;

$(function() {
	initData();
});
function initData() {
	loadDefaultConfig();
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
}

// 加载默认的配置
function loadDefaultConfig() {
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.P2_ASSET_PASSIVE_GET_CONFIG;
	var params = {};
	loadDataByAjax(url, params, loadDefaultConfigSuccess);
}

// 加载默认配置成功
function loadDefaultConfigSuccess(data) {
	var config = data;
	var enable = config.enable;
	var whitelist = config.whitelist;
	var blacklist = config.blacklist;
	var email = config.email;
	scanner_type = config.scanner_type;
	scanner = config.scanner;
	
	if (enable == 1) {
		$('#switch-div').bootstrapSwitch('setState', true);
	} else {
		$('#switch-div').bootstrapSwitch('setState', false);
	}
	$("#enable").val(enable);

	$("#email").val(email);

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

function loadScanEngine() {
	// 加载扫描引擎
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.P2_ASSET_PASSIVE_GET_ENGINES;
	var params = {};
	loadDataByAjax(url, params, loadScanEngineSuccess);
}

// 加载引擎成功
function loadScanEngineSuccess(data) {
	$("#engine_div").html("");
	$("#hidden_content").html("");
	var scanner_type_array = scanner_type.split(",");
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
			var content = "<span id='"
					+ engineid
					+ "' type='c'>"
					+ engine
					+ "</span><a href='javascript:void(0);' onclick='setEngine(\""
					+ name
					+ "\",\""
					+ engine
					+ "\",\""
					+ engineid
					+ "\");' data-toggle='modal' data-target='#setEngine'>[配置]</a>";

			// 这里得判断子引擎是否被选中
			var cchecked = false;
			var default_nmapparam = "";
			var default_nmapscript = "";
			for ( var k = 0; k < scanner.length; k++) {
				var s = scanner[k];
				if (s.name == engine) {// 匹配成功
					cchecked = true;
					default_nmapparam = s.nmap_param;
					defult_nmapscript = s.namp_script;
				}
			}

			nodes.push({
				selectable : false,
				text : content,
				state : {
					checked : cchecked
				}
			});
			$("#hidden_content").append(
					'<input type="hidden" id="engineset_' + engineid
							+ '_nmapparam" value="' + default_nmapparam + '">');
			$("#hidden_content").append(
					'<input type="hidden" id="engineset_' + engineid
							+ '_nmapscript" value="' + default_nmapscript
							+ '">');
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

// 点击配置引擎
function setEngine(p, c, engineid) {
	$("#engineid").val(engineid);
	$("#engine_now_p").html(p);
	$("#engine_now_c").html(c);

	// 获取看是否之前已经有过值
	var nmapparam_id = "engineset_" + engineid + "_nmapparam";
	var nmapscript_id = "engineset_" + engineid + "_nmapscript";
	var nmapparam = $("#" + nmapparam_id).val();
	var nmapscript = $("#" + nmapscript_id).val();
	$("#nmapparam").val(nmapparam);
	$("#nmapscript").val(nmapscript);
}

// 设置子引擎参数
function updateEngine() {
	var nmapparam = $("#nmapparam").val();
	var nmapscript = $("#nmapscript").val();
	var engineid = $("#engineid").val();
	// 将配置数据存起来，同时还要知道是哪个子引擎的
	var nmapparam_id = "engineset_" + engineid + "_nmapparam";
	var nmapscript_id = "engineset_" + engineid + "_nmapscript";
	$("#" + nmapparam_id).val(nmapparam);
	$("#" + nmapscript_id).val(nmapscript);
	$("#update-sdk-cancle").click();
}

function save() {
	var enable = $("#enable").val();
	var email = $("#email").val();
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
	$("#engine_div .glyphicon-check")
			.each(
					function() {
						// 获取到了被选中的引擎,需要判断类型，然后拼成字段传过去
						var engine = $(this).next().text();
						var type = $(this).next().attr("type");
						if (type == 'p') {
							pengines.push(engine);
						} else { // 子类
							var engineid = $(this).next().attr("id");
							var nmapparam_id = "engineset_" + engineid
									+ "_nmapparam";
							var nmapscript_id = "engineset_" + engineid
									+ "_nmapscript";
							var nmapparam = $("#" + nmapparam_id).val();
							var nmapscript = $("#" + nmapscript_id).val();
							cengines
									.push('{"name" : "' + engine
											+ '","nmap_param" : "' + nmapparam
											+ '","nmap_script" : "'
											+ nmapscript + '"}');
						}
					});
	
	//判断参数合法性
	if((null==pengines || pengines.length<1) && (null==cengines || cengines.length<1)){
		alert("请选择检测引擎!");
		return false;
	}
	
	//保存配置
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_ASSET_PASSIVE_SAVE_CONFIG;
	var params = {
			enable : enable,
			scanner_type : pengines.join(","),
			scanner : "[" + cengines.join(",") + "]",
			email : email,
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
