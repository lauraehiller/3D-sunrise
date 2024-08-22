class Pyramid{
	constructor(){
		this.type = 'pyramid';
		this.position = [0.0,0.0,0.0];
		this.color = [1.0,1.0,1.0,1.0];
		this.textureNum = 0;
		this.matrix = new Matrix4();
		this.vertexBuffer = null;
		this.uvBuffer = null;
		this.vertices = null;
		this.uvCoordinates = null;
	}
	
	generateVertices(){
		let v = [
			0,0,0, 1,0,0, .5,1,0, //Front
			0,0,1, 1,0,1, .5,1,1, //Back
			0,0,0, 0,0,1, 1,0,1, //Bottom
			0,0,0, 1,0,1, 1,0,0,
			0,0,0, 0,0,1, .5,1,0, //Left
			.5,1,0, 0,0,1, .5,1,1,
			1,0,0, 1,0,1, .5,1,0, //Right
			.5,1,0, 1,0,1, .5,1,1,
		];
		let uv = [
			0,0, 1,0, .5,1,
			0,0, 1,0, .5,1, 
			0,0, 0,0, 1,0, 
			0,0, 1,0, 1,0,
			0,0, 0,0, .5,1, 
			.5,1, 0,0, .5,1,
			1,0, 1,0, .5,1, 
			.5,1, 1,0, .5,1,
		];
		
		this.vertices = new Float32Array(v);
		this.uvCoordinates = new Float32Array(uv);
		
	}
	
	render(){
		var rgba = this.color;
			
		// Pass the color of a point to u_FragColor variable
		gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]);  
		
		//Pass the matrix to u_ModelMatrix attribute
		gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
		
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

		// Write date into the buffer object
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

		gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length/3);	
		
	}
	
}