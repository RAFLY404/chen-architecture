varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uTexture;
uniform float uTheme; // 0 for dark, 1 for light

void main() {
  // Dark noir base colors
  vec3 darkColor1 = vec3(0.02, 0.02, 0.02);
  vec3 darkColor2 = vec3(0.08, 0.08, 0.08);
  vec3 darkColor3 = vec3(0.15, 0.15, 0.15);

  // Light mode base colors
  vec3 lightColor1 = vec3(0.9, 0.9, 0.9);
  vec3 lightColor2 = vec3(0.95, 0.95, 0.95);
  vec3 lightColor3 = vec3(1.0, 1.0, 1.0);

  vec3 color1 = mix(darkColor1, lightColor1, uTheme);
  vec3 color2 = mix(darkColor2, lightColor2, uTheme);
  vec3 color3 = mix(darkColor3, lightColor3, uTheme);

  float mixValue1 = sin(vUv.x * 3.0 + uTime * 0.2) * 0.5 + 0.5;
  float mixValue2 = cos(vUv.y * 3.0 + uTime * 0.3) * 0.5 + 0.5;

  vec3 bgColor = mix(color1, color2, mixValue1);
  bgColor = mix(bgColor, color3, mixValue2);
  
  // Procedural Blueprint Grid (Major and Minor grid lines)
  vec2 coord = vUv * 40.0;
  
  // Slowly pan the grid for a subtle, elegant dynamic effect
  coord += vec2(uTime * 0.03, uTime * 0.018);

  // Compute fractional coordinates for grid lines
  // f1 represents minor lines (spaced every 0.2 units)
  // f2 represents major lines (spaced every 1.0 unit)
  vec2 f1 = abs(fract(coord * 5.0 - 0.5) - 0.5) / 5.0;
  vec2 f2 = abs(fract(coord * 1.0 - 0.5) - 0.5) / 1.0;
  
  // Define grid line thicknesses and smooth anti-aliasing edges
  float thick1 = 0.0005; 
  float edge1 = 0.0012;
  float thick2 = 0.0018;
  float edge2 = 0.0028;
  
  float val1 = 1.0 - smoothstep(thick1, thick1 + edge1, min(f1.x, f1.y));
  float val2 = 1.0 - smoothstep(thick2, thick2 + edge2, min(f2.x, f2.y));
  
  // Combine minor and major grid lines
  float gridValue = max(val1 * 0.22, val2 * 0.55);
  
  // We'll use the blueprint grid as a subtle overlay
  vec3 darkSketch = vec3(0.8, 0.85, 0.9); // Off-white for dark mode
  vec3 lightSketch = vec3(0.1, 0.1, 0.15); // Dark for light mode
  vec3 sketchColor = mix(darkSketch, lightSketch, uTheme);
  
  // Add the grid over the background
  vec3 finalColor = mix(bgColor, sketchColor, gridValue * 0.18);
  
  // Add some mouse interaction spotlight
  float mouseDistance = distance(vUv, uMouse * 0.5 + 0.5);
  // Spotlight is lighter in dark mode, darker in light mode
  vec3 spotlightColor = mix(vec3(0.1, 0.1, 0.12), vec3(-0.05, -0.05, -0.05), uTheme);
  finalColor += spotlightColor * smoothstep(0.5, 0.0, mouseDistance);
  
  // Add a bit of shadow/light based on elevation
  finalColor += vElevation * 1.5;

  gl_FragColor = vec4(finalColor, 0.85);
}
