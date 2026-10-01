'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import styles from './pet.module.css'

type Screen = 'welcome' | 'avatar'
type Material = 'cloud' | 'velvet' | 'knit' | 'felt'

const avatarPath = '/assets/ai-companion-pet/muse-avatar-reference.png'

const materials: Array<{ id: Material; name: string; note: string; icon: string }> = [
  { id: 'cloud', name: '云朵绒', note: '柔软蓬松', icon: 'ri-cloud-line' },
  { id: 'velvet', name: '细短绒', note: '顺滑轻盈', icon: 'ri-sparkling-line' },
  { id: 'knit', name: '针织', note: '温暖有纹理', icon: 'ri-shirt-line' },
  { id: 'felt', name: '毛毡', note: '简单耐用', icon: 'ri-shapes-line' },
]

const colors = [
  { name: '桃子粉', value: '#e6aaa3' },
  { name: '薄荷绿', value: '#8fc8b7' },
  { name: '天空蓝', value: '#90b9d8' },
  { name: '奶油黄', value: '#dbc17c' },
]

function BrandMark() {
  return <div className={styles.brandMark} aria-hidden="true"><span /><span /></div>
}

export default function CompanionPetPage() {
  const [screen, setScreenState] = useState<Screen>('welcome')
  const [material, setMaterial] = useState<Material>('cloud')
  const [color, setColor] = useState(colors[0])
  const [name, setName] = useState('默默')
  const [speaking, setSpeaking] = useState(false)
  const [saved, setSaved] = useState(false)
  const welcomeAudio = useRef<HTMLAudioElement | null>(null)

  const setScreen = useCallback((next: Screen) => {
    setScreenState(next)
    const url = new URL(window.location.href)
    url.searchParams.set('screen', next)
    window.history.replaceState({}, '', url)
  }, [])

  const playWelcome = useCallback(() => {
    if (speaking) return
    const audio = welcomeAudio.current
    if (!audio) {
      setScreen('avatar')
      return
    }

    setSpeaking(true)
    audio.pause()
    audio.currentTime = 0
    audio.onended = () => {
      setSpeaking(false)
      setScreen('avatar')
    }
    audio.onerror = () => {
      setSpeaking(false)
      setScreen('avatar')
    }
    void audio.play().catch(() => {
      setSpeaking(false)
      setScreen('avatar')
    })
  }, [setScreen, speaking])

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get('screen')
    if (selected === 'avatar' || selected === 'welcome') setScreenState(selected)
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return
      if (event.code === 'Space' && screen === 'welcome') {
        event.preventDefault()
        playWelcome()
      }
      if (event.key === 'ArrowRight') setScreen('avatar')
      if (event.key === 'ArrowLeft') setScreen('welcome')
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [playWelcome, screen, setScreen])

  useEffect(() => () => {
    if (welcomeAudio.current) welcomeAudio.current.pause()
  }, [])

  return (
    <main className={styles.page} data-screen={screen} lang="zh-CN">
      <audio ref={welcomeAudio} src="/assets/ai-companion-pet/momo-welcome.wav" preload="auto" />

      <header className={styles.topbar}>
        <a className={styles.brand} href="#welcome" onClick={() => setScreen('welcome')} aria-label="回到欢迎页">
          <BrandMark />
          <span>默默</span>
        </a>
        <div className={styles.steps} aria-label="设置进度">
          <button type="button" data-active={screen === 'welcome'} onClick={() => setScreen('welcome')}>认识彼此</button>
          <span aria-hidden="true" />
          <button type="button" data-active={screen === 'avatar'} onClick={() => setScreen('avatar')}>创造伙伴</button>
        </div>
        <button className={styles.soundButton} type="button" onClick={playWelcome} aria-label="播放默默的欢迎语" title="播放欢迎语">
          <i className={speaking ? 'ri-volume-vibrate-fill' : 'ri-volume-up-line'} aria-hidden="true" />
        </button>
      </header>

      {screen === 'welcome' ? (
        <section className={styles.welcomeScreen} id="welcome">
          <div className={styles.welcomeCopy}>
            <p className={styles.eyebrow}>第一次见面</p>
            <h1>你好，安睿。<br />我是默默。</h1>
            <p className={styles.welcomeIntro}>我会陪你聊天，记住你在意的小事，也知道什么时候安静地待在你身边。</p>
            <div className={styles.welcomeActions}>
              <button className={styles.primaryButton} type="button" onClick={playWelcome} disabled={speaking}>
                <span>{speaking ? '默默正在说话…' : '开始创造我的伙伴'}</span>
                <i className={speaking ? 'ri-sound-module-line' : 'ri-arrow-right-line'} aria-hidden="true" />
              </button>
              <button className={styles.spaceHint} type="button" onClick={playWelcome} disabled={speaking}>
                <span>空格键</span>
                听听我的声音
              </button>
            </div>
          </div>

          <div className={styles.welcomeAvatar} data-speaking={speaking}>
            <div className={styles.sunShape} aria-hidden="true" />
            <div className={styles.welcomeBubble} aria-live="polite">
              <span>{speaking ? '默默正在说' : '默默想对你说'}</span>
              <p>我们一起做一个，只属于你的伙伴吧。</p>
            </div>
            <div className={styles.heroImage}>
              <Image src={avatarPath} alt="粉色的陪伴宠物默默正在挥手" fill priority sizes="52vw" className={styles.avatarImage} />
            </div>
            <div className={styles.soundRings} aria-hidden="true"><span /><span /><span /></div>
          </div>

          <div className={styles.promiseList}>
            <div><i className="ri-heart-3-line" aria-hidden="true" /><span>陪着你，不催你</span></div>
            <div><i className="ri-bookmark-3-line" aria-hidden="true" /><span>记住重要的小事</span></div>
            <div><i className="ri-shield-check-line" aria-hidden="true" /><span>由家人保护隐私</span></div>
          </div>
        </section>
      ) : (
        <section className={styles.avatarScreen} id="avatar-creator" style={{ '--chosen-color': color.value } as CSSProperties}>
          <div className={styles.creatorIntro}>
            <button type="button" className={styles.backButton} onClick={() => setScreen('welcome')}>
              <i className="ri-arrow-left-line" aria-hidden="true" />返回
            </button>
            <p className={styles.eyebrow}>创造你的伙伴</p>
            <h1>它摸起来，<br />应该是什么感觉？</h1>
            <p>先选一种熟悉的材质。以后看到它，就像看到那个一直陪着你的朋友。</p>
          </div>

          <div className={styles.avatarPreview} data-material={material}>
            <div className={styles.previewBackdrop} aria-hidden="true" />
            <div className={styles.previewFrame}>
              <Image src={avatarPath} alt={`${name}的角色预览`} fill priority sizes="38vw" className={styles.avatarImage} />
              <div className={styles.colorWash} aria-hidden="true" />
              <div className={styles.materialTexture} aria-hidden="true" />
            </div>
            <div className={styles.previewName}>
              <span>你的伙伴</span>
              <strong>{name || '还没有名字'}</strong>
            </div>
          </div>

          <aside className={styles.creatorPanel}>
            <div className={styles.optionGroup}>
              <div className={styles.optionHeading}><span>选择材质</span><small>1 / 3</small></div>
              <div className={styles.materialGrid}>
                {materials.map((item) => (
                  <button key={item.id} type="button" data-selected={material === item.id} aria-pressed={material === item.id} onClick={() => setMaterial(item.id)}>
                    <i className={item.icon} aria-hidden="true" />
                    <strong>{item.name}</strong>
                    <span>{item.note}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <div className={styles.optionHeading}><span>选择颜色</span><small>2 / 3</small></div>
              <div className={styles.colorRow}>
                {colors.map((item) => (
                  <button key={item.name} type="button" data-selected={color.name === item.name} aria-pressed={color.name === item.name} onClick={() => setColor(item)} aria-label={item.name} title={item.name}>
                    <span style={{ backgroundColor: item.value }} />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <div className={styles.optionHeading}><span>给它一个名字</span><small>3 / 3</small></div>
              <label className={styles.nameField}>
                <span className={styles.visuallyHidden}>伙伴名字</span>
                <input value={name} onChange={(event) => { setName(event.target.value); setSaved(false) }} maxLength={8} />
                <i className="ri-pencil-line" aria-hidden="true" />
              </label>
            </div>

            <button className={styles.primaryButton} type="button" onClick={() => setSaved(true)}>
              <span>{saved ? '已经准备好了' : '完成设置'}</span>
              <i className={saved ? 'ri-check-line' : 'ri-arrow-right-line'} aria-hidden="true" />
            </button>
          </aside>
        </section>
      )}

      <nav className={styles.screenSwitcher} aria-label="Key screen 切换">
        <button type="button" onClick={() => setScreen('welcome')} aria-label="上一个 screen" title="上一个"><i className="ri-arrow-left-s-line" aria-hidden="true" /></button>
        <div><strong>{screen === 'welcome' ? '01' : '02'}</strong><span>{screen === 'welcome' ? 'Welcome' : 'Avatar'}</span></div>
        <button type="button" onClick={() => setScreen('avatar')} aria-label="下一个 screen" title="下一个"><i className="ri-arrow-right-s-line" aria-hidden="true" /></button>
      </nav>
    </main>
  )
}
