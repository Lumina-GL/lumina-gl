varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uStrength;

void main() {
    vec2 uv = vUv;

    float dist = distance(uv, uMouse);
    float multiplier = smoothstep(0.5, 0.0, dist);

    vec2 distortion = vec2(
        sin(uv.y * 10.0 + uTime) * 0.01,
        cos(uv.x * 10.0 + uTime) * 0.01
    ) * uStrength * multiplier;

    float r = texture2D(uTexture, uv + distortion + (uStrength * 0.01)).r;
    float g = texture2D(uTexture, uv + distortion).g;
    float b = texture2D(uTexture, uv + distortion - (uStrength * 0.01)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
}