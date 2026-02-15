import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

const InteractiveSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 2 : 0.5);
      meshRef.current.rotation.x += delta * (hovered ? 1 : 0.2);
    }
  });

  return (
    <Sphere
      args={[1, 16, 12]}
      ref={meshRef}
      scale={1.6}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshBasicMaterial
        wireframe
        color={hovered ? "#f27c06" : "white"}
        transparent
        opacity={hovered ? 0.7 : 0.3}
      />
    </Sphere>
  );
};

export default InteractiveSphere;
