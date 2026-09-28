import { describe, expect, it } from 'vitest';
import { events, getEventSchema } from './eventsData';
describe('event SEO publication', () => {
    it('does not advertise planned tours as dated public events', () => {
        expect(events.every(event => getEventSchema(event) === null)).toBe(true);
    });
    it('publishes a confirmed physical event with its venue and country', () => {
        const event = { ...events[1], date: '2026-10-12', venue: 'Confirmed conference venue' };
        const schema = getEventSchema(event);
        expect(schema?.startDate).toBe('2026-10-12');
        expect(schema?.location.address.addressLocality).toBe('Tokyo');
        expect(schema?.location.address.addressCountry).toBe('JP');
        expect(schema?.eventAttendanceMode).toContain('OfflineEventAttendanceMode');
    });
    it('does not mark completed engagements as postponed', () => {
        expect(getEventSchema({ ...events[1], date: '2026-10-12', venue: 'Confirmed venue', status: 'completed' })?.eventStatus).toBe('https://schema.org/EventScheduled');
    });
    it('requires the venue even after a date has been entered', () => {
        expect(getEventSchema({ ...events[1], date: '2026-10-12' })).toBeNull();
    });
});
