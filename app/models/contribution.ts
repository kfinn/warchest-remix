import { parseISO } from 'date-fns';
import type { Entry } from "@prisma/client";

const NUMBER_FORMAT = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export function contributionFormattedAmount({ entry: { amount } }: { entry: Entry }) {
  return NUMBER_FORMAT.format(amount);
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-US')
export function contributionFormattedDate({ entry: { date } }: { entry: Entry }) {
  return DATE_FORMAT.format(parseISO(date.slice(0, 10), 'yyyy-mm-dd', 0))
}
