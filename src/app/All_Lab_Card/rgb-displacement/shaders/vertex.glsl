varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float dist = length(uv);
    float strength = 0.4;
    pos.z += sin(dist * 12.0 - uTime * 2.0) * 0.5 * strength;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }