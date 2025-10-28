"use client";

import { useState } from "react";
import {
  sampleOrders,
  displayTimeInTimezone,
  displayTimeInBusinessTimezone,
  getUserTimezone,
  TIMEZONES,
  BUSINESS_TIMEZONE,
  getTimezoneLabel,
} from "@/lib/utils";

type ViewMode = "before" | "after";

export default function TimeDisplaySystem() {
  const [currentOrder] = useState(sampleOrders[0]);
  const [selectedTimezone, setSelectedTimezone] = useState(getUserTimezone());
  const [viewMode, setViewMode] = useState<ViewMode>("before");

  const userTimezone = getUserTimezone();

  // Calculate times based on current selection
  const deliveryTimeBefore = displayTimeInTimezone(
    currentOrder.deliveryTime,
    selectedTimezone
  );
  const paymentTimeBefore = displayTimeInTimezone(
    currentOrder.paymentDeadline,
    selectedTimezone
  );

  const deliveryTimeAfter = displayTimeInBusinessTimezone(
    currentOrder.deliveryTime
  );
  const paymentTimeAfter = displayTimeInBusinessTimezone(
    currentOrder.paymentDeadline
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Consistent Time Display System
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your actual timezone:{" "}
          <span className="font-semibold">
            {getTimezoneLabel(userTimezone)}
          </span>
        </p>

        {/* Timezone Selector & View Mode Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border">
          <div className="grid md:grid-cols-2 gap-6">
            {/* View Mode Tabs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                View Mode
              </label>
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setViewMode("before")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "before"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  🚨 Before Fix
                </button>
                <button
                  onClick={() => setViewMode("after")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "after"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ✅ After Fix
                </button>
              </div>
            </div>

            {/* Timezone Selector (only show in "before" mode) */}
            {viewMode === "before" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Simulate User Timezone
                </label>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Select different timezones to see how times change
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Delivery Page Simulation */}
          <div
            className={`bg-white rounded-lg shadow-md p-6 border-2 ${
              viewMode === "before" ? "border-red-200" : "border-green-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                📦 Delivery Page
              </h2>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  viewMode === "before"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {viewMode === "before" ? "Inconsistent" : "Consistent"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-semibold">{currentOrder.product}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Delivery Time</p>
                <p
                  className={`text-lg font-bold ${
                    viewMode === "before" ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {viewMode === "before"
                    ? deliveryTimeBefore
                    : deliveryTimeAfter}
                </p>
                {viewMode === "before" ? (
                  <p className="text-xs text-gray-500 mt-1">
                    Displayed in: {getTimezoneLabel(selectedTimezone)}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Always shows: {getTimezoneLabel(BUSINESS_TIMEZONE)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Page Simulation */}
          <div
            className={`bg-white rounded-lg shadow-md p-6 border-2 ${
              viewMode === "before" ? "border-red-200" : "border-green-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                💳 Payment Page
              </h2>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  viewMode === "before"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {viewMode === "before" ? "Inconsistent" : "Consistent"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-semibold">{currentOrder.product}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Payment Deadline</p>
                <p
                  className={`text-lg font-bold ${
                    viewMode === "before" ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {viewMode === "before" ? paymentTimeBefore : paymentTimeAfter}
                </p>
                {viewMode === "before" ? (
                  <p className="text-xs text-gray-500 mt-1">
                    Displayed in: {getTimezoneLabel(selectedTimezone)}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Always shows: {getTimezoneLabel(BUSINESS_TIMEZONE)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div
          className={`mt-8 rounded-lg p-6 ${
            viewMode === "before"
              ? "bg-red-50 border border-red-200"
              : "bg-green-50 border border-green-200"
          }`}
        >
          <div className="flex items-start">
            <span
              className={`text-2xl mr-3 ${
                viewMode === "before" ? "text-red-500" : "text-green-500"
              }`}
            >
              {viewMode === "before" ? "🚨" : "✅"}
            </span>
            <div>
              <h3
                className={`font-semibold ${
                  viewMode === "before" ? "text-red-800" : "text-green-800"
                }`}
              >
                {viewMode === "before"
                  ? "Problem: Inconsistent Times"
                  : "Solution: Consistent Times"}
              </h3>
              <p
                className={`mt-1 text-sm ${
                  viewMode === "before" ? "text-red-700" : "text-green-700"
                }`}
              >
                {viewMode === "before"
                  ? `Times change based on selected timezone (${getTimezoneLabel(
                      selectedTimezone
                    )}). Users in different locations see different delivery and payment times!`
                  : `Times always display in business timezone (${getTimezoneLabel(
                      BUSINESS_TIMEZONE
                    )}). All users see the same times regardless of their location!`}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Time Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-blue-900">
                    Event
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-blue-900">
                    UTC Time
                  </th>
                  {TIMEZONES.map((tz) => (
                    <th
                      key={tz.value}
                      className="px-4 py-2 text-left text-sm font-medium text-blue-900"
                    >
                      {tz.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 text-sm font-medium">
                    Delivery Time
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    2025-10-24 15:00:00
                  </td>
                  {TIMEZONES.map((tz) => (
                    <td key={tz.value} className="px-4 py-3 text-sm">
                      {displayTimeInTimezone(
                        currentOrder.deliveryTime,
                        tz.value,
                        "PP p"
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium">
                    Payment Deadline
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    2025-10-23 12:00:00
                  </td>
                  {TIMEZONES.map((tz) => (
                    <td key={tz.value} className="px-4 py-3 text-sm">
                      {displayTimeInTimezone(
                        currentOrder.paymentDeadline,
                        tz.value,
                        "PP p"
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
