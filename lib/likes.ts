// Generate random likes count for demo purposes
export function generateRandomLikes(): number {
  return Math.floor(Math.random() * 500) + 10; // Between 10 and 510
}

// Get likes from localStorage (can be replaced with API in future)
export function getLikes(id: string): number {
  if (typeof window === 'undefined') return generateRandomLikes();
  
  const stored = localStorage.getItem(`likes-${id}`);
  if (stored) {
    return parseInt(stored, 10);
  }
  
  const initial = generateRandomLikes();
  localStorage.setItem(`likes-${id}`, initial.toString());
  return initial;
}

// Update likes count
export function updateLikes(id: string, count: number): number {
  if (typeof window === 'undefined') return count;
  
  localStorage.setItem(`likes-${id}`, count.toString());
  return count;
}

// Increment likes
export function incrementLikes(id: string): number {
  const current = getLikes(id);
  const updated = current + 1;
  updateLikes(id, updated);
  return updated;
}

// Check if user has liked
export function hasUserLiked(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const liked = localStorage.getItem(`liked-${id}`);
  return liked === 'true';
}

// Toggle user like status
export function toggleUserLike(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const current = hasUserLiked(id);
  const newStatus = !current;
  
  localStorage.setItem(`liked-${id}`, newStatus.toString());
  
  if (newStatus) {
    incrementLikes(id);
  } else {
    const current = getLikes(id);
    if (current > 0) {
      updateLikes(id, current - 1);
    }
  }
  
  return newStatus;
}
