var introPopup;
var textoPopup;
var descargaPopup;
var contenedorProyectos;

var estaEnMenu;
var creditosOn = false;


function construirPc()
{
	crearContenedores();
}

function construirMoviles()
{	
	crearContenedores();	
}

function crearContenedores()
{
	descargaPopup = cE('div', document.body);
	descargaPopup.id = 'descargaPopup';
	
	var img = cE('img', descargaPopup)
	img.src = 'a2imagenes/loading.gif';
	
	introPopup = cE('div', document.body);
	introPopup.id = 'introPopup';	
	
	textoPopup = cE('div', document.body);
	textoPopup.id = 'textoPopup';
	
	contenedorProyectos = cE('div', document.body);	
	contenedorProyectos.innerHTML = '';
	contenedorProyectos.id = 'contenedorProyectos';		
	
	crearPopupInicio();
	
	/*******/
	
	var divCreditos = cE('div', document.body);
	divCreditos.id = 'divCreditos';
	
	var div = cE('div', divCreditos);
	div.innerHTML = 'Del 1 al 44 (Nueva normalidad) </br></br>' +
	'Este proyecto fue realizado durante el aislamiento obligatorio decretado por la pandemia del COVID-19 en el año 2020.</br></br>'+
	'¿Qué implicará la nueva normalidad en tanto que la frontera de lo íntimo, privado y público se desdibujan?</br></br>'+
	'Autores: Vanessa Feijoo, Pablo Andrés Lopez, Juana Valeria Forero, Laura Lozano, Valentina Anzola, Katherine Clavijo, Carlos José Tarazona, Valentina Peña, Nathalia Valdes, María Alejandra Valderrama, Alejandro Forero.</br></br>' +
	'Programación Web: Alejandro Forero';
	
	var div = cE('div', divCreditos);
	div.className = 'cerrar';
	
	var span = cE('span', div);		
	span.innerHTML = 'x';
	
	span.addEventListener('click', function()
	{
		divCreditos.className = 'desaparecerIzq';
			
		setTimeout(function()
		{
			divCreditos.style.display = 'none';
		}, 2000);
		
		creditosOn = false;	
	});
	
	var infoCreditos = cE('div', document.body);
	infoCreditos.id = 'infoCreditos';
	infoCreditos.innerHTML = 'i';	
	
	infoCreditos.addEventListener('click', function()
	{
		if(!creditosOn)
		{
			divCreditos.style.display = 'block';
			divCreditos.className = 'aparecerIzq';
			creditosOn = true;
		}
		else
		{
			divCreditos.className = 'desaparecerIzq';
			
			setTimeout(function()
			{
				divCreditos.style.display = 'none';
			}, 2000);
			
			creditosOn = false;			
		}
	});	
}

function crearPopupInicio()
{
	var div = cE('div', introPopup);
	div.id = 'tituloIntro';
	div.innerHTML = 'DEL 1 AL 44 (NUEVA NORMALIDAD)';
	
	var div = cE('div', introPopup);
	div.innerHTML = 'Este proyecto fue realizado durante el aislamiento obligatorio decretado por la pandemia del COVID-19 en el año 2020.<br> '+
	'Te invitamos a recorrer este Sitio web con una actitud contemplativa y hacer uso de audífonos para escuchar todos los matices sonoros.';
	
	var div = cE('div', introPopup);
	div.id = 'cBoton';
	
	var span = cE('span', div);
	span.innerHTML = 'ENTRAR';
	span.className = 'boton';
	span.onclick = function()
	{
		introPopup.style.display = 'none';
		videosControl();		
	}		
}