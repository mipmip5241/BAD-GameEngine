const layers = {
    FOREGROUND: 3,
    DEFAULT: 2,
    BACKGROUND: 1
}

class GameObject
{
    constructor(camera)
    {
        this.renderableComponent = null;
        this.visible = true;
        this.camera = camera;
        this.layer = layers.DEFAULT;
        this.rigitBody = null;
        this.collider = null;
    }

    update()
    {
        
    }

    draw()
    {   
        if (this.visible)
            this.renderableComponent.draw(this.camera);
    }

    setLayer(newLayer) { this.layer = newLayer; }
    setCamera(newCamera) { this.camera = newCamera; }

    getColor() {return this.renderableComponent.getColor();}
    setColor(color) {this.renderableComponent.setColor(color);}
    getCamera() { return this.camera; }
    getLayer() { return this.layer; }
    getTransform(){return this.renderableComponent.getTransform();}
    getCollider() {return this.collider;}

    
}