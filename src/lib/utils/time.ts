export function getCurrentProgram(programs: { dayOfWeek: number; startTime: string; endTime: string; title: string; hostName: string }[]) {
  if (!programs || programs.length === 0) return null;

  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // Filter programs playing today
  const todaysPrograms = programs.filter(p => p.dayOfWeek === currentDay);

  for (const program of todaysPrograms) {
    const [startH, startM] = program.startTime.split(':').map(Number);
    const [endH, endM] = program.endTime.split(':').map(Number);

    const startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;

    // Handle programs that cross midnight (e.g., 22:00 to 02:00)
    if (endTotal <= startTotal) {
      endTotal += 24 * 60; // Add 24 hours in minutes
    }

    // Check if current time falls within program time
    let testCurrent = currentTotalMinutes;
    // If the program crosses midnight and it's early morning, we need to adjust
    if (startTotal > endTotal - (24 * 60) && testCurrent < startTotal) {
         testCurrent += 24 * 60;
    }

    if (testCurrent >= startTotal && testCurrent < endTotal) {
      return program;
    }
  }

  return null; // No program strictly matching the current slot
}
