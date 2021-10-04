class Sprite extends GameObject
{
    constructor(img) {

        super(ObjectManager.camera);

        this.renderableComponent = new SpriteRenderable(img);
    }
}