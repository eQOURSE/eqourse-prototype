import { describe, expect, it } from 'vitest';
import { events, upcomingTours, getEventSchema } from './eventsData';
describe('event SEO publication', () => {
    it('does not advertise tours with unverified dates and venues as dated public events', () => {
        expect(events.every(event => getEventSchema(event) === null)).toBe(true);
    });
    it('keeps each archive separate from the upcoming list and gives every tour a unique URL', () => {
        expect(events).toHaveLength(10);
        expect(new Set(events.map(event => event.slug)).size).toBe(events.length);
        expect(upcomingTours).toHaveLength(5);
        expect(upcomingTours.some(event => event.slug === 'taiwan-tour-2026')).toBe(true);
        expect(upcomingTours.some(event => event.slug === 'china-tour-july-2026')).toBe(false);
    });
    it('publishes a confirmed physical event with its venue and country', () => {
        const event = { ...events.find(item => item.slug === 'japan-tour-2026')!, date: '2026-10-12', venue: 'Confirmed conference venue' };
        const schema = getEventSchema(event);
        expect(schema?.startDate).toBe('2026-10-12');
        expect(schema?.location.address.addressLocality).toBe('Tokyo');
        expect(schema?.location.address.addressCountry).toBe('JP');
        expect(schema?.eventAttendanceMode).toContain('OfflineEventAttendanceMode');
    });
    it('does not mark completed engagements as postponed', () => {
        expect(getEventSchema({ ...events.find(item => item.slug === 'japan-tour-2026')!, date: '2026-10-12', venue: 'Confirmed venue', status: 'completed' })?.eventStatus).toBe('https://schema.org/EventScheduled');
    });
    it('requires the venue even after a date has been entered', () => {
        expect(getEventSchema({ ...events[1], date: '2026-10-12' })).toBeNull();
    });
});
