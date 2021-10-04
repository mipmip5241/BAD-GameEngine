class RigitBody
{
    constructor()
    {
        this.angularVelocity = 0;
        this.angularAceleracion = 0;
        this.velocity = vec2.fromValues(0, 0);
        this.a = vec2.fromValues(0, 0);
        this.g = 10;
        this.m = 1;
        this.static = false;
    }


    getVelocity(){return this.velocity};
    setVelocity(xVelocity, yVelocity) {this.velocity[0] = xVelocity; this.velocity[1] = yVelocity};

    getAceleracion(){return this.a};
    setAceleracion(xVelocity, yVelocity) {this.a[0] = xVelocity; this.a[1] = yVelocity};

    getAngularVelocity(){return this.angularVelocity};
    setAngularVelocity(angularVelocity) {this.angularVelocity = angularVelocity};

    getAngularAceleracion(){return this.angularAceleracion};
    setAngularAceleracion(angularVelocity) {this.angularAceleracion = angularVelocity};

    increaseVelocityX(num){this.velocity[0] = this.velocity[0] + num}
    increaseVelocityY(num){this.velocity[1] = this.velocity[1] + num}

    increaseAceleracionX(num){this.a[0] = this.a[0] + num}
    increaseAceleracionY(num){this.a[1] = this.a[1] + num}

    increaseAngularVelocity(num){this.angularVelocity = this.angularVelocity + num}
    increaseAngularAceleracion(num){this.angularAceleracion = this.angularAceleracion + num}

    increaseVelocity(size, angle)
    {
        this.increaseVelocityX(Math.sin(angle) * size * this.m);
        this.increaseVelocityY(Math.cos(angle) * size * this.m);
    }

    setAngelVelocity(size, angle)
    {
        this.setVelocity(Math.sin(angle) * size * this.m);
        this.setVelocity(Math.cos(angle) * size * this.m);
    }

    setStatic(){this.static = true};



    setM(newM) {this.m = newM};
    getM() {return this.m};

    setG(newG) {this.g = newG};
    getG() {return this.g};

    updatePosByPhysics(transform)
    {

        this.velocity[0] = this.velocity[0] + this.a[0] * 0.1;
        this.velocity[1] = this.velocity[1] + this.a[1] * 0.1;

        transform.increaseX(this.velocity[0] * 0.1);
        transform.increaseY(this.velocity[1] * 0.1);

      
       

        this.angularVelocity = this.angularVelocity + this.angularAceleracion * 0.1;
        transform.increaseRotationByDegrees(this.angularVelocity * 0.1);
    }
       
}