const SHAPES_TYPES = {SQUARE: 1, CIRCLE: 2, TRIANGLE: 3}

class Shape extends GameObject
{
    constructor(type)
    {
        super(ObjectManager.camera);
        this.renderableComponent = new Renderable(type);
    }

    init() {

 

    }
}