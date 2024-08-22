class Cube{
	constructor(){
		this.type = 'cube';
		this.color = [1.0,1.0,1.0,1.0];
		this.textureNum = 0;
		this.lightNum = 0;
		this.texture = 0;
		this.matrix = new Matrix4();
		this.normalmatrix = new Matrix4();
		this.vertexBuffer = null;
		this.uvBuffer = null;
		this.normalBuffer = null;
		this.vertices = null;
		this.uvCoordinates = null;
		this.normals = null;

		this.position = new Vector3([0, 0, 0]);
		this.rotation = new Vector3([0, 0, 0]);
		this.scale = new Vector3([1, 1, 1]);
	}
	
	generateVertices(){
		var v = [
			//FRONT
			-0.5,0.5,0.5, -0.5,-0.5,0.5, 0.5,-0.5,0.5,
			-0.5,0.5,0.5, 0.5,-0.5,0.5, 0.5,0.5,0.5,
			//BACK
			-0.5,0.5,-0.5, -0.5,-0.5,-0.5, 0.5,-0.5,-0.5,
			-0.5,0.5,-0.5, 0.5,-0.5,-0.5, 0.5,0.5,-0.5,
			//LEFT
			-0.5,0.5,-0.5, -0.5,-0.5,-0.5, -0.5,-0.5,0.5,
			-0.5,0.5,-0.5, -0.5,-0.5,0.5, -0.5,0.5,0.5,
			//RIGHT
			0.5,0.5,0.5, 0.5,-0.5,0.5, 0.5,-0.5,-0.5,
			0.5,0.5,0.5, 0.5,-0.5,-0.5, 0.5,0.5,-0.5,
			//TOP
			-0.5,0.5,-0.5, -0.5,0.5,0.5, 0.5,0.5,0.5,
			-0.5,0.5,-0.5, 0.5,0.5,0.5, 0.5,0.5,-0.5,
			//BOTTOM
			-0.5,-0.5,0.5, -0.5,-0.5,-0.5, 0.5,-0.5,-0.5,
			-0.5,-0.5,0.5, 0.5,-0.5,-0.5, 0.5,-0.5,0.5,

		];
		var uv = [
			0,1, 0,0, 1,0, 0,1, 1,0, 1,1, //Front
			0,1, 0,0, 1,0, 0,1, 1,0, 1,1, // BACK
			0,1, 0,0, 1,0, 0,1, 1,0, 1,1, // LEFT
			0,1, 0,0, 1,0, 0,1, 1,0, 1,1, // RIGHT
			0,1, 0,0, 1,0, 0,1, 1,0, 1,1, // TOP
			0,1, 0,0, 1,0, 0,1, 1,0, 1,1, // BOTTOM
		];

		var n = [
			0,0,1, 0,0,1, 0,0,1, //Front
			0,0,1, 0,0,1, 0,0,1,
			0,0,-1, 0,0,-1, 0,0,-1, //Back
			0,0,-1, 0,0,-1, 0,0,-1,
			-1,0,0, -1,0,0, -1,0,0, //Left
			-1,0,0, -1,0,0, -1,0,0,
			1,0,0, 1,0,0, 1,0,0, //Right
			1,0,0, 1,0,0, 1,0,0,
			0,1,0, 0,1,0, 0,1,0, //Top
			0,1,0, 0,1,0, 0,1,0,
			0,-1,0, 0,-1,0, 0,-1,0, //Bottom
			0,-1,0, 0,-1,0, 0,-1,0,
		];

		this.vertices = new Float32Array(v);
		this.uvCoordinates = new Float32Array(uv);
		this.normals = new Float32Array(n);
		
	}

	update() {
		this.normalmatrix.setInverseOf(this.matrix).transpose();
		gl.uniformMatrix4fv(u_NormalMatrix, false,this.normalmatrix.elements);
		if(g_normalOn){
            this.textureNum = -3;
        }else{
            this.textureNum = this.texture;
        }

		let [x, y, z] = this.position.elements;
		let [rx, ry, rz] = this.rotation.elements;
		let [sx, sy, sz] = this.scale.elements;
	
		this.matrix
		  .setTranslate(x, y, z)
		  .rotate(rx, 1, 0, 0)
		  .rotate(ry, 0, 1, 0)
		  .rotate(rz, 0, 0, 1)
		  .scale(sx, sy, sz);
	}
	
	
	render(){
		this.update();
		var rgba = this.color;
		
		//Pass the texture number
		gl.uniform1i(u_whichTexture, this.textureNum);
		gl.uniform1i(u_whichlight, this.lightNum);

		// Pass the color of a point to u_FragColor variable
		gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]);  
		
		//Pass the matrix to u_ModelMatrix attribute
		gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
		
		if (this.vertices === null) {
			this.generateVertices();
		}
		
		//Create buffer for vertices
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
		
		//Create buffer object for Normals
		if(this.normalBuffer === null){
			this.normalBuffer = gl.createBuffer();
			if(!this.normalBuffer){
				console.log('failed to create the buffer object');
				return -1;
			}
		}
			
		//Bind the buffer object to target
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
		
		//Write date into the buffer object
		gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.DYNAMIC_DRAW);
		
		//Assign the buffer object to a_UV variable
		gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0,0);
		
		//Enable the assignment to a_UV variable
		gl.enableVertexAttribArray(a_Normal);

		gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length/3);		
		
	}
	
}