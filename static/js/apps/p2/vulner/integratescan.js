var policysss;
var enginesss;
$(function() {
	$('#switch_div').on('switch-change', function(e, data) {
		var value = data.value;
		if(value==true){
			$(this).attr("value","1");
		}else{
			$(this).attr("value","0");
		}
	});
	loadScanEngine();
});

//加载扫描引擎
function loadScanEngine(){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_ACTIVE_ENGINES;
	var params = {};
	loadDataByAjax(url, params, loadScanEngineSuccess);
}

function loadScanEngineSuccess(data){
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
	enginesss=data;
	loadPolicys();
}

function loadPolicys(){
	var policy_url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.STRATEGY_LIST_URL;
	var params = {
	};
	loadDataByAjax(policy_url, params, loadPolicysSuccess);
}

function loadPolicysSuccess(datas){
	$("#policy").html(getSelectedOptions(datas));
	policysss = datas;
	loadList();
}

//获取列表
function loadList(){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_INTEGRATESCAN_LIST;
	var params = {};
	loadDataByAjax(url, params, loadListSuccess);
}

function loadListSuccess(response){
	$("#interface_set_div").html("");
	for(var i=0; i<response.length; i++){
		var data=response[i];
		var id = data.id;
		var name = data.name;
		var scanner_type = data.scanner_type;
		var scanner = data.scanner;
		var address = data.api_address;
		var policy = data.policy;
		var enable = data.enable;
		
		var name_label = '接口名称';
		var name_id = 'name_'+i;
		var name_formright = '<input type="text" class="form-control" id="'+name_id+'" placeholder="接口名称">';
		
		var engine_label = '扫描引擎';
		var engine_id = "engine_div_"+i;
		var engine_formright = '<div class="row" id="'+engine_id+'"></div>';
		
		var addr_label = '接口地址';
		var addr_id = 'addr_' + i;
		var addr_formright = '<div class="input-group">' 
								+'<div class="input-group-addon">/auth/scanapi/</div>'
								+'<input type="text" class="form-control" id="'+addr_id+'" value="" >'
							 +'</div>';
		
		var policy_label = '扫描策略';
		var policy_id = 'policy_'+i;
		var policy_formright = '<select class="form-control" id="'+policy_id+'">'+getSelectedOptions(policysss)+'</select>';
		
		var enable_label = '是否启用';
		var enable_id = 'enable_'+i;
		var enable_formright = '<input type="checkbox" checked id="'+enable_id+'"/>';
		
		var op_label = "";
		var op_formright = '<button class="btn btn-default" style="width: 100px;" onclick="update(\''+id+'\',\''+i+'\')">保存</button>'
						 + '<button class="btn btn-default" style="width: 100px;" onclick="del(\''+id+'\')">删除</button>';
		
		//动态生成一个pannel
		var rowHtml = '<div class="row">'
						+'<div class="panel panel-default">'
							+'<div class="panel-heading">接口配置</div>'
							+'<div class="panel-body">'
								+'<div class="container-fluid">'
									+'<div class="form-horizontal">'
										
										//添加form
										+ getFormHtml(name_label, name_formright)
										+ getFormHtml(engine_label, engine_formright)
										+ getFormHtml(addr_label, addr_formright)
										+ getFormHtml(policy_label, policy_formright)
										+ getFormHtml(enable_label, enable_formright)
										+ getFormHtml(op_label, op_formright)
										
									+'</div>'
								+'</div>'
							+'</div>'
						+'</div>'
					+'</div>';
		
		$("#interface_set_div").append(rowHtml);
		
		//扫描引擎
		var scanner_type_array = scanner_type.split(",");
		for ( var k = 0; k < enginesss.length; k++) {
			var d = enginesss[k];
			var engine_name = d.name;
			var engines = d.engines.split(",");
			var nodes = new Array();
			var div_id = "enginetree_" + i + "_" + k;
			$("#" + engine_id).append("<div class='col-sm-6' id='" + div_id + "'></div>");

			for ( var j = 0; j < engines.length; j++) {
				var engine = engines[j];
				var content = "<span type='c'>"+ engine + "</span>";

				// 这里得判断子引擎是否被选中
				var cchecked = false;
				for ( var m = 0; m < scanner.length; m++) {
					var s = scanner[m];
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
			var tree_name = "<span type='p'>" + engine_name + "</span>";

			var pchecked = false;
			if ($.inArray(engine_name, scanner_type_array) >= 0) {// 说明默认被选中了
				pchecked = true;
			}
			var tree = getTreeView(tree_name, nodes, pchecked, true);
			$('#' + div_id).treeview({
				data : tree,
				showCheckbox : true
			});
		}
		
		
		//是否开启
		var switch_div_id = 'switch_div_'+i;
		$('#'+enable_id).wrap('<div class="switch" data-on="info" id="'+switch_div_id+'" data-off="success" value=""/>').parent().bootstrapSwitch();
		
		$('#'+switch_div_id).on('switch-change', function(e, data) {
			var value = data.value;
			if(value==true){
				$(this).attr("value","1");
			}else{
				$(this).attr("value","0");
			}
		});
		
		//设置默认值
		if (enable == 1) {
			$('#'+switch_div_id).bootstrapSwitch('setState', true);
		} else {
			$('#'+switch_div_id).bootstrapSwitch('setState', false);
		}
		$("#"+switch_div_id).attr("value",enable);
		$("#"+name_id).val(name);
		$("#"+addr_id).val(address);
		$("#"+policy_id).val(policy);
		
	}
}

function getFormHtml(lable, formright){
	var divHtml = '<div class="form-group">'
					+ '<label class="col-sm-2 control-label">'+lable+'</label>'
					+ '<div class="col-sm-9 form-right">' + formright + "</div>"
				+ '</div>';
	return divHtml;
	
}

function getSelectedOptions(datas){
	var options = '<option selected="selected" value="">请选择策略</option>';
	for(var i=0; i<datas.length; i++){
		var data = datas[i];
		options += '<option value="'+data.policy_id+'">'+data.policy_name+'</option>';
	}
	return options;
}

function update(id, i){
	var name_id = 'name_'+i;
	var engine_id = "engine_div_"+i;
	var addr_id = 'addr_' + i;
	var policy_id = 'policy_'+i;
	var switch_div_id = 'switch_div_'+i;//获取enable
	
	var name = $("#"+name_id).val();
	var addr = $("#"+addr_id).val();
	var policy = $("#"+policy_id).val();
	var enable = $("#"+switch_div_id).attr("value");
	var pengines = new Array();
	var cengines = new Array();
	$("#"+engine_id+" .glyphicon-check").each(
		function() {
			// 获取到了被选中的引擎,需要判断类型，然后拼成字段传过去
			var engine = $(this).next().text();
			var type = $(this).next().attr("type");
			if (type == 'p') {
				pengines.push(engine);
			} else { // 子类
				cengines.push('{"name" : "' + engine+ '"}');
			}			
		}
	);		
	var scanner_type = pengines.join(",");
	var scanner = "[" + cengines.join(",") + "]";
	
	//参数合法性判断
	if(null==name||""==name.trim()){
		alert("请填写接口名称!");
		$("#"+name_id).focus();
		return false;
	}
	if((null==pengines || pengines.length<1) && (null==cengines || cengines.length<1)){
		alert("请选择扫描引擎!");
		return false;
	}
	if(null==addr||""==addr.trim()){
		alert("请填写接口地址!");
		$("#"+addr_id).focus();
		return false;
	}
	if(null==policy||""==policy.trim()){
		alert("请选择扫描策略!");
		$("#"+policy_id).focus();
		return false;
	}
	
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_INTEGRATESCAN_UPDATE;
	var params = {
		id : id,
		name : name,
		scanner_type : scanner_type,
		scanner : scanner,
		address : addr,
		policy : policy,
		enable : enable
	};
	loadDataByAjax(url, params, updateSuccess);
}

function updateSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已保存!");
	}
}

function del(id){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.P2_VULNER_INTEGRATESCAN_DEL;
	var params = {
			id : id
	};
	loadDataByAjax(url, params, delSuccess);
}

function delSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已删除!");
		loadList();
	}
}

function toSave(){
	$("#name").val("");
	$("#addr").val("");
	$("#policy").val("");
	$("#switch_div").val("1");
	for(var i=0; i<enginesss.length; i++){
		var id = "enginetree"+i;
		$('#'+id).treeview('uncheckAll', { silent: true });
	}
	
}

function save(){
	var name = $("#name").val();
	var addr = $("#addr").val();
	var policy = $("#policy").val();
	var enable = $("#switch_div").attr("value");
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
		}
	);		
	var scanner_type = pengines.join(",");
	var scanner = "[" + cengines.join(",") + "]";
	
	//参数合法性判断
	if(null==name||""==name.trim()){
		alert("请填写接口名称!");
		$("#name").focus();
		return false;
	}
	if((null==pengines || pengines.length<1) && (null==cengines || cengines.length<1)){
		alert("请选择扫描引擎!");
		return false;
	}
	if(null==addr||""==addr.trim()){
		alert("请填写接口地址!");
		$("#addr").focus();
		return false;
	}
	if(null==policy||""==policy.trim()){
		alert("请选择扫描策略!");
		$("#policy").focus();
		return false;
	}
	
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.P2_VULNER_INTEGRATESCAN_ADD;
	var params = {
		name : name,
		scanner_type : scanner_type,
		scanner : scanner,
		address : addr,
		policy : policy,
		enable : enable
	};
	loadDataByAjax(url, params, saveSuccess);
}

function saveSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已提交!");
		$("#update-sdk-cancle").click();
	}
}
