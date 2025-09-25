
$(document).ready(function() {

    alarmas = [];
    tareas = [];
    tarea_activa = "";
    alarma_activa = "";

    class Alarma{
        constructor(nombre, hora, minuto, periodo, descripcion, fecha_activacion, fecha_suspension, modo_apagado, seguimiento_tareas, frecuencia, activa, tareas_asociadas){
            this.nombre = nombre;
            this.hora = hora;
            this.minuto = minuto;
            this.periodo = periodo;
            this.descripcion = descripcion;
            this.fecha_activacion = fecha_activacion;
            this.fecha_suspension = fecha_suspension;
            this.modo_apagado = modo_apagado;
            this.seguimiento_tareas = seguimiento_tareas;
            this.frecuencia = frecuencia;
            this.activa = activa;
            this.tareas_asociadas = tareas_asociadas;
        }
    }

    class Tarea{
        constructor(nombre, horas, minutos, descripcion){
            this.nombre = nombre;
            this.horas = horas;
            this.minutos = minutos;
            this.descripcion = descripcion;
        }
    }

    function initialize(){
        alarmas = [
            new Alarma(nombre="Trabajo", hora="07", minuto="30", periodo="AM", descripcion="Inicio de la jornada", fecha_activacion="2025-01-01", fecha_suspension= "2025-12-31",modo_apagado=1, seguimiento_tareas=true, frecuencia="Lunes, Martes, Miercoles, Viernes", activa=true, tareas_asociadas=[1,2]), 
            new Alarma(nombre="Gimnasio", hora="06", minuto="00", periodo="PM", descripcion="Hora de ir al gimnasio", fecha_activacion="2025-01-01", modo_apagado=2, seguimiento_tareas=true, frecuencia="Lunes, Miercoles, Viernes", activa=true, tareas_asociadas=[3,4]),
            new Alarma(nombre="Compras", hora="10", minuto="00", periodo="AM", descripcion="Hora de hacer las compras", fecha_activacion="2025-01-01", modo_apagado=3, seguimiento_tareas=true, frecuencia="Domingo", activa=false, tareas_asociadas=[4])
        ];

        tareas = [
            new Tarea(nombre="Preparar Desayuno", horas="00", minutos="45", descripcion="Preparar el desayuno para toda la familia"),
            new Tarea(nombre="Llevar a los niños al colegio", horas="01", minutos="15", descripcion="Llevar a los niños al colegio"),
            new Tarea(nombre="Lavar Platos", horas="00", minutos="40", descripcion="Lavar los platos después de comer"),
            new Tarea(nombre="Pasear a Flofi", horas="01", minutos="15", descripcion="Pasear al perro por el parque")
        ];
    }

    function cargar_alarmas(){
        $("#lista_alarmas").empty();
        for(let alarma of alarmas){
            let nuevo_div = $("<div></div>").addClass("alarm_card");
            let img = $("<div>"+alarma.nombre.charAt(0)+"</div>").addClass("alarm_image");
            if(!alarma.activa){
                img.addClass("inactive");
            }
            let ul = $("<ul></ul>");
            ul.append("<li>"+alarma.nombre+"</li>");
            ul.append("<li>"+alarma.frecuencia+"</li>");
            nuevo_div.append(img);
            nuevo_div.append(ul);
            $("#lista_alarmas").append(nuevo_div);
        }
    }

    function cargar_tareas(){
        $("#lista_tareas").empty();
        for(let tarea of tareas){
            let nuevo_div = $("<div></div>").addClass("tarea_card principal");
            let img = $("<img>").addClass("trailing");
            let ul = $("<ul></ul>");
            ul.append("<li>"+tarea.nombre+"</li>");
            ul.append("<li>"+tarea.horas+":"+tarea.minutos+"</li>");
            nuevo_div.append(ul);
            nuevo_div.append(img);
            $("#lista_tareas").append(nuevo_div);
        }
    }

    function mostrar_modal_google(){
        $("#modal_google").addClass("active");
    }

    function ocultar_modal_google(){
        $("#modal_google").removeClass("active");
    }

    function continuar_a_principal(){
        $("#pantalla_inicio").addClass("disabled");
        $("#barra_navegacion").removeClass("disabled");
        $(".active").removeClass("active");
        $("#vista_principal").addClass("active");
    }

    function ir_configuracion(){
        $(".active").removeClass("active");
        $("#configuracion").addClass("active");
        $("#nav_configuracion").addClass("active");
    }
    
    function ir_alarmas(){
        $(".active ").removeClass("active");
        $("#alarmas").addClass("active");
        $("#nav_alarmas").addClass("active");
        cargar_alarmas();
    }

    function ir_crear_alarma(){
        $(".active ").removeClass("active");
        $("#crear_alarma").addClass("active");
        $("#nav_alarmas").addClass("active");
    }

    function ir_tareas(){
        $(".active ").removeClass("active");
        $("#tareas").addClass("active");
        $("#nav_tareas").addClass("active");
        cargar_tareas();
    }

    function ir_estadisticas(){
        $(".active ").removeClass("active");
        $("#estadisticas").addClass("active");
        $("#nav_estadisticas").addClass("active");
    }

    function cambiar_am_pm(){
        let boton = $("#boton_am_pm");
        if(boton.hasClass("am")){
            boton.removeClass("am");
            boton.addClass("pm");
        } else {
            boton.removeClass("pm");
            boton.addClass("am");
        }
    }

    function cambiar_switch(img){
        if(img.hasClass("on")){
            img.removeClass("on");
            img.addClass("off");
        } else {
            img.removeClass("off");
            img.addClass("on");
        }
    }

    function mostrar_modal_tareas(){
        $("#modal_crear_tarea").addClass("active");
    }

    function ocultar_modal_tareas(){
        $("#modal_crear_tarea").removeClass("active");
    }

    function crear_tarea(){
        let nombre = $("input[name='nombre_tarea']").val();
        let horas = $("input[name='horas']").val();
        let minutos = $("input[name='minutos']").val();
        let descripcion = $("textarea[name='descripcion_tarea']").val();
        let nueva_tarea = new Tarea(nombre, horas, minutos, descripcion);
        tareas.push(nueva_tarea);
        $("input[name='nombre_tarea']").val("");
        $("input[name='horas']").val("");
        $("input[name='minutos']").val("");
        $("textarea[name='descripcion_tarea']").val("");
        ocultar_modal_tareas();
        cargar_tareas();
    }

    function mostrar_modal_editar_tarea(card){
        $("#modal_editar_tarea").addClass("active");
        let nombre_tarea = card.find("ul li:first").text();
        for(let tarea of tareas){
            if(tarea.nombre == nombre_tarea){
                $("input[name='editar_nombre_tarea']").val(tarea.nombre);
                $("input[name='editar_horas']").val(tarea.horas);
                $("input[name='editar_minutos']").val(tarea.minutos);
                $("textarea[name='editar_descripcion_tarea']").val(tarea.descripcion);
            }
            tarea_activa = nombre_tarea;
        }
    }

    function editar_tarea(){
        let nombre = $("input[name='editar_nombre_tarea']").val();
        let horas = $("input[name='editar_horas']").val();
        let minutos = $("input[name='editar_minutos']").val();
        let descripcion = $("textarea[name='editar_descripcion_tarea']").val();
        for(let tarea of tareas){
            if(tarea.nombre == tarea_activa){
                tarea.nombre = nombre;
                tarea.horas = horas;
                tarea.minutos = minutos;
                tarea.descripcion = descripcion;
            }
        }
        tarea_activa = "";
        ocultar_modal_editar_tareas();
        cargar_tareas();
    }

    function eliminar_tarea(){
        for(let tarea of tareas){
            if(tarea.nombre == tarea_activa){
                let index = tareas.indexOf(tarea);
                tareas.splice(index, 1);
            }
        }
        tarea_activa = "";
        ocultar_modal_editar_tareas();
        cargar_tareas();
    }

    function ocultar_modal_editar_tareas(){
        $("#modal_editar_tarea").removeClass("active");
    }

    function mostrar_modal_agregar_tareas(){
        let texto_tareas_alarma = $("#lista_tareas_alarma").text();
        $("#modal_seleccionar_tareas").addClass("active");
        $('html, body').animate({
            scrollTop: $("#modal_seleccionar_tareas").offset().top
        }, 500);
        $("#lista_tareas_modal").empty();
        for(let tarea of tareas){
            if(!texto_tareas_alarma.includes(tarea.nombre)){
                let nuevo_div = $("<div></div>").addClass("tarea_card modal");
                let img = $("<img>").addClass("trailing");
                let ul = $("<ul></ul>");
                ul.append("<li>"+tarea.nombre+"</li>");
                ul.append("<li>"+tarea.horas+":"+tarea.minutos+"</li>");
                nuevo_div.append(ul);
                nuevo_div.append(img);
                $("#lista_tareas_modal").append(nuevo_div);
            }
        }

    }

    function agregar_tarea_a_alarma(card){
        let nombre_tarea = card.find("ul li:first").text();
        ocultar_modal_agregar_tareas();
        for (let tarea of tareas)
            if(tarea.nombre == nombre_tarea)
                tarea_seleccionada = tarea;

        let nuevo_div = $("<div></div>").addClass("tarea_card alarma");
        let ul = $("<ul></ul>");
        ul.append("<li>"+tarea_seleccionada.nombre+"</li>");
        ul.append("<li>"+tarea_seleccionada.horas+":"+tarea_seleccionada.minutos+"</li>");
        nuevo_div.append(ul);
        $("#lista_tareas_alarma").append(nuevo_div);
        $('html, body').animate({
            scrollTop: $("#lista_tareas_alarma").offset().top
        }, 500);
     }

    function seleccionar_alarma(card){
        $(".selected").removeClass("selected");
        card.toggleClass("selected");
    }

    function remover_tarea_de_alarma()
    {
        let card = $(".tarea_card.alarma.selected");
        if(card.length > 0){
            card.remove();
        } else {
            alert("Debe seleccionar una tarea para eliminar");
        }
    }

    function ocultar_modal_agregar_tareas(){
        $("#modal_seleccionar_tareas").removeClass("active");
    }

    function editar_alarma(){
        ir_crear_alarma();

        for(let alarma of alarmas){
            if(alarma.nombre == alarma_activa){
                alarma_seleccionada = alarma;
            }
        }

        $("#btn_guardar_alarma").hide();
        $("#btn_editar_alarma").show();
        $("#btn_eliminar_alarma").show();
        $("#crear_alarma h1").text("EDITAR ALARMA");

        if(alarma_seleccionada.activa){
            $(".switch").find("img").removeClass("off").addClass("on");
        } else {
            $(".switch").find("img").removeClass("on").addClass("off");
        }

        if(alarma_seleccionada.periodo == "AM"){
            $("#boton_am_pm").removeClass("pm").addClass("am");
        } else {
            $("#boton_am_pm").removeClass("am").addClass("pm");
        }

        let opciones_apagado = $("input[type='radio'][name='modo_apagado']");
        opciones_apagado.prop("checked", false);


        $("input[name='nombre_alarma']").val(alarma_seleccionada.nombre);
        $("input[name='hora_inicio']").val(alarma_seleccionada.hora);
        $("input[name='minuto_inicio']").val(alarma_seleccionada.minuto);
        $("textarea[name='descripcion_alarma']").val(alarma_seleccionada.descripcion);
        $("input[name='fecha_activacion']").val(alarma_seleccionada.fecha_activacion);
        $("input[name='fecha_suspension']").val(alarma_seleccionada.fecha_suspension);
        $("input[name='seguimiento_tareas']").prop("checked", alarma_seleccionada.seguimiento_tareas);
        $("input[name='frecuencia_alarma']").val(alarma_seleccionada.frecuencia);
    }


    initialize();
    $("#pantalla_inicio a").on("click", mostrar_modal_google);
    $("#pantalla_inicio div.user_card").on("click", continuar_a_principal);
    $("#modal_google button#mg_cancelar").on("click", ocultar_modal_google);
    $("#modal_google button#mg_continuar").on("click", continuar_a_principal);
    $("#nav_configuracion").on("click", ir_configuracion);
    $("#nav_alarmas").on("click", ir_alarmas);
    $("#nav_tareas").on("click", ir_tareas);
    $("#nav_estadisticas").on("click", ir_estadisticas);
    $("#usuario_configurado").on("click", mostrar_modal_google);
    $("#add_alarma").on("click", ir_crear_alarma);
    $("#boton_am_pm").on("click", cambiar_am_pm);
    $(".switch img").on("click", function(){cambiar_switch($(this))});
    $("#add_tarea").on("click", mostrar_modal_tareas);
    $("#mt_cancelar").on("click", ocultar_modal_tareas);
    $("#mt_guardar").on("click", crear_tarea);
    $("#met_cancelar").on("click", ocultar_modal_editar_tareas);
    $("#met_guardar").on("click", editar_tarea);
    $("#met_eliminar").on("click", eliminar_tarea);
    $("#btn_agregar_tarea").on("click", mostrar_modal_agregar_tareas);
    $("#mst_cancelar").on("click", ocultar_modal_agregar_tareas);
    $("#btn_eliminar_tarea").on("click", remover_tarea_de_alarma);

    $(document).on("click", ".tarea_card.principal", function(){
        let card = $(this);
        mostrar_modal_editar_tarea(card);
    });

    $(document).on("click", ".tarea_card.modal", function(){
        let card = $(this);
        agregar_tarea_a_alarma(card);
    });

    $(document).on("click", ".tarea_card.alarma", function(){
        let card = $(this);
        seleccionar_alarma(card);
    });

    $(document).on("click", ".alarm_card", function(){
        let card = $(this);
        let nombre_alarma = card.find("ul li:first").text();
        alarma_activa = nombre_alarma;
        editar_alarma();
    });

});

