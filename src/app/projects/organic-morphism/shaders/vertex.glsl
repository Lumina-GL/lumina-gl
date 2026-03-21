varying vec2 vUv;
uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;
uniform float uVelocity;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    float dist = distance(uv, uMouse * 0.5 + 0.5);
    float ripple = sin(dist * 10.0 - uTime * 2.0) * uVelocity * 2.0;
    
    pos.z += ripple * uHover;
    pos.z += sin(uv.x * 5.0 + uTime) * 0.05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}