import { useState, useCallback, type ReactNode } from 'react'
import { TypingEffect } from './TypingEffect'
import { StaggeredLines } from './StaggeredLines'
import { CopyToast } from './CopyToast'
import { useTerminalAnimation } from '../hooks/useTerminalAnimation'

const TOTAL_SECTIONS = 5

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

/* ── Output wrapper with staggered lines ── */

function Output({
  visible,
  animate,
  onAllLinesShown,
  children,
  staggerDelay = 120,
}: {
  visible: boolean
  animate: boolean
  onAllLinesShown?: () => void
  children: ReactNode
  staggerDelay?: number
}) {
  if (!visible) return null

  return (
    <div className="mt-6 ml-6 pl-8 border-l-2 border-term-border/60">
      <StaggeredLines
        animate={animate}
        delay={staggerDelay}
        onComplete={onAllLinesShown}
      >
        {children}
      </StaggeredLines>
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
  const anim = useTerminalAnimation(TOTAL_SECTIONS)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('developer@fabricebt.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }, [])

  // A section is "active" when we're currently animating it
  const isAnimatingCommand = (index: number) =>
    anim.activeSection === index && anim.phase === 'typing' && !anim.skipAnimation

  // Output is visible once the command has finished typing
  const isOutputVisible = (index: number) =>
    anim.skipAnimation ||
    anim.activeSection > index ||
    (anim.activeSection === index && anim.phase === 'output')

  // Output should animate (stagger) only the first time
  const shouldAnimateOutput = (index: number) =>
    anim.activeSection === index && anim.phase === 'output' && !anim.skipAnimation

  // Section is visible if we've reached it
  const isSectionVisible = (index: number) =>
    anim.activeSection >= index || anim.skipAnimation

  return (
    <>
      <CopyToast visible={copied} />

      <div className="flex-1 px-10 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
        {/* ── whoami ── */}
        {isSectionVisible(0) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="whoami"
              animate={isAnimatingCommand(0)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(0)}
              animate={shouldAnimateOutput(0)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={100}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-term-text mb-2">
                Fabrice Toussaint
              </h1>
              <p className="text-syn-variable text-base sm:text-lg mb-6">
                Staff Software Engineer · New York
              </p>
              <p className="text-term-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                Founding engineer at{' '}
                <Link href="https://www.swantide.com">Swantide</Link> — I own
                product, platform, and infrastructure end-to-end. From
                shipping AI-powered GTM automation to building internal
                dev tools, CI/CD systems, and Kubernetes infrastructure.
              </p>
            </Output>
          </section>
        )}

        {/* ── skills ── */}
        {isSectionVisible(1) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="ls skills/"
              animate={isAnimatingCommand(1)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(1)}
              animate={shouldAnimateOutput(1)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={150}
            >
              <div>
                <span className="text-syn-comment text-xs italic block mb-1">{'// infrastructure & platform'}</span>
                <div className="flex flex-wrap gap-x-10 gap-y-1 text-sm sm:text-base">
                  <span className="text-syn-function">Kubernetes</span>
                  <span className="text-syn-function">Docker</span>
                  <span className="text-syn-function">GCP</span>
                  <span className="text-syn-function">Helm</span>
                  <span className="text-syn-function">GitHub Actions</span>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-syn-comment text-xs italic block mb-1">{'// languages'}</span>
                <div className="flex flex-wrap gap-x-10 gap-y-1 text-sm sm:text-base">
                  <span className="text-syn-keyword">TypeScript</span>
                  <span className="text-syn-keyword">Python</span>
                  <span className="text-syn-keyword">Go</span>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-syn-comment text-xs italic block mb-1">{'// frameworks'}</span>
                <div className="flex flex-wrap gap-x-10 gap-y-1 text-sm sm:text-base">
                  <span className="text-syn-constant">React</span>
                  <span className="text-syn-constant">Node.js</span>
                  <span className="text-syn-constant">FastAPI</span>
                  <span className="text-syn-constant">Vite</span>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-syn-comment text-xs italic block mb-1">{'// data'}</span>
                <div className="flex flex-wrap gap-x-10 gap-y-1 text-sm sm:text-base">
                  <span className="text-syn-type">PostgreSQL</span>
                  <span className="text-syn-type">MongoDB</span>
                  <span className="text-syn-type">Redis</span>
                </div>
              </div>
              <p className="mt-6 text-syn-comment italic text-xs sm:text-sm">
                {'// always learning — I pick the right tool for the problem, not the one I already know'}
              </p>
            </Output>
          </section>
        )}

        {/* ── interests ── */}
        {isSectionVisible(2) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="cat interests.txt"
              animate={isAnimatingCommand(2)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(2)}
              animate={shouldAnimateOutput(2)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={100}
            >
              <div className="text-sm sm:text-base">
                <span className="text-syn-comment mr-3">{'>'}</span>
                <span className="text-term-text">code</span>
              </div>
              <div className="text-sm sm:text-base">
                <span className="text-syn-comment mr-3">{'>'}</span>
                <span className="text-term-text">photography</span>
              </div>
              <div className="text-sm sm:text-base">
                <span className="text-syn-comment mr-3">{'>'}</span>
                <span className="text-term-text">building dev tools</span>
              </div>
            </Output>
          </section>
        )}

        {/* ── contact ── */}
        {isSectionVisible(3) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="contact --list"
              animate={isAnimatingCommand(3)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(3)}
              animate={shouldAnimateOutput(3)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={120}
            >
              <div className="flex flex-wrap items-baseline gap-x-6 text-sm sm:text-base">
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
              <div className="flex items-baseline gap-x-6 text-sm sm:text-base">
                <span className="text-syn-variable w-28 shrink-0">github</span>
                <Link href="https://github.com/fabriceTOUSSAINT">
                  fabriceTOUSSAINT
                </Link>
              </div>
              <div className="flex items-baseline gap-x-6 text-sm sm:text-base">
                <span className="text-syn-variable w-28 shrink-0">linkedin</span>
                <Link href="https://www.linkedin.com/in/fabrice-toussaint-68a39a50/">
                  fabrice-toussaint
                </Link>
              </div>
              <div className="flex items-baseline gap-x-6 text-sm sm:text-base">
                <span className="text-syn-variable w-28 shrink-0">instagram</span>
                <Link href="https://www.instagram.com/brb.mom.needs.computer/">
                  @brb.mom.needs.computer
                </Link>
              </div>
            </Output>
          </section>
        )}

        {/* ── resume ── */}
        {isSectionVisible(4) && (
          <section className="mb-16 sm:mb-20">
            <Prompt
              command="cat resume.pdf | open"
              animate={isAnimatingCommand(4)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(4)}
              animate={shouldAnimateOutput(4)}
              onAllLinesShown={anim.onOutputComplete}
            >
              <a
                href="/pdfs/resume.pdf"
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
