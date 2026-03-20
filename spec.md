# International Legal Associates

## Current State
The website has a Contact/Inquiry form with fields: name, email, phone, message. Submitted inquiries are stored in the backend and viewable in the Admin panel. There is no date/time scheduling feature.

## Requested Changes (Diff)

### Add
- Date picker field in the consultation form so visitors can choose their preferred meeting date
- Time slot selector with predefined slots during office hours (e.g., 9 AM, 10 AM ... 5 PM on weekdays, 10 AM–1 PM on Saturdays)
- Store `preferredDate` and `preferredTime` in the inquiry record
- Admin panel displays scheduled date/time alongside other inquiry details

### Modify
- Contact form: add date + time fields between phone and message
- Backend `Inquiry` type: add `preferredDate` and `preferredTime` fields
- `submitInquiry` function: accept two additional Text params for date and time
- Admin panel: show the scheduled date/time in each inquiry card

### Remove
- Nothing removed

## Implementation Plan
1. Update `main.mo` to include `preferredDate` and `preferredTime` in Inquiry type and `submitInquiry` signature
2. Update `Contact.tsx` to add a date input and time slot dropdown
3. Update `Admin.tsx` to display scheduled date/time
4. Update `useQueries` hook to pass new fields
