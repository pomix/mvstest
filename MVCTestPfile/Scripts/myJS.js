$(document).ready(function () {
    var dData;
    var day;
    var num;
    var id="";
    $.ajax({
        type: "GET",
        url: 'Home/GetRaspisanie',
        dataType: "json",
        success: function (data) {
            addSybject(data);
        }
    });

    var divs = $('.block-day');
    var as = $('div.panel-heading a');
    console.log("asdf", as);
    var dateValue = new Date();
    var now = new Date();
    now.setDate(now.getDate() - now.getDay())
    for (var i = 1; i <= divs.length; i++) {

        if (i == 1) {
            $(as[i - 1]).text((now.getDate() + 1) + "." + (now.getMonth() + 1) + "." + now.getFullYear());
        }
        if (i == dateValue.getDay()) {
            $(divs[i - 1]).removeClass("panel-default");
            $(divs[i - 1]).addClass("panel-success");
        }
        $(as[i]).text((now.getDate() + 2) + "." + (now.getMonth() + 1) + "." + now.getFullYear());
        now.setUTCDate(now.getDate() + 1)
    }
    $('#back-day').click(function () {
        console.log(now.getDate())
        now.setUTCDate(now.getDate() - 14)

        for (var i = 1; i <= divs.length; i++) {
            if (i == 1) {
                $(as[i - 1]).text((now.getDate() + 1) + "." + (now.getMonth() + 1) + "." + now.getFullYear());
            }
            $(as[i]).text((now.getDate() + 2) + "." + (now.getMonth() + 1) + "." + now.getFullYear());
            now.setUTCDate(now.getDate() + 1)
        }
        $('[class="panel-collapse collapse in"]').removeClass("in");
    })
    $('#next-day').click(function () {
        for (var i = 1; i <= divs.length; i++) {
            if (i == 1) {
                $(as[i - 1]).text((now.getDate() + 1) + "." + (now.getMonth() + 1) + "." + now.getFullYear());
            }
            $(as[i]).text((now.getDate() + 2) + "." + (now.getMonth() + 1) + "." + now.getFullYear());
            now.setUTCDate(now.getDate() + 1)
        }
        $('[class="panel-collapse collapse in"]').removeClass("in");
    })

    $('.zagruzka-grup').on('click', function () {
        $.post('Home/PostGrup', { str: $('[name="Группа1"]').val() }, function (response) {
            $('.zagruzka-contenta').append(response);
        });
        //$.ajax({
        //    type: "POST",
        //    url: 'Home/PostGrup',
        //    data:{str:$('[name="Группа1"]').val()},
        //    dataType: "xml",
        //    success: function (data) {
        //        $('zagruzka-contenta').append(data);
        //    }
        //})
    })
    $('#addForm').submit(function (event) {
        event.preventDefault();
        var data = $(this).serialize();
        $.post('Home/AddStudi', data, function (response) {
            $('#comments').append(response);
        });
    });
    $('.comment').on('click', function () {
        var parent = $(this).parent().attr('class');
        num = String(parent).substring(0, 1);
        var tType = String(parent).substring(1, 2);
        day = String(parent).substring(2, 3);
        id = "";
        var sType;
        if (tType == "v") {
            $('[name = "неделя"]').val("true");
            sType = true;
        }
        else {
            $('[name = "неделя"]').val("false");
            sType = false;
        }
        $('#comment').val(null);
        for (var i = 0; i < dData.length; i++) {
            if (Number(dData[i].День_недели) == Number(day)) {
                if (Number(dData[i].Номер_пары) == Number(num)) {
                    if (dData[i].Верхняя_неделя == sType || dData[i].Верхняя_неделя == null) {
                        id = dData[i].id_расписания;
                        $('#comment').val(dData[i].Примечание);
                        break;
                    }
                }
            }
        }
    })
    $('body').on('click', '.subject', function () {
        var parent = $(this).parent().attr('class');
        num = String(parent).substring(0, 1);
        var tType = String(parent).substring(1, 2);
        day = String(parent).substring(2, 3);
        $('[name = "Название_предмета"]').val(null);
        $('[name = "Номер_аудитории"]').val(null);
        id = "";
        var sType;
        if (tType == "v") {
            $('[name = "неделя"]').val("true");
            sType = true;
        }
        else {
            $('[name = "неделя"]').val("false");
            sType = false;
        }

        for (var i = 0; i < dData.length; i++) {
            if (Number(dData[i].День_недели) == Number(day)) {
                if (Number(dData[i].Номер_пары) == Number(num)) {
                    if (dData[i].Верхняя_неделя == sType || dData[i].Верхняя_неделя == null) {

                        id = dData[i].id_расписания;

                        $('[name = "Название_предмета"]').val(dData[i].Название_предмета);
                        $('[name = "Номер_аудитории"]').val(dData[i].Номер_аудитории);
                        $('[name = "Тип_занятия"]').val(dData[i].Тип_занятия);
                        $('[name = "неделя"]').val(String(dData[i].Верхняя_неделя));
                        break;
                    }
                }
            }
        }

    })
    $('.group').on('click', function () {
        var parent = $(this).parent().attr('class');
        num = Number((parent).substring(0, 1));
        var tType = String(parent).substring(1, 2);
        day = Number((parent).substring(2, 3));
        id = "";
        var sType;
        if (tType == "v") {
            $('[name = "неделя"]').val("true");
            sType = true;
        }
        else {
            $('[name = "неделя"]').val("false");
            sType = false;
        }
        $('#gr1').val(null);
        $('#gr2').val(null);
        $('#gr3').val(null);
        for (var i = 0; i < dData.length; i++) {
            if (dData[i].День_недели== Number(day)) {
                if (dData[i].Номер_пары == Number(num)) {
                    if (dData[i].Верхняя_неделя == sType || dData[i].Верхняя_неделя == null) {
                        id = dData[i].id_расписания;
                        $('#gr1').val(dData[i].Группа1);
                        $('#gr2').val(dData[i].Группа2);
                        $('#gr3').val(dData[i].Группа3);
                        break;
                    }
                }
            }
        }
    })



    $('#sub').submit(function (event) {

        event.preventDefault();
        var url = '/Home/FileXL';
        var data = $(this).serialize();

        $.post(url, { str: $('#textGrup').val(), file: $('#textGrup').file }, function (response) { })


    })


    $(as).click(function () {
        console.log($(" div.panel-body"));
        var now1 = $(this).text()
        var url = '/Home/AddComment';
        $.post(url, { Comment: now1 }, function (response) {
            $("div.panel-body").text(response);
        });
    })

    $('#AddSubject').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: 'Home/AddSubject',
            dataType: "json",
            data: {d:day, p:num, Id:id, Название_предмета:$('[name = "Название_предмета"]').val(),
                Номер_аудитории: $('[name = "Номер_аудитории"]').val(),
                Тип_занятия: $('[name = "Тип_занятия"]').val(),
                неделя:$('[name = "неделя"]').val()},
            success: function (response) {
                addSybject(response);
            }
        })
    });
    $('#AddComment').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: 'Home/AddComment',
            dataType: "json",
            data: {
                Comment: $('#comment').val(),
                id:id
            },
            success: function (response) {
                addSybject(response);
            }
        })
    })
    $('#AddGroup').click(function (event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: 'Home/AddGroup',
            dataType: "json",
            data: {
                gr1: $('#gr1').val(),
                gr2: $('#gr2').val(),
                gr3: $('#gr3').val(),
                id: id
            },
            success: function (response) {
                addSybject(response);
            }
        })
    })
    $('#viewgr1').click(function (event) { 
        var gr = '#gr1';
        SelectStud($(gr).val());
    })
    $('#viewgr2').click(function(event){
        var gr = '#gr2';
        SelectStud($(gr).val());
    })
    $('#viewgr3').click(function (event) {
        var gr = '#gr3';
        SelectStud($(gr).val());
    })


    function addSybject (data) {
        dData = data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].Верхняя_неделя == false) {
                var n = "." + data[i].Номер_пары + "n" + data[i].День_недели;
                $(n + " > .subject").html(data[i].Название_предмета + " (ауд." + data[i].Номер_аудитории + ") " + data[i].Тип_занятия.substring(0, 3));
                $(n + " > .group").html(data[i].Группа1 + '  ' + data[i].Группа2 + '  ' + data[i].Группа3);
                $(n + " > .comment").html(data[i].Примечание);
                $(n + " > .subject").removeAttrs('hidden');
                $(n + " > .group").removeAttrs('hidden');
                $(n + " > .comment").removeAttrs('hidden');

            }
            else if (data[i].Верхняя_неделя == true) {
                var n = "." + data[i].Номер_пары + "n" + data[i].День_недели;
                var v = "." + data[i].Номер_пары + "v" + data[i].День_недели;
                $(v + " > .subject").html(
                    data[i].Название_предмета + " (ауд." + data[i].Номер_аудитории + ") " + data[i].Тип_занятия.substring(0, 3));
                $(v + " > .group").html(data[i].Группа1 + '  ' + data[i].Группа2 + '  ' + data[i].Группа3);
                $(v + " > .comment").html(data[i].Примечание);
                $(n + " > .subject").removeAttrs('hidden');
                $(n + " > .group").removeAttrs('hidden');
                $(n + " > .comment").removeAttrs('hidden');

            }
            else {
                var v = "." + data[i].Номер_пары + "v" + data[i].День_недели;
                $(v + " > .subject").html(data[i].Название_предмета + " (ауд." + data[i].Номер_аудитории + ") " + data[i].Тип_занятия.substring(0, 3));
                $(v + " > .group").html(data[i].Группа1 + '  ' + data[i].Группа2 + '  ' + data[i].Группа3);
                $(v + " > .comment").html(data[i].Примечание);
            }
        }
    }
    function SelectStud(gr)
    {
        $.ajax({
            type: "GET",
            url: 'Home/SelectStud',
            dataType: "json",
            data: {
                grup: gr
            },
            success: function (response) {
                if (response.length == 0) {
                    $('#viewsstud').html('Нету студентов')
                }
                else {
            //        $('#viewsstud').html(' <div class="table-responsive">' +
            //'<table class="table table-striped table-bordered">' +
            //' <tbody>')
                    for (var i = 0; i < response.length; i++) {
                        $('#viewsstud').html('<div class="asdfsd"></div>'+ response.Фамилия + ' ' + response.Имя + ' ' + response.Отчество)
                    }
                    //$('#viewsstud').append('</tbody></table></div>');
                }
            }
        })
    }
})
