$(function() {
	queryData();
	modalControlPlus();
});

function queryData(){
	var url = Common.Constants.DATA_INTERFACE_URL
	+ Common.Constants.MODULE_LIST;
	var columns = [
        { "title": "ID", "mData": "module_id" , "bVisible": false},
        { "title": "名称", "mData": "name" },
        { "title": "类型", "mData": "type" },
        { "title": "状态", "mData": "status", "mRender" : formatStatus },
        { "title": "版本号", "mData": "version" },
        { "title": "创建时间", "mData": "create_time" },
        { "title": "修改时间", "mData": "modify_time" },
        { "title": "操作","mData" : "task_id", "mRender" : formatOp}
    ];
	var params = [];
	commonDataTables("table", url, columns, params, true, false);
}

function formatStatus(data, type, full){
	if(data=="正常"){
		return "<div>&nbsp;&nbsp;<i class=\"fa fa-check-circle\" aria-hidden=\"true\" style=\"color:#18A689\"></i></div>";
	}else{
		return status;
	}
}

function formatOp(data, type, full){
	var module_id = full['module_id'];
	var re = "<div class=''>"
			+"<a href='javascript:;' class='btn-small btn-white' onclick='delModule(\""+module_id+"\")'><i class='fa fa-trash-o' style=\"color:#18A689\"></i>删除模块</a> &nbsp;"
			+"<a href='javascript:;' class='btn-small btn-white' onclick=''><i class='fa fa-cloud-upload' style=\"color:#18A689\"></i>上传安装包</a>"
            +"</div></div>";
	return re;
}

function delModule(module_id){
	var url = Common.Constants.DATA_INTERFACE_URL
		+ Common.Constants.MODULE_DELETE;
	var params = {
			module_id : module_id
	};
	loadDataByAjax(url, params, delTaskSuccess);
}

function delTaskSuccess(data){
	var status = data.status;
	if (status != 'success') {
		alert(status);
	}else {
		alert("已删除任务!");
		queryData();
	}
}

function modalControlPlus() {
    //toggle modal plus
    $("#plusNewModal").click(function() {
        event.stopPropagation();
        $("#plusModal").modal("toggle");
        //确认添加
    });
    $('button#moduleAdd').click(function(event) {
        event.stopPropagation();
        var type = $('div.modal-body input:checked').val();
        var name = $('input#module_name').val();
        var version = $('input#module_version').val();

        function sfuction() {
            alert('添加成功');
            $('button#closePlus').trigger('click');
            queryData();

        }
        var params = {
        	"name":name,
        	"type":type,
        	"version":version
        };
        var url = Common.Constants.DATA_INTERFACE_URL+ Common.Constants.MODULE_ADD;
        loadDataByAjax(url, params, sfuction);
    });
}
