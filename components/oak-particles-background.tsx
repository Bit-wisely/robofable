'use client'

import { useEffect, useRef } from 'react'

interface Point3D {
  x: number
  y: number
  z: number
  color: string
  size: number
  originalY: number
}

interface AmbientParticle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  speedFactor: number
}

export function OakParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Palette inspired by Kew's 'Of the Oak' (deep forest, organic golds, teals, soft amber)
    const colors = [
      'rgba(143, 188, 143, ', // soft moss green
      'rgba(240, 230, 140, ', // warm gold/khaki
      'rgba(102, 205, 170, ', // medium aquamarine
      'rgba(244, 164, 96, ',  // sandy brown/amber
      'rgba(255, 222, 173, ', // navajo white/soft cream
    ]

    const getRandomColor = (alpha = 1) => {
      const idx = Math.floor(Math.random() * colors.length)
      return `${colors[idx]}${alpha})`
    }

    // Generate 3D point cloud of a tree
    const treePoints: Point3D[] = []

    function generateTreeBranch(
      startX: number,
      startY: number,
      startZ: number,
      angleX: number,
      angleY: number,
      angleZ: number,
      length: number,
      depth: number
    ) {
      if (depth > 6) return

      const endX = startX + Math.sin(angleY) * Math.cos(angleX) * length
      const endY = startY + Math.sin(angleX) * length
      const endZ = startZ + Math.cos(angleY) * Math.cos(angleX) * length

      // Create points along this branch segment
      const numPoints = Math.max(5, Math.floor(length / (2.5 + depth * 0.5)))
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints
        const px = startX + (endX - startX) * t
        const py = startY + (endY - startY) * t
        const pz = startZ + (endZ - startZ) * t

        // Add some random organic thickness/offset
        const jitter = (6 - depth) * 1.5
        const offsetX = (Math.random() - 0.5) * jitter
        const offsetY = (Math.random() - 0.5) * jitter
        const offsetZ = (Math.random() - 0.5) * jitter

        // Determine particle size (thicker at trunk, thinner at twigs)
        const size = Math.max(0.6, (6 - depth) * 0.4 + Math.random() * 0.5)

        treePoints.push({
          x: px + offsetX,
          y: py + offsetY,
          z: pz + offsetZ,
          color: getRandomColor(0.6 + Math.random() * 0.4),
          size,
          originalY: py + offsetY,
        })
      }

      // Branch out recursively
      const numOffshoots = depth === 0 ? 3 : Math.random() > 0.45 ? 3 : 2
      for (let j = 0; j < numOffshoots; j++) {
        const nextLength = length * (0.65 + Math.random() * 0.15)
        const nextAngleX = angleX + (Math.random() - 0.4) * 0.75 + 0.15 // generally grow upwards
        const nextAngleY = angleY + (Math.random() - 0.5) * 1.5
        const nextAngleZ = angleZ + (Math.random() - 0.5) * 0.8
        generateTreeBranch(endX, endY, endZ, nextAngleX, nextAngleY, nextAngleZ, nextLength, depth + 1)
      }
    }

    // Grow the point cloud tree starting from bottom-center
    // In our coordinates, y increases downwards, so growing up means y decreases.
    generateTreeBranch(0, 150, 0, -Math.PI / 2, 0, 0, 160, 0)

    // Generate ambient rising particles (spores / forest dust)
    const ambientParticles: AmbientParticle[] = []
    const numAmbient = 120
    for (let i = 0; i < numAmbient; i++) {
      ambientParticles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: Math.random() * height - height / 2,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.4,
        size: Math.random() * 1.5 + 0.5,
        color: getRandomColor(0.2 + Math.random() * 0.4),
        alpha: 0.1 + Math.random() * 0.5,
        speedFactor: 0.6 + Math.random() * 0.8,
      })
    }

    // Interactivity
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -0.5 to 0.5
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    let angleY = 0
    let angleX = 0
    let time = 0

    // Render loop
    const render = () => {
      time += 0.005
      // Smoothly interpolate mouse coordinates for organic ease
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      // Base rotation + mouse rotation
      angleY = time * 0.15 + mouseRef.current.x * 0.6
      angleX = mouseRef.current.y * 0.2

      // Atmospheric dark forest gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      )
      bgGrad.addColorStop(0, '#040b07') // extremely dark forest green
      bgGrad.addColorStop(0.5, '#020503') // dark charcoal
      bgGrad.addColorStop(1, '#000000') // pure black
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Perspective projection parameters
      const fov = 450
      const cx = width / 2
      const cy = height * 0.72 // tree base around 72% height

      const sinY = Math.sin(angleY)
      const cosY = Math.cos(angleY)
      const sinX = Math.sin(angleX)
      const cosX = Math.cos(angleX)

      // 1. Draw and update Ambient rising particles
      ambientParticles.forEach((p) => {
        p.y += p.vy * p.speedFactor
        p.x += p.vx + Math.sin(time + p.z) * 0.15 // gentle drift

        // Wrap around
        if (p.y < -height / 2 - 50) {
          p.y = height / 2 + 50
          p.x = (Math.random() - 0.5) * width * 1.2
        }

        // Apply 3D rotation based on camera/mouse
        const rotX = p.x * cosY - p.z * sinY
        let rotZ = p.z * cosY + p.x * sinY
        const rotY = p.y * cosX - rotZ * sinX
        rotZ = rotZ * cosX + p.y * sinX

        const scale = fov / (fov + rotZ + 200)
        const projX = cx + rotX * scale
        const projY = cy + rotY * scale

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height && rotZ + 200 > 0) {
          ctx.beginPath()
          ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        }
      })

      // Sort tree points back-to-front for proper painters algorithm depth rendering
      const projectedTreePoints = treePoints
        .map((p) => {
          // Add some dynamic tree sway using sine waves based on time and height
          const swayScale = Math.max(0, -p.originalY - 20) * 0.0005 // top of tree sways more
          const swayX = Math.sin(time * 2 + p.originalY * 0.02) * 20 * swayScale
          const swayZ = Math.cos(time * 1.5 + p.originalY * 0.02) * 15 * swayScale

          // Apply rotation matrix
          const rx = (p.x + swayX) * cosY - (p.z + swayZ) * sinY
          let rz = (p.z + swayZ) * cosY + (p.x + swayX) * sinY

          const ry = p.y * cosX - rz * sinX
          rz = rz * cosX + p.y * sinX

          return {
            rx,
            ry,
            rz,
            color: p.color,
            size: p.size,
          }
        })
        .sort((a, b) => b.rz - a.rz)

      // 2. Draw projected tree points
      projectedTreePoints.forEach((p) => {
        const scale = fov / (fov + p.rz + 250)
        const projX = cx + p.rx * scale
        const projY = cy + p.ry * scale

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height && p.rz + 250 > 0) {
          ctx.beginPath()
          ctx.arc(projX, projY, p.size * scale, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        }
      })

      // Add a soft ground glow at the tree base
      const groundGlow = ctx.createRadialGradient(cx, cy + 20, 5, cx, cy + 20, 180)
      groundGlow.addColorStop(0, 'rgba(143, 188, 143, 0.15)')
      groundGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = groundGlow
      ctx.fillRect(cx - 180, cy - 20, 360, 100)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block h-full w-full select-none"
    />
  )
}
