const INFINTY = 9999999;

class CollisionDetection
{
    /**
     * This function checks if a collision occurred between two box colliders using AABB method.
     * @param {GameObject}source - the game object that wants to check if a collision occurred
     * @param {GameObject} target - The target game object that we are checking the collision with.
     * @return {boolean}
     */
    static AABB_detection(source, target)
    {
        source.getCollider().updateCollider(source.getTransform());
        target.getCollider().updateCollider(target.getTransform());
        let sourceCollider = source.getCollider();
        let targetCollider = target.getCollider();

        let thisBottom = sourceCollider.getY() - sourceCollider.getHeight();
        let thisTop = sourceCollider.getY();
        let thisLeft = sourceCollider.getX();
        let thisRight = sourceCollider.getX() + sourceCollider.getWidth();

        let otherBottom = targetCollider.getY() - targetCollider.getHeight();
        let otherTop = targetCollider.getY();
        let otherLeft = targetCollider.getX();
        let otherRight = targetCollider.getX() + targetCollider.getWidth();

        return !(thisBottom > otherTop ||
            otherBottom > thisTop ||
            thisLeft > otherRight ||
            otherLeft > thisRight)
    }

    /**
     * This function statically resolves a collision between two objects.
     * @param {GameObject}source - the object that wants to check if a collision occurred
     * @param {GameObject} target - the object that was hit.
     */
    static AABB_resolve(source, target)
    {
        source.getCollider().updateCollider(source.getTransform());
        target.getCollider().updateCollider(target.getTransform());
        let sourceCollider = source.getCollider();
        let targetCollider = target.getCollider();

        let x = sourceCollider.getX();
        let y = sourceCollider.getY();

        let thisBottom = sourceCollider.getY() - sourceCollider.getHeight();
        let thisTop = sourceCollider.getY();
        let thisLeft = sourceCollider.getX();
        let thisRight = sourceCollider.getX() + sourceCollider.getWidth();

        let otherBottom = targetCollider.getY() - targetCollider.getHeight();
        let otherTop = targetCollider.getY();
        let otherLeft = targetCollider.getX();
        let otherRight = targetCollider.getX() + targetCollider.getWidth();

        if((thisBottom > otherTop ||
            otherBottom > thisTop ||
            thisLeft > otherRight ||
            otherLeft > thisRight))
        {
            return;
        }


        if(Math.abs(thisLeft - otherLeft) < Math.abs(thisTop - otherTop))
        {
            if(thisRight > otherRight)
                x = otherRight;
            else
                x = otherLeft - sourceCollider.getWidth();
        }
        else
        {
            if(thisTop > otherTop)
                y = otherTop;
            else
                y = otherBottom - sourceCollider.getHeight();
        }

        console.log(x,y);
        source.getTransform().setPosition(vec2.fromValues(x + (sourceCollider.getWidth()/2),y + sourceCollider.getHeight()/2));

    }

    /**
     * This function checks if a collision occurred between two circles
     * @param {CircleCollider} source - collider that hit.
     * @param {CircleCollider} target - collider that received  the hit.
     * @returns {boolean}
     */
    static circleCollision(source, target)
    {
        let sourceCollider = source.getCollider();
        let targetCollider = target.getCollider();
        sourceCollider.updateCollider(source.getTransform());
        targetCollider.updateCollider(target.getTransform());
        /* Calculate distance between two centers */
        let dx = sourceCollider.getCenter()[X] - targetCollider.getCenter()[X];
        let dy = sourceCollider.getCenter()[Y] - targetCollider.getCenter()[Y];
        let dist = Math.sqrt(dx*dx + dy*dy);

        return (dist < (sourceCollider.getRadius() + targetCollider.getRadius()));
    }

    /** 
     * This function check if the quadratic equation has at list one answer.
     * @param a - value of the number neer x^2.
     * @param b - value of the number neer x.
     * @param c - the sum of the other numbers.
     * @returns{number}
     */
    static checkQuadraticEquation(a, b, c)
    {
        return (b*b) - (4 * a * c) >= 0; 
    }

    /**
     * This function calculate the quadratic equatio.
     * @param a - value of the number neer x^2.
     * @param b - value of the number neer x.
     * @param c - the sum of the other numbers.
     * @returns{number}
     */
    static quadraticEquation(a, b, c)
    {
        let ans = [];

        ans.push(((-1 * b) + Math.sqrt((b*b) - (4 * a * c))) / (2 * a));
        ans.push(((-1 * b) - Math.sqrt((b*b) - (4 * a * c))) / (2 * a));

        return ans;
    }

    /**
     * This function check if one point from array of points is between 2 other points.
     * @param points - The array ofpoints to check.
     * @param ver1 - one of the points to check between.
     * @param ver1 - one of the points to check between.
     * @param axis - the axis to check.
     * @returns{boolean}
     */
    static checkAnsBounds(points, ver1, ver2, axis)
    {
        for (let i = 0; i < points.length; i++)
        {
            if ((points[i] >= ver1[axis] && points[i] <= ver2[axis]) || (points[i] >= ver2[axis] && points[i] <= ver1[axis]))
                    return true;
        }

        return false;
    }

    /**
     * This function calculate the distance between 2 points.
     * @param point1 - The source of the collision.
     * @param point2 - the target to check on and to be moved.
     * @returns{number}
     */
    static distance(point1, point2)
    {
        return Math.sqrt( (Math.pow(point1[X] - point2[X], 2)) + (Math.pow(point1[Y] - point2[Y], 2)));
    }

    /**
     * This function resolve circle and square collision
     * @param circle - The circle that was involved in the collision.
     * @param square - The square that was involved in the collision.
     * @returns{number}
     */
    static resolveCircleAndSquareCollision(circle, square)
    {
        // get the colliders
        let squareCollider = square.getCollider();
        let circleCollider = circle.getCollider();
        
        // update the colliders
        squareCollider.updateCollider(square.getTransform());
        circleCollider.updateCollider(circle.getTransform());

        // get the data on the shaders
        let circleCenter = circleCollider.getCenter();
        let circleRadius = circleCollider.getRadius();

        for (let i = 0; i < squareCollider.vertices.length; i++)
        {
            // get the id of the next vertices
            let j = i + 1;
            if (j == squareCollider.vertices.length)
                j = 0;
            
            // get the current vertices
            let p1 = squareCollider.vertices[i];
            let p2 = squareCollider.vertices[j];

            // find the closest point on the square
            // see the calculation at https://www.youtube.com/watch?v=LPzyNOHY3A4&t=1677s
            let edge = vec2.fromValues(p2[X] - p1[X], p2[Y] - p1[Y]);
            let line = vec2.fromValues(circleCenter[X] - p1[X], circleCenter[Y] - p1[Y]);
            let len = edge[X]*edge[X] + edge[Y]*edge[Y];
            let t = Math.max(0, Math.min(len, (line[X] * edge[X] + line[Y] * edge[Y]))) / len;
            let closePoint = vec2.fromValues(p1[X] + (t * edge[X]), p1[Y] + (t * edge[Y]));

            // calculate the distance from the point to the circle
            let dis = this.distance(closePoint, circleCenter);

            // check if the distance is smaller then the radius 
            if (dis <= circleRadius)
            {   
                
                let overlap = dis - circleRadius - 1;

                let m1 = square.rigitBody.m;
                let m2 = circle.rigitBody.m;
                console.log("mmm", m2, m1);

                // check if one of the objects are static and update their mass and resolve the collision acordingly  
                if (circle.rigitBody == null || square.rigitBody == null)
                {
                    overlap = overlap / 2;

                    circle.getTransform().increaseX((-1 * overlap * (circleCenter[X] - closePoint[X])) / dis);
                    circle.getTransform().increaseY((-1 * overlap * (circleCenter[Y] - closePoint[Y])) / dis);

                    square.getTransform().increaseX((-1 * overlap * (square.getTransform().getPosition()[X] - closePoint[X])) / dis);
                    square.getTransform().increaseY((-1 * overlap * (square.getTransform().getPosition()[Y] - closePoint[Y])) / dis);

                    return true;
                }
                if (square.rigitBody.static == true)
                {
                    circle.getTransform().increaseX((-1 * overlap * (circleCenter[0] - closePoint[0])) / dis);
                    circle.getTransform().increaseY((-1 * overlap * (circleCenter[1] - closePoint[1])) / dis);

                    m1 = INFINTY;
                    
                }
                else if(circle.rigitBody.static == true)
                {
                    square.getTransform().increaseX((-1 * overlap * (square.getTransform().getPosition()[0] - closePoint[0])) / dis);
                    square.getTransform().increaseY((-1 * overlap * (square.getTransform().getPosition()[1] - closePoint[1])) / dis);

                    m2 = INFINTY;
                }else
                {
                    overlap = overlap / 2;

                    circle.getTransform().increaseX((-1 * overlap * (circleCenter[0] - closePoint[0])) / dis);
                    circle.getTransform().increaseY((-1 * overlap * (circleCenter[1] - closePoint[1])) / dis);

                    square.getTransform().increaseX((-1 * overlap * (square.getTransform().getPosition()[0] - closePoint[0])) / dis);
                    square.getTransform().increaseY((-1 * overlap * (square.getTransform().getPosition()[1] - closePoint[1])) / dis);
                    
                }
                
                // chaneg the velocitys of the objects
                this.fixVelocitys(circle, square, m2, m1);
           
                return true;
            } 
        }

        return false;
    }

    /* This function resolve circle and square collision
    * @param circle - The circle that was involved in the collision.
    * @param square - The square that was involved in the collision.
    * @returns{number}
    */
   static circleAndSquareCollision(circle, square)
   {

       // get the colliders
       let squareCollider = square.getCollider();
       let circleCollider = circle.getCollider();
       
       // update the colliders
       squareCollider.updateCollider(square.getTransform());
       circleCollider.updateCollider(circle.getTransform());

       // get the data on the shaders
       let circleCenter = circleCollider.getCenter();
       let circleRadius = circleCollider.getRadius();

       for (let i = 0; i < squareCollider.vertices.length; i++)
       {
           // get the id of the next vertices
           let j = i + 1;
           if (j == squareCollider.vertices.length)
               j = 0;
           
           // get the current vertices
           let p1 = squareCollider.vertices[i];
           let p2 = squareCollider.vertices[j];
           
           // find the closest point on the square
           // see the calculation at https://www.youtube.com/watch?v=LPzyNOHY3A4&t=1677s
           let edge = vec2.fromValues(p2[0] - p1[0], p2[1] - p1[1]);
           let line = vec2.fromValues(circleCenter[0] - p1[0], circleCenter[1] - p1[1]);
           let len = edge[0]*edge[0] + edge[1]*edge[1];
           let t = Math.max(0, Math.min(len, (line[0] * edge[0] + line[1] * edge[1]))) / len;
           let closePoint = vec2.fromValues(p1[0] + (t * edge[0]), p1[1] + (t * edge[1]));

           // calculate the distance from the point to the circle
           let dis = this.distance(closePoint, circleCenter);

           // check if the distance is smaller then the radius 
           if (dis <= circleRadius)
           {   
               return true;
           }
        }

        return false;

    }

    /**
     * This function calculate the incline between 2 points.
     * @param point1 - the first point.
     * @param point2 - the second point.
     */
    static calculateM(point1, point2)
    {
        return (point1[Y] - point2[Y]) / (point1[X] - point2[X])
    }

    /**
     * This function move the target so there wont be a collision.
     * @param source - The source of the collision.
     * @param target - the target to check on and to be moved.
     */
    static fixCircleCollision(source, target)
    {
        
        let sourceCollider = source.collider;
        let targetCollider = target.collider;

        sourceCollider.updateCollider(source.getTransform());
        targetCollider.updateCollider(target.getTransform());

        let sourceCenter = sourceCollider.getCenter();
        let targetCenter = targetCollider.getCenter();

        let sourceRadius = sourceCollider.getRadius();
        let targetRadius = targetCollider.getRadius();

        let m1 = source.rigitBody.m;
        let m2 = target.rigitBody.m;

        let distance = Math.sqrt(Math.pow(sourceCenter[0] - targetCenter[0], 2) + Math.pow(targetCenter[1] - sourceCenter[1], 2));
        let overlap = 0.5 * (distance - sourceRadius - targetRadius);

        if (source.rigitBody == null || target.rigitBody == null)
        {
            this.correctCircleOverlap(-1 * overlap, sourceCenter, targetCenter, distance, source);
            this.correctCircleOverlap(overlap, sourceCenter, targetCenter, distance, target);

            return;
        }

        if (source.rigitBody.static == true)
        {
            m1 = 999999;   
            this.correctCircleOverlap(overlap * 2, sourceCenter, targetCenter, distance, target);
        }
        
        else if (target.rigitBody.static == true)
        {
            m2 = 999999;
            this.correctCircleOverlap(-1 * overlap * 2, sourceCenter, targetCenter, distance, source);
        }
        
        else 
        {
            this.correctCircleOverlap(-1 * overlap, sourceCenter, targetCenter, distance, source);
            this.correctCircleOverlap(overlap, sourceCenter, targetCenter, distance, target);
        }

        this.fixVelocitys(source, target, m1, m2);
        
    }

    /**
     * This function change the velocitys of the objects.
     * @param source - The source of the collision.
     * @param target - the target to check on and to be moved.
     * @param m1 - the mass of the source.
     * @param m2 - the mass of the target.
     */
    static fixVelocitys(source, target, m1, m2)
    {
        let v1 = source.rigitBody.velocity;    
        let v2 = target.rigitBody.velocity;

        let sourceCenter = source.getTransform().getPosition();
        let targetCenter = target.getTransform().getPosition();

        let distance = Math.sqrt(Math.pow(sourceCenter[0] - targetCenter[0], 2) + Math.pow(targetCenter[1] - sourceCenter[1], 2));
        
        let normal = vec2.fromValues(((targetCenter[0] - sourceCenter[0]) / distance), ((targetCenter[1] - sourceCenter[1]) / distance)); 
       
        let kx = (v1[0] - v2[0]);
        let ky = (v1[1] - v2[1]);
 
        let p = 2 * (normal[0] * kx + normal[1] * ky) / (m1 + m2);

        source.rigitBody.velocity[0] = v1[0] - (p * m2 * normal[0]);
        source.rigitBody.velocity[1] = v1[1] - (p * m2 * normal[1]);

        target.rigitBody.velocity[0] = v2[0] + (p * m1 * normal[0]);
        target.rigitBody.velocity[1] = v2[1] + (p * m1 * normal[1]);

    }

    /**
     * This function correct the overlap of 2 circels.
     * @param overlap - the overlap between the circles.
     * @param c1 - the center of the first one.
     * @param c2 - the center of the first second one.
     * @param distance - the distance between the centers.
     * @param circle - the circle to move.
     */
    static correctCircleOverlap(overlap, c1, c2, distance, circle)
    {
        circle.getTransform().increaseX(overlap * (c1[0] - c2[0]) / distance); 
        circle.getTransform().increaseY(overlap * (c1[1] - c2[1]) / distance); 
    }

     /**
     * This function resolve SAR collision.
     * @param source - The source of the collision.
     * @param target - the target to check on and to be moved.
     */
    static SAT_resolve(source, target)
    {
        let overlap = INFINTY;
        let edges = [];

        // get colliders
        let sourceCollider = source.collider;
        let targetCollider = target.collider;

        let pos1 = source.getTransform().getPosition();
        let pos2 = target.getTransform().getPosition();

        sourceCollider.updateCollider(source.getTransform());
        targetCollider.updateCollider(target.getTransform());

        /* get the edges of both colliders */
        for (let i = 0; i < sourceCollider.getEdges().length; i++)
        {
            edges.push(sourceCollider.getEdges()[i]);
        }
        for (let i = 0; i < targetCollider.getEdges().length; i++)
        {
            edges.push(targetCollider.getEdges()[i]);
        }

        for (let i = 0; i < edges.length; i++)
        {
            // get axis
            const length = Math.sqrt(edges[i][Y] * edges[i][Y] + edges[i][X] * edges[i][X]);
            const axis = {
                x: -edges[i][Y] / length,
                y: edges[i][X] / length,
            };
            // project polygon under axis
            const { min: minA, max: maxA } = sourceCollider.projectInAxis(axis.x, axis.y);
            const { min: minB, max: maxB } = targetCollider.projectInAxis(axis.x, axis.y);

            overlap = Math.min(Math.min(maxA, maxB) - Math.max(minA, minB), overlap);

            //console.log("b", minA, maxA, minB, maxB);
            if (CollisionDetection.intervalDistance(minA, maxA, minB, maxB) > 0)
            {
                return false;
            }
        }

        let d = vec2.fromValues(pos2[X] - pos1[X], pos2[Y] - pos1[Y]);
        let s = Math.sqrt(d[X]*d[X] + d[Y]*d[Y]);

        overlap = overlap / 2;

        if (source.rigitBody == null || target.rigitBody == null)
        {
            source.getTransform().increaseX((-1 * overlap * d[X]) / s);
            source.getTransform().increaseY((-1 * overlap * d[Y]) / s);

            //target.getTransform().increaseX((overlap * d[X]) / s);
            //target.getTransform().increaseY((overlap * d[Y]) / s);

            return;
        }
        let m1 = source.rigitBody.m;
        let m2 = target.rigitBody.m;
        if (source.rigitBody.static == true)
        {
            m1 = INFINTY;   
            target.getTransform().increaseX((2 * overlap * d[X]) / s);
            target.getTransform().increaseY((2 * overlap * d[Y]) / s);
        }
        
        else if (target.rigitBody.static == true)
        {
            m2 = INFINTY;
            source.getTransform().increaseX((2 * overlap * d[X]) / s);
            source.getTransform().increaseY((2 * overlap * d[Y]) / s);
        }
        
        else 
        {
            source.getTransform().increaseX((-1 * overlap * d[X]) / s);
            source.getTransform().increaseY((-1 * overlap * d[Y]) / s);

            target.getTransform().increaseX((overlap * d[X]) / s);
            target.getTransform().increaseY((overlap * d[Y]) / s);
        }


        this.fixVelocitys(source, target, m1, m2);

        //this.rotateSquareBySquare(source, target);

        return true;
    }

    /**
     * This function checks if a collision occurred between two objects.
     * @param source - The source of the collision.
     * @param target - the target to check on.
     * @returns{boolean}
     */
    static SAT_detection(source, target)
    {
        const edges = [];
        let sourceCollider = source.getCollider();
        let targetCollider = target.getCollider();
        sourceCollider.updateCollider(source.getTransform());
        targetCollider.updateCollider(target.getTransform());
        /* get the edges of both colliders */
        for (let i = 0; i < sourceCollider.getEdges().length; i++)
        {
            edges.push(sourceCollider.getEdges()[i]);
        }
        for (let i = 0; i < targetCollider.getEdges().length; i++)
        {
            edges.push(targetCollider.getEdges()[i]);
        }

        for (let i = 0; i < edges.length; i++)
        {
            // get axis
            const length = Math.sqrt(edges[i][Y] * edges[i][Y] + edges[i][X] * edges[i][X]);
            const axis = {
                x: -edges[i][Y] / length,
                y: edges[i][X] / length,
            };
            // project polygon under axis
            const { min: minA, max: maxA } = sourceCollider.projectInAxis(axis.x, axis.y);
            const { min: minB, max: maxB } = targetCollider.projectInAxis(axis.x, axis.y);
            //console.log("b", minA, maxA, minB, maxB);
            if (CollisionDetection.intervalDistance(minA, maxA, minB, maxB) > 0)
            {

                return false;
            }
        }
        return true;
    }

    /**
     * This function gets the distance between two intervals.
     * @param minA
     * @param maxA
     * @param minB
     * @param maxB
     * @returns {number}
     */
    static intervalDistance(minA, maxA, minB, maxB)
    {
        return ((minA < minB) ? (minB - maxA) : (minA - maxB))
    }

    static min(a, b)
    {
        if (a > b)
            return b;
        return a;
    }

    static max(a, b)
    {
        if (a > b)
            return a;
        return b;
    }

    static checkCollisions(a, b)
    {
        if (a.type === SHAPES_TYPES.SQUARE && b.type === SHAPES_TYPES.SQUARE)
        {
            if (this.SAT_detection(a, b))
                this.SAT_resolve(a, b);
        }
            

        else if (a.type == SHAPES_TYPES.CIRCLE && b.type == SHAPES_TYPES.CIRCLE || a.type == SHAPES_TYPES.CIRCLE && b.type == SHAPES_TYPES.CIRCLE)
        {
            if (this.circleCollision(a, b))
                this.fixCircleCollision(a, b);
        }
            

        else if (a.type == SHAPES_TYPES.CIRCLE && b.type == SHAPES_TYPES.SQUARE)
        {
            
            if (this.circleAndSquareCollision(a, b));
                this.resolveCircleAndSquareCollision(a, b);
        }
            

        else if (a.type == SHAPES_TYPES.SQUARE && b.type == SHAPES_TYPES.CIRCLE)
        {
            
            if (this.circleAndSquareCollision(b, a));
                this.resolveCircleAndSquareCollision(b, a);
        }

        
       
    }

    static rotateSquareBySquare(square1, square2)
    {
        let dis = 0;
        let sourceCenter = 0;
        let targetCenter = 0;
        
        let len = INFINTY;
        let closePoint = vec2.fromValues(0, 0);

        let source = null;
        let target = null;

        // get the colliders
        let squareCollider1 = square1.getCollider();
        let squareCollider2 = square2.getCollider();
  
        // update the colliders
        squareCollider1.updateCollider(square1.getTransform());
        squareCollider2.updateCollider(square2.getTransform());

        let center1 = squareCollider1.getCenter();
        let center2 = squareCollider2.getCenter();

        for (let i = 0; i < squareCollider1.vertices.length; i++)
        {
            dis = this.distance(center2, squareCollider1.vertices[i]);
            if (dis < len)
            {
                source = square2;
                target = square1;
                
                sourceCenter = center2;
                targetCenter = center1;
                
                len = dis;
                closePoint = squareCollider1.vertices[i];
            }
        
        }

        for (let i = 0; i < squareCollider2.vertices.length; i++)
        {
            dis = this.distance(center1, squareCollider2.vertices[i]);
            if (dis < len)
            {
                source = square1;
                target = square2;
                
                sourceCenter = center1;
                targetCenter = center2;
                
                len = dis;
                closePoint = squareCollider2.vertices[i];
            }
        
        }

        let axis = 0;

        let yy = (Math.abs(targetCenter[Y] - closePoint[Y])) / squareCollider2.getHeight();
        let xx = (Math.abs(targetCenter[X] - closePoint[X])) / squareCollider2.getWidth();

        if (yy > xx)
            axis = Y;
        else if (yy < xx)
            axis = X;
        


        console.log("yy ", yy);
        console.log("xx ", xx);

        return;

        let sourceMomentOfInertia = this.calculateMomentOfInertia(source)
        let rSource = vec2.fromValues(closePoint[X] - sourceCenter[X], closePoint[Y] - sourceCenter[Y]);
        let fSource = source.rigitBody.velocity;

        let targetMomentOfInertia = this.calculateMomentOfInertia(target)
        let rTarget = vec2.fromValues(closePoint[X] - targetCenter[X], closePoint[Y] - targetCenter[Y]);
        let fTarget = target.rigitBody.velocity;
        fTarget[X] = fTarget[X] * -1;
        fTarget[Y] = fTarget[Y] * -1;

        let sourceTorque = rSource[X] * fSource[Y] - rSource[Y] * fSource[X];
        let targetTorque = rTarget[X] * fTarget[Y] - rTarget[Y] * fTarget[X];
        
        
        console.log("sourceTorque ", sourceTorque);
        console.log("targetTorque ", targetTorque);

        console.log("sourceMomentOfInertia ", sourceMomentOfInertia);
        console.log("targetMomentOfInertia ", targetMomentOfInertia);
        source.rigitBody.angularVelocity = (sourceTorque / sourceMomentOfInertia) * 1;
        target.rigitBody.angularVelocity = (targetTorque / targetMomentOfInertia) * 1;
   
    }

    static calculateMomentOfInertia(target)
    {
        let m = target.rigitBody.m;
        let w = target.collider.getWidth();
        let h = target.collider.getHeight();

        let momentOfInertia = (m * (w * w + h * h)) / 12;

        return momentOfInertia;
    }

}