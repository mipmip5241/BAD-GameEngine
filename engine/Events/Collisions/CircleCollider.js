/**
 * A collider in the shape of a circle.
 * @class CircleCollider
 * @extends {Collider}
 */
class CircleCollider extends Collider
{
    /**
     * @constructor
     * @param transform - transform matrix of the shape.
     */
    constructor(transform)
    {
        super();
        this._center = transform.getPosition();
        this._radius = (transform.getScaleX()/2); // calculate radius.
        this._transform = transform;
        this.updateCollider();
    }

    /**
     * Update colliders radius and center according to the shape movement.
     */
    updateCollider()
    {
        this._center = this._transform.getPosition();
        this._radius = this._transform.getScaleX(); // cant calculate radius.
    }

    calculatePointArray()
    {

    }
    getCenter(){return this._center;}
    getRadius(){return this._radius;}
}