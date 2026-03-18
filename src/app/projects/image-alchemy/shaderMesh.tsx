"use client"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { extend, ThreeElement } from "@react-three/fiber"
import * as THREE from "three"
import { useTexture, shaderMaterial } from "@react-three/drei"
import  vertexShader from "../image-alchemy/shaders/vertex.glsl"
import fragmentShader from "../image-alchemy/shaders/fragment.glsl"


const ImageAlchemyMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(),
    uStrength: 0
  },
  vertexShader,
  fragmentShader
);

extend({ ImageAlchemyMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    imageAlchemyMaterial: ThreeElement<typeof ImageAlchemyMaterial>;
  }
}

type ImageAlchemyMaterialType = THREE.ShaderMaterial & {
  uTime: number; uTexture: THREE.Texture; uMouse: THREE.Vector2; uStrength: number
};

export default function ShaderMesh() {
      const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, ImageAlchemyMaterialType>>(null!);
    
    const { viewport } = useThree()

    const isMobile = viewport.width < 6;
    const texture = useTexture(
        "/shader-img/image-alchemy.jpeg"
    )

    const mouse = useRef(new THREE.Vector2(0.5, 0.5))
    const strength = useRef(0)

    const scale = useMemo<[number, number, number]>(() =>
        isMobile ? [2.4, 3.2, 1] : [3.5, 4.5, 1],
        [isMobile]);


    useFrame((state) => {

        if (!meshRef.current) 
            return;

        const mat = meshRef.current.material;
        const {pointer, clock} = state;

        mat.uTime = clock.elapsedTime

        const targetX = pointer.x * 0.5 + 0.5
        const targetY = pointer.y * 0.5 + 0.5

        const diffX = targetX - mouse.current.x
        const diffY = targetY - mouse.current.y
        const vel = Math.sqrt(diffX * diffX + diffY * diffY)

        mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetX, 0.1)
        mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetY, 0.1)
        strength.current = THREE.MathUtils.lerp(strength.current, vel * 15.0, 0.1)

        mat.uMouse = mouse.current
        mat.uStrength = strength.current

        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, (mouse.current.x - 0.5) * 0.4, 0.1)
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -(mouse.current.y - 0.5) * 0.3, 0.1)
    })

    return (
        <mesh 
        ref={meshRef}
        scale={scale}
        >
            <planeGeometry args={[1, 1, isMobile ? 32 : 64, isMobile ? 32 : 64]}/>      
            <imageAlchemyMaterial uTexture={texture} transparent/>
        </mesh>
    )
}

