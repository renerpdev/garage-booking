"use client"
import React from "react"
import { CalendarCheck, CalendarFold, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import BookingInfo from "@/components/core/BookingInfo"

// TODO: get more inspiration from https://tailwindui.com/components/application-ui/application-shells/calendar
const Calendar = () => {
  return (
    <div className="lg:flex lg:h-full lg:flex-col rounded-lg bg-gray-50 overflow-hidden">
      {/* Here goes the calendar title and action buttons */}
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-black">
          <time dateTime="2022-01">January 2022</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
              <span className="sr-only">Previous month</span>
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-primary focus:relative md:block">
              Hoy
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
              <span className="sr-only">Next month</span>
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="hidden md:flex md:items-center">
            <div className="ml-6 h-6 w-px bg-gray-300"></div>
            <Link
              href={"/"}
              className="ml-6 rounded-md bg-primary text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              <Button className={"flex gap-1 items-center"}>
                <CalendarCheck size={16} /> Reservar
              </Button>
            </Link>
          </div>
          <div className="relative ml-6 md:hidden">
            <button
              type="button"
              className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
              id="menu-0-button"
              aria-expanded="false"
              aria-haspopup="true">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={18} />
            </button>

            <div
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-0-button"
              tabIndex={-1}>
              <div className="py-1" role="none">
                <Link
                  href="/"
                  className="text-gray-700 px-4 py-2 text-sm gap-2 flex items-center hover:text-primary"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-0-item-0">
                  <CalendarCheck size={14} /> Reservar
                </Link>
              </div>
              <div className="py-1" role="none">
                <button
                  onClick={() => {}}
                  className="text-gray-700 px-4 py-2 text-sm gap-2 flex items-center hover:text-primary"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-0-item-0">
                  <CalendarFold size={14} /> Fecha hoy
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Here goes the whole calendar grid */}
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="flex justify-center bg-white py-2">
            <span>M</span>
            <span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>T</span>
            <span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>W</span>
            <span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>T</span>
            <span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>F</span>
            <span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2021-12-27">27</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2021-12-28">28</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2021-12-29">29</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2021-12-30">30</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2021-12-31">31</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-01">1</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-01">2</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-03">3</time>
              <ol className="mt-2">
                <li>
                  <a href="#" className="group flex">
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">
                      Design review
                    </p>
                    <time
                      dateTime="2022-01-03T10:00"
                      className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                      10AM
                    </time>
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex">
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">
                      Sales meeting
                    </p>
                    <time
                      dateTime="2022-01-03T14:00"
                      className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                      2PM
                    </time>
                  </a>
                </li>
              </ol>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-04">4</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-05">5</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-06">6</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-07">7</time>
              <ol className="mt-2">
                <li>
                  <a href="#" className="group flex">
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">Date night</p>
                    <time
                      dateTime="2022-01-08T18:00"
                      className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                      6PM
                    </time>
                  </a>
                </li>
              </ol>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-08">8</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-09">9</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-10">10</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-11">11</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time
                dateTime="2022-01-12"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-semibold text-white">
                12
              </time>
              <ol className="mt-2">
                <li>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a href="#" className="group flex">
                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">
                          Sam birthday party
                        </p>
                        <time
                          dateTime="2022-01-25T14:00"
                          className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                          2PM
                        </time>
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className={"w-80"}>
                      <BookingInfo />
                    </HoverCardContent>
                  </HoverCard>
                </li>
              </ol>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-13">13</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-14">14</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-15">15</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-16">16</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-17">17</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-18">18</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-19">19</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-20">20</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-21">21</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-22">22</time>
              <ol className="mt-2">
                <li>
                  <a href="#" className="group flex">
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">
                      Maple syrup museum
                    </p>
                    <time
                      dateTime="2022-01-22T15:00"
                      className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                      3PM
                    </time>
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex">
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">Hockey game</p>
                    <time
                      dateTime="2022-01-22T19:00"
                      className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                      7PM
                    </time>
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex">
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">Hockey game</p>
                    <time
                      dateTime="2022-01-22T19:00"
                      className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                      7PM
                    </time>
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex">
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">Hockey game</p>
                    <time
                      dateTime="2022-01-22T19:00"
                      className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                      7PM
                    </time>
                  </a>
                </li>
              </ol>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-23">23</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-24">24</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-25">25</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-26">26</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-27">27</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-28">28</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-29">29</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-30">30</time>
            </div>
            <div className="relative bg-white px-3 py-2">
              <time dateTime="2022-01-31">31</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2022-02-01">1</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2022-02-02">2</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2022-02-03">3</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2022-02-04">4</time>
              <ol className="mt-2">
                <li>
                  <a href="#" className="group flex">
                    <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-primary">
                      Cinema with friends
                    </p>
                    <time
                      dateTime="2022-02-04T21:00"
                      className="ml-3 hidden flex-none text-gray-500 group-hover:text-primary xl:block">
                      9PM
                    </time>
                  </a>
                </li>
              </ol>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2022-02-05">5</time>
            </div>
            <div className="relative bg-gray-50 px-3 py-2 text-gray-500">
              <time dateTime="2022-02-06">6</time>
            </div>
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2021-12-27" className="ml-auto">
                27
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2021-12-28" className="ml-auto">
                28
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2021-12-29" className="ml-auto">
                29
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2021-12-30" className="ml-auto">
                30
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2021-12-31" className="ml-auto">
                31
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-01" className="ml-auto">
                1
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-02" className="ml-auto">
                2
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-03" className="ml-auto">
                3
              </time>
              <span className="sr-only">2 events</span>
              <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
              </span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-04" className="ml-auto">
                4
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-05" className="ml-auto">
                5
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-06" className="ml-auto">
                6
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-07" className="ml-auto">
                7
              </time>
              <span className="sr-only">1 event</span>
              <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
              </span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-08" className="ml-auto">
                8
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-09" className="ml-auto">
                9
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-10" className="ml-auto">
                10
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-11" className="ml-auto">
                11
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-primary hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-12" className="ml-auto">
                12
              </time>
              <span className="sr-only">1 event</span>
              <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
              </span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-13" className="ml-auto">
                13
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-14" className="ml-auto">
                14
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-15" className="ml-auto">
                15
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-16" className="ml-auto">
                16
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-17" className="ml-auto">
                17
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-18" className="ml-auto">
                18
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-19" className="ml-auto">
                19
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-20" className="ml-auto">
                20
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-21" className="ml-auto">
                21
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-white hover:bg-gray-100 focus:z-10">
              <time
                dateTime="2022-01-22"
                className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900">
                22
              </time>
              <span className="sr-only">2 events</span>
              <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
              </span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-23" className="ml-auto">
                23
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-24" className="ml-auto">
                24
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-25" className="ml-auto">
                25
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-26" className="ml-auto">
                26
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-27" className="ml-auto">
                27
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-28" className="ml-auto">
                28
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-29" className="ml-auto">
                29
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-30" className="ml-auto">
                30
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-01-31" className="ml-auto">
                31
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-02-01" className="ml-auto">
                1
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-02-02" className="ml-auto">
                2
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-02-03" className="ml-auto">
                3
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-02-04" className="ml-auto">
                4
              </time>
              <span className="sr-only">1 event</span>
              <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                <span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
              </span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-02-05" className="ml-auto">
                5
              </time>
              <span className="sr-only">0 events</span>
            </button>
            <button
              type="button"
              className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
              <time dateTime="2022-02-06" className="ml-auto">
                6
              </time>
              <span className="sr-only">0 events</span>
            </button>
          </div>
        </div>
      </div>
      {/* Here goes the info for the selected day */}
      <div className={"px-4 py-6 lg:hidden"} tabIndex={-1}>
        <ul className="bg-white shadow rounded-lg overflow-hidden" tabIndex={-1}>
          <li className={"ring-1 ring-gray-100 first:ring-0 hover:bg-gray-50"} tabIndex={-1}>
            <div className={"px-4 py-4 flex flex-col w-full"}>
              <BookingInfo />
            </div>
          </li>
          <li className={"ring-1 ring-gray-100 first:ring-0 hover:bg-gray-50"} tabIndex={-1}>
            <div className={"px-4 py-4 flex w-full"}>
              <BookingInfo />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Calendar
