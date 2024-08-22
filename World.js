// World.js
// Vertex shader program
var VSHADER_SOURCE = `
	precision mediump float;
	attribute vec4 a_Position;
	attribute vec2 a_UV;
	attribute vec3 a_Normal;
	varying vec2 v_UV;
	varying vec3 v_Normal;
	varying vec4 v_VertPos;
	uniform mat4 u_ModelMatrix;
	uniform mat4 u_GlobalRotateMatrix;
	uniform mat4 u_ViewMatrix;
	uniform mat4 u_ProjectionMatrix;
	uniform mat4 u_NormalMatrix;
	void main() {
	  gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
	  v_UV = a_UV;
	  v_Normal = normalize(vec3(u_NormalMatrix * vec4(a_Normal, 1)));
	  v_VertPos = u_ModelMatrix * a_Position;
	}`

// Fragment shader program
var FSHADER_SOURCE = `
	precision mediump float;
	varying vec2 v_UV;
	varying vec3 v_Normal;
	uniform vec3 u_lightPos;
	varying vec4 v_VertPos;
	uniform vec4 u_FragColor;
	uniform vec3 u_cameraPos;
	uniform sampler2D u_Sampler0;
	uniform sampler2D u_Sampler1;
	uniform sampler2D u_Sampler2;
	uniform sampler2D u_Sampler3;
	uniform sampler2D u_Sampler4;
	uniform sampler2D u_Sampler5;
	uniform int u_whichTexture;
	uniform int u_whichlight;
	uniform bool u_lightOn;

	uniform vec3 u_spotlightPos;
	uniform vec3 u_spotlightDirection;
	uniform float u_spotlimit;
	void main() {
		if(u_whichTexture == -4){
			gl_FragColor = u_FragColor;
		}else if(u_whichTexture == -3){
			gl_FragColor = vec4((v_Normal + 1.0)/2.0, 1.0);
		}else if(u_whichTexture == -2){
			gl_FragColor = u_FragColor;
		}else if(u_whichTexture == -1){
			gl_FragColor = vec4(v_UV,1.0,1.0);
		}else if(u_whichTexture == 0){
			gl_FragColor = texture2D(u_Sampler0, v_UV);
		}else if(u_whichTexture == 1){
			gl_FragColor = texture2D(u_Sampler1, v_UV);
		}else if(u_whichTexture == 2){
			gl_FragColor = texture2D(u_Sampler2, v_UV);
		}else if(u_whichTexture == 3){
			gl_FragColor = texture2D(u_Sampler3, v_UV);
		}else if(u_whichTexture == 4){
			gl_FragColor = texture2D(u_Sampler4, v_UV);
		}else if(u_whichTexture == 5){
			gl_FragColor = texture2D(u_Sampler5, v_UV);
		}else{
			gl_FragColor = vec4(1.0,0.0,0.0,1.0);
		}

			vec3 N = normalize(v_Normal);
			vec3 E = normalize(u_cameraPos - vec3(v_VertPos));
			vec3 ambient = vec3(gl_FragColor) * 0.2;

			//Sunlight
			vec3 lightVector = u_lightPos - vec3(v_VertPos);
			vec3 L = normalize(lightVector);
			float nDotL = max(dot(N,L), 0.0);
			vec3 R = reflect(-L,N);
			float specular = pow(max(dot(E,R),0.0),10.0);
			vec3 diffuse = vec3(gl_FragColor) * nDotL * 1.0;

			//Spotlight
			vec3 spotlightVector = u_spotlightPos - vec3(v_VertPos);
			vec3 A = normalize(spotlightVector);
			float nDota = max(dot(N,A), 0.0);
			float dotFromDirection = dot(A,u_spotlightDirection);
			vec3 r = reflect(-A,N);			
			float spec = pow(max(dot(E,r),0.0),5.0);	
			vec3 diff = vec3(gl_FragColor) * nDota * 1.0;
			vec3 amb = vec3(gl_FragColor) * 1.0;			

			if(u_lightOn){
				if(u_whichlight == 3){
					ambient *= 3.0;
					specular = pow(max(dot(E,R),0.0),100.0);
					gl_FragColor = vec4(diffuse+specular+ambient, 1.0);
				}else if(u_whichlight == 2){
					ambient *= 5.0;
					diffuse * 10.0;
					specular = pow(max(dot(E,R),0.0),10.0)*0.0;
					gl_FragColor = vec4(diffuse+specular+ambient, 1.0);
				}else if(u_whichlight == 1){
					gl_FragColor = vec4(diffuse+ambient, 1.0);
				}else if(u_whichlight == 0){
					gl_FragColor = vec4(diffuse+specular+ambient, 1.0);
				}
				if(dotFromDirection <= u_spotlimit){
					gl_FragColor = vec4(diff+spec+amb, 1.0);
				}
			}
		
	}`

//Global Variables
let canvas;
let gl;
let a_position;
let a_UV;
let a_Normal;
let u_FragColor;
let u_whichTexture;
let u_lightPos;
let u_cameraPos;
let u_whichlight;

let u_spotlightPos;
let u_spotlightDirection;
let u_spotlimit;


//Matrices
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix;
let u_NormalMatrix;

//Textures
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_Sampler5;


function setupWebGL(){
	// Retrieve <canvas> element
	canvas = document.getElementById('webgl');

	// Get the rendering context for WebGL
	gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
	if (!gl) {
		console.log('Failed to get the rendering context for WebGL');
		return;
	}
	
	gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL(){
	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to intialize shaders.');
		return;
	}

	// Get the storage location of a_position variable
	a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return;
	}
	
	// Get the storage location of a_UV variable
	a_UV = gl.getAttribLocation(gl.program, 'a_UV');
	if (a_UV < 0) {
		console.log('Failed to get the storage location of a_UV');
		return;
	}

	// Get the storage location of a_Normal variable
	a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
	if (a_Normal < 0) {
		console.log('Failed to get the storage location of a_Normal');
		return;
	}

	u_lightPos = gl.getUniformLocation(gl.program, 'u_lightPos');
	if (u_lightPos < 0) {
		console.log('Failed to get the storage location of u_lightPos');
		return;
	}

	u_spotlightPos = gl.getUniformLocation(gl.program, 'u_spotlightPos');
	if (u_spotlightPos < 0) {
		console.log('Failed to get the storage location of u_spotlightPos');
		return;
	}

	u_spotlightDirection = gl.getUniformLocation(gl.program, 'u_spotlightDirection');
	if (u_spotlightDirection < 0) {
		console.log('Failed to get the storage location of u_spotlightDirection');
		return;
	}

	u_spotlimit = gl.getUniformLocation(gl.program, 'u_spotlimit');
	if (u_spotlimit < 0) {
		console.log('Failed to get the storage location of u_spotlimit');
		return;
	}

	u_cameraPos = gl.getUniformLocation(gl.program, 'u_cameraPos');
	if (u_cameraPos < 0) {
		console.log('Failed to get the storage location of u_cameraPos');
		return;
	}
	
	// Get the storage location of u_FragColor variable
	u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if (u_FragColor < 0) {
		console.log('Failed to get the storage location of u_FragColor');
		return;
	}

	// Get the storage location of u_FragColor variable
	u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
	if (u_whichTexture < 0) {
		console.log('Failed to get the storage location of u_whichTexture');
		return;
	}

	// Get the storage location of u_FragColor variable
	u_whichlight = gl.getUniformLocation(gl.program, 'u_whichlight');
	if (u_whichlight < 0) {
		console.log('Failed to get the storage location of u_whichlight');
		return;
	}

	u_lightOn = gl.getUniformLocation(gl.program, 'u_lightOn');
	if(u_lightOn < 0){
		console.log('Failed to get the storage location of u_lightOn ');
		return;
	}
	
	//Matrices
	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	if(u_ModelMatrix < 0){
		console.log('Failed to get the storage location of u_ModelMatrix');
		return;
	}
	
	u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
	if(u_GlobalRotateMatrix < 0){
		console.log('Failed to get the storage location of u_GlobalRotateMatrix');
		return;
	}

	u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
	if(u_ProjectionMatrix < 0){
		console.log('Failed to get the storage location of u_ProjectionMatrix');
		return;
	}

	u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
	if(u_ViewMatrix < 0){
		console.log('Failed to get the storage location of u_ViewMatrix');
		return;
	}

	u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	if(u_NormalMatrix < 0){
		console.log('Failed to get the storage location of u_NormalMatrix');
		return;
	}
	//Textures
	u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
	if(u_Sampler0 < 0){
		console.log('Failed to get the storage location of u_Sampler0 ');
		return;
	}

	u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
	if(u_Sampler1 < 0){
		console.log('Failed to get the storage location of u_Sampler1 ');
		return;
	}

	u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
	if(u_Sampler2 < 0){
		console.log('Failed to get the storage location of u_Sampler2 ');
		return;
	}

	u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
	if(u_Sampler3 < 0){
		console.log('Failed to get the storage location of u_Sampler3 ');
		return;
	}
	u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
	if(u_Sampler4 < 0){
		console.log('Failed to get the storage location of u_Sampler4 ');
		return;
	}
	u_Sampler5 = gl.getUniformLocation(gl.program, 'u_Sampler5');
	if(u_Sampler5 < 0){
		console.log('Failed to get the storage location of u_Sampler5 ');
		return;
	}

	//Set an initial value for this matrix to identify
	var identityM = new Matrix4();
	gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

//Camera Angles
var g_camera;

//Gobals for UI Elements
let g_globalAnglex = 0;
let g_globalAngley = 0;
let g_Animation = true;
let g_normalOn = false;
let g_lightOn = true;
let g_lightPos = [0,20,-1050];
let g_spotlightPos = [0,0,-10];
let g_lightPosx = 0;
let g_lightPosy = 0;
let g_lightPosz = 0;

//Shapes list
var g_shapesList = [];

//Set up actions for the HTML UI elements
function addActionsForHtmlUI(){
	
	//Button Events
	document.getElementById('normalOn').onclick = function(){g_normalOn = true;};
	document.getElementById('normalOff').onclick = function(){g_normalOn = false;};
	document.getElementById('lightOn').onclick = function(){g_lightOn = true;};
	document.getElementById('lightOff').onclick = function(){g_lightOn = false;};
	document.getElementById('sunriseOn').onclick = function(){g_Animation = true;};
	document.getElementById('sunriseOff').onclick = function(){g_Animation = false;};

	//Slider Events
	document.getElementById('lightSlideX').addEventListener('mousemove', function(ev){if(ev.buttons == 1){g_lightPosx = this.value;  renderAllShapes();}});
	document.getElementById('lightSlideY').addEventListener('mousemove', function(ev){if(ev.buttons == 1){g_lightPosy = this.value;  renderAllShapes();}});
	document.getElementById('lightSlideZ').addEventListener('mousemove', function(ev){if(ev.buttons == 1){g_lightPosz = this.value;  renderAllShapes();}});
}

function main() {
	
	setupWebGL();
	connectVariablesToGLSL();
	addActionsForHtmlUI();
	initTextures(gl,0);
	initTextures(gl,1);
	initTextures(gl,2);
	initTextures(gl,3);
	initTextures(gl,4);
	initTextures(gl,5);

	g_camera = new Camera();
	
	// Register function (event handler) to be called on a mouse press
	canvas.onmousemove = function(ev) { if(ev.buttons == 1 ){click(ev)} };

	document.onkeydown = keydown;

	// Specify the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	createAllShapes();

	requestAnimationFrame(tick);
}

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

function tick(){
	g_seconds = performance.now()/500.0 - g_startTime;
	
	updateAnimationAngles();

	renderAllShapes();

	//Tell the browser to update again when it has time
	requestAnimationFrame(tick);
}

let sunRot = 0;
let skyr = 200/255;
let skyb = 250/255;
let skyg = 255/255;
let sunr = 255/255;
let sunb = 250/255;
let sung = 204/255;
let red = [255/255,215/255,215/255];
let yellow = [255/255,255/255,235/255];
let blue = [235/255,255/255,255/255];
let black = [0.0,0.0,0.0,1];
let change = true;
function updateAnimationAngles(){	
	if(g_Animation){
		if(change){
			sunRot += .03;
			if((sunRot >= 0 && sunRot < 15 )){ //Black to Red
				//console.log(Math.sin(sunRot * (Math.PI/180)));
				/*skyr = (red[0]-sky.color[0])*Math.sin(sunRot * (Math.PI/180))+sky.color[0];
				skyg = (red[1]-sky.color[1])*Math.sin(sunRot * (Math.PI/180))+sky.color[1];
				skyb = (red[2]-sky.color[2])*Math.sin(sunRot * (Math.PI/180))+sky.color[2];*/
				skyr = (red[0]-sky.color[0])*(.075*.03)+sky.color[0];
				skyg = (red[1]-sky.color[1])*(.075*.03)+sky.color[1];
				skyb = (red[2]-sky.color[2])*(.075*.03)+sky.color[2];
			}else if((sunRot >= 15 && sunRot < 45 )){ //Red to Yellow
				/*skyr = (yellow[0]-sky.color[0])*Math.sin(sunRot * (Math.PI/180))+sky.color[0];
				skyg = (yellow[1]-sky.color[1])*Math.sin(sunRot * (Math.PI/180))+sky.color[1];
				skyb = (yellow[2]-sky.color[2])*Math.sin(sunRot * (Math.PI/180))+sky.color[2];*/
				skyr = (yellow[0]-sky.color[0])*(.05*.03)+sky.color[0];
				skyg = (yellow[1]-sky.color[1])*(.05*.03)+sky.color[1];
				skyb = (yellow[2]-sky.color[2])*(.05*.03)+sky.color[2];
			}else if((sunRot >= 45 && sunRot < 90 )){ //Yellow to Blue
				/*skyr = (blue[0]-sky.color[0])*Math.sin(sunRot * (Math.PI/180))+sky.color[0];
				skyg = (blue[1]-sky.color[1])*Math.sin(sunRot * (Math.PI/180))+sky.color[1];
				skyb = (blue[2]-sky.color[2])*Math.sin(sunRot * (Math.PI/180))+sky.color[2];*/
				skyr = (blue[0]-sky.color[0])*(.125*.03)+sky.color[0];
				skyg = (blue[1]-sky.color[1])*(.125*.03)+sky.color[1];
				skyb = (blue[2]-sky.color[2])*(.125*.03)+sky.color[2];
			}else if((sunRot >= 90 && sunRot < 135 )){ //Blue to yellow
				/*skyr = (yellow[0]-sky.color[0])*Math.sin(sunRot * (Math.PI/180))+sky.color[0];
				skyg = (yellow[1]-sky.color[1])*Math.sin(sunRot * (Math.PI/180))+sky.color[1];
				skyb = (yellow[2]-sky.color[2])*Math.sin(sunRot * (Math.PI/180))+sky.color[2];*/
				skyr = (yellow[0]-sky.color[0])*(.125*.03)+sky.color[0];
				skyg = (yellow[1]-sky.color[1])*(.125*.03)+sky.color[1];
				skyb = (yellow[2]-sky.color[2])*(.125*.03)+sky.color[2];
			}else if((sunRot >= 135 && sunRot < 165)){ //Yellow to Red
				/*skyr = (red[0]-sky.color[0])*Math.sin(sunRot * (Math.PI/180))+sky.color[0];
				skyg = (red[1]-sky.color[1])*Math.sin(sunRot * (Math.PI/180))+sky.color[1];
				skyb = (red[2]-sky.color[2])*Math.sin(sunRot * (Math.PI/180))+sky.color[2];*/
				skyr = (red[0]-sky.color[0])*(.05*.03)+sky.color[0];
				skyg = (red[1]-sky.color[1])*(.05*.03)+sky.color[1];
				skyb = (red[2]-sky.color[2])*(.05*.03)+sky.color[2];
			}else if((sunRot >= 165 && sunRot < 270)){ //Red to Black
				//console.log(Math.sin(sunRot * (Math.PI/180)));
				/*skyr = (black[0]-sky.color[0])*Math.sin(sunRot * (Math.PI/180))+sky.color[0];
				skyg = (black[1]-sky.color[1])*Math.sin(sunRot * (Math.PI/180))+sky.color[1];
				skyb = (black[2]-sky.color[2])*Math.sin(sunRot * (Math.PI/180))+sky.color[2];*/
				skyr = (black[0]-sky.color[0])*(.075*.03)+sky.color[0];
				skyg = (black[1]-sky.color[1])*(.075*.03)+sky.color[1];
				skyb = (black[2]-sky.color[2])*(.075*.03)+sky.color[2];
			}else if(sunRot > 270){
				skyr = 0.0;
				skyg = 0.0;
				skyb = 0.0;
			}
			change = false;
		}else{
			change = true;
		}
		//console.log(sky.color[0],sky.color[1],sky.color[2]);
		sung = ((Math.sin(sunRot * (Math.PI/180))*255) - 5)/255;
		sunb = ((Math.sin(sunRot * (Math.PI/180))*255)-56)/255;
		
		if(sunRot == 360.0){
			sunRot = 0;
		}
		sky.color = [skyr, skyg, skyb, 1.0];
		sun.color = [sunr, sung, sunb, 1.0];

		let x = 1050*(Math.cos(sunRot * (Math.PI/180)));
		let y = 1050*(Math.sin(sunRot * (Math.PI/180)));
		let globe_x = 1*(Math.cos(sunRot*25 * (Math.PI/180)));
		let globe_y = 1*(Math.sin(sunRot*25 * (Math.PI/180)));

		globe.position.elements = [globe_x,3.5,20+globe_y];
		g_lightPos = [g_lightPosx,y+g_lightPosy,-x-g_lightPosz];
		sphere.rotation.elements = [0, sunRot * 5, 0];
	}
}

let previousPosition = [0,0];

function click(ev) {

	//extract the event click and return it in webgl coordinares
	let [x,y] = convertCoordinates(ev);
	if(previousPosition[0] < [x,y][0]){
		g_camera.panRight();
	}else if(previousPosition[0] > [x,y][0]){	
		g_camera.panLeft();
	}else if(previousPosition[1] < [x,y][1]){
		g_camera.panUp();
	}else if(previousPosition[1] > [x,y][1]){
		g_camera.panDown();
	}
	previousPosition = [x,y];
}

//extract the event click and return it in webgl coordinares
function convertCoordinates(ev){
	var x = ev.clientX; // x coordinate of a mouse pointer
	var y = ev.clientY; // y coordinate of a mouse pointer
	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

	return [x,y];
}

function convertDrawingCoordinates(x,y){
	x = (x - (canvas.width/2))/(canvas.width/2);
	y = ((canvas.height/2)-y)/(canvas.height/2);
	return[x,y];
}

function keydown(ev){
	if(ev.keyCode == 87){ //Move Forward
		g_camera.moveForward();
	}else if(ev.keyCode == 83){ //Move backward
		g_camera.moveBackward();
	}else if(ev.keyCode == 65){ //Move Left
		g_camera.moveLeft();
	}else if(ev.keyCode == 68){ //Move Right
		g_camera.moveRight();
	}else if(ev.keyCode == 81){ //Pan Left
		g_camera.panLeft();
	}else if(ev.keyCode == 69){ //Pan Right
		g_camera.panRight();
	}
}

var sun;
var moon;
var sky;
var spot;
function createAllShapes(){

	//Sun
	sun = new Light();
	sun.color = [255,250/255,204/255,1];
	sun.textureNum = -2;
	sun.scale.elements = [-100,-100,-100];
	g_shapesList.push(sun);

	//Sky
	sky =  new Sphere();
	//sky.color = [200/255,250/255,255/255,1.0];
	sky.color = [0,0,0,1.0];
	sky.texture = -2;
	sky.lightNum = 2;
	sky.scale.elements = [-1000,-1000,-1000];
	g_shapesList.push(sky);
	
	//Water
	var ground = new Circle();
	ground.color = [0,0,1.0,1.0];
	ground.texture = 1;
	ground.lightNum = 0;
	ground.position.elements = [0,0,0];
	ground.scale.elements = [1000,0,1000];
	ground.rotation.elements = [90,0,0];
	g_shapesList.push(ground);

	drawCities();
	drawPark();
	drawhills();
}

//Draw every shape that is supposed to be on the canvas
function renderAllShapes(){

	//var spotlightDirection = [g_camera.at.elements[0], g_camera.at.elements[1], g_camera.at.elements[2]];
	var spotlightDirection = [0, -1, 0];
	var limit = (20 * 180)/Math.PI;

	gl.uniform3fv(u_spotlightDirection, spotlightDirection);
    gl.uniform1f(u_spotlimit, Math.cos(limit));

	gl.uniform3f(u_spotlightPos, g_spotlightPos[0], g_spotlightPos[1], g_spotlightPos[2]);

	gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
	gl.uniform3f(u_cameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);
	gl.uniform1i(u_lightOn, g_lightOn);
	
	//Pass the matrix to u_ProjectionMatrix attribute
	g_camera.projectionMatrix.setPerspective(g_camera.fov, canvas.width/canvas.height, .1, 1500);
	gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
	
	//Pass the matrix to u_ModelMatrix attribute
	g_camera.viewMatrix.setLookAt(g_camera.eye.elements[0],g_camera.eye.elements[1],g_camera.eye.elements[2], 
								g_camera.at.elements[0],g_camera.at.elements[1],g_camera.at.elements[2], 
								g_camera.up.elements[0],g_camera.up.elements[1],g_camera.up.elements[2]);
	gl.uniformMatrix4fv(u_ViewMatrix, false,g_camera.viewMatrix.elements);

	//Pass the matrix to u_ModelMatrix attribute
	var globalRotMat = new Matrix4().rotate(g_globalAnglex,g_globalAngley,1,0);
	gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	var len = g_shapesList.length;
	
	for(var i = 0; i < len; i++) {
		g_shapesList[i].render();
	}	
}