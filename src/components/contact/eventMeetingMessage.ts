export function eventMeetingIntro(tourTitle?: string) {
  return `I would like to meet eQOURSE${tourTitle ? ` during the ${tourTitle}` : ' at an upcoming event'}. My preferred dates and project interests are: `;
}

export function buildEventMeetingMessage(message: string, options: [string, string], location?: string) {
  const timeZoneNote = location ? ` (local time in ${location})` : ' (please confirm time zone)';
  const meetingOptions = options.flatMap((value, index) => {
    if (!value) return [];
    const [date, time] = value.split('T');
    return [`Preferred meeting option ${index + 1}: ${date} at ${time}${timeZoneNote}`];
  });
  return [message.trim(), ...meetingOptions].join('\n');
}
