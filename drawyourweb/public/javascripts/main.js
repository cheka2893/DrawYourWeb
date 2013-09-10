$(document).ready(function() {
	LoadJs('wireframeJs','wireFuc');
	constructApp();
    copyElement();
    $('#bootScreen').on('click', function(){
        $(this).fadeOut('slow');
    });
});

function LoadJs(archivo, idArchivo){
        var d = new Date();
        var elem = document.getElementById(idArchivo);
        if(elem === null)
        {
            var newScript = document.createElement("script");
            newScript.setAttribute('type','text/javascript');
            newScript.setAttribute('id', idArchivo);
            newScript.setAttribute('src', '/javascripts/'+archivo+'.js?rnd='+d.getTime());
            var tag = $('head #main');
            tag.before().append(newScript);
            //document.getElementsByTagName("head")[0].appendChild(newScript);
        }       
    };

