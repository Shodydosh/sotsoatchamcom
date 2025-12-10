import { useState } from 'react'
import ModelCard from './components/ModelCard'
import ModelViewer from './components/ModelViewer'
import modelsData from './data/models.json'
import './App.css'

function App() {
  const [selectedModel, setSelectedModel] = useState(null)

  return (
    <div className="app">
      <header className="header">
        <h1>SỘT SOẠT CHẤM COM</h1>
        <span className="subtitle">OK polyscan 7 ngày trial nên CL j tôi cũng scan - SỐT NGUYỂN</span>
      </header>

      <main className="gallery">
        {modelsData.map((model) => (
          <ModelCard 
            key={model.id} 
            model={model} 
            onClick={setSelectedModel}
          />
        ))}
        
        {modelsData.length === 0 && (
          <div className="empty-state">
            <p>Chưa có model nào</p>
            <span>Thêm file .glb vào public/models/</span>
          </div>
        )}
      </main>

      <ModelViewer 
        model={selectedModel} 
        onClose={() => setSelectedModel(null)} 
      />
    </div>
  )
}

export default App
