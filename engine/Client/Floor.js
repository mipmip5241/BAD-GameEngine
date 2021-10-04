class Floor extends Square
{
    constructor()
    {
        super();
        this.getTransform().setScale(vec2.fromValues(1000,20));
        this.getTransform().setPosition(vec2.fromValues(0,-220));

        this.collider = new BoxCollider(this.getTransform());
    }


    update() {
        super.update();
    }
}