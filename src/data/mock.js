// Sample content. Replace with your API / backend data.
export const FEED_FILTERS = ['All', 'Announcements', 'Advisories', 'Events', 'Reports'];

export const FEED = [
  { id: '1', type: 'Advisories', title: 'Water interruption this Thursday', body: 'Expect low pressure from 9 AM to 3 PM due to pipe maintenance. Please store water ahead of time.', date: 'Today', time: 'Thursday · 9:00 AM – 3:00 PM', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80' },
  { id: '2', type: 'Events', title: 'Barangay Christmas party', body: 'Celebrate the holidays with your neighbors. There will be food, games, and activities for children at the barangay hall.', date: 'Dec 20', time: 'December 20 · 5:00 PM', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=900&q=80' },
  { id: '3', type: 'Events', title: 'Parol-making contest', body: 'Show your creativity and help brighten the barangay. Submit your parol at the barangay hall before judging day.', date: 'Dec 15', time: 'December 15 · 3:00 PM', image: 'https://images.unsplash.com/photo-1544207240-1c96a0f7e9f2?auto=format&fit=crop&w=900&q=80' },
  { id: '4', type: 'Events', title: 'Community caroling night', body: 'Join the community caroling around the barangay. Meet at the covered court and bring your favorite holiday songs.', date: 'Dec 18', time: 'December 18 · 6:00 PM', image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=900&q=80' },
  { id: '5', type: 'Events', title: 'Barangay clean-up drive', body: 'Join us this Saturday, 7 AM at the barangay hall. Gloves and bags will be provided.', date: 'Dec 7', time: 'December 7 · 7:00 AM', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80' },
  { id: '6', type: 'Announcements', title: 'Barangay ID distribution', body: 'Claim your ID at the barangay hall, Monday to Friday, 8 AM to 4 PM. Bring a valid ID.', date: 'Nov 14', time: 'Monday – Friday · 8:00 AM – 4:00 PM', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80' },
  { id: '7', type: 'Reports', title: 'Streetlight repaired on Rizal St.', body: 'The reported broken streetlight has been fixed by the maintenance team.', date: 'Nov 12', time: 'November 12', likes: 8, dislikes: 0, image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80' },
  { id: '8', type: 'Reports', title: 'Garbage collection restored on Mabini St.', body: 'The missed collection route has been added to the next pickup schedule.', date: 'Nov 10', time: 'November 10', likes: 15, dislikes: 1, image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80' },
  { id: '9', type: 'Reports', title: 'Pothole repair completed near the market', body: 'The road section near the public market has been patched and reopened to traffic.', date: 'Nov 8', time: 'November 8', likes: 6, dislikes: 0, image: 'https://images.unsplash.com/photo-1518005020951-ecc8a2d4f8d7?auto=format&fit=crop&w=900&q=80' },
  { id: '10', type: 'Reports', title: 'Drainage cleared before the rainy season', body: 'The maintenance team cleared blocked drainage along the main road to improve water flow.', date: 'Nov 5', time: 'November 5', likes: 11, dislikes: 1, image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80' },
];

export const REQUIREMENTS = [
  { id: 'r1', title: 'Barangay Clearance', fee: 'PHP 50', time: '1 day', steps: ['Valid government ID', 'Proof of residency', 'Community tax certificate (cedula)', 'Fill out the clearance form'] },
  { id: 'r2', title: 'Certificate of Indigency', fee: 'Free', time: '1 day', steps: ['Valid ID', 'Letter stating the purpose', 'Barangay interview'] },
  { id: 'r3', title: 'Business Permit Clearance', fee: 'PHP 300', time: '2 days', steps: ['DTI or SEC registration', 'Lease contract or land title', 'Valid ID of the owner', 'Sketch of business location'] },
  { id: 'r4', title: 'Certificate of Residency', fee: 'PHP 30', time: '1 day', steps: ['Valid ID', 'Proof of address (bill or lease)'] },
];

export const CONTACT_GROUPS = [
  { title: 'National emergency', contacts: [{ id: 'c1', name: 'National Emergency Hotline', role: 'Police, fire, medical', number: '911' }] },
  { title: 'Barangay officials', contacts: [
    { id: 'c2', name: 'Barangay Captain', role: 'Punong Barangay', number: '09000000001' }, // TODO real numbers
    { id: 'c3', name: 'Barangay Hall', role: 'Front desk', number: '09000000002' },
  ] },
  { title: 'Barangay tanods', contacts: [{ id: 'c4', name: 'Tanod on duty', role: 'Peace and order', number: '09000000003' }] },
  { title: 'Rescue personnel', contacts: [{ id: 'c5', name: 'Barangay Rescue Team', role: 'First response', number: '09000000004' }] },
];

export const CONCERN_CATEGORIES = ['Repairs', 'Garbage', 'Noise', 'Safety', 'Other'];

export const USER = { name: 'Juan Dela Cruz', address: 'Purok 1, Street Name', phone: '0900 000 0000', since: '2021' };
