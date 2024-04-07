"use client"
import { VercelToolbar } from "@vercel/toolbar/next"
// import { useIsEmployee } from 'lib/auth'; // Your auth library

const isDev = process.env.NODE_ENV === "development"

export function Toolbar() {
  // TODO: bring back when auth is ready
  // const isEmployee = useIsEmployee();
  // return isEmployee ? <VercelToolbar /> : null;
  return isDev ? <VercelToolbar /> : null
}
