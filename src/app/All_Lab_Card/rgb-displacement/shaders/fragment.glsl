varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform float uVelocity;

  void main() {
    vec2 uv = vUv;
    
    float shift = uVelocity * 0.12 * uHover;
    
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    
    vec3 color = vec3(r, g, b);
    
    float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) * 0.04;
    color += noise * uHover;

    gl_FragColor = vec4(color, 1.0);
  }