//Texures

function initTextures(gl, n){

	//Create image object
    if(n == 0){
        var image0 = new Image();
        if(!image0){
            console.log('Failed to create the image object');
            return false;
        }
        //Register the event handler to be called on loading an image
        image0.onload = function(){ sendImageToTEXTURE0(image0);}
        
        //Tell the browser to load an image
        image0.src = 'sky.jpg';
    }else if(n == 1){
        var image1 = new Image();
        if(!image1){
            console.log('Failed to create the image object');
            return false;
        }
        //Register the event handler to be called on loading an image
        image1.onload = function(){ sendImageToTEXTURE1(image1);}
        
        //Tell the browser to load an image
        image1.src = 'water.jpg';
    }else if(n == 2){
        var image2 = new Image();
        if(!image2){
            console.log('Failed to create the image object');
            return false;
        }
        //Register the event handler to be called on loading an image
        image2.onload = function(){ sendImageToTEXTURE2(image2);}
        
        //Tell the browser to load an image
        image2.src = 'stone.jpg';
    }else if(n == 3){
        var image3 = new Image();
        if(!image3){
            console.log('Failed to create the image object');
            return false;
        }
        //Register the event handler to be called on loading an image
        image3.onload = function(){ sendImageToTEXTURE3(image3);}
        
        //Tell the browser to load an image
        image3.src = 'wood.jpg';
    }else if(n == 4){
        var image4 = new Image();
        if(!image4){
            console.log('Failed to create the image object');
            return false;
        }
        //Register the event handler to be called on loading an image
        image4.onload = function(){ sendImageToTEXTURE4(image4);}
        
        //Tell the browser to load an image
        image4.src = 'building.jpg';
    }else if(n == 5){
        var image5 = new Image();
        if(!image5){
            console.log('Failed to create the image object');
            return false;
        }
        //Register the event handler to be called on loading an image
        image5.onload = function(){ sendImageToTEXTURE5(image5);}
        
        //Tell the browser to load an image
        image5.src = 'tile.jpg';
    }

	return true;
}

function sendImageToTEXTURE0(image){
	var texture0 = gl.createTexture();
	if(!texture0){
		console.log('Failed to create the texture object');
		return false;
	}

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //Flip the image's y axis
	//Enable texture unit0
	gl.activeTexture(gl.TEXTURE0);
	//Bind the texture object to the target
	gl.bindTexture(gl.TEXTURE_2D, texture0);

	//Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	//Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

	//Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler0, 0);

	//gl.clear(gl.COLOR_BUFFER_BIT);

	//gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	console.log('finished loadTexture');

}

function sendImageToTEXTURE1(image){
	var texture1 = gl.createTexture();
	if(!texture1){
		console.log('Failed to create the texture object');
		return false;
	}

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //Flip the image's y axis
	//Enable texture unit0
	gl.activeTexture(gl.TEXTURE1);
	//Bind the texture object to the target
	gl.bindTexture(gl.TEXTURE_2D, texture1);

	//Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	//Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

	//Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler1, 1);

	//gl.clear(gl.COLOR_BUFFER_BIT);

	//gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	console.log('finished loadTexture');

}

function sendImageToTEXTURE2(image){
	var texture2 = gl.createTexture();
	if(!texture2){
		console.log('Failed to create the texture object');
		return false;
	}

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //Flip the image's y axis
	//Enable texture unit0
	gl.activeTexture(gl.TEXTURE2);
	//Bind the texture object to the target
	gl.bindTexture(gl.TEXTURE_2D, texture2);

	//Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	//Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

	//Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler2, 2);

	//gl.clear(gl.COLOR_BUFFER_BIT);

	//gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	console.log('finished loadTexture');

}

function sendImageToTEXTURE3(image){
	var texture3 = gl.createTexture();
	if(!texture3){
		console.log('Failed to create the texture object');
		return false;
	}

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //Flip the image's y axis
	//Enable texture unit0
	gl.activeTexture(gl.TEXTURE3);
	//Bind the texture object to the target
	gl.bindTexture(gl.TEXTURE_2D, texture3);

	//Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	//Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

	//Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler3, 3);

	//gl.clear(gl.COLOR_BUFFER_BIT);

	//gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	console.log('finished loadTexture');

}

function sendImageToTEXTURE4(image){
	var texture4 = gl.createTexture();
	if(!texture4){
		console.log('Failed to create the texture object');
		return false;
	}

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //Flip the image's y axis
	//Enable texture unit0
	gl.activeTexture(gl.TEXTURE4);
	//Bind the texture object to the target
	gl.bindTexture(gl.TEXTURE_2D, texture4);

	//Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	//Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

	//Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler4, 4);

	//gl.clear(gl.COLOR_BUFFER_BIT);

	//gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	console.log('finished loadTexture');

}

function sendImageToTEXTURE5(image){
	var texture5 = gl.createTexture();
	if(!texture5){
		console.log('Failed to create the texture object');
		return false;
	}

	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //Flip the image's y axis
	//Enable texture unit0
	gl.activeTexture(gl.TEXTURE5);
	//Bind the texture object to the target
	gl.bindTexture(gl.TEXTURE_2D, texture5);

	//Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	//Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

	//Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler5, 5);

	//gl.clear(gl.COLOR_BUFFER_BIT);

	//gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	console.log('finished loadTexture');

}