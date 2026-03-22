import { swantide } from './swantide'
import { localDevPlatform } from './local-dev-platform'
import { craToVite } from './cra-to-vite'
import type { CaseStudy } from './types'

export type { CaseStudy }

export const caseStudies: Record<string, CaseStudy> = {
  swantide,
  'local-dev-platform': localDevPlatform,
  'cra-to-vite': craToVite,
}
