import { useState, useRef } from 'react'
import './App.css'

interface PlantResult {
  name: string
  scientificName: string
  confidence: number
  description: string
  careInstructions: string[]
}

function App() {
  const [image, setImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<PlantResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzePlant = async () => {
    if (!image) return
    
    setAnalyzing(true)
    
    // Simulate AI analysis (in production, this would call an AI API like Plant.id or custom model)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock result for demonstration
    const mockResults: PlantResult[] = [
      {
        name: "Monstera Deliciosa",
        scientificName: "Monstera deliciosa",
        confidence: 0.94,
        description: "Also known as the Swiss Cheese Plant, this popular houseplant is native to Central American rainforests. Its iconic fenestrated leaves make it a favorite among plant enthusiasts.",
        careInstructions: [
          "💧 Water when top 2 inches of soil are dry",
          "☀️ Bright, indirect sunlight",
          "🌡️ Temperature: 65-85°F (18-29°C)",
          "💨 Moderate to high humidity",
          "🌱 Fertilize monthly during growing season"
        ]
      },
      {
        name: "Pothos",
        scientificName: "Epipremnum aureum",
        confidence: 0.89,
        description: "Golden Pothos is one of the easiest houseplants to grow. Its trailing vines and heart-shaped leaves make it perfect for hanging baskets or climbing up a moss pole.",
        careInstructions: [
          "💧 Water when soil is mostly dry",
          "☀️ Low to bright, indirect light",
          "🌡️ Temperature: 60-85°F (15-29°C)",
          "💨 Average household humidity",
          "🌱 Very low maintenance"
        ]
      },
      {
        name: "Snake Plant",
        scientificName: "Sansevieria trifasciata",
        confidence: 0.87,
        description: "Also called Mother-in-Law's Tongue, this hardy succulent is nearly indestructible and excellent for beginners. It's also a great air purifier.",
        careInstructions: [
          "💧 Water sparingly, every 2-6 weeks",
          "☀️ Low to bright, indirect light",
          "🌡️ Temperature: 55-85°F (13-29°C)",
          "💨 Low humidity preferred",
          "🌱 Extremely drought-tolerant"
        ]
      }
    ]
    
    // Random selection for demo
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
    
    setResult(randomResult)
    setAnalyzing(false)
  }

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const reset = () => {
    setImage(null)
    setResult(null)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🌿 PlantVision</h1>
        <p className="tagline">Identify plants instantly with AI</p>
      </header>

      <main className="main">
        {!image ? (
          <div className="upload-zone">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button className="camera-button" onClick={handleCameraClick}>
              📸 Take Photo or Upload
            </button>
            <p className="hint">Point your camera at any plant to identify it</p>
          </div>
        ) : (
          <div className="analysis-container">
            <div className="image-preview">
              <img src={image} alt="Plant to identify" />
              <button className="reset-button" onClick={reset}>← Try Another Plant</button>
            </div>

            {!result && !analyzing && (
              <button className="analyze-button" onClick={analyzePlant}>
                🔍 Identify Plant
              </button>
            )}

            {analyzing && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Analyzing plant...</p>
              </div>
            )}

            {result && (
              <div className="result">
                <div className="result-header">
                  <h2>{result.name}</h2>
                  <p className="scientific-name">{result.scientificName}</p>
                  <div className="confidence">
                    <span className="confidence-bar" style={{ width: `${result.confidence * 100}%` }}></span>
                    <span className="confidence-text">{Math.round(result.confidence * 100)}% confident</span>
                  </div>
                </div>

                <div className="description">
                  <h3>About This Plant</h3>
                  <p>{result.description}</p>
                </div>

                <div className="care-instructions">
                  <h3>Care Instructions</h3>
                  <ul>
                    {result.careInstructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                </div>

                <button className="analyze-button" onClick={analyzePlant}>
                  🔄 Re-analyze
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Built with AI-powered plant recognition</p>
        <p className="disclaimer">For best results, take clear photos in good lighting</p>
      </footer>
    </div>
  )
}

export default App
