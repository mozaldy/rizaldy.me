'use client';

import * as THREE from 'three';
import { UniformsUtils, UniformsLib } from 'three';
import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Mesh } from 'three';

const vertexShader = /* glsl */`
  uniform mat4 textureMatrix;
  uniform float time;
  varying vec4 mirrorCoord;
  varying vec4 worldPosition;
  #include <common>
  #include <fog_pars_vertex>
  #include <shadowmap_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  void main() {
    mirrorCoord = modelMatrix * vec4( position, 1.0 );
    worldPosition = mirrorCoord.xyzw;
    mirrorCoord = textureMatrix * mirrorCoord;
    vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    #include <shadowmap_vertex>
  }`;

const fragmentShader = /* glsl */`
  uniform sampler2D mirrorSampler;
  uniform float alpha;
  uniform float time;
  uniform float size;
  uniform float distortionScale;
  uniform sampler2D normalSampler;
  uniform vec3 sunColor;
  uniform vec3 sunDirection;
  uniform vec3 eye;
  uniform vec3 waterColor;
  varying vec4 mirrorCoord;
  varying vec4 worldPosition;
  vec4 getNoise( vec2 uv ) {
    vec2 uv0 = ( uv / 103.0 ) + vec2(0.0, time / 29.0);
    vec2 uv1 = uv / 107.0 - vec2(0.0, time / 31.0 );
    vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2(0.0, time / 97.0 );
    vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2(0.0, time / -113.0 );
    vec4 noise = texture2D( normalSampler, uv0 ) +
      texture2D( normalSampler, uv1 ) +
      texture2D( normalSampler, uv2 ) +
      texture2D( normalSampler, uv3 );
    return noise * 0.5 - 1.0;
  }
  #include <common>
  #include <packing>
  #include <bsdfs>
  #include <fog_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <lights_pars_begin>
  #include <shadowmap_pars_fragment>
  #include <shadowmask_pars_fragment>
  void main() {
    #include <logdepthbuf_fragment>
    vec4 noise = getNoise( worldPosition.xz * size );
    vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );
    vec3 diffuseLight = vec3(0.0);
    vec3 specularLight = vec3(0.0);
    vec3 worldToEye = eye-worldPosition.xyz;
    vec3 eyeDirection = normalize( worldToEye );
    float distance = length(worldToEye);
    vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
    vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );
    float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
    float rf0 = 0.3;
    float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
    vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
    vec3 albedo = mix( scatter * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * specularLight ), reflectance);
    vec3 outgoingLight = albedo;
    gl_FragColor = vec4( outgoingLight, alpha );
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }`;

export function Ocean() {
  const ref = useRef<Mesh>(null!);
  const { gl, scene, camera } = useThree();
  
  const waterNormals = useLoader(THREE.TextureLoader, '/assets/texture/waternormals.jpg');
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  
  const [plane, renderTarget] = useMemo(() => {
    const plane = new THREE.Plane();
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);
    return [plane, renderTarget];
  }, []);
  
const uniforms = useMemo(() => {
    const mergedUniforms = UniformsUtils.merge([
      UniformsLib.lights,
      {
        time: { value: 0 },
        size: { value: 1.0 },
        distortionScale: { value: 3.7 },
        alpha: { value: 1.0 },
        textureMatrix: { value: new THREE.Matrix4() },
        sunColor: { value: new THREE.Color('#6688cc') },
        sunDirection: { value: new THREE.Vector3() },
        eye: { value: new THREE.Vector3() },
        waterColor: { value: new THREE.Color(0x001e3d) },
        mirrorSampler: { value: renderTarget.texture },
        normalSampler: { value: waterNormals },
      },
    ]);
    return mergedUniforms;
  }, [renderTarget, waterNormals]);

  const onBeforeRender = useCallback(() => {
    const water = ref.current;
    const virtualCamera = new THREE.PerspectiveCamera();
    
    const sunDirection = uniforms.sunDirection.value.set(0, 1, 0).normalize();
    const eye = uniforms.eye.value.setFromMatrixPosition(camera.matrixWorld);

    water.visible = false;
    
    const textureMatrix = uniforms.textureMatrix.value;
    const view = new THREE.Vector3();
    const target = new THREE.Vector3();

    view.subVectors(ref.current.position, camera.position);
    plane.setFromNormalAndCoplanarPoint(ref.current.up, ref.current.position);
    target.copy(camera.position).add(view.reflect(plane.normal));
    virtualCamera.position.copy(target);
    virtualCamera.up.copy(camera.up);
    virtualCamera.lookAt(ref.current.position);

    textureMatrix.set(0.5, 0.0, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0, 1.0);
    textureMatrix.multiply(virtualCamera.projectionMatrix);
    textureMatrix.multiply(virtualCamera.matrixWorldInverse);

    gl.setRenderTarget(renderTarget);
    gl.render(scene, virtualCamera);
    gl.setRenderTarget(null);

    water.visible = true;
  }, [camera, gl, plane, renderTarget, scene, uniforms]);

  useFrame((_state, delta) => {
    ref.current.material.uniforms.time.value += delta;
  });

return (
    <mesh ref={ref} rotation-x={-Math.PI / 2} onBeforeRender={onBeforeRender}>
      <planeGeometry args={[10000, 10000]} />
      <shaderMaterial
        args={[{ uniforms, vertexShader, fragmentShader, lights: true }]}
      />
    </mesh>
  );
}
