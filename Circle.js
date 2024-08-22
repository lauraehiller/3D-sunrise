class Circle{
	constructor(){
		this.type = 'circle';
		//this.position = [0.0,0.0,0.0];
		this.color = [1.0,1.0,1.0,1.0];
		this.textureNum = 0;
		this.lightNum = 0;
		this.matrix = new Matrix4();
		this.normalmatrix = new Matrix4();
		this.vertexBuffer = null;
		this.normalBuffer = null;
		this.uvBuffer = null;
		this.vertices = null;
		this.uvCoordinates = null;
		this.normals = null;

		this.position = new Vector3([0, 0, 0]);
		this.rotation = new Vector3([0, 0, 0]);
		this.scale = new Vector3([1, 1, 1]);
	}
	
	generateVertices(){
		
		let v = [];
		let uv = [];
		let n = [];
		
		let angleStep = 360/30;
		for(var angle = 0; angle < 360; angle = angle + angleStep){
			let angle1 = angle;
			let angle2 = angle+angleStep;
			let vec1 = [Math.cos(angle1*Math.PI/180), Math.sin(angle1*Math.PI/180)];
			let vec2 = [Math.cos(angle2*Math.PI/180), Math.sin(angle2*Math.PI/180)];
			let pt1 = [vec1[0], vec1[1]];
			let pt2 = [vec2[0], vec2[1]];
			
			//v.push(0,0,0, pt1[0],pt1[1],0, pt2[0],pt2[1],0);
			v.push(0,0,0, pt1[0],0,pt1[1], pt2[0],0,pt2[1]);
			uv.push(0,0, pt1[0], pt1[1], pt2[0],pt2[1]);
			n.push(0,1,0, 0,1,0, 0,1,0);
		}
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
			
		gl.uniform1i(u_whichTexture, this.textureNum);

		gl.uniform1i(u_whichlight, this.lightNum);

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

		gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
		
	}
	
}