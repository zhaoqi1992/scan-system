$(function() {
	initData();
});
function initData() {
	$("#advance_config_div").hide();
	// 加载扫描引擎
	var url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.P2_ASSET_ACTIVE_GET_ENGINES;
	var params = {};
	loadDataByAjax(url, params, loadScanEngineSuccess);

}

// 加载引擎成功
function loadScanEngineSuccess(data) {
	$("#engine_div").html("");
	$("#hidden_content").html("");
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
			nodes.push({
				selectable : false,
				text : content
			});
			$("#hidden_content").append(
					'<input type="hidden" id="engineset_' + engineid
							+ '_threadnum" value="">');
			$("#hidden_content").append(
					'<input type="hidden" id="engineset_' + engineid
							+ '_bandwidth" value="">');
		}
		var tree_name = "<span type='p'>" + name + "</span>";
		var tree = getTreeView(tree_name, nodes);
		$('#' + div_id).treeview({
			data : tree,
			showCheckbox : true
		});
	}
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

function setEngine(p, c, engineid) {
	$("#engineid").val(engineid);
	$("#engine_now_p").html(p);
	$("#engine_now_c").html(c);

	// 获取看是否之前已经有过值
	var threadnum_id = "engineset_" + engineid + "_threadnum";
	var bandwidth_id = "engineset_" + engineid + "_bandwidth";
	var threadnum = $("#" + threadnum_id).val();
	var bandwidth = $("#" + bandwidth_id).val();
	$("#threadnum").val(threadnum);
	$("#bandwidth").val(bandwidth);
}

// 设置子引擎参数
function updateEngine() {
	var threadnum = $("#threadnum").val();
	var bandwidth = $("#bandwidth").val();
	var engineid = $("#engineid").val();
	// 将配置数据存起来，同时还要知道是哪个子引擎的
	var threadnum_id = "engineset_" + engineid + "_threadnum";
	var bandwidth_id = "engineset_" + engineid + "_bandwidth";
	$("#" + threadnum_id).val(threadnum);
	$("#" + bandwidth_id).val(bandwidth);
	$("#update-sdk-cancle").click();
}

// 点击提交Form
function newactive() {
	var name=$("#name").val();
	var target=$("#target").val();
	var file=$("#file").val();
	var port_s = $("#port_s").val();
	var port_e = $("#port_e").val();
	var timespan_s = $("#timespan_s").val();
	var timespan_e = $("#timespan_e").val();
	
	// 判断参数合法性
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
	
	if(null==port_s||""==port_s.trim()){
		alert("请填写扫描端口!");
		$("#port_s").focus();
		return false;
	}
	if(null==port_e||""==port_e.trim()){
		alert("请填写扫描端口!");
		$("#port_e").focus();
		return false;
	}
	if(port_s<1||port_s>65536){
		alert("端口在1~65536之间!");
		$("#port_s").focus();
		return false;
	}
	if(port_e<1||port_e>65536){
		alert("端口在1~65536之间!");
		$("#port_e").focus();
		return false;
	}
	if(port_s>port_e){
		alert("起始端口要小于结束端口!");
		$("#port_s").focus();
		return false;
	}
	
	var pengines = new Array();
	var cengines = new Array();
	$("#engine_div .glyphicon-check").each(function() {
		// 获取到了被选中的引擎,需要判断类型，然后拼成字段传过去
		var engine = $(this).next().text();
		var type = $(this).next().attr("type");
		if (type == 'p') {
			pengines.push(engine);
		} else { // 子类
			var engineid = $(this).next().attr("id");
			var threadnum_id = "engineset_" + engineid + "_threadnum";
			var bandwidth_id = "engineset_" + engineid + "_bandwidth";
			var threadnum = $("#" + threadnum_id).val();
			var bandwidth = $("#" + bandwidth_id).val();
			cengines.push('{"name" : "'+engine+'","brandwidth" : "'+bandwidth+'","thread_num" : "'+threadnum+'"}');
		}
	});
	if((null==pengines || pengines.length<1) && (null==cengines || cengines.length<1)){
		alert("请选择扫描引擎!");
		return false;
	}
	$("#scanner_type").val(pengines.join(","));
	$("#scanner").val("[" + cengines.join(",") + "]");
	
	if((null!=timespan_s&&""!=timespan_s.trim()) && (null==timespan_e||""==timespan_e.trim())){ //加判断
		alert("请填写扫描时间范围结束时间!");
		$("#timespan_e").focus();
		return false;
	}
	if((null!=timespan_e&&""!=timespan_e.trim()) && (null==timespan_s||""==timespan_s.trim())){ //加判断
		alert("请填写扫描时间范围开始时间!");
		$("#timespan_s").focus();
		return false;
	}
	if((null!=timespan_s&&""!=timespan_s.trim()) &&(null!=timespan_e&&""!=timespan_e.trim())){
		if(timespan_s>23||timespan_s<0){
			alert("扫描时间范围开始时间为[0-23]区间内数字!");
			$("#timespan_s").focus();
			return false;
		}
		if(timespan_e>23||timespan_e<0){
			alert("扫描时间范围结束时间为[0-23]区间内数字!");
			$("#timespan_e").focus();
			return false;
		}
		if(timespan_s>timespan_e){
			alert("扫描时间范围开始时间要小于结束时间!");
			$("#timespan_s").focus();
			return false;
		}
	}
	
	// 端口
	var port = port_s + "-" + port_e;
	$("#port").val(port);

	// 扫描时间
	var scan_time = timespan_s + "-" + timespan_e;
	$("#scan_time").val(scan_time);

	
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_ASSET_ACTIVE_ADDTASK;
	$("#urlform").attr("action",url);
	$("#urlform").submit();
}
