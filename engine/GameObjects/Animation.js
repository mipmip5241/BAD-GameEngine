class Animation extends GameObject
{
    constructor(img)
    {
        super(ObjectManager.camera);

        this.renderableComponent = new AnimetionRenderable(img);
    }

    update() {
        this.renderableComponent.updateAnimation();
    }
}