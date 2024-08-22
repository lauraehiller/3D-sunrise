//Camera
var tempVec = new Vector3();
var atPt = new Vector3()
class Camera{
    constructor(){
        this.type = 'camera';
        this.fov = 60.0;
        this.eye = new Vector3([0,3,11]);
        this.at = new Vector3([0,2,-1]);
        this.up = new Vector3([0,1,0]);
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();
        this.location = new Vector3([0,0,0]);
    }

    moveForward(){
        tempVec.set(this.at);
        tempVec.sub(this.eye);
        tempVec.normalize();
        this.at.add(tempVec);
        this.eye.add(tempVec);
        this.location.elements[2] -= 5;
    }

    moveBackward(){
        tempVec.set(this.at);
        tempVec.sub(this.eye);
        tempVec.normalize();
        this.at.sub(tempVec);
        this.eye.sub(tempVec);
        this.location.elements[2] += 5;
    }

    moveLeft(){
        tempVec.set(this.eye);
        tempVec.sub(this.at);
        tempVec.normalize();
        var crossProd = Vector3.cross(tempVec, this.up);
        crossProd.normalize();
        this.at.add(crossProd);
        this.eye.add(crossProd);
        this.location.elements[0] -=5;
    }

    moveRight(){
        tempVec.set(this.eye);
        tempVec.sub(this.at);
        tempVec.normalize();
        var crossProd = Vector3.cross(tempVec, this.up);
        crossProd.normalize();
        this.at.sub(crossProd);
        this.eye.sub(crossProd);
        this.location.elements[0] +=5;
    }
    
    panLeft(){
        atPt.set(this.at);
        atPt.sub(this.eye);
        var r = Math.sqrt(Math.pow(atPt.elements[0],2) + Math.pow(atPt.elements[2],2));
        var theta = Math.atan2(atPt.elements[2],atPt.elements[0]) * 180 / Math.PI;
        theta -= 5;
        atPt.elements[0] = r * Math.cos(theta * Math.PI / 180);
        atPt.elements[2] = r * Math.sin(theta * Math.PI / 180);
        atPt.add(this.eye);
        this.at.set(atPt);
        this.location.elements[0] -= 1;

    }
    
    panRight(){
        atPt.set(this.at);
        atPt.sub(this.eye);
        var r = Math.sqrt(Math.pow(atPt.elements[0],2) + Math.pow(atPt.elements[2],2));
        var theta = Math.atan2(atPt.elements[2],atPt.elements[0]) * 180 / Math.PI;
        theta += 5;
        atPt.elements[0] = r * Math.cos(theta * Math.PI / 180);
        atPt.elements[2] = r * Math.sin(theta * Math.PI / 180);
        atPt.add(this.eye);
        this.at.set(atPt);
        this.location.elements[0] += 1;
    }

    panUp(){
        atPt.set(this.at);
        atPt.sub(this.eye);
        var r = Math.sqrt(Math.pow(atPt.elements[0],2) + Math.pow(atPt.elements[1],2));
        var theta = Math.atan2(atPt.elements[1],atPt.elements[0]) * 180 / Math.PI;
        if(theta < 90){
            theta += 10;
        }
        atPt.elements[0] = r * Math.cos(theta * Math.PI / 180);
        atPt.elements[1] = r * Math.sin(theta * Math.PI / 180);
        atPt.add(this.eye);
        this.at.set(atPt);
    }
    panDown(){
        atPt.set(this.at);
        atPt.sub(this.eye);
        var r = Math.sqrt(Math.pow(atPt.elements[0],2) + Math.pow(atPt.elements[1],2));
        var theta = Math.atan2(atPt.elements[1],atPt.elements[0]) * 180 / Math.PI;
        if(theta > -90){
            theta -= 10;
        }
        atPt.elements[0] = r * Math.cos(theta * Math.PI / 180);
        atPt.elements[1] = r * Math.sin(theta * Math.PI / 180);
        atPt.add(this.eye);
        this.at.set(atPt);
    }
}