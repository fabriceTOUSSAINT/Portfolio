import { useState, useCallback, type ReactNode } from 'react'
import { TypingEffect } from './TypingEffect'
import { CopyToast } from './CopyToast'
import { useTerminalAnimation } from '../hooks/useTerminalAnimation'

const SECTIONS = [
  'whoami',
  'skills',
  'interests',
  'contact',
  'resume',
] as const

/* ── Prompt line ── */

function Prompt({
  command,
  animate,
  onTypingDone,
}: {
  command: string
  animate: boolean
  onTypingDone?: () => void
}) {
  return (
    <div className="flex items-center gap-3 text-base sm:text-lg font-semibold">
      <span className="text-syn-keyword text-xl">$</span>
      {animate ? (
        <TypingEffect
          text={command}
          speed={25}
          onComplete={onTypingDone}
          className="text-term-text"
        />
      ) : (
        <span className="text-term-text">{command}</span>
      )}
    </div>
  )
}

/* ── Output wrapper with fade-in ── */

function Output({
  visible,
  animate,
  children,
}: {
  visible: boolean
  animate: boolean
  children: ReactNode
}) {
  if (!visible) return null

  return (
    <div
      className={`mt-6 ml-6 pl-8 border-l-2 border-term-border/60 ${
        animate
          ? 'animate-[fadeSlideIn_0.4s_ease-out_forwards]'
          : ''
      }`}
    >
      {children}
    </div>
  )
}

/* ── Interactive elements ── */

function Link({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200"
    >
      {children}
    </a>
  )
}

/* ── Main component ── */

export function TerminalSession() {
  const [copied, setCopied] = useState(false)
  const anim = useTerminalAnimation(SECTIONS.length)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('developer@fabricebt.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }, [])

  const shouldAnimate = (index: number) =>
    anim.activeSection === index && !anim.skipAnimation

  const outputVisible = (index: number) =>
    anim.activeSection > index || anim.skipAnimation

  return (
    <>
      <CopyToast visible={copied} />

      <div className="flex-1 px-10 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
        {/* ── whoami ── */}
        {(anim.activeSection >= 0 || anim.skipAnimation) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="whoami"
              animate={shouldAnimate(0)}
              onTypingDone={anim.onSectionComplete}
            />
            <Output visible={outputVisible(0)} animate={!anim.skipAnimation}>
              <h1 className="text-3xl sm:text-4xl font-bold text-term-text mb-2">
                Fabrice Toussaint
              </h1>
              <p className="text-syn-variable text-base sm:text-lg mb-6">
                Senior Software Engineer · New York
              </p>
              <p className="text-term-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                I build products end-to-end — from infrastructure to interfaces.
                Currently a founding engineer at{' '}
                <Link href="https://swantide.com">Swantide</Link>, building
                AI-powered GTM automation at an early-stage startup.
              </p>
            </Output>
          </section>
        )}

        {/* ── skills ── */}
        {(anim.activeSection >= 1 || anim.skipAnimation) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="ls skills/"
              animate={shouldAnimate(1)}
              onTypingDone={anim.onSectionComplete}
            />
            <Output visible={outputVisible(1)} animate={!anim.skipAnimation}>
              <div className="space-y-5 text-sm sm:text-base">
                <div>
                  <span className="text-syn-comment text-xs italic block mb-2">{'// languages'}</span>
                  <div className="flex flex-wrap gap-x-10 gap-y-1">
                    <span className="text-syn-keyword">TypeScript</span>
                    <span className="text-syn-keyword">Python</span>
                    <span className="text-syn-keyword">Go</span>
                  </div>
                </div>
                <div>
                  <span className="text-syn-comment text-xs italic block mb-2">{'// frontend & frameworks'}</span>
                  <div className="flex flex-wrap gap-x-10 gap-y-1">
                    <span className="text-syn-constant">React</span>
                    <span className="text-syn-constant">Node.js</span>
                    <span className="text-syn-constant">FastAPI</span>
                    <span className="text-syn-constant">Vite</span>
                  </div>
                </div>
                <div>
                  <span className="text-syn-comment text-xs italic block mb-2">{'// data'}</span>
                  <div className="flex flex-wrap gap-x-10 gap-y-1">
                    <span className="text-syn-type">PostgreSQL</span>
                    <span className="text-syn-type">MongoDB</span>
                    <span className="text-syn-type">Redis</span>
                  </div>
                </div>
                <div>
                  <span className="text-syn-comment text-xs italic block mb-2">{'// infrastructure'}</span>
                  <div className="flex flex-wrap gap-x-10 gap-y-1">
                    <span className="text-syn-function">Kubernetes</span>
                    <span className="text-syn-function">Docker</span>
                    <span className="text-syn-function">GCP</span>
                    <span className="text-syn-function">Helm</span>
                    <span className="text-syn-function">GitHub Actions</span>
                  </div>
                </div>
              </div>
            </Output>
          </section>
        )}

        {/* ── interests ── */}
        {(anim.activeSection >= 2 || anim.skipAnimation) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="cat interests.txt"
              animate={shouldAnimate(2)}
              onTypingDone={anim.onSectionComplete}
            />
            <Output visible={outputVisible(2)} animate={!anim.skipAnimation}>
              <div className="space-y-2 text-sm sm:text-base">
                <div>
                  <span className="text-syn-comment mr-3">{'>'}</span>
                  <span className="text-term-text">code</span>
                </div>
                <div>
                  <span className="text-syn-comment mr-3">{'>'}</span>
                  <span className="text-term-text">photography</span>
                </div>
                <div>
                  <span className="text-syn-comment mr-3">{'>'}</span>
                  <span className="text-term-text">building dev tools</span>
                </div>
              </div>
            </Output>
          </section>
        )}

        {/* ── contact ── */}
        {(anim.activeSection >= 3 || anim.skipAnimation) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="contact --list"
              animate={shouldAnimate(3)}
              onTypingDone={anim.onSectionComplete}
            />
            <Output visible={outputVisible(3)} animate={!anim.skipAnimation}>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex flex-wrap items-baseline gap-x-6">
                  <span className="text-syn-variable w-28 shrink-0">email</span>
                  <button
                    onClick={handleCopy}
                    className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200 cursor-pointer"
                  >
                    developer@fabricebt.com
                  </button>
                  <span className="text-syn-comment italic text-xs">
                    {'// click to copy'}
                  </span>
                </div>
                <div className="flex items-baseline gap-x-6">
                  <span className="text-syn-variable w-28 shrink-0">github</span>
                  <Link href="https://github.com/fabriceTOUSSAINT">
                    fabriceTOUSSAINT
                  </Link>
                </div>
                <div className="flex items-baseline gap-x-6">
                  <span className="text-syn-variable w-28 shrink-0">linkedin</span>
                  <Link href="https://www.linkedin.com/in/fabrice-toussaint-68a39a50/">
                    fabrice-toussaint
                  </Link>
                </div>
                <div className="flex items-baseline gap-x-6">
                  <span className="text-syn-variable w-28 shrink-0">instagram</span>
                  <Link href="https://www.instagram.com/brb.mom.needs.computer/">
                    @brb.mom.needs.computer
                  </Link>
                </div>
              </div>
            </Output>
          </section>
        )}

        {/* ── resume ── */}
        {(anim.activeSection >= 4 || anim.skipAnimation) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="cat resume.pdf | open"
              animate={shouldAnimate(4)}
              onTypingDone={anim.onSectionComplete}
            />
            <Output visible={outputVisible(4)} animate={!anim.skipAnimation}>
              <a
                href="/pdfs/Resume_2022.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-syn-function underline decoration-syn-function/30 underline-offset-4 hover:decoration-syn-function/80 transition-all duration-200 text-sm sm:text-base"
              >
                → download resume
              </a>
            </Output>
          </section>
        )}

        {/* ── Blinking cursor ── */}
        {anim.complete && (
          <div className="flex items-center gap-3 text-base sm:text-lg mt-4">
            <span className="text-syn-keyword text-xl">$</span>
            <span className="inline-block w-[10px] h-[1.2em] bg-term-text animate-[blink_1s_step-end_infinite]" />
          </div>
        )}
      </div>
    </>
  )
}
