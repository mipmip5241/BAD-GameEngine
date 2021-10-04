attribute vec3 aSquareVertexPosition;
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;
attribute vec3 color;
varying vec3 vColor;
void main(void) {
 vColor = color;
 gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);

}