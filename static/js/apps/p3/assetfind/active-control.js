$(function() {
	initData();
});

function initData() {
	//加载扫描模板
	loadTempate();
	fileOrText();
	taskTypeChange();
}

//加载扫描策略
function loadTempate() {
	var url = Common.Constants.DATA_INTERFACE_URL + Common.Constants.TEMPLATE_LIST;
	var params = {};
	loadDataByAjax(url, params, loadTempateSuccess);
}

function loadTempateSuccess(data) {
	//alert(data.length);
	var options = '<option selected="selected" value="">请选择一个模板</option>';
	for (var i = 0; i < data['aaData'].length; i++) {
		var row = data['aaData'][i];
		options += '<option value="' + row.template_id + '">' + row.name + '</option>';
	}
	$("#template_choose1").html(options);
	$("#template_choose2").html(options);
	$("#template_choose3").html(options);
}

// 点击提交Form
function porttasksubmit() {
	var url = Common.Constants.DATA_INTERFACE_URL + Common.Constants.ASSET_TASK_PORTTASKADD;
	$("#porttaskform").attr("action", url);
	$("#porttaskform").submit();
}

function doamintasksubmit() {
	var url = Common.Constants.DATA_INTERFACE_URL + Common.Constants.ASSET_TASK_DOMAINTASKADD;
	$("#domaintaskform").attr("action", url);
	$("#domaintaskform").submit();
}

function urltasksubmit() {
	var url = Common.Constants.DATA_INTERFACE_URL + Common.Constants.ASSET_TASK_URLTASKADD;
	$("#urltaskform").attr("action", url);
	$("#urltaskform").submit();
}

//输入目标和上传文件部分的切换
function fileOrText() {
	var $textarea = $('<textarea rows="6" cols="5" class="form-control" placeholder="扫描目标,请每行输入一个IP,或者一个网段" name="target" id="textarea"></textarea>');
	var $inputfile = $('<input type="file" name="postFile">');
	$('.targetRadiosFile').click(function() {
		$('div.detectTarget :nth-child(3)').replaceWith($inputfile);
	});
	$('.targetRadiosText').click(function() {
		$('div.detectTarget :nth-child(3)').replaceWith($textarea);
	});
}

//任务类型部分的切换
function taskTypeChange() {
	$('.optionsRadios2').click(function() {
		$('.form_datetime').show('normal');
		$(".form_datetime").datetimepicker({
			format: Common.Constants.TIME_FORMAT,
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			showMeridian: 1
		});
		$('.hours').hide('normal');
	})
	$('.optionsRadios1').click(function() {
		$('.form_datetime').hide('normal');
		$('.hours').hide('normal');
	})
	$('.optionsRadios3').click(function() {
		$('.hours').show('normal');
		$('.form_datetime').hide('fast');
	})
}