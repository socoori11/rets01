import { useEffect, useState } from 'react'
import axios from 'axios'
import type { WeatherAPI, WeatherData } from '../types/weather'
import styles from './Weather.module.scss'

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [time, setTime] = useState<string>('') // ⏰ 현재 시간 상태 추가

  const API_KEY = '89d6c114ec7bbbfd4be0ebc38e323833'
  const KAKAO_KEY = 'afb63d8e7376ee4e9d81fe94b2f2d3e0'

  // ✅ 현재 시간 갱신
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleString()
      setTime(formatted)
    }

    updateTime() // 초기 실행
    const timer = setInterval(updateTime, 60 * 1000) // 1분마다 갱신
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('위치 정보를 지원하지 않습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords

        try {
          // 🔹 OpenWeather 데이터 가져오기
          const res = await axios.get<WeatherAPI>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
          )

          const data = res.data
          const refined: WeatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
          }

          setWeather(refined)
        } catch {
          setError('날씨 정보를 불러오지 못했습니다.')
        }

        // 🔹 카카오맵 로드
        const script = document.createElement('script')
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`
        script.onload = () => {
          window.kakao.maps.load(() => {
            const mapContainer = document.getElementById('map') as HTMLElement
            const mapOption = {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3,
            }
            const map = new window.kakao.maps.Map(mapContainer, mapOption)
            const markerPosition = new window.kakao.maps.LatLng(latitude, longitude)
            const marker = new window.kakao.maps.Marker({ position: markerPosition })
            marker.setMap(map)
          })
        }
        document.body.appendChild(script)
      },
      err => {
        console.log(err)
        setError('위치 정보를 가져올 수 없습니다.')
      }
    )
  }, [])

  if (error) return <p className={styles.error}>⚠ {error}</p>
  if (!weather) return null

  return (
    <div className={styles.weather}>
      <div className={styles.info}>
        <h2>{weather.city}의 현재 날씨</h2>
        {/* 🔹 현재 날짜 및 시간 표시 */}
        <p className={styles.time}>{time}</p>

        <div className={styles.detail}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.desc}
          />
          <div>
            <p className={styles.temp}>{Math.round(weather.temp)}°C</p>
            <p className={styles.desc}>{weather.desc}</p>
          </div>
        </div>
      </div>

      <div id="map" className={styles.map} aria-label="현재 위치 지도"></div>
    </div>
  )
}

export default Weather
