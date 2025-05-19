import { createContext, useState, useEffect, useRef, ReactNode, use } from 'react'

// Định nghĩa interface cho sounds
interface Sounds {
  [key: string]: string
}

// Định nghĩa interface cho context value
interface AudioContextValue {
  sounds: Sounds
  currentSection: string | null
  isPlaying: boolean
  volume: number
  isMuted: boolean
  addSound: (id: string, url: string) => void
  removeSound: (id: string) => void
  playForSection: (sectionId: string) => void
  stopAudio: () => void
  pauseAudio: () => void
  resumeAudio: () => void
  changeVolume: (newVolume: number) => void
  toggleMute: () => void
  preloadAllSounds: () => void
}

// Tạo context để quản lý âm thanh
export const AudioContext = createContext<AudioContextValue | undefined>(undefined)

interface AudioProviderProps {
  children: ReactNode
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  // State để quản lý các âm thanh
  const [sounds, setSounds] = useState<Sounds>({})
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.5)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  // Refs để theo dõi các audio elements
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  const currentAudio = useRef<HTMLAudioElement | null>(null)

  // Thêm một âm thanh mới vào hệ thống
  const addSound = (id: string, url: string) => {
    setSounds((prev) => ({
      ...prev,
      [id]: url
    }))
  }

  // Xóa một âm thanh khỏi hệ thống
  const removeSound = (id: string) => {
    setSounds((prev) => {
      const newSounds = { ...prev }
      delete newSounds[id]
      return newSounds
    })
  }

  // Chơi âm thanh cho một section cụ thể
  const playForSection = (sectionId: string) => {
    // Dừng audio hiện tại nếu có
    if (currentAudio.current) {
      currentAudio.current.pause()
      currentAudio.current.currentTime = 0
    }

    // Thiết lập section mới
    setCurrentSection(sectionId)

    // Kiểm tra nếu có âm thanh cho section này
    if (sounds[sectionId]) {
      // Tạo audio mới nếu chưa tồn tại
      if (!audioRefs.current[sectionId]) {
        const audio = new Audio(sounds[sectionId])
        audio.loop = true
        audio.volume = isMuted ? 0 : volume
        audioRefs.current[sectionId] = audio
      }

      // Cập nhật audio hiện tại và phát
      currentAudio.current = audioRefs.current[sectionId]
      currentAudio.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error('Error playing audio:', error))
    } else {
      setIsPlaying(false)
    }
  }

  // Dừng phát âm thanh
  const stopAudio = () => {
    if (currentAudio.current) {
      currentAudio.current.pause()
      currentAudio.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  // Tạm dừng âm thanh
  const pauseAudio = () => {
    if (currentAudio.current) {
      currentAudio.current.pause()
      setIsPlaying(false)
    }
  }

  // Tiếp tục phát âm thanh
  const resumeAudio = () => {
    if (currentAudio.current) {
      currentAudio.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error('Error resuming audio:', error))
    }
  }

  // Điều chỉnh âm lượng
  const changeVolume = (newVolume: number) => {
    const volumeValue = Math.min(1, Math.max(0, newVolume))
    setVolume(volumeValue)

    // Cập nhật âm lượng cho âm thanh hiện tại
    if (currentAudio.current && !isMuted) {
      currentAudio.current.volume = volumeValue
    }

    // Cập nhật âm lượng cho tất cả các âm thanh đã được tạo
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio && !isMuted) {
        audio.volume = volumeValue
      }
    })
  }

  // Bật/tắt âm thanh
  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)

    // Cập nhật trạng thái mute cho âm thanh hiện tại
    if (currentAudio.current) {
      currentAudio.current.volume = newMutedState ? 0 : volume
    }

    // Cập nhật trạng thái mute cho tất cả các âm thanh đã được tạo
    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) {
        audio.volume = newMutedState ? 0 : volume
      }
    })
  }

  // Preload tất cả các âm thanh
  const preloadAllSounds = () => {
    Object.entries(sounds).forEach(([id, url]) => {
      if (!audioRefs.current[id]) {
        const audio = new Audio(url)
        audio.preload = 'auto'
        audioRefs.current[id] = audio
      }
    })
  }

  // Khi component unmount, dọn dẹp tất cả audio
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause()
          audio.src = ''
        }
      })
      audioRefs.current = {}
      currentAudio.current = null
    }
  }, [])

  // Giá trị context được cung cấp cho các component con
  const contextValue: AudioContextValue = {
    sounds,
    currentSection,
    isPlaying,
    volume,
    isMuted,
    addSound,
    removeSound,
    playForSection,
    stopAudio,
    pauseAudio,
    resumeAudio,
    changeVolume,
    toggleMute,
    preloadAllSounds
  }

  return <AudioContext value={contextValue}>{children}</AudioContext>
}

// Custom hook để sử dụng AudioContext
export const useAudio = (): AudioContextValue => {
  const context = use(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
