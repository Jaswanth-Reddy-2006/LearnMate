import { atom, useAtom } from 'jotai'
import type { SessionSummary } from '../lib/types'

const sessionAtom = atom<SessionSummary | null>(null)

export const useSessionState = () => useAtom(sessionAtom)
