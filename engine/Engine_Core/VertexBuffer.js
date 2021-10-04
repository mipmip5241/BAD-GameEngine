const CIRCLE_PRESITION = 1000;                

class VertexBuffer
{

    static squareVertexBuffer;
    static circelVertexBuffer;
    static tringlelVertexBuffer;
    static textureCordBuffer;

    static squareVertices;
    static circelVertices;
    static tringlelVertices;
    static textureVertices;

    /**
     * This function initializes the vertex buffer and creates a texture buffer and vertex buffer.
     */
    static initVertexBuffer()
    {

        VertexBuffer.squareVertices = [
                        0.5, 0.5, 0.0,
                        -0.5, 0.5, 0.0,
                        0.5, -0.5, 0.0,
                        -0.5, -0.5, 0.0]

        VertexBuffer.textureVertices = [
                        1.0, 1.0,
                        0.0, 1.0,
                        1.0, 0.0,
                        0.0, 0.0];

        VertexBuffer.tringlelVertices = [
                        0.5, 0.5, 0.0,
                        -0.5, 0.5, 0.0]
        
        VertexBuffer.circelVertices = VertexBuffer.createCircleVertices();
        
        
        // texture buffer
        VertexBuffer.textureCordBuffer = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.textureCordBuffer);
 
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VertexBuffer.textureVertices), gl.STATIC_DRAW);
    }

    static bindShape(shape)
    {

        switch (shape)
        {
            case SHAPES_TYPES.SQUARE:
                
                VertexBuffer.squareVertexBuffer = gl.createBuffer();

                gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.squareVertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VertexBuffer.squareVertices), gl.STATIC_DRAW);

                break;
            
            case SHAPES_TYPES.TRIANGLE:

                VertexBuffer.tringlelVertexBuffer = gl.createBuffer();

                gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.tringlelVertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VertexBuffer.tringlelVertices), gl.STATIC_DRAW);

                break;

            case SHAPES_TYPES.CIRCLE:

                VertexBuffer.circelVertexBuffer = gl.createBuffer();

                gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer.circelVertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VertexBuffer.circelVertices), gl.STATIC_DRAW);

                break;
        }

    }

    static createCircleVertices()
    {
        var data = [];
          
        for (var i = 0; i < CIRCLE_PRESITION; i++){
            data.push(Math.cos(i * 2 * Math.PI/CIRCLE_PRESITION)); // x coord
            data.push(Math.sin(i * 2 * Math.PI/CIRCLE_PRESITION)); // y coord
        }

        return data;
    }


    
}