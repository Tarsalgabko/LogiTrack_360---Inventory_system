import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import * as THREE from 'three';

interface RackProps {
  position: [number, number, number];
  label: string;
  utilization: number;
  onClick?: () => void;
}

const Rack: React.FC<RackProps> = ({ position, label, utilization, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const color = useMemo(() => {
    if (utilization > 0.8) return '#ef4444'; // Red
    if (utilization > 0.6) return '#f59e0b'; // Orange
    if (utilization > 0.4) return '#eab308'; // Yellow
    return '#22c55e'; // Green
  }, [utilization]);

  return (
    <group position={position} onClick={onClick}>
      <Box
        ref={meshRef}
        args={[1, 2, 0.5]}
        position={[0, 1, 0]}
      >
        <meshStandardMaterial color={color} />
      </Box>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {Math.round(utilization * 100)}%
      </Text>
    </group>
  );
};

const Floor: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
  );
};

const WalkPath: React.FC<{ start: [number, number, number]; end: [number, number, number] }> = ({ start, end }) => {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#8A4AF3" linewidth={2} />
    </line>
  );
};

interface WarehouseSceneProps {
  onRackClick?: (rackId: string) => void;
}

export const WarehouseScene: React.FC<WarehouseSceneProps> = ({ onRackClick }) => {
  const racks = [
    { id: 'A1', position: [-6, 0, -6] as [number, number, number], utilization: 0.85 },
    { id: 'A2', position: [-6, 0, -3] as [number, number, number], utilization: 0.65 },
    { id: 'A3', position: [-6, 0, 0] as [number, number, number], utilization: 0.45 },
    { id: 'B1', position: [-3, 0, -6] as [number, number, number], utilization: 0.75 },
    { id: 'B2', position: [-3, 0, -3] as [number, number, number], utilization: 0.55 },
    { id: 'B3', position: [-3, 0, 0] as [number, number, number], utilization: 0.35 },
    { id: 'C1', position: [0, 0, -6] as [number, number, number], utilization: 0.95 },
    { id: 'C2', position: [0, 0, -3] as [number, number, number], utilization: 0.25 },
    { id: 'C3', position: [0, 0, 0] as [number, number, number], utilization: 0.15 },
  ];

  return (
    <Canvas
      camera={{ position: [10, 10, 10], fov: 60 }}
      style={{ height: '400px' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      
      <Floor />
      
      {racks.map((rack) => (
        <Rack
          key={rack.id}
          position={rack.position}
          label={rack.id}
          utilization={rack.utilization}
          onClick={() => onRackClick?.(rack.id)}
        />
      ))}

      {/* Navigation paths */}
      <WalkPath start={[-7, 0.1, -7]} end={[1, 0.1, -7]} />
      <WalkPath start={[-7, 0.1, -4]} end={[1, 0.1, -4]} />
      <WalkPath start={[-7, 0.1, -1]} end={[1, 0.1, -1]} />
      <WalkPath start={[-7, 0.1, 2]} end={[1, 0.1, 2]} />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};