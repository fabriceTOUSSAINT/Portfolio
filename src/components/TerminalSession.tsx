import { useState, useCallback, type ReactNode } from 'react'
import { Link as RouterLink } from '@tanstack/react-router'
import { TypingEffect } from './TypingEffect'
import { StaggeredLines } from './StaggeredLines'
import { CopyToast } from './CopyToast'
import { SITE } from '../config/site'
import { useTerminalAnimation } from '../hooks/useTerminalAnimation'

const TOTAL_SECTIONS = 6

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
          speed={18}
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
    <div className="mt-4 sm:mt-6 ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
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

function ExternalLink({
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
    navigator.clipboard.writeText(SITE.email)
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

      <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
        {/* ── 0: whoami ── */}
        {isSectionVisible(0) && (
          <section className="mb-12 sm:mb-16">
            <Prompt
              command="whoami"
              animate={isAnimatingCommand(0)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(0)}
              animate={shouldAnimateOutput(0)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={70}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-term-text mb-2">
                Fabrice Toussaint
              </h1>
              <p className="text-syn-variable text-base sm:text-lg mb-6">
                Senior Software Engineer · Infrastructure to Interfaces · New York
              </p>
              <p className="text-term-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                10+ years building software at startups. Early engineer at{' '}
                <ExternalLink href="https://www.swantide.com">Swantide</ExternalLink> — I own
                product, platform, and infrastructure end-to-end. From
                AI batch pipelines processing 600k+ items to internal
                dev tools, CI/CD systems, and Kubernetes infrastructure
                for a team of two.
              </p>
            </Output>
          </section>
        )}

        {/* ── 1: projects ── */}
        {isSectionVisible(1) && (
          <section className="mb-12 sm:mb-16">
            <Prompt
              command="ls projects/"
              animate={isAnimatingCommand(1)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(1)}
              animate={shouldAnimateOutput(1)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={100}
            >
              <div>
                <span className="text-syn-constant font-semibold text-sm sm:text-base">AI Batch Pipeline</span>
                <p className="text-term-muted text-xs sm:text-sm mt-1 max-w-2xl">
                  Built an AI documentation pipeline processing 600k+ Salesforce items via
                  the OpenAI Batch API. Auto-chunking by token limit, webhook recovery,
                  streaming downloads to avoid OOM. Cost-optimized vs real-time.
                </p>
              </div>
              <div className="mt-4">
                <RouterLink
                  to="/case-study/$slug"
                  params={{ slug: 'local-dev-platform' }}
                  className="text-syn-constant font-semibold text-sm sm:text-base underline decoration-syn-constant/30 underline-offset-4 hover:decoration-syn-constant/80 transition-all duration-200"
                >
                  sd — Local Dev Platform
                </RouterLink>
                <p className="text-term-muted text-xs sm:text-sm mt-1 max-w-2xl">
                  Built a Go CLI wrapping Kubernetes, Helm, and Docker for local development.
                  One command to spin up all 9 microservices. Reduced onboarding from days to minutes.
                </p>
              </div>
              <div className="mt-4">
                <RouterLink
                  to="/case-study/$slug"
                  params={{ slug: 'cra-to-vite' }}
                  className="text-syn-constant font-semibold text-sm sm:text-base underline decoration-syn-constant/30 underline-offset-4 hover:decoration-syn-constant/80 transition-all duration-200"
                >
                  Frontend Modernization
                </RouterLink>
                <p className="text-term-muted text-xs sm:text-sm mt-1 max-w-2xl">
                  Migrated CRA → Vite, Redux → TanStack Query, MUI v4 → v5 — four sequential
                  production migrations with zero incidents and no feature freeze.
                </p>
              </div>
              <div className="mt-4">
                <span className="text-syn-constant font-semibold text-sm sm:text-base">RBAC System</span>
                <p className="text-term-muted text-xs sm:text-sm mt-1 max-w-2xl">
                  Evaluated OPA and custom solutions, chose Permit.io. Shipped end-to-end —
                  Kubernetes sidecar, Express middleware, and frontend permission hooks. No handoffs.
                </p>
              </div>
            </Output>
          </section>
        )}

        {/* ── 2: history ── */}
        {isSectionVisible(2) && (
          <section className="mb-12 sm:mb-16">
            <Prompt
              command="history"
              animate={isAnimatingCommand(2)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(2)}
              animate={shouldAnimateOutput(2)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={80}
            >
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-6 text-sm sm:text-base">
                  <span className="text-syn-comment w-auto sm:w-32 shrink-0">2023 – now</span>
                  <div>
                    <span className="text-term-text font-semibold">Swantide</span>
                    <span className="text-term-muted"> · Early Engineer</span>
                  </div>
                </div>
                <p className="text-term-muted text-xs sm:text-sm mt-1 sm:ml-38">
                  Full ownership across product, platform, and infrastructure. Built the local dev
                  platform, CI/CD pipeline, AI batch processing, and RBAC system. Led 4 major frontend
                  migrations with zero incidents. No handoffs.
                </p>
              </div>
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-6 text-sm sm:text-base">
                  <span className="text-syn-comment w-auto sm:w-32 shrink-0">2019 – 2022</span>
                  <div>
                    <span className="text-term-text font-semibold">Revel</span>
                    <span className="text-term-muted"> · Senior Software Engineer</span>
                  </div>
                </div>
                <p className="text-term-muted text-xs sm:text-sm mt-1 sm:ml-38">
                  Led frontend and GraphQL API gateway. Shipped 7 greenfield products — consumer webviews, dispatcher, driver scheduling, field ops, ride-hail.
                </p>
              </div>
              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-6 text-sm sm:text-base">
                  <span className="text-syn-comment w-auto sm:w-32 shrink-0">2017 – 2019</span>
                  <div>
                    <span className="text-term-text font-semibold">Group Nine Media</span>
                    <span className="text-term-muted"> · Software Engineer</span>
                  </div>
                </div>
                <p className="text-term-muted text-xs sm:text-sm mt-1 sm:ml-38">
                  Led React adoption across the frontend org; built 4 products from data pipelines to consumer sites
                </p>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-6 text-sm sm:text-base">
                  <span className="text-syn-comment w-auto sm:w-32 shrink-0">2016 – 2017</span>
                  <div>
                    <span className="text-term-text font-semibold">Complex Media</span>
                    <span className="text-term-muted"> · Front-End Developer</span>
                  </div>
                </div>
                <p className="text-term-muted text-xs sm:text-sm mt-1 sm:ml-38">
                  React/Redux components across 6 high-traffic consumer sites
                </p>
              </div>
            </Output>
          </section>
        )}

        {/* ── 3: skills ── */}
        {isSectionVisible(3) && (
          <section className="mb-12 sm:mb-16">
            <Prompt
              command="ls skills/"
              animate={isAnimatingCommand(3)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(3)}
              animate={shouldAnimateOutput(3)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={100}
            >
              <div>
                <span className="text-syn-comment text-xs italic block mb-1">{'// infrastructure & platform'}</span>
                <div className="flex flex-wrap gap-x-5 sm:gap-x-10 gap-y-1 text-sm sm:text-base">
                  <span className="text-syn-function">Kubernetes</span>
                  <span className="text-syn-function">Docker</span>
                  <span className="text-syn-function">GCP</span>
                  <span className="text-syn-function">Helm</span>
                  <span className="text-syn-function">GitHub Actions</span>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-syn-comment text-xs italic block mb-1">{'// languages'}</span>
                <div className="flex flex-wrap gap-x-5 sm:gap-x-10 gap-y-1 text-sm sm:text-base">
                  <span className="text-syn-keyword">TypeScript</span>
                  <span className="text-syn-keyword">Python</span>
                  <span className="text-syn-keyword">Go</span>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-syn-comment text-xs italic block mb-1">{'// frameworks'}</span>
                <div className="flex flex-wrap gap-x-5 sm:gap-x-10 gap-y-1 text-sm sm:text-base">
                  <span className="text-syn-constant">React</span>
                  <span className="text-syn-constant">Node.js</span>
                  <span className="text-syn-constant">FastAPI</span>
                  <span className="text-syn-constant">Vite</span>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-syn-comment text-xs italic block mb-1">{'// ai'}</span>
                <div className="flex flex-wrap gap-x-5 sm:gap-x-10 gap-y-1 text-sm sm:text-base">
                  <span className="text-syn-variable">LLM Pipelines</span>
                  <span className="text-syn-variable">PydanticAI</span>
                  <span className="text-syn-variable">Eval Frameworks</span>
                  <span className="text-syn-variable">Batch Processing</span>
                </div>
              </div>
              <div className="mt-5">
                <span className="text-syn-comment text-xs italic block mb-1">{'// data'}</span>
                <div className="flex flex-wrap gap-x-5 sm:gap-x-10 gap-y-1 text-sm sm:text-base">
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

        {/* ── 4: contact ── */}
        {isSectionVisible(4) && (
          <section className="mb-10 sm:mb-14">
            <Prompt
              command="contact --list"
              animate={isAnimatingCommand(4)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(4)}
              animate={shouldAnimateOutput(4)}
              onAllLinesShown={anim.onOutputComplete}
              staggerDelay={70}
            >
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-baseline gap-1 sm:gap-x-6 text-sm sm:text-base">
                <span className="text-syn-variable w-auto sm:w-28 shrink-0">email</span>
                <button
                  onClick={handleCopy}
                  className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200 cursor-pointer"
                >
                  {SITE.email}
                </button>
                <span className="text-syn-comment italic text-xs">
                  {'// click to copy'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-6 text-sm sm:text-base">
                <span className="text-syn-variable w-auto sm:w-28 shrink-0">linkedin</span>
                <ExternalLink href={SITE.social.linkedin.url}>
                  {SITE.social.linkedin.label}
                </ExternalLink>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-6 text-sm sm:text-base">
                <span className="text-syn-variable w-auto sm:w-28 shrink-0">github</span>
                <ExternalLink href={SITE.social.github.url}>
                  {SITE.social.github.label}
                </ExternalLink>
              </div>
            </Output>
          </section>
        )}

        {/* ── 5: resume ── */}
        {isSectionVisible(5) && (
          <section className="mb-10 sm:mb-14">
            <Prompt
              command="cat resume.pdf | open"
              animate={isAnimatingCommand(5)}
              onTypingDone={anim.onTypingComplete}
            />
            <Output
              visible={isOutputVisible(5)}
              animate={shouldAnimateOutput(5)}
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
