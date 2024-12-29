/**
 * Extracts initials from a name string
 * @param name Full name to get initials from
 * @returns Uppercase initials (max 2 characters)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}