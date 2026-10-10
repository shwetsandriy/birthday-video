import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const questions = [
  'Кохана, ти пам’ятаєш, як уперше відчула, що між нами щось особливе?',
  'Якби я зараз притягнув тебе до себе й ніжно поцілував, ти б відповіла на поцілунок? 😘',
  'Чи хотіла б ти провести зі мною особливий вечір, сповнений тепла, ніжності та приємних сюрпризів?',
  'Чи довіришся ти мені, якщо я скажу, що підготував для тебе дещо дуже особливе? 😈',
  'Кохана, ти готова дізнатися, який сюрприз я підготував для тебе на твій день народження? ❤️🎁',
]

function App() {
  const [videoSource, setVideoSource] = useState(`${import.meta.env.BASE_URL}birthday-greeting.mp4`)
  const [hasVideo, setHasVideo] = useState(true)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [quizMessage, setQuizMessage] = useState('')
  const [hasStarted, setHasStarted] = useState(false)
  const videoRef = useRef(null)

  const chooseVideo = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setVideoSource(URL.createObjectURL(file))
    setHasVideo(true)
  }

  const answer = (isYes) => {
    if (!isYes) {
      setQuizMessage('Спробуй ще раз, кохана ♥')
      return
    }

    setQuizMessage('')
    setQuestionIndex((current) => current + 1)
  }

  const isUnlocked = questionIndex === questions.length

  const startVideo = () => {
    videoRef.current?.play().catch(() => {})
  }

  useEffect(() => {
    if (isUnlocked && hasVideo) {
      startVideo()
    }
  }, [isUnlocked, hasVideo])

  return (
    <main className="page-shell">
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <div className="hearts" aria-hidden="true">
        <span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span>
        <span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span>
      </div>
      <div className="confetti" aria-hidden="true">✦ &nbsp; ✧ &nbsp; ★ &nbsp; ✦ &nbsp; ✧</div>

      <section className="greeting" aria-labelledby="page-title">
        {!isUnlocked ? (
          <section className="quiz-card" aria-live="polite" aria-labelledby="quiz-question">
            <p className="quiz-progress">Питання {questionIndex + 1} з {questions.length}</p>
            <h1 id="quiz-question">{questions[questionIndex]}</h1>
            <div className="quiz-actions">
              <button className="yes-button" onClick={() => answer(true)}>Так ♥</button>
              <button className="no-button" onClick={() => answer(false)}>Ні</button>
            </div>
            {quizMessage && <p className="quiz-message">{quizMessage}</p>}
          </section>
        ) : <>
        <div className="video-card">
          {hasVideo && (
            <video
              ref={videoRef}
              className="video"
              src={videoSource}
              controls
              playsInline
              onPlay={() => setHasStarted(true)}
              onError={() => setHasVideo(false)}
              aria-label="Відео-привітання з днем народження"
            />
          )}
          {hasVideo && !hasStarted && (
            <button className="video-cover" onClick={startVideo} aria-label="Запустити відео" />
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

        <p className="hint">{hasVideo ? 'Натисни на відео, щоб подивитися його' : 'Або покладіть файл public/birthday-greeting.mp4 перед публікацією'}</p>
        <div className="signature">З любов'ю, ти найкраще що є в моєму житті <span>♥</span></div>
        </>}
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
