function queryData() {
    var url = "http://10.12.2.68/auth/engine/engine!list";
    var columns = [{
        class: 'details-control',
        orderable: false,
        data: null,
        defaultContent: '<i class="fa fa-angle-down">'
    }, {
        "title": "engine_id",
        "mData": "engine_id",
    }, {
        "title": "引擎名称",
        "mData": "name"
    }, {
        "title": "注册时间",
        "mData": "create_time"
    }, {
        "title": "心跳时间",
        "mData": "heartbeat_time"
    }, {
        "title": "状态",
        "mData": "status"
    }, {
        "title": "IP",
        "mData": "ip"
    }, {
        "title": "CPU",
        "mData": "cpu_rate"
    }, {
        "title": "内存",
        "mData": "mem_rate"
    }, {
        "title": "模块数量",
        "mData": "module_count"
    }, {
        "title": "modules",
        "mData": "modules",
        "bVisible": false
    }, {
        "title": "操作",
        orderable: false,
        data: null,
        defaultContent: '<a class="delete">删除</a>' + '|' + '<a class="installModule">模块管理</a>'
    }];
    var params = [];
    createTables(url, columns, params);
};


//设置安装模块弹出框要显示的表格
function queryModalData() {
    var url = "http://10.12.2.68/auth/engine/module!list";
    var columns = [{
        class: 'details-control',
        data: null,
        defaultContent: '<input type = "checkbox">'
    }, {
        "title": "ID",
        "mData": "module_id",
        class: "module_id"
    }, {
        "title": "名称",
        "mData": "name",
        "class": "module_name"
    }, {
        data: null,
        defaultContent: '<a>卸载</a>',
        class: "deleteAlreadyInstallModules"
    }];
    var params = [];
    createModuleTables(url, columns, params);
};


//在模态弹窗添加表格
function createModuleTables(url, columns, params) {
    $("#modalTablesDiv")
        .html(
            "<table id='tableOnModal' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    var tableOnModal = commonDataTables("tableOnModal", url, columns, params, true, false);
}



//在需要的位置上添加表格
function createTables(url, columns, params) {
    $("#dataTablesDiv")
        .html(
            "<table id='table' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    table = commonDataTables("table", url, columns, params, true, false);
    $('#table').on('init.dt', modalControl);

    //显示隐藏内容
    $('#table tbody').on('click', 'td.details-control', function() {
        event.stopPropagation();
        //替换箭头
        var icon = $(this).children('i');
        if (icon.hasClass('fa-angle-down')) {
            icon.removeClass('fa-angle-down');
            icon.addClass('fa-angle-up');
        } else if (icon.hasClass('fa-angle-up')) {
            icon.addClass('fa-angle-down');
            icon.removeClass('fa-angle-up');
        }
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(showDetails(row.data())).show();
            tr.addClass('shown');
        }
    });

}

function modalControlDelete() {
    //toggle modal delete
    $(".delete").click(function() {
        event.stopPropagation();
        $("#deleteModal").modal("toggle");
        var nodes = $(this).parent().prevAll();
        var engine_id = nodes[nodes.length - 2].innerText;
        var description = "<p class='h4'>确认删除？</p>";
        $('#deleteModal .modal-body p').replaceWith(description);

        //确认删除
        $('button#submit').click(function(event) {
            event.stopPropagation();

            function sfuction(data, textStatus) {
                if (textStatus == "success") {
                    $('#deleteModal .modal-body p').replaceWith($('<p class="h4">Already delete</p>'));
                    setTimeout("$('button#close').trigger('click');", 1000);
                    queryData();
                }

            }
            var url = "http://10.12.2.68/auth/engine/engine!delete?engine_id=" + engine_id;
            var params = [];
            loadDataByAjax(url, params, sfuction);
        });
    });
}

function modalControlPlus() {
    //toggle plusModal
    $("#plusNewModal").click(function() {
        event.stopPropagation();
        $("#plusModal").modal("toggle");
        var name = $('input#engine_name').val('');
    });
    //确认添加
    $('button#moduleAdd').click(function(event) {
        event.stopPropagation();
        // var type = $('div.modal-body input:checked').val();
        var engine_name = $('input#engine_name').val();
        // var version = $('input#module_version').val();

        function sfuction() {
            alert('引擎添加成功');
            setTimeout("$('button#closePlus').trigger('click');", 1000);
            queryData();

        }
        var url = "http://10.12.2.68/auth/engine/engine!add?engine_name=" + engine_name;
        var params = [];
        loadDataByAjax(url, params, sfuction);
    });
}



function modalControlInstall() {
    $('.installModule').click(function() {
        $('#table tbody').trigger('click');

        //此处构建hasInstall数组，记录引擎已安装的模块
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var data = row.data();
        var modules = data['modules'];
        for (var prop in modules) {
            if (modules.hasOwnProperty(prop)) {
                hasInstall.push(prop);
            }
        }

        queryModalData();
        $('#tableOnModal').on('init.dt', checkAlreadyModules);
        $('#tableOnModal').on('init.dt', deleteAlreadyInstallModules);
        var nodes = $(this).parent().prevAll();
        var engine_id = nodes[nodes.length - 2].innerText;

        function checkAlreadyModules() {
            //找到已有的模块并选中所在行的checkbox,并将该checkbox选中
            var allTheModules = $('#tableOnModal td.module_name');
            for (var i = 0; i < allTheModules.length; i++) {
                var module_name_now = $(allTheModules[i]).text();
                var flag = hasInstall.indexOf(module_name_now);
                if (flag > 0) {
                    $(allTheModules[i]).closest('tr').children('td.details-control').children('input').attr("checked", true);
                }
            }
            hasInstall = [];
        }

        //toggle modal #installModal
        $('#installModal').modal('toggle');


        //delete already installed modules
        function deleteAlreadyInstallModules() {
            $('#tableOnModal .deleteAlreadyInstallModules').click(function() {
                function sfunction() {
                    setTimeout("$('button#closeInstall').trigger('click')", 1200);
                    alert('delete success');
                    queryData();
                }
                var module_id = $(this).closest('tr').children('td.module_id').text();
                var url = 'http://10.12.2.68/auth/engine/engine!removemodule';
                var params = [{
                    "name": "engine_id",
                    "value": engine_id
                }, {
                    "name": "module_id",
                    "value": module_id
                }];
                loadDataByAjax(url, params, sfunction);
            })
        }

        $('button#moduleInstall').click(function() {
            function sfuction() {
                // $('#installModal .modal-body #table').replaceWith('<p>success</p>');
                $('#installModal .modal-body #table').replaceWith('<div id="modalTablesDiv"></div>');
                setTimeout("$('button#closeInstall').trigger('click')", 1200);
                alert('success');
                queryData();
            }
            var module_id = '';
            var choosedModules = $('#tableOnModal input:checked');
            for (var i = 0; i < choosedModules.length; i++) {
                module_id += $(choosedModules[i]).parent().next().text() + ',';
                console.log(module_id);
            }
            // var tr = this.closest('tr');
            // var row = $('#tableOnModal').row(tr);
            // var data = row.data();
            // var module_id = data.module_id;
            // var modules = data.modules;
            var url = 'http://10.12.2.68/auth/engine/engine!installmodule';
            var params = [{
                "name": "engine_id",
                "value": engine_id
            }, {
                "name": "module_id",
                "value": module_id
            }];
            loadDataByAjax(url, params, sfuction);
        });
    });
}

function modalControl() {
    modalControlDelete();
    modalControlInstall();
}


function formatShow(data) {
    if (null != data && data.length > 30) {
        data = data.substr(0, 30);
    }
    return data + "...";
}

function showDetails(d) {
    var modules = d.modules;
    var re = "<div class='container-fluid' style='margin-top:5px;'><dl class='dl-horizontal'>";
    for (var prop in modules) {
        if (modules.hasOwnProperty(prop)) {
            re += '<dt>' + prop + '</dt><dd>' + modules[prop] + '</dd>';
        }
    }
    return re + "</dl>";
}



var hasInstall = [];
$(function() {
    queryData();
    modalControlPlus();
});