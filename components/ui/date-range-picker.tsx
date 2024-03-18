import React from "react"
import { FormControl } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Get inspiration from https://preline.co/docs/datepicker.html#ranges-with-time

const MONTHS = [
  { label: "January", value: 0 },
  { label: "February", value: 1 },
  { label: "March", value: 2 },
  { label: "April", value: 3 },
  { label: "May", value: 4 },
  { label: "June", value: 5 },
  { label: "July", value: 6 },
  { label: "August", value: 7 },
  { label: "September", value: 8 },
  { label: "October", value: 9 },
  { label: "November", value: 10 },
  { label: "December", value: 11 }
]

const YEARS = [2022, 2023, 2024]

const HOURS = Array.from({ length: 24 }, (_, i) => i).map((value) => ({
  label: `${value < 10 ? "0" : ""}${value}`,
  value
}))

const MINUTES = Array.from({ length: 60 }, (_, i) => i).map((value) => ({
  label: `${value < 10 ? "0" : ""}${value}`,
  value
}))

const MERIDIAN = ["AM", "PM"]

function DateRangePicker() {
  return (
    <>
      {/* Datepicker */}
      <div className="w-80 md:w-[40.4rem] flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden dark:bg-slate-900 dark:border-gray-700">
        <div className="p-3 grid md:flex gap-8">
          {/* Calendar */}
          <div>
            <div className="space-y-0.5">
              {/* Months */}
              <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                {/* Prev Button */}
                <div className="col-span-1">
                  <button
                    type="button"
                    className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                </div>
                {/* End Prev Button */}
                {/* Month / Year */}
                <div className="col-span-3 flex justify-center items-center gap-x-1">
                  <Select onValueChange={console.log} defaultValue={`${MONTHS[0].value}`}>
                    <FormControl>
                      <SelectTrigger className="w-fit py-0 px-2 font-semibold border-none *:hidden">
                        <SelectValue placeholder="Opciones rápidas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MONTHS.map((option) => (
                        <SelectItem key={option.value} value={`${option.value}`}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-gray-800 dark:text-gray-200">/</span>
                  <Select onValueChange={console.log} defaultValue={`${YEARS[0]}`}>
                    <FormControl>
                      <SelectTrigger className="w-fit py-0 px-2 font-semibold border-none *:hidden">
                        <SelectValue placeholder="Opciones rápidas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YEARS.map((option) => (
                        <SelectItem key={option} value={`${option}`}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* End Month / Year */}
                {/* Next Button */}
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    className="opacity-0 size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <svg
                      className="flex-shrink-0 size-4"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
                {/* End Next Button */}
              </div>
              {/* Months */}
              {/* Weeks */}
              <div className="flex pb-1.5">
                <span className="m-px w-10 block text-center text-sm text-gray-500">Mo</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Tu</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">We</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Th</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Fr</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Sa</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Su</span>
              </div>
              {/* Weeks */}
              {/* Days */}
              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    26
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    27
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    28
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    29
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    30
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    1
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    2
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    3
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    4
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    5
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    6
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    7
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    8
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    9
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    10
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-black text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    11
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    12
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    13
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    14
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    15
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    16
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    17
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    18
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    19
                  </button>
                </div>
                <div className={"bg-gray-100 rounded-s-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center bg-primary border border-transparent text-sm font-medium text-white hover:border-primary rounded-full dark:bg-primary disabled:text-gray-300 disabled:pointer-events-none dark:hover:border-gray-700">
                    20
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    21
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    22
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    23
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    24
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    25
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    26
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    27
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    28
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    29
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    30
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    31
                  </button>
                </div>
                <div className={"bg-gradient-to-r from-gray-100 dark:from-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    1
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    2
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    3
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    4
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    5
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    6
                  </button>
                </div>
              </div>
              {/* Days */}
            </div>
            {/* Time */}
            <div className="mt-3 flex justify-center items-center gap-x-2">
              {/* Select */}
              <Select onValueChange={console.log} defaultValue={`${HOURS[0].value}`}>
                <FormControl>
                  <SelectTrigger className="w-[60px] text-black">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {HOURS.map((option) => (
                    <SelectItem key={option.value} value={`${option.value}`}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* End Select */}
              <span className="text-gray-800 dark:text-white">:</span>
              {/* Select */}
              <Select onValueChange={console.log} defaultValue={`${MINUTES[0].value}`}>
                <FormControl>
                  <SelectTrigger className="w-[60px] text-black">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MINUTES.map((option) => (
                    <SelectItem key={option.value} value={`${option.value}`}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* End Select */}
              {/* Select */}
              <Select onValueChange={console.log} defaultValue={`${MERIDIAN[0]}`}>
                <FormControl>
                  <SelectTrigger className="w-[65px] text-black">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MERIDIAN.map((option) => (
                    <SelectItem key={option} value={`${option}`}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* End Select */}
            </div>
            {/* End Time */}
          </div>
          {/* End Calendar */}
          {/* Calendar */}
          <div>
            <div className="space-y-0.5">
              {/* Months */}
              <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                {/* Prev Button */}
                <div className="col-span-1">
                  <button
                    type="button"
                    className="opacity-0 size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                </div>
                {/* End Prev Button */}
                {/* Month / Year */}
                <div className="col-span-3 flex justify-center items-center gap-x-1">
                  <Select onValueChange={console.log} defaultValue={`${MONTHS[1].value}`}>
                    <FormControl>
                      <SelectTrigger className="w-fit py-0 px-2 font-semibold border-none *:hidden">
                        <SelectValue placeholder="Opciones rápidas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MONTHS.map((option) => (
                        <SelectItem key={option.value} value={`${option.value}`}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-gray-800 dark:text-gray-200">/</span>
                  <Select onValueChange={console.log} defaultValue={`${YEARS[0]}`}>
                    <FormControl>
                      <SelectTrigger className="w-fit py-0 px-2 font-semibold border-none *:hidden">
                        <SelectValue placeholder="Opciones rápidas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YEARS.map((option) => (
                        <SelectItem key={option} value={`${option}`}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* End Month / Year */}
                {/* Next Button */}
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <svg
                      className="flex-shrink-0 size-4"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
                {/* End Next Button */}
              </div>
              {/* Months */}
              {/* Weeks */}
              <div className="flex pb-1.5">
                <span className="m-px w-10 block text-center text-sm text-gray-500">Mo</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Tu</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">We</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Th</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Fr</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Sa</span>
                <span className="m-px w-10 block text-center text-sm text-gray-500">Su</span>
              </div>
              {/* Weeks */}
              {/* Days */}
              <div className="flex">
                <div className={"bg-gradient-to-l from-gray-100 dark:from-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    31
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    1
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    2
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    3
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    4
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    5
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    6
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    7
                  </button>
                </div>
                <div className={"bg-gray-100 first:rounded-s-full last:rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    8
                  </button>
                </div>
                <div className={"bg-gray-100 rounded-e-full dark:bg-gray-800"}>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center bg-primary border border-transparent text-sm font-medium text-white hover:border-primary rounded-full dark:bg-primary disabled:text-gray-300 disabled:pointer-events-none dark:hover:border-gray-700">
                    9
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    10
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    11
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    12
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    13
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    14
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    15
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    16
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    17
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    18
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    19
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    20
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    21
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    22
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    23
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    24
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    25
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    26
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    27
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    28
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    29
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    30
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600">
                    31
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    1
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    2
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    3
                  </button>
                </div>
              </div>
              {/* Days */}
              {/* Days */}
              <div className="flex">
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    4
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    5
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    6
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    7
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    8
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    9
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-gray-800 hover:border-primary hover:text-primary rounded-full disabled:text-gray-300 disabled:pointer-events-none dark:text-gray-200 dark:hover:border-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:disabled:text-gray-600"
                    disabled={true}>
                    10
                  </button>
                </div>
              </div>
              {/* Days */}
            </div>
            {/* Time */}
            <div className="mt-3 flex justify-center items-center gap-x-2">
              {/* Select */}
              <Select onValueChange={console.log} defaultValue={`${HOURS[HOURS.length - 1].value}`}>
                <FormControl>
                  <SelectTrigger className="w-[60px] text-black">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {HOURS.map((option) => (
                    <SelectItem key={option.value} value={`${option.value}`}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* End Select */}
              <span className="text-gray-800 dark:text-white">:</span>
              {/* Select */}
              <Select onValueChange={console.log} defaultValue={`${MINUTES[MINUTES.length - 1].value}`}>
                <FormControl>
                  <SelectTrigger className="w-[60px] text-black">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MINUTES.map((option) => (
                    <SelectItem key={option.value} value={`${option.value}`}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* End Select */}
              {/* Select */}
              <Select onValueChange={console.log} defaultValue={`${MERIDIAN[MERIDIAN.length - 1]}`}>
                <FormControl>
                  <SelectTrigger className="w-[65px] text-black">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MERIDIAN.map((option) => (
                    <SelectItem key={option} value={`${option}`}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* End Select */}
            </div>
            {/* End Time */}
          </div>
          {/* End Calendar */}
        </div>
        {/* Footer */}
        <div className="flex justify-center gap-2 p-3 border-t dark:border-gray-700">
          {/* Input Group */}
          <div className="flex justify-center md:justify-start items-center gap-x-2">
            <input
              type="text"
              className="p-2 block w-24 bg-gray-100 border-transparent rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              defaultValue="20/07/2023"
            />
            <span className="text-gray-800 dark:text-white">-</span>
            <input
              type="text"
              className="p-2 block w-24 bg-gray-100 border-transparent rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              defaultValue="10/08/2023"
            />
          </div>
        </div>
        {/* End Footer */}
      </div>
      {/* End Datepicker */}
    </>
  )
}

export default DateRangePicker
