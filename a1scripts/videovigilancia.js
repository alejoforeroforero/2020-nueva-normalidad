var listaVideosVigilancia;
var numeroDeVideosVigilancia = 44;
var numerosReorganizados = [];
var localidades = ["Usaquén", "Chapinero", "Santa Fe", "San Cristobal", "Usme", "Tunjuelito", "Bosa", "Kennedy", "Fontibón", "Engativá", "Suba", "Barrios Unidos", "Teusaquillo", "Los Mártires", "Antonio Nariño", "Puente Aranda", "La candelaria", "Rafael Uribe Uribe", "Ciudad Bolivar", "Sumapaz"]
var divFecha;
var horaIntervalo = null;

function reorganizar()
{	
	var indexActual = numerosReorganizados.length, valorTemporal, randomIndex;
	
	while (0 !== indexActual) 
	{
		randomIndex = Math.floor(Math.random() * indexActual);
		indexActual -= 1;
	
		var valorTemporal = numerosReorganizados[indexActual];
		numerosReorganizados[indexActual] = numerosReorganizados[randomIndex];
		numerosReorganizados[randomIndex] = valorTemporal;
	}
}

function videosControl()
{	
	contenedorProyectos.innerHTML = '';
	contenedorProyectos.style.display = 'block';
	
	divFecha = cE('div', contenedorProyectos);
	divFecha.innerHTML = '22 de octubre';
	divFecha.id = 'divFecha';
	
	listaVideosVigilancia = [];
	
	var videosContenedor = cE('div', contenedorProyectos);
	videosContenedor.id = 'videosContenedor';
	
	for(var i=0; i<numeroDeVideosVigilancia; i++)
	{
		numerosReorganizados.push(i);
	}
	
	reorganizar();	
	
	for(var i=0; i<numerosReorganizados.length; i++)
	{	
		var videoContenedor = cE('div', videosContenedor);
		videoContenedor.className = 'videoContenedor';
		
		var nVideo = numerosReorganizados[i];
		
		var nLocalidad = Math.floor(Math.random()*localidades.length);	
		
		var videoObj = new VideoObj();
		videoObj.enlace = 'a4videos/camaracontrol/' + nVideo + '.mp4';
		videoObj.videoContenedor = videoContenedor;
		videoObj.localidad = localidades[nLocalidad];
		videoObj.construir();	
	
		listaVideosVigilancia.push(videoObj);
	}	
	
	var numerosContenedor = cE('div', contenedorProyectos);
	numerosContenedor.id = 'numerosContenedor';
	
	for(var i=0; i<numeroDeVideosVigilancia; i++)
	{	
		var spanN = cE('span', numerosContenedor);
		spanN.innerHTML = i+1;
		spanN.className = 'spanN';
		
		adjuntarPlay(spanN, i);
	}	
}

function adjuntarPlay(spanN, i)
{
	spanN.onclick = function()
	{
		var videoObj = listaVideosVigilancia[i];
		
		if(videoObj.estaEnPause)
		{
			if(!videoObj.yaTieneVideo)
			{
				var video = cE('video', videoObj.videoContenedor)
				video.src = videoObj.enlace;
				video.style.opacity = 0;
				video.style.marginLeft = '-30%';
				video.style.marginTop = (window.innerWidth < 600) ? '-70%' : '-30%';
				videoObj.video = video;	
				
				videoObj.yaTieneVideo = true;
			}
			
			videoObj.video.play();
			videoObj.video.loop = true;
			videoObj.video.volume = 0.1;
			videoObj.video.style.opacity = 1;
			videoObj.enVivo.style.opacity = 1;
			videoObj.estaEnPause = false;
			
			videoObj.videoContenedor.style.cursor = 'pointer';
			videoObj.videoContenedor.onclick = function()
			{
				videoObj.ponerEnPantallaCompleta();
			}
		
			spanN.className = 'spanNPlay';	
		}
		else
		{
			spanN.className = 'spanN';
			videoObj.estaEnPause = true;
			videoObj.video.pause();
			videoObj.video.style.opacity = 0;
			videoObj.enVivo.style.opacity = 0;
			
			videoObj.videoContenedor.style.cursor = 'crosshair';
			videoObj.videoContenedor.onclick = null;
		}
	}	
}

function construirVideoVigilancia()
{
	thisVidObj = this;
	
	var enVivo = cE('span', thisVidObj.videoContenedor);	
	enVivo.id = 'enVivo';
	enVivo.innerHTML = 'En vivo';
	enVivo.style.opacity = 0;
	thisVidObj.enVivo = enVivo;			
}

function ponerEnPantallaCompleta()
{
	var thisVidObj = this;
	
	thisVidObj.videoContenedor.className = 'pantallaCompleta';
	thisVidObj.video.volume = 1;
	thisVidObj.video.style.marginTop = (window.innerWidth < 600) ? '-18%' : '-16%';
	thisVidObj.video.style.marginLeft = '0%';
	thisVidObj.videoContenedor.style.height = window.innerHeight + 'px';
	
	var fechaObj = new Date();		
	var hoy = fechaObj.getDate() + '/' + (fechaObj.getMonth() + 1) + '/' + fechaObj.getFullYear();
	var hora = fechaObj.getHours() + ':' + fechaObj.getMinutes() + ':' + fechaObj.getSeconds();	
	divFecha.innerHTML = 'Bogotá. Localidad: ' + thisVidObj.localidad + '. ' + hoy + ' ' + hora;	
	
	divFecha.style.display = 'block';	
	
	horaIntervalo = setInterval(function()
	{		
		var fechaObj = new Date();		
		var hoy = fechaObj.getDate() + '/' + (fechaObj.getMonth() + 1) + '/' + fechaObj.getFullYear();
		var hora = fechaObj.getHours() + ':' + fechaObj.getMinutes() + ':' + fechaObj.getSeconds();	
		divFecha.innerHTML = 'Bogotá. Localidad: ' + thisVidObj.localidad + '. ' + hoy + ' ' + hora;
		
		console.log(fechaObj.getSeconds());
		
	}, 1000)
	
	
	setTimeout(function()
	{
		clearInterval(horaIntervalo);
		
		horaIntervalo = null;
		
		thisVidObj.videoContenedor.className = 'videoContenedor';
		thisVidObj.video.style.marginTop = '-30%';
		thisVidObj.video.style.marginLeft = '-30%';
		thisVidObj.video.volume = 0.1;
		divFecha.style.display = 'none';
		
	}, 8000);
}

function VideoObj()
{
	this.video;
	this.construir = construirVideoVigilancia;
	this.estaEnPause = true;
	this.ponerEnPantallaCompleta = ponerEnPantallaCompleta;	
	this.yaTieneVideo = false;
}
