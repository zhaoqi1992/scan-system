$(function() {
	initData();
});

function initData(){
	addshow();
	$('input[name=operator]').on('change',function(){
		if(this.value=='add'){
			addshow();
		}else{
			updateshow();
			loadStrategy();
		}
		clearCheckbox();
	});
	
	$("#selectAll").on('click',function(){
		if($(this).prop("checked")){ //全选
			$("#i1").prop('checked',true);
			$("#i2").prop('checked',true);
		}else{
			$("#i1").removeAttr('checked');
			$("#i2").removeAttr('checked');
		}
		selectRule($("#i1"),"ir");
		selectRule($("#i2"),"rr");
	});
	
	//获取规则列表
	loadRule();
	
	//加载策略
	loadStrategy();
	
}

//更新提交
function update(){
	var ruleArray = new Array();
	$("input[name='ir']").each(function(){
		if($(this).prop('checked')){
			ruleArray.push($(this).val());
		}
	});
	$("input[name='rr']").each(function(){
		if($(this).prop('checked')){
			ruleArray.push($(this).val());
		}
	});
	var rules = ruleArray.join(",");
	var op = $('.btn-group .active').find('input').val();
	if(op == 'update' || op == 'del'){
		var strategy = $("#strategylist").val();
		var strategyid = strategy.split("_")[0];
		var url, params;
		if(op=='update'){
			if(null==ruleArray||ruleArray.length<1){
				alert("请选择规则!");
				return false;
			}
			url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.STRATEGY_UPDATE_URL;
			params = {
					policy_id : strategyid,
					rule_ids : rules
			};
			loadDataByAjax(url, params, updateStrategySuccess);
		}else{
			url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.STRATEGY_DEL_URL;
			params = {
					policy_id : strategyid
			};
			loadDataByAjax(url, params, delStrategySuccess);
		}
		
	}else{
		if(null==ruleArray||ruleArray.length<1){
			alert("请选择规则!");
			return false;
		}
		var strategyname = $("#strategyname").val();
		if(null==strategyname||""==strategyname){
			alert("请填写策略名称!");
			return false;
		}
		var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.STRATEGY_NEW_URL;
		var params = {
			policy_name : strategyname,
			rule_ids : rules
		};
		loadDataByAjax(url, params, addStrategySuccess);
	}
}

function updateStrategySuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已更新!");
	}
}

function delStrategySuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		loadStrategy();
		clearCheckbox();
		alert("已删除!");
	}
}

function addStrategySuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已更新策略!");
		clearCheckbox();
		$("#strategyname").val("");
	}
}

function loadRule(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.RULE_LIST_URL;
	var params = {
	};
	loadDataByAjax(url, params, loadRuleSuccess);
}

function loadRuleSuccess(datas){
	var tr1 = '<tr data-tt-id="1" class="branch collapsed ui-droppable"> '
		 + '<td ><input type="checkbox" id="i1" onclick="selectRule(this,\'ir\');" class="treetable-checkbox">&nbsp;<span class="folder ui-draggable">injection</span></td>'
		 + '<td></td>'
		 + '</tr>';
		 
	var tr2 = '<tr data-tt-id="2" class="branch collapsed ui-droppable"> '
		 + '<td ><input type="checkbox" id="i2" onclick="selectRule(this,\'rr\');" class="treetable-checkbox">&nbsp;<span class="folder ui-draggable">response</span></td>'
		 + '<td></td>'
		 + '</tr>';
	var tr1i=1,tr2i=1;
	for(var i=0; i<datas.length; i++){
		var data = datas[i];
		if(data.rule_type=='injection'){
			tr1 += '<tr data-tt-id="1-'+tr1i+'" data-tt-parent-id="1" class="leaf" style="display: none;">'
				+ '<td ><input type="checkbox" value="'+data.rule_id+'" class="treetable-checkbox" name="ir">&nbsp;<span class="file ui-draggable">'+data.rule_name+'</span></td>'
				+ '<td>'+data.rule_desc+'</td>'
				+ '</tr>';
			tr1i++;
				
		}else{
			tr2 += '<tr data-tt-id="2-'+tr2i+'" data-tt-parent-id="2" class="leaf" style="display: none;">'
				+ '<td ><input type="checkbox" value="'+data.rule_id+'" class="treetable-checkbox" name="rr">&nbsp;<span class="file ui-draggable">'+data.rule_name+'</span></td>'
				+ '<td>'+data.rule_desc+'</td>'
				+ '</tr>';
			tr2i++;
		}
	}
	$("#tree-table-tbody").html(tr1+"<br>" + tr2);
	
	//加载表格
	$("#tree-table").treetable({ expandable: true });
	// Highlight selected row
	$("#tree-table tbody").on("mousedown", "tr", function() {
	  $(".selected").not(this).removeClass("selected");
	  $(this).toggleClass("selected");
	});

	// Drag & Drop Example Code
//	$("#tree-table .file, #tree-table .folder").draggable({
//	  helper: "clone",
//	  opacity: .75,
//	  refreshPositions: true,
//	  revert: "invalid",
//	  revertDuration: 300,
//	  scroll: true
//	});
//
//	$("#tree-table .folder").each(function() {
//	  $(this).parents("#tree-table tr").droppable({
//	    accept: ".file, .folder",
//	    drop: function(e, ui) {
//	      var droppedEl = ui.draggable.parents("tr");
//	      $("#tree-table").treetable("move", droppedEl.data("ttId"), $(this).data("ttId"));
//	    },
//	    hoverClass: "accept",
//	    over: function(e, ui) {
//	      var droppedEl = ui.draggable.parents("tr");
//	      if(this != droppedEl[0] && !$(this).is(".expanded")) {
//	        $("#tree-table").treetable("expandNode", $(this).data("ttId"));
//	      }
//	    }
//	  });
//	});
	$("#expandAll").click();
}

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
		options += '<option value="'+data.policy_id + "_" + data.rule_ids+'">'+data.policy_name+'</option>';
	}
	$("#strategylist").html(options);
}

function selectRule(obj,type){
	if($(obj).prop("checked")){ //全选
		$('input[name="'+type+'"]').prop('checked','true');
	}else{
		$('input[name="'+type+'"]').removeAttr('checked');
	}
}

function addshow(){
	$("#strategyname").show();
	$("#strategylist").hide();	
}

function updateshow(){
	$("#strategyname").hide();
	$("#strategylist").show();	
}

function clearCheckbox(){
	$("input[name='ir']").removeAttr("checked");
	$("input[name='rr']").removeAttr("checked");
}

function changeStrategy(){
	clearCheckbox();
	var strategy = $("#strategylist").val();
	var rule_ids = strategy.split("_")[1];
	var ruleArray = rule_ids.split(",");
	
	//遍历checkbox
	$("input[name='ir']").each(function(){
		for(var i=0;i<ruleArray.length; i++){
			var id = ruleArray[i];
			if(id==$(this).val()){
				$(this).prop('checked','true');
			}
		}
	});
	
	$("input[name='rr']").each(function(){
		for(var i=0;i<ruleArray.length; i++){
			var id = ruleArray[i];
			if(id==$(this).val()){
				$(this).prop('checked','true');
			}
		}
	});
	
}
