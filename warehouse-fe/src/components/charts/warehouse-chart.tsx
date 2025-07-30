"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdRefresh, MdDownload, MdInventory } from 'react-icons/md';

const WarehouseChart = () => {
  const categoryData = [
    { name: "Electronics", quantity: 580, color: "#3b82f6" },
    { name: "Clothing", quantity: 720, color: "#10b981" },
    { name: "Furniture", quantity: 420, color: "#f59e0b" },
    { name: "Books", quantity: 650, color: "#ef4444" },
    { name: "Others", quantity: 477, color: "#8b5cf6" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MdInventory className="w-5 h-5" />
              Product Categories
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <MdRefresh className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MdDownload className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center h-48">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                      #3b82f6 0% 25%,
                      #10b981 25% 56%,
                      #f59e0b 56% 74%,
                      #ef4444 74% 88%,
                      #8b5cf6 88% 100%
                    )`
                  }}
                ></div>
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                  <span className="text-sm font-bold">2,847</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Warehouse A</span>
                <span className="text-sm text-muted-foreground">850 / 1000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Warehouse B</span>
                <span className="text-sm text-muted-foreground">720 / 900</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Warehouse C</span>
                <span className="text-sm text-muted-foreground">650 / 800</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "81%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarehouseChart;
