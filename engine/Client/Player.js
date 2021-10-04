class Player extends Square
{
    constructor()
    {
        super();

        this.getTransform().setScale(vec2.fromValues(50,50))
        this.getTransform().setPosition(vec2.fromValues(-200, -100))
        this.rigitBody = new RigitBody();
        this.rigitBody.setVelocity(0,-50)
        this.collider = new BoxCollider(this.getTransform());
    }

    update()
    {
        super.update();
        if(this.rigitBody.getVelocity()[Y] === 0 && Engine.input.isKeyClicked(Input.keys.W))
        {
            this.rigitBody.setVelocity(0,50);
            this.rigitBody.setAceleracion(0,-10);
        }

        if(this.rigitBody.getVelocity()[Y] < 0 && Engine.input.isKeyPressed(Input.keys.S))
        {
            this.rigitBody.increaseVelocityY(-1);
        }

    }

}