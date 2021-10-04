class Circle extends Shape
{
    constructor()
    {
        super(SHAPES_TYPES.CIRCLE);
        this.type = SHAPES_TYPES.CIRCLE;
    }

    setColor(color) {
        super.setColor(ColorShader.getCircleColor(color));
    }
}