import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiUser,
  FiBell,
  FiLock,
  FiPlay,
  FiMoon,
  FiSun,
  FiMonitor,
  FiGlobe,
  FiCommand,
  FiLink,
  FiSettings,
  FiDownload,
  FiTrash2,
  FiLogOut,
  FiCheck,
  FiX,
  FiChevronRight,
} from 'react-icons/fi'
import { MdSubtitles, MdHistory } from 'react-icons/md'
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import './Settings.css'

const SECTIONS = [
  { id: 'account', label: 'Hisob', icon: <FiUser /> },
  { id: 'notifications', label: 'Bildirishnomalar', icon: <FiBell /> },
  { id: 'privacy', label: 'Maxfiylik', icon: <FiLock /> },
  { id: 'playback', label: 'Ijro va unumdorlik', icon: <FiPlay /> },
  { id: 'captions', label: 'Subtitrlar', icon: <MdSubtitles /> },
  { id: 'appearance', label: "Ko'rinish", icon: <FiMoon /> },
  { id: 'language', label: 'Til va joylashuv', icon: <FiGlobe /> },
  { id: 'shortcuts', label: 'Klaviatura yorliqlari', icon: <FiCommand /> },
  { id: 'connections', label: 'Ulanishlar', icon: <FiLink /> },
  { id: 'advanced', label: 'Kengaytirilgan', icon: <FiSettings /> },
]

const DEFAULT_SETTINGS = {
  notifications: {
    subscriptions: true,
    recommendations: true,
    activity: true,
    email: false,
    mobile: true,
    sound: false,
  },
  privacy: {
    privateSubs: false,
    privateLikes: false,
    privatePlaylists: false,
    pauseHistory: false,
    pauseSearch: false,
    restricted: false,
  },
  playback: {
    autoplay: true,
    annotations: true,
    quality: 'auto',
    speedMemory: true,
    inline: true,
    ambient: true,
  },
  captions: {
    enabled: false,
    language: 'uz',
    size: 'medium',
    color: 'white',
    background: 'black',
  },
  language: {
    interface: 'uz',
    location: 'UZ',
    timezone: 'Asia/Tashkent',
    restricted: false,
  },
}

const QUALITIES = [
  { value: 'auto', label: 'Avtomatik' },
  { value: '144', label: '144p' },
  { value: '240', label: '240p' },
  { value: '360', label: '360p' },
  { value: '480', label: '480p' },
  { value: '720', label: '720p HD' },
  { value: '1080', label: '1080p HD' },
  { value: '1440', label: '1440p 2K' },
  { value: '2160', label: '2160p 4K' },
]

const LANGUAGES = [
  { value: 'uz', label: "O'zbek" },
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
  { value: 'tr', label: 'Türkçe' },
  { value: 'kk', label: 'Қазақша' },
]

const COUNTRIES = [
  { value: 'UZ', label: "O'zbekiston" },
  { value: 'RU', label: 'Rossiya' },
  { value: 'KZ', label: "Qozog'iston" },
  { value: 'KG', label: "Qirg'iziston" },
  { value: 'TR', label: 'Turkiya' },
  { value: 'US', label: 'AQSh' },
]

const TIMEZONES = [
  'Asia/Tashkent',
  'Asia/Almaty',
  'Asia/Bishkek',
  'Europe/Moscow',
  'Europe/Istanbul',
  'America/New_York',
]

const SHORTCUTS = [
  { keys: ['K'], desc: "Ijroni boshlash / to'xtatish" },
  { keys: ['Space'], desc: "Ijroni boshlash / to'xtatish" },
  { keys: ['J'], desc: '10 soniya orqaga' },
  { keys: ['L'], desc: '10 soniya oldinga' },
  { keys: ['M'], desc: 'Ovozni o\'chirish / yoqish' },
  { keys: ['F'], desc: 'Toliq ekran rejimi' },
  { keys: ['T'], desc: 'Kinoteatr rejimi' },
  { keys: ['I'], desc: 'Mini pleyer' },
  { keys: ['C'], desc: 'Subtitr' },
  { keys: ['↑'], desc: 'Ovozni oshirish' },
  { keys: ['↓'], desc: 'Ovozni kamaytirish' },
  { keys: ['→'], desc: '5 soniya oldinga' },
  { keys: ['←'], desc: '5 soniya orqaga' },
  { keys: ['0'], desc: 'Boshiga qaytish' },
  { keys: ['Shift', '>'], desc: 'Tezroq ijro' },
  { keys: ['Shift', '<'], desc: 'Sekinroq ijro' },
  { keys: ['/'], desc: 'Qidiruvga fokus' },
]

function Toggle({ checked, onChange, label, desc }) {
  return (
    <label className="setting-row">
      <div className="setting-row-text">
        <div className="setting-label">{label}</div>
        {desc && <div className="setting-desc">{desc}</div>}
      </div>
      <span className={`toggle ${checked ? 'on' : ''}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-track" />
        <span className="toggle-thumb" />
      </span>
    </label>
  )
}

function Select({ value, onChange, options, label, desc }) {
  return (
    <div className="setting-row">
      <div className="setting-row-text">
        <div className="setting-label">{label}</div>
        {desc && <div className="setting-desc">{desc}</div>}
      </div>
      <select
        className="setting-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) =>
          typeof opt === 'string' ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ),
        )}
      </select>
    </div>
  )
}

function SectionHeader({ title, desc }) {
  return (
    <header className="settings-section-header">
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </header>
  )
}

function AccountSection({ user, logout }) {
  if (!user) {
    return (
      <>
        <SectionHeader
          title="Hisob"
          desc="Hisob sozlamalarini boshqarish uchun avval tizimga kiring."
        />
        <div className="settings-empty-block">
          <p>Sozlamalarni boshqarish uchun hisobingizga kiring.</p>
          <Link to="/login" className="settings-btn primary">
            <FiUser />
            <span>Kirish</span>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <SectionHeader
        title="Hisob"
        desc="Sizning hisobingiz va kanal ma'lumotlari."
      />

      <div className="account-card">
        <div
          className="account-card-avatar"
          style={{ backgroundColor: user.color }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="account-card-info">
          <div className="account-card-name">{user.name}</div>
          <div className="account-card-handle">{user.handle}</div>
          <div className="account-card-email">{user.email}</div>
        </div>
        <button className="settings-btn ghost">Tahrirlash</button>
      </div>

      <div className="settings-group">
        <h3>Kanal sozlamalari</h3>
        <button className="settings-link-row">
          <span>Kanal nomi va tavsifi</span>
          <FiChevronRight />
        </button>
        <button className="settings-link-row">
          <span>Kanal URL'ini o'zgartirish</span>
          <FiChevronRight />
        </button>
        <button className="settings-link-row">
          <span>Brending</span>
          <FiChevronRight />
        </button>
      </div>

      <div className="settings-group">
        <h3>Xavfsizlik</h3>
        <button className="settings-link-row">
          <span>Parolni o'zgartirish</span>
          <FiChevronRight />
        </button>
        <button className="settings-link-row">
          <span>Ikki bosqichli tasdiqlash</span>
          <FiChevronRight />
        </button>
        <button className="settings-link-row">
          <span>Faol seanslar</span>
          <FiChevronRight />
        </button>
      </div>

      <div className="settings-group danger">
        <h3>Xavfli zona</h3>
        <button className="settings-btn ghost" onClick={logout}>
          <FiLogOut />
          <span>Hisobdan chiqish</span>
        </button>
        <button className="settings-btn danger">
          <FiTrash2 />
          <span>Hisobni o'chirish</span>
        </button>
      </div>
    </>
  )
}

function NotificationsSection({ settings, update }) {
  return (
    <>
      <SectionHeader
        title="Bildirishnomalar"
        desc="Qanday vaziyatlarda sizga xabar berishimiz kerakligini tanlang."
      />
      <div className="settings-group">
        <h3>YouTube'da</h3>
        <Toggle
          label="Obunalar"
          desc="Obuna bo'lgan kanallarning yangi videolari"
          checked={settings.subscriptions}
          onChange={(v) => update('subscriptions', v)}
        />
        <Toggle
          label="Tavsiya etilgan videolar"
          desc="Sizga yoqishi mumkin bo'lgan videolar haqida"
          checked={settings.recommendations}
          onChange={(v) => update('recommendations', v)}
        />
        <Toggle
          label="Kanalingizdagi faollik"
          desc="Sizning kanalingizdagi izohlar va javoblar"
          checked={settings.activity}
          onChange={(v) => update('activity', v)}
        />
      </div>

      <div className="settings-group">
        <h3>Yetkazib berish</h3>
        <Toggle
          label="Email orqali"
          desc="Bildirishnomalarni email manzilingizga yuborish"
          checked={settings.email}
          onChange={(v) => update('email', v)}
        />
        <Toggle
          label="Mobil push"
          desc="Telefondagi YouTube ilovasiga push bildirishnoma"
          checked={settings.mobile}
          onChange={(v) => update('mobile', v)}
        />
        <Toggle
          label="Tovush"
          desc="Bildirishnoma kelganda tovush chalish"
          checked={settings.sound}
          onChange={(v) => update('sound', v)}
        />
      </div>
    </>
  )
}

function PrivacySection({ settings, update }) {
  return (
    <>
      <SectionHeader
        title="Maxfiylik"
        desc="Boshqalar nimani ko'ra olishini boshqaring."
      />
      <div className="settings-group">
        <h3>Faolligingizni yashirish</h3>
        <Toggle
          label="Obunalar shaxsiy"
          desc="Mening obunalarim faqat menga ko'rinsin"
          checked={settings.privateSubs}
          onChange={(v) => update('privateSubs', v)}
        />
        <Toggle
          label="Yoqtirgan videolar shaxsiy"
          desc="Yoqtirgan videolarim ro'yxati maxfiy bo'lsin"
          checked={settings.privateLikes}
          onChange={(v) => update('privateLikes', v)}
        />
        <Toggle
          label="Pleylistlar shaxsiy"
          desc="Saqlangan pleylistlar boshqalarga ko'rinmasin"
          checked={settings.privatePlaylists}
          onChange={(v) => update('privatePlaylists', v)}
        />
      </div>

      <div className="settings-group">
        <h3>Tarix va ma'lumotlar</h3>
        <Toggle
          label="Tomosha tarixini to'xtatib turish"
          desc="Yangi videolar tarixga yozilmasin"
          checked={settings.pauseHistory}
          onChange={(v) => update('pauseHistory', v)}
        />
        <Toggle
          label="Qidiruv tarixini to'xtatib turish"
          desc="Qidiruv so'rovlari saqlanmasin"
          checked={settings.pauseSearch}
          onChange={(v) => update('pauseSearch', v)}
        />
        <Toggle
          label="Cheklangan rejim"
          desc="Yoshga yaramaydigan kontentni yashirish"
          checked={settings.restricted}
          onChange={(v) => update('restricted', v)}
        />
      </div>

      <div className="settings-group">
        <h3>Ma'lumotlarni boshqarish</h3>
        <button className="settings-link-row">
          <span>Mening ma'lumotlarimni yuklab olish</span>
          <FiDownload />
        </button>
        <button className="settings-link-row">
          <span>Tomosha tarixini tozalash</span>
          <MdHistory />
        </button>
      </div>
    </>
  )
}

function PlaybackSection({ settings, update }) {
  return (
    <>
      <SectionHeader
        title="Ijro va unumdorlik"
        desc="Videolar qanday ko'rinishi va ishlashini sozlang."
      />
      <div className="settings-group">
        <Select
          label="Sukut bo'yicha video sifati"
          desc="Yangi videolar shu sifatda ochiladi"
          value={settings.quality}
          onChange={(v) => update('quality', v)}
          options={QUALITIES}
        />
        <Toggle
          label="Avtomatik ijro"
          desc="Joriy video tugagach keyingisi avtomatik boshlanadi"
          checked={settings.autoplay}
          onChange={(v) => update('autoplay', v)}
        />
        <Toggle
          label="Anotatsiyalar"
          desc="Video ustidagi izohlarni ko'rsatish"
          checked={settings.annotations}
          onChange={(v) => update('annotations', v)}
        />
        <Toggle
          label="Tezlikni eslab qolish"
          desc="Tanlagan ijro tezligi keyingi videolarga ham qo'llanadi"
          checked={settings.speedMemory}
          onChange={(v) => update('speedMemory', v)}
        />
        <Toggle
          label="Inline pleyer"
          desc="Sahifani tark etmasdan videoni kichik oynada davom ettirish"
          checked={settings.inline}
          onChange={(v) => update('inline', v)}
        />
        <Toggle
          label="Ambient rejim"
          desc="Video atrofini videodagi ranglar bilan yoritish"
          checked={settings.ambient}
          onChange={(v) => update('ambient', v)}
        />
      </div>
    </>
  )
}

function CaptionsSection({ settings, update }) {
  return (
    <>
      <SectionHeader
        title="Subtitrlar"
        desc="Avtomatik subtitr va uning ko'rinishini sozlang."
      />
      <div className="settings-group">
        <Toggle
          label="Subtitrni doim yoqish"
          desc="Mavjud bo'lganda subtitr avtomatik chiqadi"
          checked={settings.enabled}
          onChange={(v) => update('enabled', v)}
        />
        <Select
          label="Subtitr tili"
          value={settings.language}
          onChange={(v) => update('language', v)}
          options={LANGUAGES}
        />
        <Select
          label="Hajmi"
          value={settings.size}
          onChange={(v) => update('size', v)}
          options={[
            { value: 'small', label: 'Kichik' },
            { value: 'medium', label: "O'rta" },
            { value: 'large', label: 'Katta' },
            { value: 'xlarge', label: 'Juda katta' },
          ]}
        />
        <Select
          label="Matn rangi"
          value={settings.color}
          onChange={(v) => update('color', v)}
          options={[
            { value: 'white', label: 'Oq' },
            { value: 'yellow', label: 'Sariq' },
            { value: 'green', label: 'Yashil' },
            { value: 'cyan', label: 'Moviy' },
          ]}
        />
        <Select
          label="Fon rangi"
          value={settings.background}
          onChange={(v) => update('background', v)}
          options={[
            { value: 'black', label: 'Qora' },
            { value: 'transparent', label: 'Shaffof' },
            { value: 'semi', label: 'Yarim shaffof' },
            { value: 'gray', label: 'Kulrang' },
          ]}
        />
      </div>

      <div className="captions-preview">
        <div className="captions-preview-frame">
          <span
            className="captions-preview-text"
            data-size={settings.size}
            data-color={settings.color}
            data-bg={settings.background}
          >
            Bu subtitr namunasi
          </span>
        </div>
      </div>
    </>
  )
}

function AppearanceSection() {
  const { mode, setMode } = useTheme()
  const options = [
    { value: 'light', label: 'Yorug\'', icon: <FiSun /> },
    { value: 'dark', label: "Qorong'i", icon: <FiMoon /> },
    { value: 'system', label: 'Tizimga mos', icon: <FiMonitor /> },
  ]

  return (
    <>
      <SectionHeader
        title="Ko'rinish"
        desc="YouTube'ning umumiy ko'rinishini sozlang."
      />
      <div className="settings-group">
        <div className="setting-row column">
          <div className="setting-row-text">
            <div className="setting-label">Mavzu</div>
            <div className="setting-desc">
              Yorug', qorong'i yoki tizim sozlamasiga muvofiq
            </div>
          </div>
          <div className="theme-options">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`theme-option ${mode === opt.value ? 'active' : ''}`}
                onClick={() => setMode(opt.value)}
              >
                <span className="theme-option-icon">{opt.icon}</span>
                <span>{opt.label}</span>
                {mode === opt.value && <FiCheck className="theme-option-check" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function LanguageSection({ settings, update }) {
  return (
    <>
      <SectionHeader
        title="Til va joylashuv"
        desc="Interfeys va kontent tilingizni belgilang."
      />
      <div className="settings-group">
        <Select
          label="Interfeys tili"
          desc="YouTube'ning ko'rsatilish tili"
          value={settings.interface}
          onChange={(v) => update('interface', v)}
          options={LANGUAGES}
        />
        <Select
          label="Joylashuv"
          desc="Sizning hududingiz uchun mos kontent va trendlar"
          value={settings.location}
          onChange={(v) => update('location', v)}
          options={COUNTRIES}
        />
        <Select
          label="Vaqt mintaqasi"
          value={settings.timezone}
          onChange={(v) => update('timezone', v)}
          options={TIMEZONES}
        />
      </div>
    </>
  )
}

function ShortcutsSection() {
  return (
    <>
      <SectionHeader
        title="Klaviatura yorliqlari"
        desc="YouTube'ni klaviatura orqali tezroq boshqaring."
      />
      <div className="shortcuts-list">
        {SHORTCUTS.map((s) => (
          <div key={s.desc + s.keys.join('+')} className="shortcut-row">
            <span className="shortcut-desc">{s.desc}</span>
            <span className="shortcut-keys">
              {s.keys.map((k, i) => (
                <kbd key={i}>{k}</kbd>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}

function ConnectionsSection() {
  const [connections, setConnections] = useLocalStorage('yt-clone-connections', {
    google: true,
    apple: false,
    facebook: false,
  })

  const services = [
    { id: 'google', label: 'Google', icon: <FaGoogle />, color: '#ea4335' },
    { id: 'apple', label: 'Apple', icon: <FaApple />, color: '#000000' },
    { id: 'facebook', label: 'Facebook', icon: <FaFacebook />, color: '#1877f2' },
  ]

  return (
    <>
      <SectionHeader
        title="Ulanishlar"
        desc="Tashqi xizmatlar bilan ulangan hisoblaringiz."
      />
      <div className="settings-group">
        {services.map((svc) => {
          const connected = connections[svc.id]
          return (
            <div key={svc.id} className="connection-row">
              <div className="connection-icon" style={{ color: svc.color }}>
                {svc.icon}
              </div>
              <div className="connection-info">
                <div className="setting-label">{svc.label}</div>
                <div className="setting-desc">
                  {connected ? 'Ulangan' : 'Ulanmagan'}
                </div>
              </div>
              <button
                className={`settings-btn ${connected ? 'ghost' : 'primary'}`}
                onClick={() =>
                  setConnections({ ...connections, [svc.id]: !connected })
                }
              >
                {connected ? (
                  <>
                    <FiX />
                    <span>Uzish</span>
                  </>
                ) : (
                  <>
                    <FiLink />
                    <span>Ulash</span>
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

function AdvancedSection({ user }) {
  const channelId = user
    ? `UC${btoa(user.email).slice(0, 22).replace(/=/g, 'x')}`
    : 'UC—————————————'
  const userId = user ? user.email.split('@')[0] : '———'

  return (
    <>
      <SectionHeader
        title="Kengaytirilgan"
        desc="Texnik ma'lumotlar va eksport vositalari."
      />
      <div className="settings-group">
        <div className="setting-row">
          <div className="setting-row-text">
            <div className="setting-label">Kanal ID</div>
            <div className="setting-desc mono">{channelId}</div>
          </div>
          <button className="settings-btn ghost">Nusxa olish</button>
        </div>
        <div className="setting-row">
          <div className="setting-row-text">
            <div className="setting-label">Foydalanuvchi ID</div>
            <div className="setting-desc mono">{userId}</div>
          </div>
          <button className="settings-btn ghost">Nusxa olish</button>
        </div>
      </div>

      <div className="settings-group">
        <h3>Ma'lumotlarni eksport qilish</h3>
        <button className="settings-link-row">
          <span>Tomosha tarixini yuklab olish (CSV)</span>
          <FiDownload />
        </button>
        <button className="settings-link-row">
          <span>Obunalar ro'yxatini yuklab olish (CSV)</span>
          <FiDownload />
        </button>
        <button className="settings-link-row">
          <span>Barcha ma'lumotlarni arxivlash (ZIP)</span>
          <FiDownload />
        </button>
      </div>

      <div className="settings-group">
        <h3>Tajriba</h3>
        <Toggle label="Beta funksiyalar" desc="Yangi imkoniyatlarni avval sinash" checked={false} onChange={() => {}} />
        <Toggle label="Tahlil yuborish" desc="Anonim foydalanish statistikasini ulashish" checked={true} onChange={() => {}} />
      </div>
    </>
  )
}

function Settings() {
  const { user, logout } = useAuth()
  const [active, setActive] = useState('account')
  const [settings, setSettings] = useLocalStorage(
    'yt-clone-settings',
    DEFAULT_SETTINGS,
  )

  const updateGroup = (group) => (key, value) =>
    setSettings({
      ...settings,
      [group]: { ...settings[group], [key]: value },
    })

  const renderSection = () => {
    switch (active) {
      case 'account':
        return <AccountSection user={user} logout={logout} />
      case 'notifications':
        return (
          <NotificationsSection
            settings={settings.notifications}
            update={updateGroup('notifications')}
          />
        )
      case 'privacy':
        return (
          <PrivacySection
            settings={settings.privacy}
            update={updateGroup('privacy')}
          />
        )
      case 'playback':
        return (
          <PlaybackSection
            settings={settings.playback}
            update={updateGroup('playback')}
          />
        )
      case 'captions':
        return (
          <CaptionsSection
            settings={settings.captions}
            update={updateGroup('captions')}
          />
        )
      case 'appearance':
        return <AppearanceSection />
      case 'language':
        return (
          <LanguageSection
            settings={settings.language}
            update={updateGroup('language')}
          />
        )
      case 'shortcuts':
        return <ShortcutsSection />
      case 'connections':
        return <ConnectionsSection />
      case 'advanced':
        return <AdvancedSection user={user} />
      default:
        return null
    }
  }

  return (
    <div className="settings-page">
      <header className="settings-page-header">
        <h1>Sozlamalar</h1>
      </header>

      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Sozlamalar bo'limlari">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`settings-nav-item ${active === s.id ? 'active' : ''}`}
              onClick={() => setActive(s.id)}
            >
              <span className="settings-nav-icon">{s.icon}</span>
              <span className="settings-nav-label">{s.label}</span>
            </button>
          ))}
        </nav>

        <section className="settings-content">{renderSection()}</section>
      </div>
    </div>
  )
}

export default Settings
