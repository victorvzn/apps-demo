$(document).on("ready", function() {

    $("#btnGetAll").on("click", function() { getAll(); });
    $("#btnGetbyId").on("click", function() { getById(); });
    $("#btnPost").on("click", function() { postData(); });
    $("#btnPut").on("click", function() { putData(); });
    $("#btnDel").on("click", function() { delData(); });

    function getAll()
    {
        $("#data").html("Cargando...");
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data : {},
            type : "GET",
            url : 'http://djangotutorial-zonvi23.dotcloud.com/api/v1/dispositivo/',
            dataType : "jsonp"
        }).done(function(resp) {
            $("#data").html("");
            $.each(resp.objects, function(index,element) {
                $("#data").append("<li>" + element.id + ", " + element.nombre + "</li>");
            });
        });
    }

    function getById()
    {
        var input = $("#txtData").val();
        if(input)
        {
            var uri = 'http://djangotutorial-zonvi23.dotcloud.com/api/v1/dispositivo/'+ input + '/';
            $("#data").html("Cargando...");
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                data : "{}",
                type : "GET",
                url : uri,
                dataType : "jsonp"
            }).done(function(resp) {
                $("#data").html("");
                $("#data").html(resp.id + " : " + resp.nombre + ", " + resp.usuario);
            });
        }
    }

    function postData()
    {
        var input = $("#txtData").val();
        if(input)
        {
            var data = input.split(" ");
            var dataPost = '{ "nombre": "' + data[1] + '", "usuario": "/api/v1/usuario/' + data[0] + '/" }';

            $("#data").html("Cargando...");
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                data : dataPost,
                dataType : 'json',
                type : 'post',
                url : 'http://djangotutorial-zonvi23.dotcloud.com/api/v1/dispositivo/'
            }).done(function(resp) { $("#data").html( "DONE " + resp.status + ":" + resp.statusText); getAll(); }).fail(function(resp) { $("#data").html("FAIL: \n" + resp.status + ":" + resp.statusText); getAll(); });
        }
    }

    function putData()
    {
        var input = $("#txtData").val();
        if(input)
        {
            var data = input.split(" ");
            var dataPost = '{ "nombre": "' + data[1] + '" }';
            var uri = 'http://djangotutorial-zonvi23.dotcloud.com/api/v1/dispositivo/'+ data[0] + '/';
            $("#data").html("Cargando...");
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                data : dataPost,
                dataType : 'json',
                type : 'put',
                url : uri
            }).done(function(resp) { $("#data").html( "DONE " + resp.status + ":" + resp.statusText); getAll(); }).fail(function(resp) { $("#data").html("FAIL: \n" + resp.status + ":" + resp.statusText); getAll(); });
        }
    }

    function delData()
    {
        var input = $("#txtData").val();
        if(input)
        {
            var uri = 'http://djangotutorial-zonvi23.dotcloud.com/api/v1/dispositivo/'+ input + '/';
            $("#data").html("Cargando...");
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                data : "{}",
                dataType : 'json',
                type : 'delete',
                url : uri
            }).done(function(resp) { $("#data").html( "DONE " + resp.status + ":" + resp.statusText); getAll(); }).fail(function(resp) { $("#data").html("FAIL: \n" + resp.status + ":" + resp.statusText); getAll(); });
        }
    }

});