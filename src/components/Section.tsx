import { useEffect } from 'react'
import { useAudio } from '@/providers/AudioProvider'

type Props = {
  id: string
  children: React.ReactNode
}

const Section = ({ id, children }: Props) => {
  const { playForSection, currentSection } = useAudio()

  // Khi section hiển thị trong viewport, phát nhạc tương ứng
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playForSection(id)
        }
      },
      { threshold: 0.6 } // Kích hoạt khi 60% section hiển thị
    )

    const sectionElement = document.getElementById(`section-${id}`)
    if (sectionElement) {
      observer.observe(sectionElement)
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement)
      }
    }
  }, [id, playForSection])

  return (
    <section id={`section-${id}`} className={`size-fit ${currentSection === id ? 'active' : ''}`}>
      {children}
    </section>
  )
}

export default Section
