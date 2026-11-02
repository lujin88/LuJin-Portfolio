/**
 * Ask Lu is a public, pay-per-request LLM endpoint, so it stays off until
 * ASK_LU_ENABLED=true is set on the deployment. When off, the /index button is
 * not rendered and /api/ask-lu returns 404.
 */
export function isAskLuEnabled() {
  return process.env.ASK_LU_ENABLED === 'true'
}
