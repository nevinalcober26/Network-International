'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Crown, Check, User, Mail, Smartphone, ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface VipClubSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const benefits = [
  'Unlock exclusive restaurant deals',
  'Get special offers instantly',
  'Receive VIP dining discounts',
  'Grab exclusive vouchers fast',
];

export function VipClubSheet({ isOpen, onOpenChange }: VipClubSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full max-w-md mx-auto p-0 rounded-t-3xl border-0 bg-transparent flex flex-col max-h-[95vh]"
      >
        <div className="relative flex-1 flex flex-col bg-[#F7F9FB] rounded-t-3xl overflow-hidden">
          {/* Header */}
          <SheetHeader className="p-4 flex flex-row items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10 shrink-0">
            <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-teal-600" />
                <SheetTitle className="text-base font-bold text-teal-600">VIP Club</SheetTitle>
            </div>
            <SheetClose asChild>
                <Button variant="link" className="text-gray-500 font-semibold p-0 h-auto">Not for now</Button>
            </SheetClose>
          </SheetHeader>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop"
                alt="Salad bowl"
                fill
                className="object-cover"
                data-ai-hint="salad bowl"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative bg-[#F7F9FB] rounded-t-3xl -mt-8 p-6 pt-0">
                <div className="relative bg-white rounded-3xl p-6 shadow-lg -mt-20">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center border-4 border-white">
                        <Crown className="h-6 w-6 text-white" />
                    </div>

                    <div className="text-center pt-8 space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Save Before You Pay</h2>
                        <p className="text-sm text-gray-600 max-w-xs mx-auto">
                        Join our <span className="font-bold">VIP circle</span> for member-only deals on this order and future visits.
                        </p>
                    </div>

                    <ul className="space-y-3 mt-6 text-left">
                        {benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
                                </div>
                                <span className="text-sm text-gray-700">{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    <form className="space-y-4 mt-8">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input id="full-name" placeholder="Full Name" className="h-14 pl-12 rounded-xl bg-gray-50 border-gray-200" />
                        </div>
                         <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input id="email" type="email" placeholder="Email Address" className="h-14 pl-12 rounded-xl bg-gray-50 border-gray-200" />
                        </div>
                         <div className="relative">
                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input id="phone" type="tel" placeholder="Phone Number (Optional)" className="h-14 pl-12 rounded-xl bg-gray-50 border-gray-200" />
                        </div>
                    </form>
                </div>
            </div>
             <div className="px-6 pb-6 text-center">
                <Button variant="link" className="text-gray-500 font-semibold">Not for now</Button>
            </div>
          </div>
            
          {/* Footer Button */}
          <SheetFooter className="p-4 bg-white border-t border-gray-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] w-full shrink-0">
            <Button className="w-full h-14 rounded-2xl text-lg font-bold bg-teal-500 hover:bg-teal-600 shadow-lg shadow-teal-500/20">
              Sign Me Up For Exclusive Deals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
