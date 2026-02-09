varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;

  void main() {
    vec2 uv = vUv;
    
    // Mouse ke paas displacement calculate karna
    vec2 mouseDir = uv - uMouse;
    float dist = length(mouseDir);
    
    // Fluid Displacement math
    float radius = 0.4;
    float strength = 0.15 * uHover;
    float magnification = 1.0 + (strength * smoothstep(radius, 0.0, dist));
    
    // Applying refraction to UVs
    vec2 refractedUv = uMouse + mouseDir / magnification;

    // Premium RGB Split (Awwwards Style)
    float aberration = 0.02 * uHover * dist;
    float r = texture2D(uTexture, refractedUv + vec2(aberration, 0.0)).r;
    float g = texture2D(uTexture, refractedUv).g;
    float b = texture2D(uTexture, refractedUv - vec2(aberration, 0.0)).b;
    
    vec3 finalColor = vec3(r, g, b);

    // Subtle dark edges (Vignette)
    float vignette = smoothstep(0.8, 0.4, dist * uHover);
    finalColor *= (0.9 + 0.1 * vignette);

    gl_FragColor = vec4(finalColor, 1.0);
  }