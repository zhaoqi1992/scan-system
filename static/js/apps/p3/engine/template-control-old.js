function queryData() {
    var url = "http://10.12.2.68/auth/engine/template!list";
    var columns = [{
        class: 'details-control',
        orderable: false,
        data: null,
        defaultContent: '<i class="fa fa-angle-down">'
    }, {
        "title": "模板ID",
        "mData": "template_id"
    }, {
        "title": "模板名称",
        "mData": "name"
    }, {
        "title": "创建时间",
        "mData": "create_time"
    }, {
        "title": "scan_base_engines",
        "mData": "scan_base_engines",
        "bVisible": false
    }, {
        "title": "操作",
        orderable: false,
        data: null,
        defaultContent: '<a class="delete">删除</a>' + '|' + '<a class="installModule">配置扫描引擎</a>'
    }];
    var params = [];
    createTables(url, columns, params);
};


//设置安装模块弹出框要显示的表格,no use here
function queryModalData() {
    var url = "http://10.12.2.68/auth/engine/engine!list";
    var columns = [{
        class: 'details-control',
        data: null,
        defaultContent: '<input type = "checkbox">'
    }, {
        "title": "engine",
        "mData": "name"
    }, {
        "title": "modules",
        "mData": "modules"
    }, ];
    var params = [];
    createModuleTables(url, columns, params);
};


//在模态弹窗添加表格
function createModuleTables(url, columns, params) {
    $("#modalTablesDiv")
        .html(
            "<table id='tableOnModal' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    tableOnModal = commonDataTables("tableOnModal", url, columns, params, true, false);
}



//在需要的位置上添加表格
function createTables(url, columns, params) {
    $("#dataTablesDiv")
        .html(
            "<table id='table' class='common-table table table-striped table-bordered table-hover' width='100%' border='0' cellspacing='0'></table>");
    table = commonDataTables("table", url, columns, params, true, false);
    $('#table').on('init.dt', templateControl);

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
        //获取返回列表中隐藏的部分的内容
        var tr = $(this).closest('tr');
        var row = table.row(tr); //dataTables插件中的方法，获取一行
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

function templateControlDelete() {
    //toggle modal delete
    $(".delete").click(function() {
        event.stopPropagation();
        $("#deleteModal").modal("toggle");
        var nodes = $(this).parent().prevAll();
        var template_id = nodes[nodes.length - 2].innerText;
        console.log(template_id);
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
            var url = "http://10.12.2.68/auth/engine/template!delete?template_id=";
            var params = [{
                "name": "template_id",
                "value": template_id
            }];
            loadDataByAjax(url, params, sfuction);
        });
    });
}

function templateControlPlus() {
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
        var template_name = $('input#template_name').val();
        // var version = $('input#module_version').val();

        function sfuction() {
            alert('模板添加成功');
            setTimeout("$('button#closePlus').trigger('click');", 1000);
            queryData();

        }
        var url = "http://10.12.2.68/auth/engine/template!add";
        var params = [{
            "name": "template_name",
            "value": template_name
        }];
        loadDataByAjax(url, params, sfuction);
    });
}


var flag = 1;
function templateControlConfiguration() {
    var template_id = '';
    $('.installModule').click(function() {
        //template_name
        var nodes = $(this).parent().prevAll();
        template_id = nodes[nodes.length - 2].innerText;

        //toggle modal #installModal
        var url = "http://10.12.2.68/auth/engine/engine!list";
        var params = [];

        function sfunction1(data) {
            var aaData = data.aaData;
            for (var i = 0; i < aaData.length; i++) {
                var li_id = aaData[i].name;
                var li_engineName = "<tr data-tt-id=" + li_id + "><td class='engineName'><i class='fa fa-angle-down' style='padding-right:5px'></i><input type='checkbox' class='chooseEngine'> " + aaData[i].name + "</td></tr>";
                $('#treeTable').append($(li_engineName));
                var modules = aaData[i].modules;
                for (var prop in modules) {
                    if (modules.hasOwnProperty(prop)) {
                        var moduleName = "<tr data-tt-id=\"" + prop + "\"data-tt-parent-id=\"" + li_id + "\" ><td class='moduleName " + li_id + "\'><input type='checkbox' class='chooseModule'> " + prop + "</td></tr>";
                        $('#treeTable').append($(moduleName));
                    }
                }
            }
            $('#treeTable').treetable({
                expandable: true,
                theme: 'vsStyle'
            });
            flag = 0;
        }
        if (flag) {
            loadDataByAjax(url, params, sfunction1);
        }
        $('#installModal').modal('toggle');
    });
    //find checked engines and thier modules
    $('#moduleInstall').click(function() {
        var template_scanners = [];
        var index = 0;
        var engines = $('#treeTable td.engineName input:checked');
        for (var i = 0; i < engines.length; i++) {
            var engineName = engines[i].closest('td').innerText.trim();
            var moduleOfEngine = '';
            var itsModules = $("." + engineName + " input:checked");
            for (var i = 0; i < itsModules.length; i++) {
                var moduleName = itsModules[i].closest('td').innerText.trim();
                moduleOfEngine += moduleName + ',';

            }
            template_scanners[index] = {};
            template_scanners[index][engineName] = moduleOfEngine.substring(0, moduleOfEngine.length - 1);
            index++;
        }

        var url = 'http://10.12.2.68/auth/engine/template!configtemplate';
        //construt template_scanner
        var template_scanner = '{';
        for (var i = 0; i < template_scanners.length; i++) {
            for (var prop in template_scanners[i]) {
                if (template_scanners[i].hasOwnProperty(prop)) {
                    template_scanner += '\"' + prop + '\" :' + '\"' + template_scanners[i][prop].trim() + '\"';
                }
            }
            template_scanner += '},';

        }
        template_scanner = template_scanner.substring(0, template_scanner.length - 1);

        console.log(template_scanner);


        var params = [{
            "name": "template_id",
            "value": template_id
        }, {
            "name": "template_scanner",
            "value": template_scanner
        }];

        function sfunction2() {
            setTimeout("$('button#closeInstall').trigger('click')",500);
            queryData();
            alert("配置成功")
        }
        loadDataByAjax(url, params, sfunction2);
    });
}

function templateControl() {
    templateControlDelete();
    templateControlConfiguration();
}


function formatShow(data) {
    if (null != data && data.length > 30) {
        data = data.substr(0, 30);
    }
    return data + "...";
}

function showDetails(d) {
    var scan_base_engines = d.scan_base_engines;
    var re = "<div class='container-fluid' style='margin-top:5px;'><dl class='dl-horizontal'><dt>引擎</dt><dd>模块</dd>";
    for (var prop in scan_base_engines) {
        if (scan_base_engines.hasOwnProperty(prop)) {
            re += '<dt class="text-left">' + prop + '</dt><dd>' + scan_base_engines[prop] + '</dd>';
        }
    }
    return re + "</dl>";
}



var hasInstall = [];
$(function() {
    queryData();
    templateControlPlus();
});