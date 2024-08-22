class Triangle{
	constructor(){
		this.type = 'triangle';
		this.color = [1.0,1.0,1.0,1.0];
		this.textureNum = 0;
		this.matrix = new Matrix4();
		this.vertexBuffer = null;
		this.uvBuffer = null;
		this.vertices = null;
		this.uvCoordinates = null;
	}
	
	generateVertices(){
		var d = 20/200.0;
		var v = [0,0,0, d,0,0, 0,d,0];
		var uv = [0,0, d,0, 0,d];
		this.vertices = new Float32Array(v);
		this.uvCoordinates = new Float32Array(uv);
	}
	
	render(){
		var rgba = this.color;
		var n = 3;
			
		// Pass the color of a point to u_FragColor variable
		gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]); 
		
		if (this.vertices === null) {
			this.generateVertices();
		}

		if (this.vertexBuffer === null) {
			this.vertexBuffer = gl.createBuffer();
			if (!this.vertexBuffer) {
			console.log("Failed to create the buffer object");
			return -1;
			}
		}
		
		// Bind the buffer object to target
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

		// Write data into the buffer object
		gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

		// Assign the buffer object to aPosition variable
		gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

		// Enable the assignment to aPosition variable
		gl.enableVertexAttribArray(a_Position);
		
		//Create buffer object for UV
		if(this.uvBuffer === null){
			this.uvBuffer = gl.createBuffer();
			if(!this.uvBuffer){
				console.log('failed to create the buffer object');
				return -1;
			}
		}
			
		//Bind the buffer object to target
		gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
		
		//Write date into the buffer object
		gl.bufferData(gl.ARRAY_BUFFER, this.uvCoordinates, gl.DYNAMIC_DRAW);
		
		//Assign the buffer object to a_UV variable
		gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0,0);
		
		//Enable the assignment to a_UV variable
		gl.enableVertexAttribArray(a_UV);

		gl.drawArrays(gl.TRIANGLES, 0, n);
	}
	
}

/*function drawTriangle3D(vertices){
	var n = 3;
		
	// Create a buffer Object
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create the buffer object');
		return -1;
	}
	
	// Bind buffer object to target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// Write data into the buffer Object
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	
	
	// Assign the buffer object to a_position variable
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
	
	
	// Enable the assignment to a_Position variable
	gl.enableVertexAttribArray(a_Position);
	
	gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangle3DUV(vertices, uv){
	var n = 3;
		
	// Create a buffer Object
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create the buffer object');
		return -1;
	}
	
	// Bind buffer object to target
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	// Write data into the buffer Object
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
	
	
	// Assign the buffer object to a_position variable
	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
	
	
	// Enable the assignment to a_Position variable
	gl.enableVertexAttribArray(a_Position);
	
	//Create buffer object for UV
	var uvBuffer = gl.createBuffer();
	if(!uvBuffer){
		console.log('failed to create the buffer object');
	}
		
	//Bind the buffer object to target
	gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
	
	//Write date into the buffer object
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYAMIC_DRAW);
	
	//Assign the buffer object to a_UV variable
	gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0,0);
	
	//Enable the assignment to a_UV variable
	gl.enableVertexAttribArray(a_UV);
	
	gl.drawArrays(gl.TRIANGLES, 0, n);
}*/