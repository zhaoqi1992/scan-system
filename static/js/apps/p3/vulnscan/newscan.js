$(function() {
	initData();
});
function initData() {
    //加载扫描模板
	loadTempate();
}

//加载扫描策略
function loadTempate(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.TEMPLATE_LIST;
	var params = {
	};
	loadDataByAjax(url, params, loadTempateSuccess);
}

function loadTempateSuccess(data) {
    //alert(data.length);
    var options = '<option selected="selected" value="">请选择一个模板</option>';
    for ( var i = 0; i < data['aaData'].length; i++) {
        var row = data['aaData'][i];
        options += '<option value="'+row.template_id+'">'+row.name+'</option>';
    }
    $("#template_choose1").html(options);
}

// 点击提交Form
function scantasksubmit() {
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.SCAN_TASK_ADD;
	$("#scantaskform").attr("action",url);
	$("#scantaskform").submit();
}