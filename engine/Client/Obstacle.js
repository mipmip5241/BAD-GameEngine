class Obstacle extends Square
{
    constructor() {
        super();
        this.getTransform().setPosition(vec2.fromValues(320,-200));
        this.getTransform().setScale(vec2.fromValues(20,50));
        this.speed = 2;
        this.collider = new BoxCollider(this.getTransform());
    }



    update()
    {
        super.update();
        if(this.getTransform().getX() === -320)
        {
            this.getTransform().setPosition(vec2.fromValues(320,-200));
        }
        this.getTransform().increaseX(-this.speed);

    }
}