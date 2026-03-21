precision highp float;

varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uVelocity;

vec2 snoise(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

void main() {
    vec2 uv = vUv;
    
    vec2 center = uMouse * 0.5 + 0.5;
    float dist = distance(uv, center);
    
    float strength = smoothstep(0.5, 0.0, dist) * uHover;
    
    vec2 distortion = snoise(uv + uTime * 0.1) * strength * uVelocity * 5.0;
    
    float r = texture2D(uTexture, uv + distortion + (uVelocity * 0.1)).r;
    float g = texture2D(uTexture, uv + distortion).g;
    float b = texture2D(uTexture, uv + distortion - (uVelocity * 0.1)).b;
    
    vec3 color = vec3(r, g, b);
    
    float brightness = 1.0 + (strength * uVelocity * 2.0);
    color *= brightness;

    gl_FragColor = vec4(color, 1.0);
}