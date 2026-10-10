import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  const [videoSource, setVideoSource] = useState(`${import.meta.env.BASE_URL}birthday-greeting.mp4`)
  const [hasVideo, setHasVideo] = useState(true)

  const chooseVideo = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setVideoSource(URL.createObjectURL(file))
    setHasVideo(true)
  }

  return (
    <main className="page-shell">
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <div className="confetti" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ★ &nbsp; ✦ &nbsp; ✧</div>

      <section className="greeting" aria-labelledby="page-title">
        <p className="eyebrow">особливе привітання</p>
        <h1 id="page-title">З днем народження!</h1>
        <p className="wish">Нехай цей новий рік життя буде наповнений світлом, радістю та здійсненням найтепліших мрій.</p>

        <div className="video-card">
          {hasVideo && (
            <video
              className="video"
              src={videoSource}
              controls
              playsInline
              onError={() => setHasVideo(false)}
              aria-label="Відео-привітання з днем народження"
            />
          )}
          {!hasVideo && (
            <label className="video-placeholder">
              <span className="placeholder-icon">▶</span>
              <span>Додайте своє відео-привітання</span>
              <small>Оберіть MP4-файл, щоб переглянути його тут</small>
              <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={chooseVideo} />
            </label>
          )}
        </div>

        <p className="hint">{hasVideo ? 'Натисніть на відео, щоб почати перегляд' : 'Або покладіть файл public/birthday-greeting.mp4 перед публікацією'}</p>
        <div className="signature">З найкращими побажаннями <span>♥</span></div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
