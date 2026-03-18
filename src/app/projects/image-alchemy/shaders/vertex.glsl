varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;

void main() {
    vUv = uv;
    vec3 pos = position;

    float d = distance(uv, uMouse);
    pos.z += sin(d * 10.0 - uTime * 2.0) * 0.05;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}