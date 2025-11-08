export type ViewMode = 'form' | 'chat' | 'featured' | 'fullExplore' | 'collapsed'

export const COMMAND_PATTERNS = {
  launch: /^launch|start|begin|commence|launch my learning path/i,
  explore: /^explore|show all|all features|full catalog|view all|explore path/i,
  reset: /^reset|restart|back|go back|start over|clear session/i,
  help: /^help|guide|tutorial|how to|what can i do/i,
} as const

export interface ParsedCommand {
  type: keyof typeof COMMAND_PATTERNS | 'none'
  confidence: number
  matched: boolean
}

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim()

  for (const [type, pattern] of Object.entries(COMMAND_PATTERNS)) {
    if (pattern.test(trimmed)) {
      return {
        type: type as keyof typeof COMMAND_PATTERNS,
        confidence: 0.95,
        matched: true,
      }
    }
  }

  return {
    type: 'none',
    confidence: 0,
    matched: false,
  }
}

export function getViewModeTransition(
  currentMode: ViewMode,
  command: ParsedCommand,
): ViewMode {
  if (!command.matched) return currentMode

  switch (command.type) {
    case 'launch':
      return 'featured'
    case 'explore':
      return 'fullExplore'
    case 'reset':
      return 'form'
    case 'help':
      return currentMode
    default:
      return currentMode
  }
}

export function getCommandResponse(command: ParsedCommand): string | null {
  switch (command.type) {
    case 'explore':
      return "Great! I'm displaying all available features. You can access any of them anytime during your learning journey."
    case 'reset':
      return 'Session reset. Let me guide you through setting up a new learning path.'
    case 'help':
      return 'You can use these commands:\n• "explore path" - See all available features\n• "launch my learning path" - Start with your learning plan\n• "restart" - Begin a new session\nOr simply describe what you want to learn!'
    default:
      return null
  }
}

export const VIEW_MODE_METADATA = {
  form: {
    featuresPanelVisible: false,
    featuresExpanded: false,
    chatVisible: false,
    formVisible: true,
    description: 'Initial onboarding form state',
  },
  chat: {
    featuresPanelVisible: true,
    featuresExpanded: false,
    chatVisible: true,
    formVisible: false,
    description: 'Standard chat with collapsed features',
  },
  featured: {
    featuresPanelVisible: true,
    featuresExpanded: false,
    chatVisible: true,
    formVisible: false,
    description: 'Standard layout after launch',
  },
  fullExplore: {
    featuresPanelVisible: true,
    featuresExpanded: true,
    chatVisible: true,
    formVisible: false,
    description: 'All features fully expanded and highlighted',
  },
  collapsed: {
    featuresPanelVisible: false,
    featuresExpanded: false,
    chatVisible: true,
    formVisible: false,
    description: 'Chat-only focused mode',
  },
} as const
