'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

/* ---------------- WordsPullUp ---------------- */
export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(" ")

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  )
}

export default function HeroSection({ dict }) {
  return (
    <section className="h-screen w-full relative theme-dark">
      <div className="relative h-full w-full overflow-hidden bg-black">
        
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          src="https://assets.mixkit.co/videos/preview/mixkit-under-a-concrete-building-structure-41584-large.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 sm:px-6 md:px-10 z-10">
          <div className="grid grid-cols-12 items-end gap-6">
            
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-serif leading-[0.85] tracking-[-0.07em] text-[15vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] xl:text-[9vw]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text={dict.hero.line1} /><br />
                <WordsPullUp text={dict.hero.line2} /><br />
                <WordsPullUp text={dict.hero.line3} showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-6 lg:col-span-4 lg:pb-10">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base font-sans"
                style={{ lineHeight: 1.3, color: "rgba(225, 224, 204, 0.85)" }}
              >
                {dict.hero.tagline}
              </motion.p>

              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-3 self-start rounded-full bg-[#E1E0CC] py-1 pl-6 pr-1 text-sm font-medium text-black transition-all hover:gap-4 sm:text-base"
              >
                {dict.nav.b2b}
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                </span>
              </motion.a>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
