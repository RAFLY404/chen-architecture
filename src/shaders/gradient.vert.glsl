varying vec2 vUv;
varying float vElevation;
uniform float uTime;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Sine wave vertex displacement
  float elevation = sin(modelPosition.x * 2.0 + uTime * 0.5) * 
                    cos(modelPosition.y * 2.0 + uTime * 0.5) * 0.03;
                    
  modelPosition.z += elevation;
  vElevation = elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
