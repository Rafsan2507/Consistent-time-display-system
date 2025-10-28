"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Clock, Calendar } from "lucide-react";
import {
  sampleOrders,
  displayTimeInTimezone,
  displayTimeInBusinessTimezone,
  timezoneData,
} from "@/lib/utils";

type Props = {};

const Delivery = (props: Props) => {
  const [status, setStatus] = useState("before");

  return (
    <div className="min-h-[100vh] bg-violet-50 py-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-4 border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              Delivery Time
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Product
                </h3>
                <p className="text-xl font-bold text-blue-600">MacBook Pro</p>
              </div>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Date and Time in UTC : {sampleOrders[0].deliveryTime}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Tabs value={status} onValueChange={setStatus} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="before" className="flex items-center gap-2">
              Before Fix
            </TabsTrigger>
            <TabsTrigger value="after" className="flex items-center gap-2">
              After Fix
            </TabsTrigger>
          </TabsList>

          {/* Before Fix */}
          <TabsContent value="before">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                  Delivery in Multiple Timezone - Inconsistent
                </CardTitle>
                <CardDescription>
                  Uses System's Timezone
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {timezoneData.map((tz) => (
                    <div
                      key={tz.value}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-slate-700">
                          {tz.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-slate-800">
                          {displayTimeInTimezone(
                            sampleOrders[0].deliveryTime,
                            tz.value
                          )}
                        </div>
                        <div className="text-xs text-red-600 mt-1">
                            System Time - {tz.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* After Fix */}
          <TabsContent value="after">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                  Delivery in Business Timezone - Consistent
                </CardTitle>
                <CardDescription>
                  Uses Central Timezone - America/Chicago
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  {timezoneData.map((tz) => (
                    <div
                      key={tz.value}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-slate-700">
                          {tz.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-slate-800">
                          {displayTimeInBusinessTimezone(
                            sampleOrders[0].deliveryTime
                          )}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                            Central Time - America/Chicago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Delivery;
