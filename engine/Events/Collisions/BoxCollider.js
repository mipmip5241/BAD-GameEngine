const X = 0;
const Y = 1;
const TOP_LEFT = 0;
const TOP_RIGHT = 1;
const BOTTOM_RIGHT = 2;
const BOTTOM_LEFT = 3;
class BoxCollider extends Collider
{
    /**
     * @constructor - this function creates a box collider from the object's transform.
     * @param {Transform} transform
     */
    constructor(transform)
    {
        super();
        this._width = transform.getScaleX();
        this._height = transform.getScaleY();
        this.updateCollider(transform);
    }

    /**
     * This function updates the top left point location according to the object's movement.
     * @param{Transform} transform - The transform of the object.
     */
    updateCollider(transform)
    {
        let x = - (this._width / 2);
        let y = (this._height / 2);

        /* Calculating top left point. */
        this.vertices[TOP_LEFT] = this.calculatePointByDegree(x,y,transform.getRotationInDegree());
        /* Calculating Top right point */
        x = x + this._width;

        this.vertices[TOP_RIGHT] = this.calculatePointByDegree(x,y,transform.getRotationInDegree());

        /* Calculating bottom right point */
        y = y - this._height;
        this.vertices[BOTTOM_RIGHT] = this.calculatePointByDegree(x,y,transform.getRotationInDegree());

        /* Calculating bottom left point */
        x = x - (this._width);
        this.vertices[BOTTOM_LEFT] = this.calculatePointByDegree(x,y,transform.getRotationInDegree());

        for (let i = 0; i < this.vertices.length; i++)
        {
            this.vertices[i][0] = this.vertices[i][0] + transform.getX();
            this.vertices[i][1] = this.vertices[i][1] + transform.getY();
        }
        
        super.buildEdges();
    }

    /**
     * This function calculates the value of a point whether the point is rotated or not.
     * @param {number} x - x value of the point before degree rotation.
     * @param {number} y - y value of the point before degree rotation.
     * @param {number} degree - The transform of the object.
     * @return {vec2}
     */
    calculatePointByDegree(x,y, degree)
    {
        let cos = Math.cos(degree * Math.PI / 180);
        let sin = Math.sin(degree * Math.PI / 180);
        
        let newX = (x * cos) - (y * sin);   
        let newY = (x * sin) + (y * cos);

        if (Math.abs(newX) < 0.01 && Math.abs(newX) > 0)
            newX = 0;

        if (Math.abs(newY) < 0.01 && Math.abs(newY) > 0)
            newY = 0;

        return vec2.fromValues(newX,newY)
    }

    getWidth(){return this._width;}
    getHeight(){return this._height;}
    getX() {return this.vertices[TOP_LEFT][X];}
    getY() {return this.vertices[TOP_LEFT][Y];}
    getCenter() {return vec2.fromValues(this.vertices[TOP_LEFT][X] + (this._width / 2), this.vertices[TOP_LEFT][Y] - (this._height / 2));}
}