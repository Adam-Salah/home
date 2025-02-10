uniform float planetId;

varying vec2 vUv;
varying float vV;

void main() {
    vec2 pos = vec2(vUv) * 1.0;
    
    vec3 colorA = fract(planetId / 6.0 + (vec3(7, 122, 21) / 255.0));
    vec3 colorB = vec3(45, 134, 186) / 255.0;
    vec3 grayscale = vec3(floor((vV+0.212) * 4.736));
    vec3 color = mix(colorA, colorB, grayscale);
    vec3 land = mix(vec3(0), grayscale, step(0.0, grayscale));
    color = mix(vec3(1.0), color, step(step(0.15, pow((pos.y - 0.5) * pow((pos.x - 0.5) * 2.488, 2.0), 2.0)), land));
    
	
    gl_FragColor = vec4(color,1.0);
}