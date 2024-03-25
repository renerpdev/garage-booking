"use client"
import React from "react"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useCalendar, useLocale } from "react-aria"
import { CalendarStateOptions, useCalendarState } from "react-stately"
import { CalendarDate, createCalendar } from "@internationalized/date"
import { CalendarFooter } from "@/components/ui/calendar/BookingCalendarFooter"
import { CalendarGrid } from "@/components/ui/calendar/BookingCalendarGrid"
import { CalendarHeader } from "@/components/ui/calendar/BookingCalendarHeader"

// TODO: get more inspiration from https://tailwindui.com/components/application-ui/application-shells/calendar

interface BookingCalendarProps extends Partial<CalendarStateOptions> {
  currentDate?: Date
}
export const BookingCalendar = ({ currentDate = new Date(), ...props }: BookingCalendarProps) => {
  let { locale } = useLocale()
  let state = useCalendarState({
    minValue: new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()),
    ...props,
    locale,
    createCalendar
  })

  let { calendarProps } = useCalendar(props, state)

  return (
    <div className="lg:flex lg:h-full lg:flex-col rounded-lg bg-gray-50 overflow-hidden" {...calendarProps}>
      {/* Here goes the calendar title and action buttons */}
      <CalendarHeader state={state} {...props} />
      {/* Here goes the whole calendar grid */}
      <CalendarGrid state={state} />
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
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
                    <HoverCardContent className={"w-80"}>{/*<BookingInfo />*/}</HoverCardContent>
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
        </div>
      </div>
      {/* Here goes the info for the selected day */}
      <CalendarFooter state={state} />
    </div>
  )
}
