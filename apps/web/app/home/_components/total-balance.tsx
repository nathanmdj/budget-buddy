'use client';

import React, { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Card, CardContent } from '@kit/ui/card';

import { formatCurrency } from '~/lib/utils';

const TotalBalance = ({ totalBalance }: { totalBalance: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const displayValue = isVisible ? formatCurrency(totalBalance) : '********';

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="flex items-center justify-between p-4">
        <h2 className="font-semibold">Total Balance</h2>
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">{displayValue}</p>

          <span onClick={toggleVisibility} className="cursor-pointer p-2">
            {isVisible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalBalance;
