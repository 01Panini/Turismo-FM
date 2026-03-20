export async function logAdminAction(event: string, meta: Record<string, unknown> = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    ...meta
  };

  // For this pragmatic setup, we stream simply to console
  console.log(`[ADMIN-LOG] ${JSON.stringify(logEntry)}`);

  // Future: you could easily append this to a database table or a local .log file here
}
