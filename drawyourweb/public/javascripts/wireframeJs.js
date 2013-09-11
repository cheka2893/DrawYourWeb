var url = "/javascripts/selectList.json";
var myData = [];
$.ajax({
  url: url,
  async: false,
  dataType: 'json',
  success: function (json) {
    myData = json.selectOptions;
  }});
function constructApp(){

    var selectList = $('.toolBox select');
    myData.forEach(function(item, index, array){
    	$("<option />", {value:item.name, text:item.value}).appendTo(selectList);
    });};
function makeOption(){
    var selected = $('.toolBox select').find(":selected").val();
    switch(selected){
        case "div":
            createDiv();
            break;
        case "button":
            createButton();
            break;
        case "label":
            createLabel();
            break;
        case "select":
            createSelect();
            break;
        case "table":
            createTable();
            break;
        case "video":
            createVideo();
            break;
        case "image":
            createImage();
            break;
        case "paragraph":
            createParagraph();
            break;
        default:
            console.log("Error on selection");
            break;
    }}
function createDiv(){
    var newDiv = $(document.createElement("div"));
    newDiv.css({
        width:"100px", 
        height:"100px", 
        border:"3px solid black", 
        position:"absolute", 
        left: 436, 
        top: 42,
        backgroundColor:"#e3dcdc"
    });
    newDiv.draggable({ 
        containment: $("#wireSpace"),
        scroll: false
    });    
    newDiv.resizable({
        helper: "ui-resizable-helper"
    });
    newDiv.click(function(){
        $('.highlight').removeClass('highlight');
        verifySettingsExistence();
        var element = $(this);
        basicSettings(element);        
        setBackgroundImage(element, $('#settingsBox'));
        removeButton(element, $('#settingsBox'));
    });
    $("#wireSpace").append(newDiv);}
function createButton(){
    var newButton = $(document.createElement("button"));
    newButton.css({
        width:"100px", 
        height:"60px", 
        left: 436, 
        top: 42
    }); 
    newButton.css('position','absolute');
    newButton.text('Button');
    newButton.draggable({ containment: $("#wireSpace"), scroll: false, cancel:false });

    newButton.on('click', function(){
        $('.highlight').removeClass('highlight');
        verifySettingsExistence();
        var element = $(this);
        basicSettings(element);       
        createSizeSettings(element);
        setBackgroundImage(element, $('#settingsBox'));
        textChange(element, $('#settingsBox'));
        removeButton(element, $('#settingsBox'));
    });  

    $("#wireSpace").append(newButton);}
function createLabel(){
    var newLabel = $(document.createElement("label"));
    newLabel.css({
        width:"100px", 
        height:"25px", 
        left: 436, 
        top: 42
    });
    newLabel.css('position','absolute');
    newLabel.text('Label');
    newLabel.draggable({ containment: $("#wireSpace"), scroll: false });
    newLabel.on('click', function(){
        $('.highlight').removeClass('highlight');
        verifySettingsExistence();
        var element = $(this);
        element.addClass("highlight");     
        createTextEditionSettings(element);
        textChange(element, $('#settingsBox'));
        removeButton(element, $('#settingsBox'));
    });   

    $("#wireSpace").append(newLabel);}
function createParagraph(){
    if(document.getElementById('infoForm') === null || document.getElementById('infoForm') === undefined){
        var newParag = $(document.createElement("p"));
        var confirmText = "How many paragraphs would you like to write";

        var paraLabel = $(document.createElement('label'));
        paraLabel.text('Write how many paragraphs you need');
        var paraInput = $(document.createElement('input'));
        paraInput.attr({'id':'infoInput', "type":"text", "name":"objectSelect"});

        options = {};
        options.paraLabel = paraLabel;
        options.paraInput = paraInput;

        var DialogConfirmation = createModalUpgrade(options);
        DialogConfirmation.infoAcceptButton.on('click', function(){      
        
            newParag.css({
                position:"absolute", 
                left: 436, 
                top: 42});
            newParag.draggable({
                containment: $("#wireSpace"),
                scroll: false});

            var textQuantity = $('#infoInput').val();
            var returnedText = paragraphMaker(textQuantity);
            newParag.text(returnedText);

            newParag.on('click', function(){
                $('.highlight').removeClass('highlight');
                verifySettingsExistence();
                var element = $(this);
                element.addClass("highlight"); 
                createTextEditionSettings(element);
                createSizeSettings(element);
                removeButton(element, $('#settingsBox'))});
            $("#wireSpace").append(newParag);   
            $('#infoForm').remove();
        });
        
    }}
function createImage(){
 if(document.getElementById('infoForm') === null || document.getElementById('infoForm') === undefined){
    var newImage = $(document.createElement('img'));
    newImage.css({
        'position':'absolute',
        'width':'450px',
        'height':'500px'
    });
    newImage.draggable({ containment: $("#wireSpace"), scroll: false }); 

    var imageLabel = $(document.createElement('label'));
    imageLabel.text('Select an image');
    var imageInput = $(document.createElement('input'));
    imageInput.attr({'id':'infoInput', "type":"file", "name":"objectSelect"});

    options = {};
    options.imageLabel = imageLabel;
    options.imageInput = imageInput;
    var confirmImage = createModalUpgrade(options,{
        url:null,
        repeat:null,
        bgSize:null        
    });

    confirmImage.infoAcceptButton.on('click', function(){
        newImage.attr({"src":confirmImage.details.url});
        newImage.css({
            "background-size":confirmImage.details.bgSize, 
            "background-repeat":confirmImage.details.repeat
        });
        newImage.on('click', function(){
            $('.highlight').removeClass('highlight');
            verifySettingsExistence();
            var element = $(this);
            element.addClass("highlight"); 
            var imageSettingsContainer = $(document.createElement('div'));
            imageSettingsContainer.attr('id','settingsBox');
            $('#settings').append(imageSettingsContainer);
            createSizeSettings(element);
            setBackgroundImage(element, $('#settingsBox'));
            removeButton(element, $('#settingsBox'));
        });
        $("#wireSpace").append(newImage);          
        $('#infoForm').remove();       
    });}}
function createVideo(){
 if(document.getElementById('infoForm') === null || document.getElementById('infoForm') === undefined){
    videoDiv = $(document.createElement('div'));
    videoDiv.css({
        "position":"absolute"
    });
    videoDiv.draggable({ containment: $("#wireSpace"), scroll: false });        
    videoDiv.resizable({
        helper: "ui-resizable-helper"
    });   

    var videoLabel = $(document.createElement('label'));
    videoLabel.text('Write the embeded code right here');
    var videoInput = $(document.createElement('textarea'));
    videoInput.attr({'id':'videoInput', "rows":"2", "cols":"17"});

    options = {};
    options.videoLabel = videoLabel;
    options.videoInput = videoInput;

    var confirmVideo = createModalUpgrade(options);
    confirmVideo.infoAcceptButton.on('click', function(){

        videoDiv.attr('id','player');
        videoDiv.on('click', function(){
            $('.highlight').removeClass('highlight');
            verifySettingsExistence();
            var element = $(this);
            element.addClass("highlight"); 
            var videoSettingsContainer = $(document.createElement('div'));
            videoSettingsContainer.attr('id','settingsBox');
            $('#settings').append(videoSettingsContainer);
            createSizeSettings(element);
            removeButton(element, $('#settingsBox'));
        });
        $("#wireSpace").append(videoDiv);        
        $('#player').youTubeEmbed(confirmVideo.videoInput.val());
        $('#infoForm').remove();       
    });}}

/*------------------FUNCIONES EXTRA-----------------------*/

    //Conversor de RGB a HEX
function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);}
    //Funcion del ColorPicker
function SpectrumColorPicker(itemColor, newDiv, attrib){
    $(".basic").spectrum({
        color: itemColor,
        change: function(color) {
            newDiv.css(attrib, color.toHexString());
        }
    });   }
    //Funcion para seleccionar el tipo de borde del objeto


/*------------------FUNCIONES PARA CAMBIOS DE CSS-----------------------*/

//FUncion para seleccionar el tipo de borde del elemento
function borderSelection(item, selectedItem){
    switch(selectedItem){
        case "Dotted":
            item.css('border-style', 'dotted');
            break;
        case "Solid":
            item.css('border-style', 'solid');
            break;
        case "Dashed":
            item.css('border-style', 'dashed');
            break;
        case "None":
            item.css('border', 'none');
            break;
        default:
            console.log("Invalid Option");
            break;
    }}
//Funcion para agregar manualmente la cantidad de Border-Radius
function setBorderRaidus(item, size){
    item.css('border-radius', size);
}
    //Funcion para agregar manualmente el ancho de un objeto
function setWidthElement(item, size){
    item.css('width', size);
}
    //Funcion para agregar manualmente el alto de un objeto
function setHeightElement(item, size){
    item.css('height', size);
}
    //Funcion para agregar manualmente el tamaño de letra de un texto
function setFontSize(ele, size){
    ele.css('font-size', size);
}
    //Function para agregar el Line-Height de un parrafo
function setLineHeight(ele, size){
    ele.css('line-height', size);
}
//Funcion que agrega la opcion de Background-Image a los elementos
function setBackgroundImage(ele, settings){
    var imageChooser = {
        backgroundImageLabel: $(document.createElement('label')),
        backgroundImageButton: $(document.createElement('input')),
        backgroundWriteLabel: $(document.createElement('label')),
        backgroundImageInput: $(document.createElement('input'))
    }

    //Background Image Chooser

        imageChooser.backgroundImageLabel.text('Background-Image Chooser');
        imageChooser.backgroundWriteLabel.text('Background-Image URL');
        imageChooser.backgroundImageButton.attr({
            "id":"backgroundImageButton",
            "type":"file",
            "name":"myFileSelect"
        });
        imageChooser.backgroundImageInput.attr({
            "id":"backgroundImageInput",
            "type":"text",
            "name":"outerImageSelect"
        });

        settings.append(imageChooser.backgroundImageLabel);
        settings.append(imageChooser.backgroundImageButton);
        settings.append(imageChooser.backgroundWriteLabel);
        settings.append(imageChooser.backgroundImageInput);

        //Funcion de Background-Image
        $("input[name='myFileSelect']").on('change', function(){
            //setBackgroundImage(desireElement);
            var files = this.files ? this.files : [];
            // Si ningun archivo fue seleccionado o no hay soporte del fileReader haga un return vacio
            if ( !files.length || !window.FileReader ) return;
            // Solo proceda si el archivo seleccionado es una imagen
            if ( /^image/.test( files[0].type ) ) {
                // Crea una instancia del File Reader
                var reader = new FileReader();

                // Lee el archivo de manera local y lo devuelve como un DataURL
                reader.readAsDataURL( files[0] );

                // Cuando esta cargado, establece la imagen como fondo del elemento
                reader.onloadend = function(){
                    if(ele.is('img')){
                        ele.attr('src', this.result);
                    }else{
                      ele.css({
                        "background-image":"url("+ this.result +")",
                        "background-repeat":"no-repeat",
                        "background-size":"100%"
                        });
                    }
                               
                }
            }});

        imageChooser.backgroundImageInput.on('change', function(){
            ele.css({
                "background-image":"url("+ imageChooser.backgroundImageInput.val() +")",
                "background-repeat":"no-repeat",
                "background-size":"100%"
            });
        });      
}

/*------------------FUNCIONES PARA CONSTRUCCION DE OBJETOS O VERIFICACIONES-----------------------*/


//Funcion para cambiar el texto de un elemento
function textChange(ele, settings){
    var changeText = {
        textLabel:$(document.createElement('label')),
        textInput:$(document.createElement('input'))
    }

    changeText.textLabel.text('Cambie el texto del elemento');
    changeText.textInput.attr({
        "id":"textInput",
        "type":"text"
    });
    settings.append(changeText.textLabel);
    settings.append(changeText.textInput);

    changeText.textInput.on('change', function(){
        ele.text(changeText.textInput.val());
    });}
//Funcion que crea los parrafos que se necesitan
function paragraphMaker(quant){
    var lorem = "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.";
    var TextResult = "";
    for (var i = 0; i < quant; i++) {
        TextResult = TextResult + lorem;
    };
    return TextResult;}
//Funcion que agrega los elementos basicos de un objeto comun(div, buttons)
function basicSettings(desireElement){
    var elementos = {
            container: $(document.createElement('div')),
            backGLabel: $(document.createElement('label')),
            backGInput: $(document.createElement('input')),
            backGEm: $(document.createElement('em')),
            borderSizeLabel: $(document.createElement('label')),
            borderSizeInput: $(document.createElement('input')),
            borderStyleLabel: $(document.createElement('label')),
            borderStyleSelection: $(document.createElement('select')),
            borderRadiusLabel: $(document.createElement('label')),
            borderRadiusInput: $(document.createElement('input'))
        }
        //Container
        elementos.container.attr('id', 'settingsBox');

        //Background Option
        elementos.backGLabel.text("Background-Color");
        elementos.backGInput.addClass('basic');
        elementos.backGEm.attr('id','basic-log');

        //Border Option

            //Size
        elementos.borderSizeLabel.text("Border-Size");
        elementos.borderSizeInput.attr('type','text');
        elementos.borderSizeInput.attr('id','borderSizeInput');
            //Style
        elementos.borderStyleLabel.text("Border-Style");
        elementos.borderStyleSelection.attr('id', 'borderStyleSelection');
        elementos.borderStyleSelection.append("<option>Solid</option><option>Dotted</option><option>Dashed</option><option>None</option>");

            //Radius
        elementos.borderRadiusLabel.text("Border-Radius");
        elementos.borderRadiusInput.attr('id', 'borderRadiusInput');
        elementos.borderRadiusInput.attr('type', 'text');

        //Seccion de agregado    
        elementos.container.append(elementos.backGLabel);
        elementos.container.append(elementos.backGInput);
        elementos.container.append(elementos.backGEm);
        elementos.container.append(elementos.borderSizeLabel);
        elementos.container.append(elementos.borderSizeInput);
        elementos.container.append(elementos.borderStyleLabel);
        elementos.container.append(elementos.borderStyleSelection);
        elementos.container.append(elementos.borderRadiusLabel);
        elementos.container.append(elementos.borderRadiusInput);

        /*Funciones*/

        $('#settings').append(elementos.container);

        desireElement.addClass('highlight');

        //Funcion de Color de Fondo del div
        var itemColor = rgb2hex($('.highlight').css('background-color'));
        SpectrumColorPicker(itemColor, desireElement, "background-color"); 

        //Funcion de cambio de tamaño del borde
        elementos.borderSizeInput.val(desireElement.css('border-width'));
        elementos.borderSizeInput.on('change',function(){
            desireElement.css('border-width', elementos.borderSizeInput.val());
        });

        //Funcion de seleccion de Estilo de Borde
        elementos.borderStyleSelection.on('change', function(){
            var selectedItem = elementos.borderStyleSelection.find(":selected").val();
            borderSelection(desireElement, selectedItem); 
        });

        //Funcion de border Radius
        elementos.borderRadiusInput.val(desireElement.css('border-radius'));
        elementos.borderRadiusInput.on('change',function(){
            setBorderRaidus(desireElement, elementos.borderRadiusInput.val());
        });        
    }
//Funcion que agrega los elementos de tamaño a los elementos que no pueden ser redimensionados con el mouse
function createSizeSettings(desireElement){
    var elementosButton = {
            widthSizeLabel:$(document.createElement('label')),
            widthSizeInput:$(document.createElement('input')),
            heightSizeLabel:$(document.createElement('label')),
            heightSizeInput:$(document.createElement('input'))}

        //Labels de los tamaños y sus  Inputs
        elementosButton.widthSizeLabel.text("Width");
        elementosButton.widthSizeInput.attr({'id':'widthSizeInput','type':'number'});

        elementosButton.heightSizeLabel.text("Height");
        elementosButton.heightSizeInput.attr({'id':'heightSizeInput','type':'number'});

        $('#settingsBox').append(elementosButton.widthSizeLabel);
        $('#settingsBox').append(elementosButton.widthSizeInput);
        $('#settingsBox').append(elementosButton.heightSizeLabel);
        $('#settingsBox').append(elementosButton.heightSizeInput);

        var valor = desireElement.css("width");
        var valorCortadoW = valor.split("px");

        var valor = desireElement.css("height");
        var valorCortadoH = valor.split("px");

        elementosButton.widthSizeInput.val(valorCortadoW[0]);
        elementosButton.heightSizeInput.val(valorCortadoH[0]);

        elementosButton.widthSizeInput.on('change', function(){
            var buttonWidth = elementosButton.widthSizeInput.val();
            setWidthElement(desireElement, buttonWidth);
        });  
        elementosButton.heightSizeInput.on('change', function(){
            var buttonHeight = elementosButton.heightSizeInput.val();
            setHeightElement(desireElement, buttonHeight);
        });
    }   

function createTextEditionSettings(desireElement){
    var elementosParagraph = {
            container: $(document.createElement('div')),
            FontSizeLabel: $(document.createElement('label')),
            FontSizeInput: $(document.createElement('input')),
            LetterColorLabel: $(document.createElement('label')),
            LetterColorInput: $(document.createElement('input')),
            LetterColorEm: $(document.createElement('em')),
            LetterLineHeightLabel: $(document.createElement('label')),
            LetterLineHeightInput: $(document.createElement('input')) }

        //contenedor de los settings
        elementosParagraph.container.attr({'id':'settingsBox'});

        //Font Options
            //Size
        elementosParagraph.FontSizeLabel.text('Font-Size');
        elementosParagraph.FontSizeInput.attr({'id':'fontSizeInput', 'type':'text'});

            //Color
        elementosParagraph.LetterColorLabel.text('Font-Color');
        elementosParagraph.LetterColorInput.attr({'id':'fontSizeInput', 'type':'text'});
        elementosParagraph.LetterColorInput.addClass('basic');

            //line-height
        elementosParagraph.LetterLineHeightLabel.text('Line-Height');
        elementosParagraph.LetterLineHeightInput.attr({'id':'LineHeightInput', 'type':'text'});        

        //Agregado de la Barra de Herramientas
        elementosParagraph.container.append(elementosParagraph.FontSizeLabel);
        elementosParagraph.container.append(elementosParagraph.FontSizeInput);
        elementosParagraph.container.append(elementosParagraph.LetterColorLabel);
        elementosParagraph.container.append(elementosParagraph.LetterColorInput);
        elementosParagraph.container.append(elementosParagraph.LetterColorEm);
        elementosParagraph.container.append(elementosParagraph.LetterLineHeightLabel);
        elementosParagraph.container.append(elementosParagraph.LetterLineHeightInput);

        //Funciones
         $('#settings').append(elementosParagraph.container);

        //Funcion de cambio de tamaño de letra
        elementosParagraph.FontSizeInput.val(desireElement.css('font-size'));
        elementosParagraph.FontSizeInput.on('change', function(){
            setFontSize(desireElement, elementosParagraph.FontSizeInput.val());
        });

        //Funcion de cambio de color de letra
        var itemColor = rgb2hex(desireElement.css('color'));
        SpectrumColorPicker(itemColor, desireElement, "color"); 

        //Funcion de cambio del LineHeight
        elementosParagraph.LetterLineHeightInput.val(desireElement.css('line-height'));
        elementosParagraph.LetterLineHeightInput.on('change', function(){
            setLineHeight(desireElement, elementosParagraph.LetterLineHeightInput.val());
        });}
//Funcion que crea y agrega la funcion del boton eliminar elemento
function removeButton(ele, settings){
    var removeBtn = $(document.createElement("button"));
    removeBtn.text("Remove Element");
    removeBtn.css('width', '100%');
    removeBtn.attr('id','removeBtn');
    settings.append(removeBtn);
    removeBtn.on("click", function(){
        ele.remove();
        settings.remove();
    });}
//Function que Verifica si existe algun cuadro de settings y lo elimina
function verifySettingsExistence(){
    var settings = $(document.getElementById('settingsBox'));
    settings.remove();}

//Funcion que crea Dialogos Modales
function createModalUpgrade(options, details){
    if(details === undefined){
        details = {};
    }
    var modal = {};
    modal.infoForm = $(document.createElement('div'));
    modal.infoContainer = $(document.createElement('div'));
    options.infoAcceptButton = $(document.createElement('button'));
    options.infoDeclineButton = $(document.createElement('button'));


    modal.infoForm.attr({'id':'infoForm'});
    modal.infoForm.addClass('modalDialog');
    modal.infoContainer.attr('id', 'infoContainer');

    //Info Button
    options.infoAcceptButton.text('Confirm');
    options.infoAcceptButton.attr({'id':'infoAcceptButton'});
    options.infoDeclineButton.text('Decline');
    options.infoDeclineButton.attr({'id':'infoDeclineButton'});

    for(var key in options){
        modal.infoContainer.append(options[key]);
    }
    modal.infoForm.append(modal.infoContainer);
    
    $("#wireSpace").append(modal.infoForm);

    options.infoDeclineButton.on('click', function(){
        modal.infoForm.remove();
    });
    options.details = details;

    $("input[name='objectSelect']").on('change', function(){
            //setBackgroundImage(desireElement);
            var files = this.files ? this.files : [];
            // Si ningun archivo fue seleccionado o no hay soporte del fileReader haga un return vacio
            if ( !files.length || !window.FileReader ) return;
            // Solo proceda si el archivo seleccionado es una imagen
            if ( /^image/.test( files[0].type ) ) {
                // Crea una instancia del File Reader
                var reader = new FileReader();

                // Lee el archivo de manera local y lo devuelve como un DataURL
                reader.readAsDataURL( files[0] );

                // Cuando esta cargado, establece la imagen como fondo del elemento
                reader.onloadend = function(){                    
                    options.details.url = this.result;
                    options.details.repeat = "no-repeat";
                    options.details.bgSize = "100%";                             
                }
            }
        });
    return options;    
}

/*--------------------------------FUNCIONES DE COMPORTAMIENTO-------------------------------*/

function copyElement(){
    $(document).keypress(function(event) {
        if(event.which === 65 && event.shiftKey){  
            alert("You have copied the element");          
            var elementToCopy = $('.highlight');
            var newElement = elementToCopy.clone();
            newElement.removeClass('highlight');
            newElement.draggable({ 
                containment: $("#wireSpace"),
                scroll: false,
                cancel: false
            });
            if(newElement.prop("tagName").toLowerCase() != "button" && newElement.prop("tagName").toLowerCase() != "img" && newElement.prop("tagName").toLowerCase() != "label"){
                newElement.find(".ui-resizable-handle").remove();
                newElement.resizable({
                    helper: "ui-resizable-helper"
                });
            }            
            newElement.on('click', function(){
                $('.highlight').removeClass('highlight');
                verifySettingsExistence();

                switch(newElement.prop("tagName").toLowerCase()){
                    case "div":
                        basicSettings(newElement);
                        setBackgroundImage(newElement, $('#settingsBox'));
                    break;
                    case "button":
                        basicSettings(newElement);
                        textChange(newElement, $('#settingsBox'));
                        setBackgroundImage(newElement, $('#settingsBox'));
                    break;
                    case "p":
                        createTextEditionSettings(newElement);
                    break;
                    case "label":
                        createTextEditionSettings(newElement);
                        textChange(newElement, $('#settingsBox'));
                    break;
                    case "img":
                        var imageSettingsContainer = $(document.createElement('div'));
                        imageSettingsContainer.attr('id','settingsBox');
                        $('#settings').append(imageSettingsContainer);
                        setBackgroundImage(newElement, $('#settingsBox'));
                    break;
                    default:
                        console.log("Copie function fail");
                    break;
                }
                createSizeSettings(newElement);
                removeButton(newElement, $('#settingsBox'));
            });
            $('#wireSpace').append(newElement);
        }
    });}