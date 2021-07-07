declare function formatDate(date: string | number | Date, fmt?: string): string;
declare const timeSince: (time: string | number | Date, scope?: number | undefined) => string | undefined;
export { formatDate, timeSince, };
