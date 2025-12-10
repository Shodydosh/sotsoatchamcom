import { useState, useEffect } from 'react'
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom'
import ModelCard from './components/ModelCard'
import ModelViewer from './components/ModelViewer'
import modelsData from './data/models.json'
import './App.css'

function Gallery() {
  const navigate = useNavigate()

  const handleModelClick = (model) => {
    navigate(`/model/${model.id}`)
  }

  return (
    <>
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>SỘT SOẠT CHẤM COM</h1>
        </Link>
        <span className="subtitle">3D Scans Gallery</span>
      </header>

      <main className="gallery">
        {modelsData.map((model) => (
          <ModelCard 
            key={model.id} 
            model={model} 
            onClick={handleModelClick}
          />
        ))}
        
        {modelsData.length === 0 && (
          <div className="empty-state">
            <p>Chưa có model nào</p>
            <span>Thêm file .glb vào public/models/</span>
          </div>
        )}
      </main>
    </>
  )
}

function ModelPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const model = modelsData.find(m => m.id === id)

  if (!model) {
    return (
      <div className="not-found">
        <h2>Model không tồn tại</h2>
        <Link to="/">← Về trang chủ</Link>
      </div>
    )
  }

  return (
    <ModelViewer 
      model={model} 
      onClose={() => navigate('/')} 
    />
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/model/:id" element={<ModelPage />} />
      </Routes>
    </div>
  )
}

export default App
