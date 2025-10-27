import React, { useEffect, useRef, useState } from 'react'
import styles from './VideoSlider.module.scss'

interface Slide  {
  src: string
  title: string
  subtitle?: string
  poster?: string
}

interface Props {
  slides: Slide[]
  intervalMs?: number
  autoPlay?: boolean
}

const VideoSlider: React.FC<Props> = ({ slides, intervalMs = 6000, autoPlay = true }) => {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!autoPlay) return
    timerRef.current = window.setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, intervalMs)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [slides.length, autoPlay])

  const cur = slides[index]

  return (
    <div className={styles.slider} aria-roledescription="비디오 슬라이더">
      {/* 비디오는 항상 가장 뒤 레이어 */}
      <video
        key={cur.src}
        className={styles.video}
        src={cur.src}
        poster={cur.poster}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 🔹 오버레이: key={index} 로 슬라이드마다 애니메이션 재실행 */}
      <div key={index} className={styles.overlay} role="group" aria-label="슬라이드 소개">
        <h2 className={styles.title}>{cur.title}</h2>
        <p className={styles.subtitle}>{cur.subtitle}</p>
      </div>
    </div>
  )
}

export default VideoSlider
