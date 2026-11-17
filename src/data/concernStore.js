import { useEffect, useState } from 'react';

const initialConcerns = [
  {
    id: '1024',
    category: 'Repairs',
    title: 'Pothole on Mabini St.',
    details: 'Near the corner store, getting bigger after rain.',
    status: 'In progress',
    proofUris: [],
    likes: 12,
    dislikes: 1,
  },
  {
    id: '1019',
    category: 'Garbage',
    title: 'Missed garbage collection',
    details: 'Purok 3 was skipped on Monday.',
    status: 'Resolved',
    proofUris: [],
    likes: 4,
    dislikes: 0,
  },
];

let concerns = initialConcerns;
const listeners = new Set();

function notify() {
  listeners.forEach((listener) => listener());
}

export function useConcerns() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    const listener = () => setVersion((version) => version + 1);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return concerns;
}

export function addConcern(concern) {
  concerns = [concern, ...concerns];
  notify();
}
