import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Environment, Grid, Text } from '@react-three/drei'
import { Suspense } from 'react'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  )
}

function BackgroundTitle({ text }) {
  return (
    <Text
      position={[0, 1, -5]}
      fontSize={1.2}
      color="#e8e8e8"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.02}
      maxWidth={10}
      textAlign="center"
    >
      {text}
    </Text>
  )
}

function ModelViewer({ model, onClose }) {
  if (!model) return null

  return (
    <div className="viewer-overlay">
      <div className="viewer-header">
        <div className="viewer-title">
          <h2>{model.name}</h2>
          <span>{model.date}</span>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="viewer-canvas">
        <Canvas camera={{ position: [3, 2, 3], fov: 45 }}>
          <color attach="background" args={['#f5f5f5']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          
          <Suspense fallback={null}>
            <BackgroundTitle text={model.name} />
            <Model url={model.file} />
            <Environment preset="city" />
          </Suspense>
          
          <Grid 
            infiniteGrid 
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#e0e0e0"
            sectionSize={2}
            sectionThickness={1}
            sectionColor="#d0d0d0"
            fadeDistance={30}
          />
          
          <OrbitControls 
            enableDamping
            dampingFactor={0.05}
            minDistance={1}
            maxDistance={20}
          />
        </Canvas>
      </div>

      <div className="viewer-controls">
        <span>🖱️ Kéo để xoay</span>
        <span>🔍 Scroll để zoom</span>
        <span>⌨️ Shift + kéo để di chuyển</span>
      </div>
    </div>
  )
}

export default ModelViewer
