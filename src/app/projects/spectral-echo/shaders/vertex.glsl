 varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float wave = sin(pos.x * 3.0 + uTime) * cos(pos.y * 3.0 + uTime) * 0.3;
    pos.z += wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }