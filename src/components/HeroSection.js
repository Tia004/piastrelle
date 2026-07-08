'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/* ---------------- WordsPullUpMultiStyle ---------------- */
export const WordsPullUpMultiStyle = ({ segments, className = "", style }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const words = []
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className })
    })
  })

  return (
    <div className={`flex flex-wrap ${className}`} style={{ ...style, display: 'flex', flexWrap: 'wrap' }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 30, opacity: 0 }}
          animate={isMounted ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className={w.className ?? ""}
          style={{ marginRight: "0.22em", marginBottom: "0.05em", display: 'inline-block' }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  )
}

/* ---------------- Title Segments for Mixed Typography ---------------- */
const titleSegments = {
  it: [
    { text: "PLASMIAMO LA", className: "font-sans uppercase tracking-tighter" },
    { text: "materia", className: "font-serif italic font-normal text-[#8A7968] lowercase" },
    { text: "CHE DÀ FORMA ALLA", className: "font-sans uppercase tracking-tighter" },
    { text: "gravità*", className: "font-serif italic font-normal text-[#1A1A1A] lowercase" }
  ],
  en: [
    { text: "WE MOLD THE", className: "font-sans uppercase tracking-tighter" },
    { text: "matter", className: "font-serif italic font-normal text-[#8A7968] lowercase" },
    { text: "THAT SHAPES THE", className: "font-sans uppercase tracking-tighter" },
    { text: "gravity*", className: "font-serif italic font-normal text-[#1A1A1A] lowercase" }
  ],
  es: [
    { text: "MOLDEAMOS LA", className: "font-sans uppercase tracking-tighter" },
    { text: "materia", className: "font-serif italic font-normal text-[#8A7968] lowercase" },
    { text: "QUE DA FORMA A LA", className: "font-sans uppercase tracking-tighter" },
    { text: "gravedad*", className: "font-serif italic font-normal text-[#1A1A1A] lowercase" }
  ]
}

/* ---------------- Mathematical Vein Generator ---------------- */
function generateVeinPaths() {
  const paths = []
  
  // 4 major flowing veins
  const numMajor = 4
  for (let i = 0; i < numMajor; i++) {
    const path = []
    let x = Math.random() * 1024
    let y = 0
    path.push({ x, y })
    
    let step = 0
    while (y < 1024) {
      y += Math.random() * 35 + 15
      x += Math.sin(step) * 16 + (Math.random() - 0.5) * 22
      path.push({ x, y })
      step += 0.14
    }
    paths.push({ type: 'major', points: path, isGold: Math.random() > 0.65 })
  }

  // 6 minor branching veins
  const numMinor = 6
  for (let i = 0; i < numMinor; i++) {
    const path = []
    let x = Math.random() * 1024
    let y = Math.random() * 700
    path.push({ x, y })
    
    let step = 0
    const length = Math.random() * 250 + 150
    let curY = y
    while (curY < y + length && curY < 1024) {
      curY += Math.random() * 25 + 10
      x += (Math.random() - 0.5) * 18
      path.push({ x, y: curY })
    }
    paths.push({ type: 'minor', points: path, isGold: false })
  }

  return paths
}

/* ---------------- Front Polished Marble Canvases ---------------- */
function drawFrontTextures(paths) {
  const colorCanvas = document.createElement('canvas')
  colorCanvas.width = 1024
  colorCanvas.height = 1024
  const colorCtx = colorCanvas.getContext('2d')

  const bumpCanvas = document.createElement('canvas')
  bumpCanvas.width = 1024
  bumpCanvas.height = 1024
  const bumpCtx = bumpCanvas.getContext('2d')

  const roughnessCanvas = document.createElement('canvas')
  roughnessCanvas.width = 1024
  roughnessCanvas.height = 1024
  const roughnessCtx = roughnessCanvas.getContext('2d')

  // 1. Color Init (Luxury Off-White Calacatta)
  colorCtx.fillStyle = '#FCFAF7'
  colorCtx.fillRect(0, 0, 1024, 1024)
  
  // Radial clouds for natural shading variations
  for (let i = 0; i < 5; i++) {
    const grad = colorCtx.createRadialGradient(
      Math.random() * 1024, Math.random() * 1024, 120,
      Math.random() * 1024, Math.random() * 1024, 480
    )
    grad.addColorStop(0, 'rgba(236, 231, 222, 0.45)')
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
    colorCtx.fillStyle = grad
    colorCtx.fillRect(0, 0, 1024, 1024)
  }

  // 2. Bump Init (Flat surface)
  bumpCtx.fillStyle = '#FFFFFF'
  bumpCtx.fillRect(0, 0, 1024, 1024)

  // 3. Roughness Init (Very glossy background)
  roughnessCtx.fillStyle = '#1A1A1A' // low roughness (~10%)
  roughnessCtx.fillRect(0, 0, 1024, 1024)

  // Draw coordinated vein paths
  paths.forEach(p => {
    // A) Draw soft grey under-vein shadow (halo effect) for depth
    if (p.type === 'major') {
      colorCtx.beginPath()
      colorCtx.moveTo(p.points[0].x, p.points[0].y)
      p.points.forEach(pt => colorCtx.lineTo(pt.x, pt.y))
      colorCtx.strokeStyle = 'rgba(218, 212, 202, 0.35)'
      colorCtx.lineWidth = 26
      colorCtx.lineJoin = 'round'
      colorCtx.lineCap = 'round'
      colorCtx.stroke()
    }

    // B) Draw primary sharp veins
    colorCtx.beginPath()
    colorCtx.moveTo(p.points[0].x, p.points[0].y)
    p.points.forEach(pt => colorCtx.lineTo(pt.x, pt.y))
    colorCtx.strokeStyle = p.isGold ? 'rgba(182, 146, 106, 0.65)' : 'rgba(92, 92, 97, 0.6)'
    colorCtx.lineWidth = p.type === 'major' ? 3.6 : 1.2
    colorCtx.lineJoin = 'round'
    colorCtx.lineCap = 'round'
    colorCtx.stroke()

    // C) Add gold borders to charcoal major veins
    if (p.type === 'major' && !p.isGold) {
      colorCtx.beginPath()
      colorCtx.moveTo(p.points[0].x + 1.8, p.points[0].y + 1.2)
      p.points.forEach(pt => colorCtx.lineTo(pt.x + 1.8, pt.y + 1.2))
      colorCtx.strokeStyle = 'rgba(182, 146, 106, 0.45)'
      colorCtx.lineWidth = 1.0
      colorCtx.stroke()
    }

    // D) Recessed veins on the Bump Map
    bumpCtx.beginPath()
    bumpCtx.moveTo(p.points[0].x, p.points[0].y)
    p.points.forEach(pt => bumpCtx.lineTo(pt.x, pt.y))
    bumpCtx.strokeStyle = 'rgba(0, 0, 0, 0.16)' // subtle recessed trench
    bumpCtx.lineWidth = p.type === 'major' ? 3.8 : 1.5
    bumpCtx.lineJoin = 'round'
    bumpCtx.lineCap = 'round'
    bumpCtx.stroke()

    // E) Matte textures in the veins on the Roughness Map
    roughnessCtx.beginPath()
    roughnessCtx.moveTo(p.points[0].x, p.points[0].y)
    p.points.forEach(pt => roughnessCtx.lineTo(pt.x, pt.y))
    roughnessCtx.strokeStyle = '#666666' // matte roughness (~40%)
    roughnessCtx.lineWidth = p.type === 'major' ? 5.5 : 2.2
    roughnessCtx.lineJoin = 'round'
    roughnessCtx.lineCap = 'round'
    roughnessCtx.stroke()
  })

  // F) Draw bevel slope on the Bump Map edges
  const bevelWidth = 20
  for (let i = 0; i < bevelWidth; i++) {
    const factor = i / bevelWidth
    const brightness = Math.floor(factor * 255)
    bumpCtx.strokeStyle = `rgb(${brightness}, ${brightness}, ${brightness})`
    bumpCtx.lineWidth = 2
    bumpCtx.strokeRect(i, i, 1024 - 2 * i, 1024 - 2 * i)
  }

  // Fine edge line on color map for crisp contrast
  colorCtx.strokeStyle = 'rgba(0, 0, 0, 0.04)'
  colorCtx.lineWidth = 10
  colorCtx.strokeRect(0, 0, 1024, 1024)

  return { colorCanvas, bumpCanvas, roughnessCanvas }
}

/* ---------------- Back Terracotta Waffle Canvases ---------------- */
function drawBackTextures() {
  const colorCanvas = document.createElement('canvas')
  colorCanvas.width = 256
  colorCanvas.height = 256
  const colorCtx = colorCanvas.getContext('2d')

  const bumpCanvas = document.createElement('canvas')
  bumpCanvas.width = 256
  bumpCanvas.height = 256
  const bumpCtx = bumpCanvas.getContext('2d')

  // Biscuit clay base
  colorCtx.fillStyle = '#C4B4A2'
  colorCtx.fillRect(0, 0, 256, 256)

  // Ceramic pores/grit noise
  colorCtx.fillStyle = '#B09E8C'
  for (let i = 0; i < 500; i++) {
    colorCtx.fillRect(Math.random() * 256, Math.random() * 256, 1.2, 1.2)
  }

  // Bump neutral height
  bumpCtx.fillStyle = '#808080'
  bumpCtx.fillRect(0, 0, 256, 256)

  // Coordinated waffle grid lines
  colorCtx.strokeStyle = '#B3A18E'
  colorCtx.lineWidth = 5
  bumpCtx.strokeStyle = '#FFFFFF' // elevated ridges
  bumpCtx.lineWidth = 5

  const step = 32
  for (let i = step; i < 256; i += step) {
    colorCtx.beginPath(); colorCtx.moveTo(i, 0); colorCtx.lineTo(i, 256); colorCtx.stroke()
    bumpCtx.beginPath(); bumpCtx.moveTo(i, 0); bumpCtx.lineTo(i, 256); bumpCtx.stroke()

    colorCtx.beginPath(); colorCtx.moveTo(0, i); colorCtx.lineTo(256, i); colorCtx.stroke()
    bumpCtx.beginPath(); bumpCtx.moveTo(0, i); bumpCtx.lineTo(256, i); bumpCtx.stroke()
  }

  // Manufacturer's stamp in the center for realistic detail
  colorCtx.font = 'bold 22px "JetBrains Mono", monospace'
  colorCtx.fillStyle = 'rgba(125, 105, 85, 0.4)'
  colorCtx.textAlign = 'center'
  colorCtx.textBaseline = 'middle'
  colorCtx.fillText('LUMINA', 128, 110)
  colorCtx.font = 'bold 13px "JetBrains Mono", monospace'
  colorCtx.fillText('MADE IN ITALY', 128, 138)

  return { colorCanvas, bumpCanvas }
}

/* ---------------- Side Porous Clay Canvases ---------------- */
function drawSideTextures() {
  const colorCanvas = document.createElement('canvas')
  colorCanvas.width = 128
  colorCanvas.height = 128
  const colorCtx = colorCanvas.getContext('2d')

  const bumpCanvas = document.createElement('canvas')
  bumpCanvas.width = 128
  bumpCanvas.height = 128
  const bumpCtx = bumpCanvas.getContext('2d')

  // Unglazed cut clay/porcelain edge color
  colorCtx.fillStyle = '#E2DDD5'
  colorCtx.fillRect(0, 0, 128, 128)

  // Gritty specs
  colorCtx.fillStyle = '#C8C2BA'
  for (let i = 0; i < 250; i++) {
    colorCtx.fillRect(Math.random() * 128, Math.random() * 128, 1.2, 1.2)
  }

  // Rough bump noise
  bumpCtx.fillStyle = '#808080'
  bumpCtx.fillRect(0, 0, 128, 128)
  bumpCtx.fillStyle = '#A8A8A8'
  for (let i = 0; i < 400; i++) {
    bumpCtx.fillRect(Math.random() * 128, Math.random() * 128, 1.5, 1.5)
  }

  return { colorCanvas, bumpCanvas }
}

/* ---------------- Hero Section Component ---------------- */
export default function HeroSection({ dict, lang = 'it' }) {
  const canvasRef = useRef(null)
  const segments = titleSegments[lang] || titleSegments.it
  const [windowWidth, setWindowWidth] = useState(1200)

  // Track window resizing for responsive inline style grids
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    // Get current container size
    const container = canvasRef.current.parentElement
    const width = container.clientWidth
    const height = container.clientHeight

    // Three.js Scene Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.set(0, 0, 5.2)

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Set square geometry representing physical tile depth
    const geometry = new THREE.BoxGeometry(2.3, 2.3, 0.12)

    // Generate coordinated procedural textures
    const paths = generateVeinPaths()
    const front = drawFrontTextures(paths)
    const back = drawBackTextures()
    const side = drawSideTextures()

    // Canvas Textures
    const frontColorTex = new THREE.CanvasTexture(front.colorCanvas)
    const frontBumpTex = new THREE.CanvasTexture(front.bumpCanvas)
    const frontRoughTex = new THREE.CanvasTexture(front.roughnessCanvas)

    const backColorTex = new THREE.CanvasTexture(back.colorCanvas)
    const backBumpTex = new THREE.CanvasTexture(back.bumpCanvas)

    const sideColorTex = new THREE.CanvasTexture(side.colorCanvas)
    const sideBumpTex = new THREE.CanvasTexture(side.bumpCanvas)

    sideColorTex.wrapS = THREE.RepeatWrapping
    sideColorTex.wrapT = THREE.RepeatWrapping
    sideBumpTex.wrapS = THREE.RepeatWrapping
    sideBumpTex.wrapT = THREE.RepeatWrapping

    // Materials Configuration
    // Front face: Polished Calacatta marble using Physical Material (Specular Clearcoat)
    const frontMaterial = new THREE.MeshPhysicalMaterial({
      map: frontColorTex,
      bumpMap: frontBumpTex,
      bumpScale: 0.02,
      roughnessMap: frontRoughTex,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.8
    })

    // Back face: Unglazed clay biscuit backing with waffle mortar grid
    const backMaterial = new THREE.MeshStandardMaterial({
      map: backColorTex,
      bumpMap: backBumpTex,
      bumpScale: 0.035,
      roughness: 0.85
    })

    // Sides: Rough porous porcelain edges
    const sideMaterial = new THREE.MeshStandardMaterial({
      map: sideColorTex,
      bumpMap: sideBumpTex,
      bumpScale: 0.015,
      roughness: 0.9
    })

    // Apply materials to 6 BoxGeometry faces:
    // 0:Right, 1:Left, 2:Top, 3:Bottom, 4:Front, 5:Back
    const materials = [
      sideMaterial,  // Right (+X)
      sideMaterial,  // Left (-X)
      sideMaterial,  // Top (+Y)
      sideMaterial,  // Bottom (-Y)
      frontMaterial, // Front (+Z)
      backMaterial   // Back (-Z)
    ]

    const tile = new THREE.Mesh(geometry, materials)
    tile.position.set(0, 0, 0)
    scene.add(tile)

    // Dynamic Studio Lighting for Reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.2)
    keyLight.position.set(5, 5, 4)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xeef5ff, 1.4)
    fillLight.position.set(-5, -3, 3)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight(0xffffff, 1.2, 15)
    rimLight.position.set(0, 0, -3)
    scene.add(rimLight)

    // Resize Handler relative to parent container size
    function handleResize() {
      if (!canvasRef.current) return
      const parent = canvasRef.current.parentElement
      const w = parent.clientWidth
      const h = parent.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // Smooth Mouse Interactive Tilt
    let mouseX = 0
    let mouseY = 0
    function handleMouseMove(e) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation Loop
    let animationFrameId
    let rotationAngle = -0.45

    function animate() {
      rotationAngle += 0.003
      
      // Combine continuous rotation with mouse offset
      const targetRotY = rotationAngle + mouseX * 0.4
      const targetRotX = 0.18 + mouseY * 0.25
      
      tile.rotation.y += (targetRotY - tile.rotation.y) * 0.05
      tile.rotation.x += (targetRotX - tile.rotation.x) * 0.05

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Resource Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      geometry.dispose()
      
      frontMaterial.dispose()
      backMaterial.dispose()
      sideMaterial.dispose()

      frontColorTex.dispose()
      frontBumpTex.dispose()
      frontRoughTex.dispose()
      backColorTex.dispose()
      backBumpTex.dispose()
      sideColorTex.dispose()
      sideBumpTex.dispose()

      renderer.dispose()
    }
  }, [windowWidth])

  // Responsive styling variables
  const isDesktop = windowWidth >= 1024

  const sectionStyle = {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    backgroundColor: '#F5F0E8',
    display: 'flex',
    alignItems: 'center',
    padding: isDesktop ? '140px var(--site-margin) 80px var(--site-margin)' : '100px var(--site-margin) 60px var(--site-margin)',
    boxSizing: 'border-box'
  }

  const gridStyle = {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: isDesktop ? 'repeat(12, 1fr)' : '1fr',
    gap: isDesktop ? '64px' : '40px',
    alignItems: 'center',
    boxSizing: 'border-box'
  }

  const leftColStyle = {
    gridColumn: isDesktop ? 'span 8' : 'span 12',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    pointerEvents: 'auto',
    textAlign: 'left'
  }

  const canvasContainerStyle = {
    gridColumn: isDesktop ? 'span 4' : 'span 12',
    width: '100%',
    height: isDesktop ? '500px' : '320px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isDesktop ? '0' : '20px'
  }

  const titleStyle = {
    color: '#1A1A1A',
    lineHeight: 0.85,
    fontSize: isDesktop ? '5.5vw' : '10vw',
    fontWeight: 900,
    letterSpacing: '-0.04em',
    margin: 0
  }

  return (
    <section style={sectionStyle}>
      <div style={gridStyle}>
        
        {/* Left Column: Typography, Tagline, CTA */}
        <div style={leftColStyle}>
          <h1 style={titleStyle}>
            <WordsPullUpMultiStyle segments={segments} />
          </h1>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginTop: isDesktop ? '48px' : '32px'
          }}>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: isDesktop ? '1.1rem' : '0.95rem',
                lineHeight: 1.4,
                color: '#4A4A47',
                margin: 0,
                maxWidth: '480px'
              }}
            >
              {dict.hero.tagline}
            </motion.p>

            <motion.a
              href="#collections"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                textDecoration: 'none',
                alignSelf: 'flex-start',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#1A1A1A',
                color: '#F5F0E8',
                padding: '14px 28px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: '2px solid #1A1A1A',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1A1A1A' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1A1A1A'; e.currentTarget.style.color = '#F5F0E8' }}
            >
              {dict.hero.services_cta}
              <ArrowRight size={14} />
            </motion.a>
          </div>
        </div>

        {/* Right Column: 3D Tile Canvas */}
        <div style={canvasContainerStyle}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>

      </div>
    </section>
  )
}
