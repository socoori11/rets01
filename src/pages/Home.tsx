import VideoSlider from '../com/VideoSlider'
import { useLocation } from 'react-router-dom'
import styles from './Home.module.scss'


const slides = [
  {
    src: 'mov/hun1.mp4',
    title: 'Welcome to Our Site',
    subtitle: '자연과 기술이 만나는 공간 — “타입 프로젝트”의 홈 페이지입니다.'
  },
  {
    src: 'mov/hun2.mp4',
    title: 'Smart & Sustainable',
    subtitle: '도시와 기술의 조화, 데이터로 더 똑똑해지는 일상.'
  },
  {
    src: 'mov/hun3.mp4',

    title: 'Beyond the Horizon',
    subtitle: '확장 가능한 프런트엔드, 직관적인 사용자 경험을 설계합니다.'
  },
]

const Home = () => {
   const location = useLocation()
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <VideoSlider key={location.key} slides={slides} />
      </section>
    </main>
  )
}

export default Home
