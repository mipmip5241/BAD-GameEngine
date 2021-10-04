class ColorShader
{
    static colorBuffer;

    /**
     * This function creates a webGL color buffer.
     * @param colorData - the coloros to make the buffer out of, each Vertex is drawn in the given color.
     */
    static initColorBuffer(colorData)
    {
        ColorShader.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, ColorShader.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
    }

    /**
     * This function converts the normal color buffer that contains a color for each Vertex to a circle color buffer
     * with 2000+ vertices.
     * @param colorData - the coloros to replicate for each vertex.
     * @returns {[]}
     */
    static getCircleColor(colorData)
    {
        let circleColorBuffer = [];
        let j = 0
        for(let i = 0; i < CIRCLE_PRESITION*2 + 1; i++)
        {
            circleColorBuffer.push(colorData[j]);
            if (j + 1 === colorData.length)
            {
                j = 0;
            }
            j++;
        }
        return circleColorBuffer;
    }

}