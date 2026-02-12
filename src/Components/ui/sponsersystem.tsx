import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Billboard, Ring } from "@react-three/drei";
import * as THREE from "three";



/**
 * Editable sponsor configuration
 * radius → distance from center
 * speed → orbit speed
 * color → planet color
 */
const sponsors = [
  { name: "Alpha", radius: 4, speed: 0.5, color: "#465753", tiltX: 0, tiltZ: 0 },
  { name: "Beta", radius: 6, speed: 0.35, color: "#465753", tiltX: 0, tiltZ: -3 },
  { name: "Gamma", radius: 8, speed: 0.25, color: "#465753", tiltX: 0, tiltZ: 1 },
  { name: "Delta", radius: 10, speed: 0.18, color: "#465753", tiltX: 0, tiltZ: -2 },
];

const degToRad = (deg: number) => (deg * Math.PI) / 180;


function OrbitSystem({ sponsor }: any) {
  const orbitRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    orbitRef.current.rotation.y = t * sponsor.speed;
  });

  return (
    <group
      ref={orbitRef}
      rotation={[
        degToRad(sponsor.tiltX),
        0,
        degToRad(sponsor.tiltZ),
      ]}
    >
      {/* Orbit Ring */}
      <Ring
        args={[sponsor.radius - 0.02, sponsor.radius + 0.02, 128]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.8}
        />
      </Ring>

      {/* Planet */}
      <group position={[sponsor.radius, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color={sponsor.color} />
        </mesh>

        <Billboard position={[0, 1.4, 0]}>
          <Text fontSize={0.4} color="white" anchorX="center">
            {sponsor.name}
          </Text>
        </Billboard>
      </group>
    </group>
  );
}

/* Central Event Sphere */
function Core({ color, name }: { color: string; name: string }) {
  return (
    <group>
      {/* Center Sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Center Label */}
      <Billboard position={[0, 0, 0]}>
      <Text
        position={[0, 1.8, 2]}   // slightly in front of sphere
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
     </Billboard>
    </group>
  );
}

/* Main Scene Component */
export default function ThreeDSponsors() {

  // detect the device
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkScreen = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkScreen();
  window.addEventListener("resize", checkScreen);
  return () => window.removeEventListener("resize", checkScreen);
}, []);

useEffect(() => {
  if (typeof window === "undefined") return;

  const checkScreen = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkScreen();
  window.addEventListener("resize", checkScreen);
  return () => window.removeEventListener("resize", checkScreen);
}, []);


  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{
        position: isMobile ? [8, 6, 14] : [0, 8, 18],
        fov: isMobile ? 55 : 50,
      }}>
        <group position={isMobile ? [-4, 0, 0] : [0, 0, 0]}>

        {/* entire orbit system */}
        {sponsors.map((s, i) => (
          <OrbitSystem key={i} sponsor={s} />
        ))}
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Central Core */}
        <Core color="#F27C06" name="Designathon 2.0" />

        {/* Camera control (disable zoom if needed) */}
        <OrbitControls enableZoom={false} />
        </group>
      </Canvas>
    </div>
  );
}
