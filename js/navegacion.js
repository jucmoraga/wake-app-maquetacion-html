
$(document).ready(function() {

    alarmas = [];
    tareas = [];

    class Alarma{
        constructor(nombre, frecuencia, activa){
            this.nombre = nombre;
            this.frecuencia = frecuencia;
            this.activa = activa;
        }
    }

    function initialize(){
        alarmas = [
            new Alarma(nombre="Trabajo", frecuencia="Lunes a Viernes", activa=true), 
            new Alarma(nombre="Gimnasio", frecuencia="Lunes, Miercoles, Viernes", activa=true), 
            new Alarma(nombre="Compras", frecuencia="Domingo", activa=false)
        ];
    }

    function cargar_alarmas(){
        $("#lista_alarmas").empty();
        for(let alarma of alarmas){
            let nuevo_div = $("<div></div>").addClass("alarm_card inicial");
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
    }

    function ir_estadisticas(){
        $(".active ").removeClass("active");
        $("#estadisticas").addClass("active");
        $("#nav_estadisticas").addClass("active");
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

});