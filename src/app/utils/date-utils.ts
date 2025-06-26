// src/app/utils/date-utils.ts

/**
 * Formats a date string (YYYY-MM-DD) into a Date object suitable for Angular forms.
 * @param date - The date string to format
 * @returns The formatted date string in 'yyyy-MM-dd' format, or '' if invalid
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    // If already in correct format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    // Try to parse other string formats
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
    return '';
  }
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date.toISOString().slice(0, 10);
  }
  return '';
}
