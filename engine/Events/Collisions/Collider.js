/**
 * Abstract collider
 * @class Collider
 */
class Collider
{
    constructor()
    {
        this.vertices = [];
        this.edges = [];
    }
    /**
     * Abstract method for all colliders used for updating the collider values.
     */
    updateCollider() {}

    /**
     * This function calculates the vector in each edge of the collider.
     */
    buildEdges()
    {
        this.edges = [];
        
        for (let i = 0; i < this.vertices.length; i++)
        {
            const a = this.vertices[i];
            let b = this.vertices[0];
            if (i + 1 < this.vertices.length) {
                b = this.vertices[i + 1];
            }
            this.edges.push(vec2.fromValues(b[X] - a[X], b[Y] - a[Y]))
        }
    }

    /**
     *  This function projects the collider on the given axis.
     * @param x - The x axis to project on.
     * @param y - The y axis to project on.
     * @return {{min: number, max: number}}
     */
    projectInAxis(x, y)
    {
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0; i < this.vertices.length; i++) {
            let px = this.vertices[i][X];
            let py = this.vertices[i][Y];
            const projection = (px * x + py * y) / (Math.sqrt(x * x + y * y));
            if (projection > max)
            {
                max = projection;
            }
            if (projection < min)
            {
                min = projection;
            }
        }
        return { min, max };
    }

    getVertices(){return this.vertices;}
    getEdges(){return this.edges}
}