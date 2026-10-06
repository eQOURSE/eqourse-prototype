import { describe, expect, it } from 'vitest';
import { buildEventMeetingMessage, eventMeetingIntro } from './eventMeetingMessage';

describe('tour meeting message', () => {
  it('prefills the selected tour and includes both meeting options in the submitted message', () => {
    const intro = eventMeetingIntro('Taiwan Business Tour 2026');
    expect(intro).toBe('I would like to meet eQOURSE during the Taiwan Business Tour 2026. My preferred dates and project interests are: ');
    expect(buildEventMeetingMessage(`${intro}AI data collaboration`, ['2026-10-15T10:00', '2026-10-16T14:30'], 'Taiwan')).toBe(
      'I would like to meet eQOURSE during the Taiwan Business Tour 2026. My preferred dates and project interests are: AI data collaboration\nPreferred meeting option 1: 2026-10-15 at 10:00 (local time in Taiwan)\nPreferred meeting option 2: 2026-10-16 at 14:30 (local time in Taiwan)',
    );
  });

  it('omits unused meeting options', () => {
    expect(buildEventMeetingMessage('Project discussion', ['', '2026-10-16T14:30'], 'Taiwan')).toBe(
      'Project discussion\nPreferred meeting option 2: 2026-10-16 at 14:30 (local time in Taiwan)',
    );
  });
});
