import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, Environment, Grid, Text } from '@react-three/drei'
import { Suspense, useState } from 'react'

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
      color="#e0e0e0"
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
  const [copied, setCopied] = useState(false)
  
  if (!model) return null

  const isMobile = window.innerWidth <= 768
  const shareUrl = `${window.location.origin}/model/${model.id}`

  const handleShare = async () => {
    if (navigator.share && isMobile) {
      try {
        await navigator.share({
          title: model.name,
          text: model.description,
          url: shareUrl
        })
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="viewer-overlay">
      <div className="viewer-header">
        <div className="viewer-title">
          <h2>{model.name}</h2>
          <span>{model.description}</span>
        </div>
        <div className="viewer-actions">
          <button className="share-btn" onClick={handleShare}>
            {copied ? '✓ Copied!' : '🔗 Share'}
          </button>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      </div>
      
      <div className="viewer-canvas">
        <Canvas 
          camera={{ position: [3, 2, 3], fov: 45 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
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
            touches={{
              ONE: 1,
              TWO: 2
            }}
          />
        </Canvas>
      </div>

      <div className="viewer-controls">
        {isMobile ? (
          <>
            <span>👆 1 ngón để xoay</span>
            <span>🤏 2 ngón để zoom</span>
          </>
        ) : (
          <>
            <span>🖱️ Kéo để xoay</span>
            <span>🔍 Scroll để zoom</span>
            <span>⌨️ Shift + kéo để di chuyển</span>
          </>
        )}
      </div>
    </div>
  )
}

export default ModelViewer
