'use client';

import type { Order, OrderItem } from './types';
import { type DateRange } from 'react-day-picker';
import { addDays, differenceInDays, endOfDay, setHours, setMinutes, setSeconds, subDays } from 'date-fns';

export const generateMockOrders = (count: number, dateRange?: DateRange): Order[] => {
  const { from = subDays(new Date(), 29), to = new Date() } = dateRange || {};
  const dateDiff = Math.abs(differenceInDays(to, from));

  const statuses: Order['orderStatus'][] = [
    'Completed',
    'Open',
    'Draft',
    'Cancelled',
    'Refunded',
    'Paid',
  ];
  const branches: Order['branch'][] = ['Ras Al Khaimah', 'Dubai Mall'];
  const staffNames = ['Alex', 'Maria', 'John', 'Sarah', 'David', 'Frank M.'];
  const customerNames = ['Alice', 'Bob O.', 'Charlie H.', 'Diana P.', 'Eve S.', 'Frank M.', 'Grace', 'Henry'];
  const comments = [
    'Customer requested extra napkins.',
    'Allergy alert: No nuts.',
    'Birthday celebration at the table.',
    null,
    'Guest is in a hurry.',
  ];

  const menuItems = [
    { id: '1', name: 'Classic Pancakes', price: 12.5, category: 'Breakfast' },
    { id: '2', name: 'Orange Juice', price: 5.0, category: 'Beverages' },
    { id: '3', name: 'Espresso', price: 3.5, category: 'Beverages' },
    { id: '4', name: 'Avocado Toast', price: 15.0, category: 'Breakfast' },
    { id: '5', name: 'Latte', price: 5.5, category: 'Beverages' },
    { id: '6', name: 'Ribeye Steak', price: 45.0, category: 'Mains' },
    { id: '7', name: 'Margherita Pizza', price: 20.0, category: 'Mains' },
    { id: '8', name: 'Cheesecake', price: 8.9, category: 'Desserts' },
  ];

  const orders: Order[] = [];
  for (let i = 0; i < count; i++) {
    const randomDayOffset = Math.floor(Math.random() * (dateDiff + 1));
    let randomDate = subDays(endOfDay(to), randomDayOffset);
    randomDate = setHours(randomDate, Math.floor(Math.random() * 24));
    randomDate = setMinutes(randomDate, Math.floor(Math.random() * 60));
    randomDate = setSeconds(randomDate, Math.floor(Math.random() * 60));

    if (
      randomDate.getTime() < from.getTime() ||
      randomDate.getTime() > endOfDay(to).getTime()
    ) {
      continue;
    }
    const orderTimestamp = randomDate.getTime();

    const orderStatus = statuses[i % statuses.length];
    const orderType = i % 2 === 0 ? 'Post-Paid' : 'Prepaid';
    
    const orderItemsCount = Math.floor(Math.random() * 3) + 1;
    const currentItems: OrderItem[] = Array.from({ length: orderItemsCount }, (_, j) => {
      const item = menuItems[Math.floor(Math.random() * menuItems.length)];
      return {
        id: `${item.id}-${i}-${j}`,
        name: item.name,
        quantity: Math.floor(Math.random() * 2) + 1,
        price: item.price,
        category: item.category,
      };
    });
    
    const totalAmount = currentItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    let paymentState: Order['paymentState'] = 'Unpaid';
    let paidAmount = 0;
    const payments: Order['payments'] = [];
    let splitType: Order['splitType'] | undefined = undefined;

    if (orderStatus === 'Completed' || orderStatus === 'Paid') {
      paymentState = 'Fully Paid';
      paidAmount = totalAmount;
    } else if (orderStatus === 'Cancelled') {
      paymentState = 'Voided';
    } else if (orderStatus === 'Refunded') {
      paymentState = 'Returned';
      paidAmount = totalAmount;
    } else if (orderStatus === 'Open') {
      const rand = Math.random();
      if (rand < 0.6) { // 60% chance of being partially paid
          paymentState = 'Partial';
          paidAmount = totalAmount * (Math.random() * 0.5 + 0.2);
          splitType = i % 2 === 0 ? 'equally' : 'byItem';
      } else { // 40% chance of being unpaid
          paymentState = 'Unpaid';
      }
    } else if (orderStatus === 'Draft') {
      paymentState = 'Unpaid';
    }
    
    if (paidAmount > 0) {
        payments.push({
            method: orderType === 'Post-Paid' ? 'Credit Card' : (i % 3 === 0 ? 'Cash' : 'Credit Card'),
            amount: paidAmount.toFixed(2),
            date: new Date(orderTimestamp + 120000).toLocaleString(),
            transactionId: `txn_${12345 + i}`,
            guestName: 'Guest 1',
        });
    }

    const orderDate = new Date(orderTimestamp);
    const customerName = customerNames[i % customerNames.length];
    const hasCustomer = i % 4 !== 0;

    orders.push({
      orderId: `#${3210 + i}`,
      branch: branches[i % branches.length],
      table: `T${(i % 12) + 1}`,
      orderType,
      orderStatus,
      paymentState,
      totalAmount,
      paidAmount,
      items: currentItems,
      orderDate: orderDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      orderTimestamp,
      payments,
      splitType,
      customer: hasCustomer
        ? {
            name: customerName,
            email: `${customerName.toLowerCase().replace(/ /g, '.').replace(/[^\w.]/g, '')}@example.com`,
            phone: `555-01${String(i).padStart(2, '0')}`,
            avatar: `https://i.pravatar.cc/40?u=${customerName}`
          }
        : undefined,
      staffName: staffNames[i % staffNames.length],
      orderComments: comments[i % comments.length] || undefined,
    });
  }
  return orders;
};
