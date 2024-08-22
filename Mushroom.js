//Mushroom
class Mushroom{
	constructor(){
		this.type = 'mushroom';
		this.color = [1.0,1.0,1.0,1.0];
		this.textureNum = -2;
        this.texture = -2;
		this.lightNum = 0;
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
		var v = [];
		var uv = [];
		var n = [];

        var d = Math.PI/25;
        var dd = Math.PI/25;

        for(var t=0; t<Math.PI; t+=d){
            for(var r=0; r < (Math.PI); r += d){
                var p1 = [Math.sin(t) * Math.cos(r), Math.sin(t) * Math.sin(r), Math.cos(t)];
                var p2 = [Math.sin(t+dd) * Math.cos(r), Math.sin(t+dd) * Math.sin(r), Math.cos(t+dd)];
                var p3 = [Math.sin(t) * Math.cos(r+dd), Math.sin(t) * Math.sin(r+dd), Math.cos(t)];
                var p4 = [Math.sin(t+dd) * Math.cos(r+dd), Math.sin(t+dd) * Math.sin(r+dd), Math.cos(t+dd)];

                var uv1 = [t/Math.PI, r/(2*Math.PI)];
                var uv2 = [(t+dd)/Math.PI, r/(2*Math.PI)];
                var uv3 = [t/Math.PI, (r+dd)/(2*Math.PI)];
                var uv4 = [(t+dd)/Math.PI, (r+dd)/(2*Math.PI)];

                v = v.concat(p1); uv = uv.concat(uv1); n = n.concat([0,0,0]);
                v = v.concat(p2); uv = uv.concat(uv2); n = n.concat([0,0,0]);
                v = v.concat(p4); uv = uv.concat(uv4); n = n.concat([0,0,0]);

                v = v.concat(p1); uv = uv.concat(uv1); n = n.concat([0,0,0]);
                v = v.concat(p4); uv = uv.concat(uv4); n = n.concat([0,0,0]);
                v = v.concat(p3); uv = uv.concat(uv3); n = n.concat([0,0,0]);
            }
        }

		this.vertices = new Float32Array(v);
		this.uvCoordinates = new Float32Array(uv);
		this.normals = new Float32Array(v);
		
	}

    update(){
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