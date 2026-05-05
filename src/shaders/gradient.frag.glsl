varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uTexture;

void main() {
  // Dark noir base colors
  vec3 color1 = vec3(0.02, 0.02, 0.02);
  vec3 color2 = vec3(0.08, 0.08, 0.08);
  vec3 color3 = vec3(0.15, 0.15, 0.15);

  float mixValue1 = sin(vUv.x * 3.0 + uTime * 0.2) * 0.5 + 0.5;
  float mixValue2 = cos(vUv.y * 3.0 + uTime * 0.3) * 0.5 + 0.5;

  vec3 bgColor = mix(color1, color2, mixValue1);
  bgColor = mix(bgColor, color3, mixValue2);
  
  // Sample the sketch texture, tiling it slightly
  vec2 texUv = vUv * 2.0;
  // Slowly pan the texture
  texUv += vec2(uTime * 0.02, uTime * 0.015);
  vec4 texColor = texture2D(uTexture, texUv);
  
  // The sketch is mostly white/grey with black lines or vice versa.
  // Convert texture to intensity
  float intensity = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  
  // We'll use the sketch texture as a subtle light overlay
  vec3 sketchColor = vec3(0.8, 0.85, 0.9); // Slight cool off-white for sketch lines
  
  // Add the texture over the dark background
  vec3 finalColor = mix(bgColor, sketchColor, intensity * 0.3);
  
  // Add some mouse interaction spotlight
  float mouseDistance = distance(vUv, uMouse * 0.5 + 0.5);
  finalColor += vec3(0.1, 0.1, 0.12) * smoothstep(0.5, 0.0, mouseDistance);
  
  // Add a bit of shadow/light based on elevation
  finalColor += vElevation * 1.5;

  gl_FragColor = vec4(finalColor, 0.85);
}
