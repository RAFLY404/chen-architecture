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
  
  // Sample the sketch texture, tiling it to fill the huge background
  vec2 texUv = vUv * 6.0;
  // Slowly pan the texture for minimal transition effect
  texUv += vec2(uTime * 0.005, uTime * 0.003);
  vec4 texColor = texture2D(uTexture, texUv);
  
  // The sketch is mostly white/grey with black lines or vice versa.
  // Convert texture to intensity
  float intensity = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  
  // We'll use the sketch texture as a subtle overlay
  vec3 darkSketch = vec3(0.8, 0.85, 0.9); // Off-white for dark mode
  vec3 lightSketch = vec3(0.1, 0.1, 0.15); // Dark for light mode
  vec3 sketchColor = mix(darkSketch, lightSketch, uTheme);
  
  // Add the texture over the background
  vec3 finalColor = mix(bgColor, sketchColor, intensity * 0.3);
  
  // Add some mouse interaction spotlight
  float mouseDistance = distance(vUv, uMouse * 0.5 + 0.5);
  // Spotlight is lighter in dark mode, darker in light mode
  vec3 spotlightColor = mix(vec3(0.1, 0.1, 0.12), vec3(-0.05, -0.05, -0.05), uTheme);
  finalColor += spotlightColor * smoothstep(0.5, 0.0, mouseDistance);
  
  // Add a bit of shadow/light based on elevation
  finalColor += vElevation * 1.5;

  gl_FragColor = vec4(finalColor, 0.85);
}
