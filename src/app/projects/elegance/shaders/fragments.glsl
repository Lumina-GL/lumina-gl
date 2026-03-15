varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vec2 uv = vUv;
    vec2 surface = uv - uMouse;
    float dist = length(surface);

    float strength = 0.15;
    // Ripple calculation
    float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.01;

    // Distort UVs based on mouse distance and ripple
    vec2 distortedUv = uv + surface * exp(-dist * 5.0) * strength + ripple;

    // RGB Shift effect
    float r = texture2D(uTexture, distortedUv + 0.003).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - 0.003).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }