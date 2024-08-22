//City
function drawCities(){

    var cityisland = new Cube();
	cityisland.color = [.5,.5,.5,1.0];
	cityisland.texture = -2;
    cityisland.lightNum = 0;
    cityisland.position.elements = [0,1,-700];
    cityisland.scale.elements = [-2000,-4,-400];
	g_shapesList.push(cityisland);

    var row1 = -500;
    var row2 = -550;
    var row3 = -600;
    var x = -50;
    var x3 = 0;

    drawBuilding(-350,28.1,row3,50,50,50);
    drawBuilding(-290,48.1,row3,50,90,50);
    drawBuilding(-230,41,row3,50,75,50);
    drawBuilding(-170,53.1,row3,50,100,50);
    drawBuilding(-110,66,row3,50,125,50);
    drawBuilding(-50,41,row3,50,75,50);
    drawBuilding(10,28.1,row3,50,50,50);
    drawBuilding(70,41,row3,50,75,50);
    drawBuilding(130,48.1,row3,50,90,50);
    drawBuilding(190,28.1,row3,50,50,50);
    drawBuilding(250,78.1,row3,50,150,50);
    drawBuilding(310,53.1,row3,50,100,50);
    drawBuilding(370,28.1,row3,50,50,50);

    drawBuilding(-350+x,16.1,row2,25,26,25);
    drawBuilding(-290+x,23.1,row2,25,40,25);
    drawBuilding(-230+x,16.1,row2,25,26,25);
    drawBuilding(-170+x,28.1,row2,25,50,25);
    drawBuilding(-110+x,41.1,row2,25,76,25);
    drawBuilding(-50+x,16.1,row2,25,26,25);
    drawBuilding(10+x,21.1,row2,25,36,25);
    drawBuilding(70+x,16.1,row2,25,26,25);
    drawBuilding(130+x,23.1,row2,25,40,25);
    drawBuilding(190+x,16.1,row2,25,26,25);
    drawBuilding(250+x,53.1,row2,25,100,25);
    drawBuilding(310+x,28.1,row2,25,50,25);
    drawBuilding(370+x,16.1,row2,25,26,25);
    
    drawBuilding(-350+x3,7.1,row1,15,8,15);
    drawBuilding(-290+x3,16.1,row1,15,26,15);
    drawBuilding(-230+x3,13.1,row1,15,20,15);
    drawBuilding(-170+x3,18.1,row1,15,30,15);
    drawBuilding(-110+x3,26.1,row1,15,46,15);
    drawBuilding(-50+x3,13.1,row1,15,20,15);
    drawBuilding(10+x3,7.1,row1,15,8,15);
    drawBuilding(70+x3,13.1,row1,15,20,15);
    drawBuilding(130+x3,16.1,row1,15,26,15);
    drawBuilding(190+x3,7.1,row1,15,8,15);
    drawBuilding(250+x3,31.1,row1,15,56,15);
    drawBuilding(310+x3,18.1,row1,15,30,15);
    drawBuilding(370+x3,7.1,row1,15,8,15);

}

function drawBuilding(x,y,z,sx,sy,sz){
    var building = new Cube();
	building.color = [0,0,1.0,1.0];
	building.texture = 4;
    building.lightNum = 0;
	building.scale.elements = [sx,sy,sz];
	building.position.elements = [x,y,z];
	g_shapesList.push(building);
}

function drawPole(x,y,z){
    var pole1 = new Cube();
    pole1.color = [1.0,1.0,1.0,1.0];
    pole1.texture = 5;
    pole1.lightNum = 3;
    pole1.position.elements = [x,y+2,z];
    pole1.scale.elements = [.2,4,.2];
    g_shapesList.push(pole1);
}
var globe;

function drawstructure(){
    drawPole(2,1.3,18);
    drawPole(2,1.3,22);
    drawPole(-2,1.3,18);
    drawPole(-2,1.3,22);

    var roof1 = new Cube();
    roof1.color = [1.0,1.0,1.0,1];
    roof1.texture = 5;
    roof1.lightNum = 3;
    roof1.position.elements = [0,5,20];
    roof1.scale.elements = [4.1,.5,4.1];
    g_shapesList.push(roof1)

    var roof2 = new Mushroom();
    roof2.color = [1.0,1.0,1.0,1];
    roof2.texture = 5;
    roof2.lightNum = 3;
    roof2.position.elements = [0,5,20];
    roof2.scale.elements = [2,2,2];
    g_shapesList.push(roof2)

    var roof3 = new Cone();
    roof3.color = [1.0,1.0,1.0,1];
    roof3.texture = 5;
    roof3.lightNum = 3;
    roof3.position.elements = [0,7,20];
    roof3.scale.elements = [2,4,2];
    roof3.rotation.elements = [-90,0,0];
    g_shapesList.push(roof3);

    spot = new spotLight();
    spot.color = [1.0,1.0,1.0,1];
    spot.textureNum = -2;
    g_spotlightPos = [0,4.6,20];
    spot.scale.elements = [-.3,-.1,-.3];
    g_shapesList.push(spot);

    globe = new Sphere();
    globe.color = [1.0,1.0,1.0,1];
    globe.texture = 0;
    globe.lightNum = 0;
    globe.position.elements = [0,3.5,20];
    globe.scale.elements = [.2,.2,.2];
    g_shapesList.push(globe);

}

function drawPlants(x,y,z){
    var planter = new Cube();
    planter.color = [1.0,1.0,1.0,1];
    planter.texture = 3;
    planter.lightNum = 0;
    planter.position.elements = [x,y,z];
    planter.scale.elements = [1,1,1];
    g_shapesList.push(planter)

    var leafcolor = [0,1,0,1];

    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            var leaf1 = new Cone();
            leaf1.color = leafcolor;
            leaf1.texture = -2;
            leaf1.lightNum = 0;
            leaf1.position.elements = [x-.4+(i*.2),y+.5,z -.4+(j*.2)];
            leaf1.scale.elements = [.5,.5,2];
            leaf1.rotation.elements = [-90,0,0];
            g_shapesList.push(leaf1)
        }
    }
}

function drawBench(x,y,z){
    var bench = new Cube();
    bench.color = [1.0,1.0,1.0,1];
    bench.texture = -2;
    bench.lightNum = 0;
    bench.position.elements = [x,y,z];
    bench.scale.elements = [1,1,4];
    g_shapesList.push(bench)

}
var sphere;
function drawPark(){
    var island = new Cube();
	island.color = [122/255,247/255,64/255,1.0];
	island.texture = -2;
    island.lightNum = 1;
	island.scale.elements = [-50,-1,-50];
	island.position.elements = [0,0.6,20];
	g_shapesList.push(island);


    var brick = new Cube();
	brick.color = [0,0,0.0,1.0];
	brick.texture = 2;
    brick.lightNum = 1;
	brick.scale.elements = [-25,.1,-25];
	brick.position.elements = [0,1.3,20];
	g_shapesList.push(brick);

    sphere =  new Sphere();
	sphere.color = [1.0,0,0,1.0];
	sphere.texture = 0;
    sphere.lightNum = 0;
	sphere.position.elements = [0,2.6,20];
	g_shapesList.push(sphere);

    var base = new Cube();
    base.color = [0.0,0,0,1.0];
    base.texture = -2;
    base.lightNum = 0;
    base.position.elements = [0,1.3,20];
    base.scale.elements = [1,.5,1];
    g_shapesList.push(base);

    drawstructure();
    drawPlants(12,1.85,8);
    drawPlants(12,1.85,28);
    drawPlants(-12,1.85,8);
    drawPlants(-12,1.85,28);
    drawBench(12,1.85,20);
    drawBench(-12,1.85,20);
}

function drawhill(x,y,z){
    var hill = new Mushroom();
    hill.color = [32/255,79/255,28/165,1.0];
    hill.texture = -2;
    hill.lightNum = 1;
    hill.position.elements = [x,y,z];
    hill.scale.elements = [200,25 + Math.floor(Math.random() * 30),200];
    g_shapesList.push(hill);
}

function drawhills(){
    let angleStep = 360/20;
    
    for(var angle = 180; angle < 360; angle = angle + angleStep){
        let x = 800*(Math.cos(angle * (Math.PI/180)));
	    let z = 800*(Math.sin(angle * (Math.PI/180)));
        drawhill(x,1,-z);
    }
}
