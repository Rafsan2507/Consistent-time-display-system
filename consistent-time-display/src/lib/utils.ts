import { formatInTimeZone } from 'date-fns-tz';

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const BUSINESS_TIMEZONE = 'America/Chicago';

export const timezoneData = [
    { label: "Asia/Dhaka", value: "Asia/Dhaka" },
    { label: "America/New_York", value: "America/New_York" },
    { label: "America/Denver", value: "America/Denver" },
    { label: "America/Los_Angeles", value: "America/Los_Angeles" },
    { label: "Europe/London", value: "Europe/London" },
    { label: "Asia/Kolkata", value: "Asia/Kolkata" },
  ];


export function displayTimeInTimezone(utcDateString: string, timezone: string, formatStr: string = 'PPpp') {
  return formatInTimeZone(utcDateString, timezone, formatStr);
}

export function displayTimeInBusinessTimezone(utcDateString: string, formatStr: string = 'PPpp') {
  return formatInTimeZone(utcDateString, BUSINESS_TIMEZONE, formatStr);
}


export const sampleOrders = [
  {
    id: 1,
    deliveryTime: '2025-10-24T15:00:00Z', // 3:00 PM UTC
    paymentDeadline: '2025-10-23T12:00:00Z', // 12:00 PM UTC
    product: 'MacBook Pro',
  },
  {
    id: 2,
    deliveryTime: '2025-10-25T18:00:00Z', // 6:00 PM UTC
    paymentDeadline: '2025-10-24T15:00:00Z', // 3:00 PM UTC
    product: 'Smartphone',
  },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}