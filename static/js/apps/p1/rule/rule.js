var editor;
var original_code = "";
$(function() {
	initData();
	var te_html = document.getElementById("codetest");
	editor = CodeMirror.fromTextArea(te_html, {
			mode : 'javascript',
		    lineNumbers: true,
		    styleActiveLine: true,
		    matchBrackets: true
		  });
	editor.setSize("100%","600");
});

function initData(){
	addshow();
	$('input[name=operator]').on('change',function(){
		editor.getDoc().setValue("");
		if(this.value=='add'){
			addshow();
		}else{
			updateshow();
		}
	});
	
	loadRule();
}

function changeRule(){
	var ruleid = $("#rulelist").val();
	if(null!=ruleid && ""!=ruleid){
		loadRuleById(ruleid);
	}else{
		editor.getDoc().setValue("");
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
	var options = "<option value='' selected='selected'>请选择规则</option>";
	for(var i=0; i<datas.length; i++){
		var data = datas[i];
		options+="<option value='"+data.rule_id+"'>"+data.rule_name+"</option>";
	}
	$("#rulelist").html(options);
}

function loadRuleById(id){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.RULE_GET_BYID_URL;
	var params = {
			rule_id : id
	};
	loadDataByAjax(url, params, loadRuleByIdSuccess);
}

function loadRuleByIdSuccess(datas){
	var content = $.base64.decode(datas.content);;
	editor.getDoc().setValue(content);
}

function addshow(){
	$("#typelist").show();
	$("#desc").show();
	$("#rulename").show();
	$("#rulelist").hide();	
}

function updateshow(){
	$("#typelist").hide();
	$("#desc").hide();
	$("#rulename").hide();
	$("#rulelist").show();
}

function update(){
	var op = $('.btn-group .active').find('input').val();
	if(op == 'update' || op == 'del'){
		var ruleid = $("#rulelist").val();
		if(null==ruleid || ""==ruleid){
			alert("请选择规则!");
			return false;
		}
		var url,params;
		if(op == 'update'){
			var content = $.base64.encode(editor.getValue());
			url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.RULE_UPDATE_URL;
			params = {
					rule_id : ruleid,
					content : content
			};
			loadDataByAjax(url, params, updateRuleSuccess);
		}else{
			url = Common.Constants.DATA_INTERFACE_URL
			+ Common.Constants.RULE_DEL_BYID_URL;
			params = {
					rule_id : ruleid
			};
			
			loadDataByAjax(url, params, delRuleSuccess);
		}
		
		
	}else{
		var rulename = $("#rulename").val();
		if(null==rulename || ""==rulename){
			alert("请填写规则名称!");
			return false;
		}
		var type = $("#typelist").val();
		if(null==type || ""==type){
			alert("请选择类型!");
			return false;
		}
		var desc = $("#desc").val();
		var content = $.base64.encode(editor.getValue());
		var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.RULE_NEW_URL;
		var params = {
			name : 	rulename,
			type : type,
			content : content,
			desc : desc
		};
		loadDataByAjax(url, params, updateRuleSuccess);
	}
}

function updateRuleSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已更新规则!");
	}
}

function delRuleSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	} else {
		alert("已删除!");
		loadRule();
	}
}

function redo(){
	editor.redo();
}

function undo(){
	editor.undo();
}

function reset(){
	editor.setValue(original_code);
}