import { useState, useEffect } from 'react'

import heroImg          from '@/imports/WhatsApp_Image_2026-08-19_at_14.14.09.jpeg'
import marionLimaImg    from '@/imports/WhatsApp_Image_2026-08-18_at_19.16.08.jpeg'
import stageForroImg    from '@/imports/stages-forro-avec-marion-lima.jpeg'
import ateliersImg      from '@/imports/Ateliers_1.jpeg'
import kiosquesImg      from '@/imports/les-kiosques-de-l-ete-square-dominique-bernard-11e.jpeg'
import event1Img        from '@/imports/Event_1_.jpeg'
import event2Img        from '@/imports/Event_2.jpeg'
import event3Img        from '@/imports/Event_3.jpeg'
import festJuninaImg    from '@/imports/IMG_6835.jpg'
import marathonSaveImg  from '@/imports/WhatsApp_Image_2026-08-19_at_15.31.12.jpeg'
import kiosquesPosterImg from '@/imports/WhatsApp_Image_2026-08-19_at_15.18.41.jpeg'
import portesOuvertesImg  from '@/imports/WhatsApp_Image_2026-08-18_at_16.53.50.jpeg'
import rentreeImg         from '@/imports/WhatsApp_Image_2026-08-21_at_10.31.44.jpeg'
import forrobodo20ansImg  from '@/imports/WhatsApp_Image_2026-08-19_at_11.51.20.jpeg'
import courseDanseImg    from '@/imports/WhatsApp_Image_2026-08-18_at_17.04.07.jpeg'

// ─── types & data ──────────────────────────────────────────────────────────────

type Filter = 'Tous' | 'Bals' | 'Cours & Ateliers' | 'Stages' | 'Festivals'
type ViewMode = 'grille' | 'liste'

interface Evt {
  id: number
  title: string
  subtitle: string
  date: string
  dateSort: string
  time: string
  venue: string
  category: Exclude<Filter, 'Tous'>
  image: string
  tag?: string
  ticketUrl?: string
  venueUrl?: string
  description: string
}

const EVENTS: Evt[] = [
  {
    id: 1,
    title: 'Forrobodó',
    subtitle: 'Bel Air de Forró invite Mytho Roots',
    date: 'Vendredi 26 juin 2026',
    dateSort: '2026-06-26',
    time: '21h – 2h',
    venue: '19-21 rue Boyer, 75020 Paris',
    category: 'Bals',
    image: festJuninaImg,
    tag: 'Festa Junina',
    description: "La soirée bal mensuelle avec initiation à la danse à 21h par Marion Lima, suivie d'un concert live. Bel Air de Forró reçoit Mytho Roots pour une Festa Junina explosive.",
  },
  {
    id: 10,
    title: 'Rentrée & Portes Ouvertes',
    subtitle: 'Cours de Forró avec Marion Lima',
    date: '15, 17, 22 & 24 septembre 2026',
    dateSort: '2026-09-15',
    time: '19h30 – 22h30',
    venue: 'Studio des Rigoles, 46 rue des Rigoles, 75020',
    category: 'Cours & Ateliers',
    image: rentreeImg,
    tag: '1er cours gratuit',
    description: "Portes ouvertes pour la rentrée ! Venez découvrir ou redécouvrir les cours de forró avec Marion Lima. Tous niveaux, débutants bienvenus. Premier cours offert pour les nouvelles personnes — les 15 & 17 septembre pour les mardis/jeudis, les 22 & 24 pour une 2e session.",
  },
  {
    id: 201,
    title: "Kiosque Forró de l'Été",
    subtitle: 'Square des Champs Élysées',
    date: 'Dimanche 23 août 2026',
    dateSort: '2026-08-23',
    time: '15h – 18h',
    venue: 'Square des Champs Élysées, 8e',
    category: 'Bals',
    image: kiosquesPosterImg,
    tag: 'Kiosques',
    description: "Bal forró en plein air, ouvert à tous. Aucune expérience requise — venez danser !",
  },
  {
    id: 202,
    title: "Kiosque Forró de l'Été",
    subtitle: 'Square Courteline',
    date: 'Dimanche 30 août 2026',
    dateSort: '2026-08-30',
    time: '15h – 18h',
    venue: 'Square Courteline, 12e',
    category: 'Bals',
    image: kiosquesPosterImg,
    tag: 'Kiosques',
    description: "Bal forró en plein air, ouvert à tous. Aucune expérience requise — venez danser !",
  },
  {
    id: 203,
    title: "Kiosque Forró de l'Été",
    subtitle: "Square d'Anvers",
    date: 'Dimanche 6 septembre 2026',
    dateSort: '2026-09-06',
    time: '15h – 18h',
    venue: "Square d'Anvers, 9e",
    category: 'Bals',
    image: kiosquesPosterImg,
    tag: 'Kiosques',
    description: "Bal forró en plein air, ouvert à tous. Aucune expérience requise — venez danser !",
  },
  {
    id: 204,
    title: "Kiosque Forró de l'Été",
    subtitle: 'Square Courteline',
    date: 'Dimanche 13 septembre 2026',
    dateSort: '2026-09-13',
    time: '15h – 18h',
    venue: 'Square Courteline, 12e',
    category: 'Bals',
    image: kiosquesPosterImg,
    tag: 'Kiosques',
    description: "Bal forró en plein air, ouvert à tous. Aucune expérience requise — venez danser !",
  },
  {
    id: 205,
    title: "Kiosque Forró de l'Été",
    subtitle: 'Square Édouard Vaillant',
    date: 'Dimanche 20 septembre 2026',
    dateSort: '2026-09-20',
    time: '15h – 18h',
    venue: 'Square Édouard Vaillant, 20e',
    category: 'Bals',
    image: kiosquesPosterImg,
    tag: 'Kiosques',
    description: "Bal forró en plein air, ouvert à tous. Aucune expérience requise — venez danser !",
  },
  {
    id: 206,
    title: "Kiosque Forró de l'Été",
    subtitle: 'Square Trousseau',
    date: 'Dimanche 27 septembre 2026',
    dateSort: '2026-09-27',
    time: '15h – 18h',
    venue: 'Square Trousseau, 12e',
    category: 'Bals',
    image: kiosquesPosterImg,
    tag: 'Kiosques',
    description: "Bal forró en plein air, ouvert à tous. Aucune expérience requise — venez danser !",
  },
  {
    id: 3,
    title: 'Forrobodó',
    subtitle: 'Forró dos Amigos',
    date: 'Vendredi 21 novembre 2025',
    dateSort: '2025-11-21',
    time: '21h – 2h',
    venue: '19-21 rue Boyer, 75020 Paris',
    category: 'Bals',
    image: event1Img,
    description: "Celia Neusa, Virginia Cambuci et Douglas Marcolino réunis pour une soirée forró roots d'exception. Initiation à 21h avec Marion Lima.",
  },
  {
    id: 4,
    title: 'Forrobodó',
    subtitle: 'Trio Muçambê',
    date: 'Vendredi 17 avril 2026',
    dateSort: '2026-04-17',
    time: '21h – 2h',
    venue: '19-21 rue Boyer, 75020 Paris',
    category: 'Bals',
    image: event2Img,
    description: "Le Trio Muçambê, formation emblématique du forró universitaire brésilien, fait escale à Paris pour un concert-bal.",
  },
  {
    id: 5,
    title: 'Forrobodó',
    subtitle: "Moinho d'Agua",
    date: 'Vendredi 20 mars 2026',
    dateSort: '2026-03-20',
    time: '21h – 2h',
    venue: '19-21 rue Boyer, 75020 Paris',
    category: 'Bals',
    image: event3Img,
    description: "Le groupe Moinho d'Agua apporte les rythmes du Nordeste brésilien au cœur de Paris. Soirée bal avec initiation par Marion Lima.",
  },
  {
    id: 6,
    title: 'Les Ateliers du Jeudi',
    subtitle: 'Cycle Débutant avec Marion Lima',
    date: 'Dès le jeudi 28 mai 2026',
    dateSort: '2026-05-28',
    time: '21h – 22h30',
    venue: 'Studio des Rigoles, 46 rue des Rigoles, 75020',
    category: 'Cours & Ateliers',
    image: ateliersImg,
    tag: 'Série',
    description: "Quatre séances progressives pour apprivoiser les bases du forró : pas, abraço, figures de vases, préparation aux bals d'été.",
  },
  {
    id: 7,
    title: 'Stages Forró',
    subtitle: 'Marion Lima — 2 niveaux, 2 thèmes',
    date: 'Samedi 1er novembre 2025',
    dateSort: '2025-11-01',
    time: '14h – 18h',
    venue: 'École de danse Kim Kan, 64 rue Orfila, 75020',
    category: 'Stages',
    image: stageForroImg,
    description: "Débutant/Intermédiaire 14h–16h : être à l'aise dans le bal. Inter/Avancé 16h–18h : varier les rythmes, danser syncopé et dynamique.",
  },
  {
    id: 9,
    title: 'Forrobodó Spécial 20 ans',
    subtitle: 'Trio Exactamente',
    date: 'Samedi 19 septembre 2026',
    dateSort: '2026-09-19',
    time: '21h – 2h & plus',
    venue: '19-21 rue Boyer, 75020 Paris',
    category: 'Bals',
    image: forrobodo20ansImg,
    tag: '20e Anniversaire',
    ticketUrl: 'https://www.helloasso.com/associations/le-p-tit-bal-perdu/evenements/forrobodo-special-20-ans-du-p-tit-bal-trio-exactamente',
    description: "Soirée d'anniversaire exceptionnelle avec le Trio Exactamente. Initiation à la danse à 21h avec Marion Lima, participation de la chorale, surprises… PDS até 2h !",
  },
  {
    id: 8,
    title: 'Forró & More Marathon',
    subtitle: 'Não Para, Não Para, Não Para...',
    date: '13 – 14 – 15 novembre 2026',
    dateSort: '2026-11-13',
    time: '48h continus',
    venue: 'Paris — lieu à confirmer',
    category: 'Festivals',
    image: marathonSaveImg,
    tag: '20e Anniversaire',
    ticketUrl: 'https://www.helloasso.com/associations/le-p-tit-bal-perdu/evenements/nao-para-nao-para-nao-para-4eme-marathon-de-paris',
    description: "Le grand marathon anniversaire : 48 heures de forró, de rencontres et de danse pour célébrer les 20 ans du P'tit Bal Perdu.",
  },
]

const FILTERS: Filter[] = ['Tous', 'Bals', 'Cours & Ateliers', 'Stages', 'Festivals']

const CAT_COLOR: Record<string, string> = {
  Bals:     '#c9184a',
  'Cours & Ateliers': '#1aa0b8',
  Stages:   '#7c5cbf',
  Festivals:'#e09010',
}

const CAT_BG: Record<string, string> = {
  Bals:     '#fce8ee',
  'Cours & Ateliers': '#dff4f8',
  Stages:   '#ede8f8',
  Festivals:'#fdf2d8',
}

// ─── helpers ───────────────────────────────────────────────────────────────────

function CatPill({ cat }: { cat: string }) {
  const color = CAT_COLOR[cat] || '#e09010'
  const bg = CAT_BG[cat] || '#fdf2d8'
  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 20, background: bg, color, fontWeight: 500 }}>
      {cat}
    </span>
  )
}

// ─── Nav ────────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { href: '#cours',    label: 'Cours' },
    { href: '#agenda',   label: 'Agenda' },
    { href: '#histoire', label: 'Histoire' },
    { href: '#contact',  label: 'Contact' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'background 0.35s, border-color 0.35s',
      background: scrolled ? 'rgba(24,18,10,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 13, color: 'var(--primary)', fontStyle: 'italic' }}>PBP</span>
          </div>
          <div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: 'var(--foreground)', lineHeight: 1.1 }}>Le P'tit Bal Perdu</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'rgba(245,237,214,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Forró em Paris ★</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desk-nav">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: 'rgba(245,237,214,0.6)', textDecoration: 'none', letterSpacing: '0.02em', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,237,214,0.6)')}
            >{l.label}</a>
          ))}
        </nav>

        {/* Mobile burger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }} className="mob-btn">
          <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', height: 1.5, background: 'var(--foreground)', transition: '0.3s', transform: mobileOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
            <span style={{ display: 'block', height: 1.5, background: 'var(--foreground)', transition: '0.3s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', height: 1.5, background: 'var(--foreground)', transition: '0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24, background: 'rgba(24,18,10,0.98)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: 'var(--foreground)', textDecoration: 'none' }}>{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .desk-nav { display:none !important; } .mob-btn { display:block !important; } }
        @media (max-width: 768px) { .hero-deco { opacity: 0.35 !important; } }
      `}</style>
    </header>
  )
}

// ─── Marquee ticker ─────────────────────────────────────────────────────────────

function Ticker() {
  const items = [
    '★ Baião', '♥ Xotê', '★ Forró Pé-de-Serra', '♥ Xaxado', '★ Côco',
    '♥ Arrasta-pé', '★ Forrobodó', '♥ Quadrilha', '★ Rojão', '♥ Martelo',
    '★ Toada', '♥ Ric-ric', '★ Dansei', "♥ Le P'tit Bal Perdu", '★ Forró em Paris',
  ]
  const text = items.join('   ')
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#120d06', padding: '11px 0', whiteSpace: 'nowrap' }}>
      <div style={{ display: 'inline-block', animation: 'marquee 36s linear infinite' }}>
        {[text, text].map((t, i) => (
          <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: 'var(--primary)', paddingRight: 48 }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ minHeight: '100svh', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--background)' }}>

      {/* Background — photo en couleur avec voile teinté chaud */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Photo couleur, légèrement assombrie */}
        <img src={heroImg} alt="" aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'brightness(0.38) saturate(1.15)' }} />
        {/* Dégradé sombre pour lisibilité nav en haut + texte en bas */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(24,18,10,0.70) 0%, rgba(24,18,10,0.10) 30%, rgba(24,18,10,0.10) 55%, rgba(24,18,10,0.88) 100%)' }} />
        {/* Halo or chaud haut-droite */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '50%', background: 'radial-gradient(ellipse at top right, rgba(232,168,32,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Halo magenta bas-gauche */}
        <div style={{ position: 'absolute', bottom: '15%', left: 0, width: '35%', height: '40%', background: 'radial-gradient(ellipse at bottom left, rgba(201,24,74,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
      </div>

      {/* Éléments graphiques de la charte — masqués sur mobile pour ne pas gêner la lecture */}
      <svg aria-hidden viewBox="0 0 1000 680" preserveAspectRatio="xMidYMid slice"
        className="hero-deco"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>

        {/* Grand starburst magenta — droite, mi-hauteur */}
        <g transform="translate(880,380)" opacity="0.55">
          {Array.from({length:16},(_,i)=>{
            const a=(i*(360/16))*Math.PI/180
            const r=i%2===0?160:90
            const w=i%2===0?18:10
            return <polygon key={i}
              points={`${Math.cos(a-0.12)*18},${Math.sin(a-0.12)*18} ${Math.cos(a)*r},${Math.sin(a)*r} ${Math.cos(a+0.12)*18},${Math.sin(a+0.12)*18}`}
              fill={i%2===0?"#e8186d":"#ff4d9a"} />
          })}
          <circle r="20" fill="#e8186d"/>
          <circle r="10" fill="#ff80b5" opacity="0.9"/>
        </g>

        {/* Fan burst cyan — haut-centre */}
        <g transform="translate(420,0)" opacity="0.5">
          {Array.from({length:14},(_,i)=>{
            const a=(-70+i*10)*Math.PI/180
            const r=160, w=14
            const x1=Math.cos(a)*30, y1=Math.sin(a)*30
            const x2=Math.cos(a-0.05)*r, y2=Math.sin(a-0.05)*r
            const x3=Math.cos(a+0.05)*r, y3=Math.sin(a+0.05)*r
            return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="#3fc8e4"/>
          })}
        </g>

        {/* Petit starburst cyan — gauche bas */}
        <g transform="translate(120,520)" opacity="0.45">
          {Array.from({length:10},(_,i)=>{
            const a=(i*(360/10))*Math.PI/180
            const r=i%2===0?52:28
            return <polygon key={i}
              points={`${Math.cos(a-0.15)*8},${Math.sin(a-0.15)*8} ${Math.cos(a)*r},${Math.sin(a)*r} ${Math.cos(a+0.15)*8},${Math.sin(a+0.15)*8}`}
              fill="#3fc8e4"/>
          })}
          <circle r="8" fill="#7de8f8"/>
        </g>

        {/* Étoiles éparpillées */}
        {([
          [760,60,'#f5c218',12],[920,180,'#e8186d',10],[650,200,'#3fc8e4',8],
          [130,150,'#c8e43f',9],[310,80,'#e8186d',7],[540,120,'#f5c218',6],
          [200,480,'#3fc8e4',7],[80,300,'#f5c218',8],[950,450,'#e8186d',7],
          [460,50,'#c8e43f',6],[700,500,'#f5c218',5],[300,380,'#3fc8e4',6],
        ] as [number,number,string,number][]).map(([cx,cy,fill,sz],i) => (
          <g key={i} transform={`translate(${cx},${cy})`} opacity="0.75">
            <polygon points={`0,${-sz} ${sz*0.25},${-sz*0.25} ${sz},0 ${sz*0.25},${sz*0.25} 0,${sz} ${-sz*0.25},${sz*0.25} ${-sz},0 ${-sz*0.25},${-sz*0.25}`} fill={fill}/>
          </g>
        ))}
      </svg>

      {/* Content — anchored to bottom */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', maxWidth: 1200, margin: '0 auto', width: '100%', padding: '100px 24px 48px' }}>
        <div style={{ maxWidth: 580 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 20, animation: 'fadeUp 0.5s ease both', fontWeight: 700, textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
            Forró em Paris — depuis 2006 · 20 ans déjà
          </p>

          <h1 style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 0.9, marginBottom: 26, animation: 'fadeUp 0.7s 0.1s ease both' }}>
            <span style={{ display: 'block', fontSize: 'clamp(48px, 10vw, 100px)', color: 'var(--foreground)', letterSpacing: '-0.02em' }}>Le P'tit Bal</span>
            <span style={{ display: 'block', fontSize: 'clamp(48px, 10vw, 100px)', color: 'var(--primary)', letterSpacing: '-0.02em', fontStyle: 'italic' }}>Perdu</span>
          </h1>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.7, color: 'rgba(245,237,214,0.78)', maxWidth: 460, marginBottom: 34, fontWeight: 300, animation: 'fadeUp 0.7s 0.2s ease both' }}>
            Depuis plus de 20 ans, Le P'tit Bal Perdu fait vivre à Paris les cultures populaires brésiliennes — forró, chant, bals, cours et rencontres.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp 0.7s 0.3s ease both' }}>
            <a href="#agenda" style={{ padding: '13px 28px', background: 'var(--primary)', color: 'var(--primary-foreground)', borderRadius: 24, fontWeight: 600, fontSize: 14, textDecoration: 'none', transition: 'opacity 0.2s', fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              Voir l'agenda
            </a>
            <a href="#histoire" style={{ padding: '13px 28px', border: '1px solid rgba(245,237,214,0.25)', color: 'rgba(245,237,214,0.7)', borderRadius: 24, fontWeight: 500, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s', fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--primary)'; el.style.color='var(--foreground)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(245,237,214,0.25)'; el.style.color='rgba(245,237,214,0.7)' }}>
              Notre histoire
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats bridge ────────────────────────────────────────────────────────────────

function StatsSection() {
  const stats = [
    { v: '20', l: "ans d'histoire", s: 'Fondée en 2006' },
    { v: '12+', l: 'concerts par an', s: 'Le Forrobodó mensuel' },
    { v: '4', l: 'disciplines', s: 'Danse · Chant · Stages · Festivals' },
  ]
  return (
    <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }} className="stats-grid">
        {stats.map((s, i) => (
          <div key={s.v} className="stat-cell" style={{ padding: '28px 24px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div className="stat-num" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 52, color: 'var(--primary)', lineHeight: 1, flexShrink: 0 }}>{s.v}</div>
            <div>
              <div className="stat-label" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--surface-foreground)', lineHeight: 1.2 }}>{s.l}</div>
              <div className="stat-sub" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--muted-foreground)', marginTop: 4, letterSpacing: '0.06em' }}>{s.s}</div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media(max-width:600px){
          .stat-cell  { padding: 14px 10px !important; gap: 8px !important; flex-direction: column; align-items: flex-start !important; }
          .stat-num   { font-size: 32px !important; }
          .stat-label { font-size: 11px !important; }
          .stat-sub   { display: none; }
        }
      `}</style>
    </div>
  )
}

// ─── Event card ─────────────────────────────────────────────────────────────────

function EventCardGrid({ evt }: { evt: Evt }) {
  const [hov, setHov] = useState(false)
  const color = CAT_COLOR[evt.category] || 'var(--primary)'

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: '#fff', border: `1px solid ${hov ? color : 'var(--border)'}`, borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.25s, box-shadow 0.25s', boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#f0e8d8' }}>
        <img src={evt.image} alt={`${evt.title} — ${evt.subtitle}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hov ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,20,9,0.88) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <CatPill cat={evt.category} />
          {evt.tag && (
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 20, background: 'rgba(24,18,10,0.7)', color: '#fff', fontWeight: 500 }}>{evt.tag}</span>
          )}
        </div>
      </div>
      <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{evt.date}</p>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: 'var(--surface-foreground)', lineHeight: 1.2 }}>{evt.title}</h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.4, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{evt.subtitle}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 10, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/><path d="M5 2.5v2.5l1.5 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            {evt.time}
          </span>
          {evt.venue ? (
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1C3.3 1 2 2.3 2 4c0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3Z" stroke="currentColor" strokeWidth="1"/><circle cx="5" cy="4" r="1" fill="currentColor"/></svg>
              {evt.venue.split(',')[0]}
            </span>
          ) : evt.venueUrl ? (
            <a href={evt.venueUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: color, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1C3.3 1 2 2.3 2 4c0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3Z" stroke="currentColor" strokeWidth="1"/><circle cx="5" cy="4" r="1" fill="currentColor"/></svg>
              Lieux sur Instagram ↗
            </a>
          ) : null}
        </div>
        {evt.ticketUrl && (
          <a href={evt.ticketUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, padding: '8px 0', background: color, borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            En savoir plus
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        )}
      </div>
    </article>
  )
}

function EventRowList({ evt, isLast }: { evt: Evt; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  const color = CAT_COLOR[evt.category] || 'var(--primary)'

  return (
    <>
      <div onClick={() => setOpen(!open)} style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '80px 1fr 28px', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: isLast && !open ? 'none' : '1px solid var(--border)', transition: 'background 0.15s', borderRadius: 6 }}
        onMouseEnter={e => (e.currentTarget.style.background = '#fdf7ee')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        <div style={{ width: 64, height: 64, borderRadius: 6, overflow: 'hidden', background: '#f0e8d8', flexShrink: 0 }}>
          <img src={evt.image} alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <CatPill cat={evt.category} />
            {evt.tag && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--muted-foreground)', border: '1px solid var(--border)', borderRadius: 10, padding: '1px 7px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{evt.tag}</span>}
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: 'var(--surface-foreground)', lineHeight: 1.2, marginBottom: 2 }}>
            {evt.title} <span style={{ color: 'var(--muted-foreground)', fontSize: 13, fontStyle: 'italic', fontWeight: 400 }}>— {evt.subtitle}</span>
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: color, letterSpacing: '0.08em' }}>{evt.date} · {evt.time}</p>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--muted-foreground)', transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      {open && (
        <div style={{ padding: '2px 0 20px 96px', borderBottom: isLast ? 'none' : '1px solid var(--border)' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 8, fontWeight: 300 }}>{evt.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {evt.venue ? (
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1C3.3 1 2 2.3 2 4c0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3Z" stroke="currentColor" strokeWidth="1"/><circle cx="5" cy="4" r="1" fill="currentColor"/></svg>
                {evt.venue}
              </span>
            ) : evt.venueUrl ? (
              <a href={evt.venueUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color, display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1C3.3 1 2 2.3 2 4c0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3Z" stroke="currentColor" strokeWidth="1"/><circle cx="5" cy="4" r="1" fill="currentColor"/></svg>
                Lieux sur Instagram ↗
              </a>
            ) : null}
            {evt.ticketUrl && (
              <a href={evt.ticketUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, color: color, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                En savoir plus
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// ─── Courses section ────────────────────────────────────────────────────────────

function CoursesSection() {
  return (
    <section id="cours" style={{ background: 'var(--background)', padding: '72px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.18em', color: 'var(--primary)', textTransform: 'uppercase', margin: '0 0 10px' }}>
          Rentrée 2026 — 20e année
        </p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--foreground)', lineHeight: 1.05, margin: '0 0 40px' }}>
          Cours & ateliers<br /><em style={{ color: 'var(--primary)' }}>danse & chant</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>

          {/* Forró */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderLeft: '2.5px solid var(--primary)', paddingLeft: 16 }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: 'var(--primary)', textTransform: 'uppercase', margin: '0 0 6px' }}>Forró · Danse</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: 'var(--foreground)', margin: '0 0 10px' }}>Cours avec Marion Lima</h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(245,237,214,0.5)', margin: '0 0 12px' }}>
                Mardis & jeudis · Studio des Rigoles, 75020
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: 13, lineHeight: 1.65, margin: '0 0 8px', fontWeight: 300 }}>
                Deux cours se suivent chaque soir : <strong style={{ color: 'rgba(245,237,214,0.7)', fontWeight: 500 }}>19h30 – 21h</strong> et <strong style={{ color: 'rgba(245,237,214,0.7)', fontWeight: 500 }}>21h – 22h30</strong> — choisissez l'un ou les deux.
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: 14, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                Du débutant à l'avancé, les cours couvrent les pas de base, les figures de bal, le travail d'abraço, la musicalité et les rythmes du Nordeste. Ateliers thématiques le jeudi pour les emplois du temps irréguliers.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
              <a href="https://www.ecolededansekimkan.com/danses-adultes/forro-by-le-ptit-bal-perdu"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'var(--primary)', color: '#1a0e00', padding: '10px 18px', borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity='0.82')} onMouseLeave={e => (e.currentTarget.style.opacity='1')}>
                Inscription — École Kimkan
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'var(--secondary)', border: '1px solid rgba(201,24,74,0.35)', padding: '6px 12px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                1er cours gratuit en sept.
              </span>
            </div>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 32px rgba(0,0,0,0.5)' }}>
              <iframe src="https://www.youtube.com/embed/pADOtHIpi28?rel=0&modestbranding=1" title="Le forró en vidéo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
            </div>
          </div>

          {/* Chorale */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderLeft: '2.5px solid var(--accent)', paddingLeft: 16 }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', margin: '0 0 6px' }}>Chorale · Chant</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: 'var(--foreground)', margin: '0 0 10px' }}>La Chorale du P'tit Bal</h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(245,237,214,0.5)', margin: '0 0 12px' }}>
                Lundis 19h30 – 21h · 31 rue Petit, 75019 Paris
              </p>
              <p style={{ color: 'var(--muted-foreground)', fontSize: 14, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                Chanter en portugais les classiques du Nordeste brésilien — forró, baião, xaxado. Aucune expérience requise. La chorale répète chaque lundi et se produit au Forrobodó. Une façon de rentrer dans la musique par la voix.
              </p>
            </div>
            <a href="https://www.helloasso.com/associations/le-p-tit-bal-perdu/evenements/la-chorale-du-p-tit-bal-2024-25"
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1.5px solid var(--accent)', color: 'var(--accent)', padding: '10px 18px', borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textDecoration: 'none', transition: 'background 0.2s, color 0.2s', alignSelf: 'flex-start' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--accent)'; el.style.color='#fff' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.color='var(--accent)' }}>
              Rejoindre la chorale
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 32px rgba(0,0,0,0.5)' }}>
              <iframe src="https://www.youtube.com/embed/DbBhgCusw88?rel=0&modestbranding=1" title="La chorale du P'tit Bal"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Events section ─────────────────────────────────────────────────────────────

function EventsSection() {
  const [filter, setFilter] = useState<Filter>('Tous')
  const [view, setView] = useState<ViewMode>('grille')
  const [showPast, setShowPast] = useState(false)

  const TODAY = '2026-08-19'

  const pool = filter === 'Tous' ? EVENTS : EVENTS.filter(e => e.category === filter)
  const upcoming = pool.filter(e => e.dateSort >= TODAY).sort((a, b) => a.dateSort.localeCompare(b.dateSort))
  const past     = pool.filter(e => e.dateSort <  TODAY).sort((a, b) => b.dateSort.localeCompare(a.dateSort))

  const count = (f: Filter) => {
    const p = f === 'Tous' ? EVENTS : EVENTS.filter(e => e.category === f)
    return p.filter(e => e.dateSort >= TODAY).length
  }

  return (
    <section id="agenda" style={{ background: 'var(--surface)', padding: '80px 0 96px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: 12 }}>Agenda 2026</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(32px,6vw,60px)', color: 'var(--surface-foreground)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              Prochains<br /><em style={{ color: 'var(--primary)' }}>événements</em>
            </h2>
          </div>
          {/* View toggle */}
          <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden', flexShrink: 0, background: '#fff' }}>
            {(['grille', 'liste'] as ViewMode[]).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '8px 18px', background: view === v ? 'var(--primary)' : 'transparent', border: 'none', color: view === v ? 'var(--primary-foreground)' : 'var(--muted-foreground)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500, transition: 'all 0.2s', borderRadius: 24 }}>
                {v === 'grille'
                  ? <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="1" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 4h11M1 7h11M1 10h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>}
                {v === 'grille' ? 'Grille' : 'Liste'}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
          {FILTERS.map(f => {
            const active = filter === f
            const color = CAT_COLOR[f] || 'var(--primary)'
            const bg = CAT_BG[f] || '#fdf2d8'
            return (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 18px', borderRadius: 20, border: `1.5px solid ${active ? color : 'var(--border)'}`, background: active ? bg : '#fff', color: active ? color : 'var(--muted-foreground)', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
                {f !== 'Tous' && <span style={{ fontSize: 9 }}>{f === 'Concerts' ? '★' : '♥'}</span>}
                {f}
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, opacity: 0.6 }}>{count(f)}</span>
              </button>
            )
          })}
        </div>

        {/* Upcoming */}
        {view === 'grille' && upcoming.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
            {upcoming.map(e => <EventCardGrid key={e.id} evt={e} />)}
          </div>
        )}
        {view === 'liste' && upcoming.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '0 24px', overflow: 'hidden' }}>
            {upcoming.map((e, i) => <EventRowList key={e.id} evt={e} isLast={i === upcoming.length - 1} />)}
          </div>
        )}
        {upcoming.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted-foreground)', fontFamily: "'DM Serif Display', serif", fontSize: 22, fontStyle: 'italic' }}>
            Aucun événement à venir dans cette catégorie ♥
          </div>
        )}

        {/* Archives toggle */}
        {past.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <button onClick={() => setShowPast(v => !v)} style={{
              all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--muted-foreground)',
              letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 0 16px',
              borderBottom: '1px solid var(--border)', width: '100%',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: 'transform 0.25s', transform: showPast ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {showPast ? 'Masquer les archives' : `Archives — ${past.length} événement${past.length > 1 ? 's' : ''} passé${past.length > 1 ? 's' : ''}`}
            </button>

            {showPast && (
              <div style={{ marginTop: 20, opacity: 0.6, filter: 'saturate(0.4)' }}>
                {view === 'grille' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
                    {past.map(e => <EventCardGrid key={e.id} evt={e} />)}
                  </div>
                )}
                {view === 'liste' && (
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '0 24px', overflow: 'hidden' }}>
                    {past.map((e, i) => <EventRowList key={e.id} evt={e} isLast={i === past.length - 1} />)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── About section ──────────────────────────────────────────────────────────────

function AboutSection() {

  return (
    <section id="histoire" style={{ background: '#fff', overflow: 'hidden', position: 'relative' }}>

      {/* Pull-quote banner */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 260 }}>
        <img src={heroImg} alt="" aria-hidden
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', filter: 'brightness(0.45) saturate(1.1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--background) 0%, transparent 25%, rgba(24,18,10,0.92) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <blockquote style={{ textAlign: 'center', maxWidth: 720 }}>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(18px,3.5vw,34px)', color: 'var(--foreground)', lineHeight: 1.35, fontStyle: 'italic', margin: '0 0 16px' }}>
              « Ouvert aux curieux comme aux danseurs confirmés, c'est un bal vivant : on y découvre une culture, on y trouve sa place, et on en repart avec une seule envie — y retourner. »
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--primary)', letterSpacing: '0.1em', margin: 0 }}>— Marion</p>
          </blockquote>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 96px' }}>

        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 14 }}>Notre histoire</p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(32px,6vw,60px)', color: 'var(--surface-foreground)', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 56 }}>
          Vingt ans de forró <em style={{ color: 'var(--primary)' }}>à Paris</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 48, alignItems: 'start' }} className="about-grid">

          {/* Left: Marion photo */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: 8, background: '#f0e8d8' }}>
              <img src={marionLimaImg} alt="Marion Lima, fondatrice du P'tit Bal Perdu"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,20,9,0.8) 0%, transparent 50%)' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 24px 28px' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 5 }}>Fondatrice & Pédagogue</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: '#fff', lineHeight: 1 }}>Marion Lima</h3>
            </div>
          </div>

          {/* Right: text + press */}
          <div>
            {/* Long copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--surface-foreground)', lineHeight: 1.75, fontWeight: 400 }}>
                Fondée en 2006 par Marion Lima, Le P'tit Bal Perdu fait vivre depuis bientôt vingt ans les cultures populaires brésiliennes à Paris, autour du forró, du chant, des bals et de la rencontre.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.75, fontWeight: 300 }}>
                Au fil des années, l'association a grandi par ses rendez-vous : des cours réguliers pour tous les niveaux, des soirées dansantes dans le 20e, des bals en plein air d'Avril à Septembre, des stages à Paris, en France, au Brésil et partout ailleurs, mais aussi des temps forts qui ont marqué la scène forró parisienne — festival <em>Ai Que Bom</em> (2011-2019), le marathon <em>Não Para, Não Para, Não Para...</em> Et depuis 2012, la chorale du P'tit Bal prolonge cette approche en reliant la voix, le rythme et le mouvement.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.75, fontWeight: 300 }}>
                Aujourd'hui, Le P'tit Bal Perdu réunit une communauté de danseurs, musiciens, chanteurs, professeurs et curieux autour d'un même esprit : faire du bal un espace vivant, accessible et collectif, où chacun peut apprendre, danser, chanter et trouver sa place.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.75, fontWeight: 300 }}>
                Le P'tit Bal Perdu se veut un espace ouvert et respectueux. Le bal est un lieu de rencontre et d'expression — et c'est précisément pour cela qu'il doit rester un endroit où chacun se sent en sécurité. Débutant ou danseur confirmé, seul ou accompagné, on y vient comme on est, et on y est accueilli comme on le mérite : avec bienveillance.
              </p>
            </div>

            {/* Press / articles */}
            <div style={{ marginTop: 24 }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: 'var(--muted-foreground)', textTransform: 'uppercase', marginBottom: 10 }}>En savoir plus sur Marion et l'association</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {([
                  { label: "Podcast Pau de Arara — forró em Paris", src: "Apple Podcasts", url: 'https://podcasts.apple.com/fr/podcast/pau-de-arara/id1547861331?l=en-GB' },
                  { label: "Un voyage au Brésil par le chant et la danse", src: "Cap Magellan", url: 'https://capmagellan.com/le-ptit-bal-perdu-un-voyage-au-bresil-par-le-chant-et-la-danse/' },
                  { label: "Le forró en vidéo", src: "YouTube", url: 'https://www.youtube.com/watch?v=MdO_jhIrOtk' },
                  { label: "Le forró — émission Emmenez-moi", src: "France Inter", url: 'https://www.radiofrance.fr/franceinter/podcasts/emmenez-moi/le-forro-3176870' },
                  { label: "Forró dancing takes hold in Paris", src: "The New York Times", url: 'https://www.nytimes.com/2010/02/14/travel/14headsup.html' },
                  { label: "Forró — musique et danse du Nordeste", src: "YouTube", url: 'https://www.youtube.com/watch?v=2w8yZyMbIag' },
                ] as {label:string,src:string,url:string}[]).map((a, i) => (
                  <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    color: 'var(--muted-foreground)', fontSize: 13,
                    fontFamily: "'Inter', sans-serif", textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color='var(--surface-foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color='var(--muted-foreground)')}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, opacity: 0.5 }}><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>{a.label}<span style={{ marginLeft: 6, fontFamily: "'DM Mono', monospace", fontSize: 10, opacity: 0.55 }}>— {a.src}</span></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
      `}</style>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--background)', borderTop: '1px solid var(--border-dark)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 48, marginBottom: 56 }}>

          <div style={{ gridColumn: 'span 2' }} className="footer-brand">
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 12 }}>Forró em Paris</p>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: 'var(--foreground)', lineHeight: 0.9, marginBottom: 16 }}>
              Le P'tit Bal<br /><em style={{ color: 'var(--primary)' }}>Perdu</em>
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,237,214,0.5)', lineHeight: 1.65, maxWidth: 280, fontWeight: 300 }}>
              Association loi 1901 dédiée au forró et à la culture brésilienne à Paris depuis 2006.
            </p>
          </div>

          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: 'rgba(245,237,214,0.35)', textTransform: 'uppercase', marginBottom: 18 }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['#','Accueil'],['#cours','Cours'],['#agenda','Agenda'],['#histoire','Notre histoire'],['#contact','Contact']].map(([href,label]) => (
                <li key={href}><a href={href} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,237,214,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color='var(--foreground)')}
                  onMouseLeave={e => (e.currentTarget.style.color='rgba(245,237,214,0.45)')}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: 'rgba(245,237,214,0.35)', textTransform: 'uppercase', marginBottom: 18 }}>Nous trouver</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,237,214,0.45)', fontWeight: 300 }}>46 rue des Rigoles<br />75020 Paris 20e</p>
              {[
                { href: 'https://chat.whatsapp.com/GYarf3uIY2UCgv93K1Bywi', label: 'Groupe WhatsApp', icon: 'wa' },
                { href: 'https://instagram.com/leptitbalperdu', label: '@leptitbalperdu', icon: 'ig' },
                { href: 'https://instagram.com/marionpbp', label: '@marionpbp', icon: 'ig' },
                { href: 'https://instagram.com/naopara.marathon', label: '@naopara.marathon', icon: 'ig' },
                { href: 'https://www.instagram.com/ecolekimkan', label: '@ecolekimkan', icon: 'ig' },
                { href: 'https://www.facebook.com/leptitbalperdu', label: 'Le P\'tit Bal Perdu', icon: 'fb' },
              ].map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(245,237,214,0.45)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color='var(--secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.color='rgba(245,237,214,0.45)')}>
                  {l.icon === 'ig'
                    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                    : l.icon === 'wa'
                    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    : <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
                  }
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(245,237,214,0.3)', letterSpacing: '0.06em' }}>© 2026 Le P'tit Bal Perdu — Tous droits réservés</p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: 'rgba(245,237,214,0.3)', letterSpacing: '0.06em' }}>
            Fait avec <span style={{ color: 'var(--secondary)' }}>♥</span> &amp; <span style={{ color: 'var(--primary)' }}>★</span> à Paris
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) { .footer-brand { grid-column: span 1 !important; } }
      `}</style>
    </footer>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const quotes = [
    { text: "Avec le forró, j'ai rencontré une communauté, une famille. Je suis arrivée seule un vendredi soir et je ne suis jamais vraiment repartie.", author: "Camille", role: "Danseuse depuis 2019" },
    { text: "Dansez, y a que ça de bon. Et au P'tit Bal, on danse vraiment — on transpire, on rit, on se retrouve.", author: "Jacques", role: "Fidèle du Forrobodó" },
    { text: "Le forró m'a appris à écouter l'autre, à m'adapter, à être dans l'instant. C'est bien plus qu'une danse.", author: "Rui", role: "Musicien & danseur" },
    { text: "C'est une danse qui m'a redonné l'envie de vivre, c'est une source de joie qui m'accompagne au quotidien.", author: "Marie", role: "Élève depuis 2023" },
    { text: "Je n'avais jamais dansé de ma vie. Aujourd'hui le forró fait partie de mon rythme de semaine. Marion est une pédagogue extraordinaire.", author: "Thomas", role: "Élève depuis 2022" },
  ]

  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + quotes.length) % quotes.length)
  const next = () => setIdx(i => (i + 1) % quotes.length)
  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ background: 'var(--background)', padding: '52px 0 60px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(224,144,16,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 10 }}>La communauté parle</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(30px, 5vw, 52px)', color: 'var(--foreground)', lineHeight: 0.95, letterSpacing: '-0.02em', margin: 0 }}>
              Ils dansent,<br /><em style={{ color: 'var(--primary)' }}>ils témoignent</em>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['←', prev], ['→', next]].map(([arrow, fn]) => (
              <button key={arrow as string} onClick={fn as () => void} style={{ all: 'unset', cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--border-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)', fontSize: 15, transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                {arrow}
              </button>
            ))}
          </div>
        </div>

        {/* Carrousel une ligne */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 14, transition: 'transform 0.4s ease', transform: `translateX(calc(-${idx} * (100% / 3 + 14px / 3 * 2)))` }} className="testi-track">
            {quotes.map((q, i) => (
              <div key={i} style={{ flex: '0 0 calc(33.33% - 10px)', minWidth: 0, background: 'var(--card)', border: `1px solid ${i === idx ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 8, padding: '16px 18px 14px', display: 'flex', flexDirection: 'column', gap: 8, transition: 'border-color 0.3s' }}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: 'var(--primary)', lineHeight: 0.6, opacity: 0.4 }}>"</span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--surface-foreground)', lineHeight: 1.65, fontWeight: 400, margin: 0, flexGrow: 1 }}>{q.text}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, color: '#a86c00', margin: 0 }}>{q.author}</p>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--muted-foreground)', letterSpacing: '0.07em', marginTop: 3 }}>{q.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', gap: 7, marginTop: 20 }}>
          {quotes.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ all: 'unset', cursor: 'pointer', width: i === idx ? 18 : 6, height: 6, borderRadius: 4, transition: 'all 0.3s', background: i === idx ? 'var(--primary)' : 'rgba(245,237,214,0.2)' }} />
          ))}
        </div>

      </div>
      <style>{`@media(max-width:700px){.testi-track > div{flex: 0 0 calc(100% - 0px) !important;}}`}</style>
    </section>
  )
}

// ─── Membership floating badge ───────────────────────────────────────────────

function MembershipBadge() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#agenda"
      aria-label="Voir le prochain bal"
      style={{
        position: 'fixed', bottom: 28, right: 24, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--primary)', color: '#1a0e00',
        padding: '11px 18px 11px 14px', borderRadius: 40,
        textDecoration: 'none', boxShadow: '0 4px 24px rgba(224,144,16,0.45)',
        fontFamily: "'DM Mono', monospace", fontWeight: 700,
        fontSize: 12, letterSpacing: '0.06em',
        transition: 'transform 0.2s, opacity 0.35s',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {/* Pulse ring */}
      <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, flexShrink: 0 }}>
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'rgba(224,144,16,0.5)',
          animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <span style={{ position: 'relative', width: 10, height: 10, borderRadius: '50%', background: '#1a0e00' }} />
      </span>
      <span style={{ lineHeight: 1.2 }}>
        <span style={{ display: 'block', fontSize: 9, opacity: 0.7, letterSpacing: '0.1em', marginBottom: 1 }}>CE WEEK-END</span>
        On danse ?
      </span>
    </a>
  )
}

// ─── Membership banner (inline, between cours & events) ───────────────────────

function MembershipBanner() {
  return (
    <div style={{ background: 'rgba(224,144,16,0.08)', borderTop: '1px solid rgba(224,144,16,0.2)', borderBottom: '1px solid rgba(224,144,16,0.2)', padding: '20px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Icon */}
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5C8 1.5 3 4 3 8.5C3 11.26 5.24 13.5 8 13.5C10.76 13.5 13 11.26 13 8.5C13 4 8 1.5 8 1.5Z" stroke="#1a0e00" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M6 8.5L7.5 10L10.5 7" stroke="#1a0e00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, color: 'var(--primary)', margin: 0, letterSpacing: '0.06em' }}>
              Adhésion à l'association — obligatoire pour les bals & festivals
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.5, marginTop: 2 }}>
              Requise pour le Forrobodó, les kiosques et les festivals — pas pour les cours. Elle se fait en ligne via HelloAsso.
            </p>
          </div>
        </div>
        <a
          href="https://www.helloasso.com/associations/le-p-tit-bal-perdu"
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            border: '1.5px solid var(--primary)', color: 'var(--primary)',
            padding: '9px 18px', borderRadius: 4, flexShrink: 0,
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            fontWeight: 600, letterSpacing: '0.08em',
            textDecoration: 'none', transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='var(--primary)'; e.currentTarget.style.color='#1a0e00' }}
          onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--primary)' }}
        >
          Adhérer sur HelloAsso
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function AnnouncementBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div style={{
      background: 'linear-gradient(90deg, var(--secondary) 0%, #a0103a 100%)',
      color: '#fff', padding: '10px 48px 10px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 12, position: 'relative', zIndex: 101,
    }}>
      <span style={{ fontSize: 16 }}>🎉</span>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, margin: 0, textAlign: 'center', lineHeight: 1.4 }}>
        <strong style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15 }}>Le P'tit Bal Perdu fête ses 20 ans !</strong>
        <span style={{ opacity: 0.88, marginLeft: 8 }}>Forrobodó, marathon, rentrée… tout septembre est une fête.</span>
      </p>
      <a href="#agenda" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#fff', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 20, padding: '4px 12px', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        Voir l'agenda
      </a>
      <button onClick={() => setVisible(false)} aria-label="Fermer" style={{
        all: 'unset', cursor: 'pointer', position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
        color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1, padding: '2px 4px',
        transition: 'color 0.2s',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
        ×
      </button>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ background: 'var(--background)' }}>
      <AnnouncementBanner />
      <Nav />
      <Hero />
      <Ticker />
      <StatsSection />
      <CoursesSection />
      <EventsSection />
      <AboutSection />
      <TestimonialsSection />

      {/* Bandeau adhésion */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.6, margin: 0, maxWidth: 680, fontWeight: 300 }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", color: 'var(--surface-foreground)', fontSize: 15, fontWeight: 400 }}>L'adhésion à l'association</span> — 10 € / an — vous donne accès aux soirées Forrobodó et soutient le développement de la culture brésilienne à Paris.
          </p>
          <a href="https://www.helloasso.com/associations/le-p-tit-bal-perdu" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: '1.5px solid var(--primary)', color: 'var(--primary)', padding: '9px 18px', borderRadius: 4, fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textDecoration: 'none', transition: 'background 0.2s, color 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='var(--primary)'; el.style.color='#1a0e00' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.color='var(--primary)' }}>
            Adhérer sur HelloAsso
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>

      <Footer />
      <MembershipBadge />
    </div>
  )
}
