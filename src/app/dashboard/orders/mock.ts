'use client';

import type { Order } from './types';

export const generateMockOrders = (count: number): Order[] => {
  const statuses: Order['orderStatus'][] = [
    'Paid',
    'Open',
    'Draft',
    'Cancelled',
    'Refunded',
  ];
  const paymentStates: Order['paymentState'][] = [
    'Fully Paid',
    'Partial',
    'Unpaid',
  ];
  const branches: Order['branch'][] = ['Ras Al Khaimah', 'Dubai Mall'];
  const names = [
    'Liam Smith',
    'Olivia Johnson',
    'Noah Williams',
    'Emma Brown',
    'Oliver Jones',
    'Ava Garcia',
    'Elijah Miller',
    'Charlotte Davis',
    'William Rodriguez',
    'Sophia Martinez',
  ];
  const menuItems = [
    { id: '1', name: 'Classic Pancakes', price: 12.5 },
    { id: '2', name: 'Orange Juice', price: 5.0 },
    { id: '3', name: 'Espresso', price: 3.5 },
    { id: '4', name: 'Avocado Toast', price: 15.0 },
    { id: '5', name: 'Latte', price: 5.5 },
    { id: '6', name: 'Ribeye Steak', price: 45.0 },
    { id: '7', name: 'Margherita Pizza', price: 20.0 },
    { id: '8', name: 'Cheesecake', price: 8.9 },
  ];

  const orders: Order[] = [];
  for (let i = 0; i < count; i++) {
    const orderStatus = statuses[i % statuses.length];

    let paymentState = paymentStates[i % paymentStates.length];
    if (orderStatus === 'Paid') paymentState = 'Fully Paid';
    if (
      orderStatus === 'Cancelled' ||
      orderStatus === 'Draft' ||
      orderStatus === 'Refunded'
    )
      paymentState = 'Unpaid';
    if (orderStatus === 'Open' && paymentState === 'Fully Paid')
      paymentState = 'Partial';

    const orderItemsCount = Math.floor(Math.random() * 3) + 1;
    const currentItems = Array.from({ length: orderItemsCount }, (_, j) => {
      const item = menuItems[Math.floor(Math.random() * menuItems.length)];
      return {
        ...item,
        id: `${item.id}-${i}-${j}`,
        quantity: Math.floor(Math.random() * 2) + 1,
      };
    });

    const totalAmount = currentItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    let paidAmount = 0;
    const payments: Order['payments'] = [];

    if (paymentState === 'Fully Paid') {
      paidAmount = totalAmount;
       payments.push({
        method: 'Credit Card',
        amount: paidAmount.toFixed(2),
        date: new Date(Date.now() - i * 3600000 + 120000).toLocaleString(),
        transactionId: `txn_${12345 + i}`,
        guestName: 'Guest 1',
      });
    } else if (paymentState === 'Partial') {
      const numSplits = Math.floor(Math.random() * 2) + 2; // 2 or 3 splits
      let totalPaid = totalAmount * (Math.random() * 0.5 + 0.2); // Pay 20% to 70%
      paidAmount = totalPaid;
      let remainingToDistribute = totalPaid;

      for (let j = 0; j < numSplits; j++) {
        let splitAmount: number;
        if (j === numSplits - 1) {
          splitAmount = remainingToDistribute;
        } else {
          splitAmount = remainingToDistribute / (numSplits - j) * (Math.random() * 0.5 + 0.5);
        }
        
        splitAmount = Math.max(0, splitAmount);
        remainingToDistribute -= splitAmount;

        if (splitAmount > 0.01) {
          payments.push({
            method: j % 2 === 0 ? 'Credit Card' : 'Cash',
            amount: splitAmount.toFixed(2),
            date: new Date(Date.now() - i * 3600000 + 120000 + j * 10000).toLocaleString(),
            transactionId: `txn_${12345 + i}_${j}`,
            guestName: `Guest ${j + 1}`,
          });
        }
      }
      // Due to floating point math, ensure paidAmount is the sum of actual splits
      paidAmount = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    }
    
    if (orderStatus === 'Refunded') {
      paidAmount = totalAmount;
    }

    const orderTimestamp = Date.now() - i * 3600000;
    const orderDate = new Date(orderTimestamp);

    let customerName = 'Guest';
    let customerEmail = '—';
    let customerAvatar = '';

    // Majority of orders will be from Guests
    if (i % 5 !== 0) {
      // Guest order
    } else {
      const assignedName = names[Math.floor(i / 5) % names.length];
      customerName = assignedName;
      customerEmail = `${assignedName
        .toLowerCase()
        .replace(' ', '.')}@example.com`;
      customerAvatar = `https://picsum.photos/seed/${assignedName
        .split(' ')[0]
        .toLowerCase()}/100/100`;
    }

    orders.push({
      orderId: `#${3210 + i}`,
      branch: branches[i % branches.length],
      table: `T${(i % 24) + 1}`,
      orderType: i % 2 === 0 ? 'Post-Paid' : 'Prepaid',
      orderStatus,
      paymentState,
      totalAmount,
      paidAmount,
      customerName,
      customerEmail,
      customerAvatar,
      orderDate: orderDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      orderTimestamp,
      items: currentItems,
      payments,
    });
  }
  return orders;
};
