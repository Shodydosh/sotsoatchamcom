import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Environment, Text } from '@react-three/drei'
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
      position={[0, 0, -2]}
      fontSize={0.4}
      color="#d5d5d5"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.02}
      maxWidth={3}
      textAlign="center"
    >
      {text}
    </Text>
  )
}

function ModelCard({ model, onClick }) {
  return (
    <div className="model-card" onClick={() => onClick(model)}>
      <div className="model-preview">
        <Canvas camera={{ position: [2, 1.5, 2], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Suspense fallback={null}>
            <BackgroundTitle text={model.name} />
            <Model url={model.file} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate 
            autoRotateSpeed={2}
          />
        </Canvas>
      </div>
      <div className="model-info">
        <h3>{model.name}</h3>
        <p>{model.description}</p>
        <span className="model-date">📅 {model.date}</span>
      </div>
    </div>
  )
}

export default ModelCard
