class Renderable
{
     /**
    * Represents renderable object
    *
    * @constructor
    *
    */
    constructor(shape)
    {

        this.shaders = DefaultResources.constColorShader;
        this.shape = shape
        this.transform = new Transform();
        if(SHAPES_TYPES.CIRCLE === shape)
        {
            this.color = ColorShader.getCircleColor([0, 0, 1, 1]);
        }
        else {
            this.color = [1, 0, 1, 1];
        }

    }

    /**
    * Draw the renderable object
    * 
    * @param {Camera} camera the camera that look at the object.
    * 
    */
    draw(camera)
    {
   
        camera.setVpMatrix();
        this.shaders.activateShader(this.color, camera, this.transform.getTransformMatrix(), this.shape);

        if (this.shape == SHAPES_TYPES.CIRCLE)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, CIRCLE_PRESITION + 1);

        else 
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);  
    }

    setColor(color) { this.color = color; };
    getColor() { return this.color; };

    getTransform() { return this.transform; };
    setShader(shader) { this.shaders = shader; };
}


