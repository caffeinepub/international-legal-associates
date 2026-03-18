# International Legal Associates

## Current State
Full website with Hero, Services, About, Team, Contact sections, and Footer. Backend stores inquiries. Team has: Ashutosh Singh (Founder), Taranpreet Kaur (CEO), Gayatri Dogra, Ankita Joshi. Contact info uses placeholder email/phone. LinkedIn links are placeholders. No admin access to view inquiries.

## Requested Changes (Diff)

### Add
- Authorization component for admin login (Internet Identity)
- Admin dashboard page: view all submitted inquiries when logged in
- Admin login button in header (discreet)
- Real LinkedIn profile link for International Legal Associates

### Modify
- Ashutosh Singh photo: use uploaded /assets/uploads/1773862404110-1.png
- Remove Gayatri Dogra from team (not mentioned)
- Update contact email to ashutoshsingh0101970@gmail.com
- Update phone to +919596991023
- Update footer with real contact details and LinkedIn link

### Remove
- Gayatri Dogra team card
- Placeholder social/contact info

## Implementation Plan
1. Select authorization component
2. Update Team.tsx: use real founder photo, remove Gayatri Dogra
3. Update Contact.tsx: real email + phone
4. Update Footer.tsx: real email, phone, LinkedIn link
5. Create Admin.tsx: inquiry dashboard behind auth
6. Update Header.tsx: admin login link
7. Update App.tsx: include Admin panel
