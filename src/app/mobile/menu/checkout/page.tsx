'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const VisaIcon = () => (
  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.87 0H2.13C.95 0 0 .95 0 2.13v15.74C0 19.05.95 20 2.13 20h27.74c1.18 0 2.13-.95 2.13-2.13V2.13C32 .95 31.05 0 29.87 0z" fill="#1A1F71"/>
    <path d="m9.28 14.71-2.9-10.2H3.2l-2.9 10.2H3.5l1.05-3.37h2.6l.51 3.37h3.2zm-2.77-5.1-.81-2.52-.8 2.52h1.6zM13.2 4.51h2.53l1.58 6.78 1.47-6.78H21.3l-2.9 10.2h-3.1L13.2 4.51zM26.27 4.51h3.2v10.2h-3.2V4.51z" fill="#fff"/>
  </svg>
);

const MastercardIcon = () => (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 10a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="#EB001B"/>
    <path d="M11 10a5 5 0 1 0 10 0 5 5 0 0 0-10 0z" fill="#F79E1B"/>
    <path d="M16 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" fill="#FF5F00"/>
  </svg>
);

const NetworkLogo = () => (
  <svg width="102" height="33" viewBox="0 0 102 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2170_1952)">
      <path d="M26.1924 10.3669V10.791C26.1924 10.9497 26.1924 11.0824 26.1785 11.2151H15.7449C15.7587 11.7582 15.8794 12.2629 16.1209 12.7527C16.3624 13.2438 16.6592 13.6406 17.0491 13.999C17.439 14.3437 17.8829 14.6215 18.3935 14.8348C18.9042 15.0332 19.4424 15.1262 20.0071 15.1262C20.8951 15.1262 21.661 14.9278 22.32 14.5558C22.9652 14.1713 23.4632 13.6939 23.8393 13.1508L25.6679 14.5954C24.9548 15.5106 24.1487 16.1864 23.1802 16.6241C22.2395 17.0482 21.1629 17.2603 20.0071 17.2603C18.9985 17.2603 18.098 17.1016 17.2503 16.7692C16.4026 16.4381 15.677 15.9868 15.0582 15.3903C14.4532 14.8075 13.969 14.0907 13.6194 13.2562C13.2698 12.4204 13.0811 11.4929 13.0811 10.4723C13.0811 9.45175 13.2559 8.55024 13.5917 7.68841C13.9275 6.82659 14.4256 6.11108 15.0167 5.51462C15.6216 4.91816 16.3611 4.44075 17.1811 4.10966C18.015 3.77857 18.9155 3.6062 19.8575 3.6062C20.7995 3.6062 21.6861 3.76493 22.4797 4.06998C23.2733 4.37503 23.9449 4.82516 24.4694 5.40922C25.0202 5.99204 25.4378 6.69514 25.7333 7.53093C26.0566 8.4064 26.1899 9.33395 26.1899 10.3681L26.1924 10.3669ZM23.5437 9.33395C23.5299 8.83049 23.4494 8.33943 23.2884 7.8893C23.1274 7.43917 22.8985 7.05351 22.603 6.72242C22.3074 6.39133 21.9175 6.1396 21.4597 5.93996C21.0032 5.74155 20.4788 5.64855 19.86 5.64855C19.3091 5.64855 18.7708 5.74155 18.3005 5.93996C17.8024 6.13836 17.4 6.39009 17.0227 6.72242C16.673 7.05351 16.3775 7.43793 16.1348 7.8893C15.8933 8.33943 15.7587 8.81685 15.7449 9.33395H23.5437Z" fill="#0069B1"/>
      <path d="M52.479 4.00415L49.5071 13.9865L46.2938 4.00415H43.5508L40.3915 13.9865L37.3932 4.00415H34.5697L38.9527 16.9564H41.6554L44.8688 7.23818H44.9229L48.1627 16.9564H50.8792L55.222 4.00415H52.479Z" fill="#0069B1"/>
      <path d="M69.1258 10.4474C69.1258 11.4555 68.951 12.3694 68.5875 13.2052C68.2379 14.041 67.7134 14.7565 67.0946 15.379C66.4633 15.9755 65.7099 16.4665 64.8497 16.7976C63.9756 17.1287 63.0613 17.3011 62.0526 17.3011C61.044 17.3011 60.1158 17.1287 59.2555 16.7976C58.3815 16.4665 57.6419 15.9755 57.0106 15.379C56.3792 14.7826 55.8812 14.0398 55.5316 13.2052C55.1819 12.3694 54.9933 11.4555 54.9933 10.4474C54.9933 9.43923 55.1681 8.52532 55.5316 7.70317C55.8812 6.86739 56.3792 6.16553 57.0106 5.56907C57.6419 4.97261 58.3953 4.49519 59.2555 4.1641C60.1296 3.83301 61.044 3.66064 62.0526 3.66064C63.0613 3.66064 63.9894 3.83301 64.8497 4.1641C65.7238 4.49519 66.4633 4.95897 67.0946 5.56907C67.726 6.17917 68.2379 6.89467 68.5875 7.70317C68.951 8.53896 69.1258 9.45287 69.1258 10.4474ZM66.4092 10.4598C66.4092 9.83728 66.3149 9.25322 66.1137 8.69645C65.9124 8.12603 65.6433 7.64861 65.266 7.22452C64.8899 6.80043 64.4321 6.46933 63.8813 6.19033C63.3304 5.9386 62.7116 5.80591 62.0124 5.80591C61.3131 5.80591 60.6943 5.9386 60.1435 6.19033C59.5926 6.44205 59.1348 6.78679 58.7588 7.22452C58.3827 7.66225 58.1136 8.13967 57.9111 8.69645C57.7099 9.26687 57.6155 9.84968 57.6155 10.4598C57.6155 11.0699 57.7099 11.6663 57.9111 12.2231C58.1123 12.7799 58.3815 13.297 58.7588 13.7211C59.1348 14.1452 59.5926 14.5036 60.1435 14.7553C60.6943 15.007 61.3131 15.1397 62.0124 15.1397C62.7116 15.1397 63.3304 15.007 63.8813 14.7553C64.4321 14.5036 64.8899 14.1588 65.266 13.7211C65.642 13.297 65.9112 12.7935 66.1137 12.2231C66.3287 11.6663 66.4092 11.0835 66.4092 10.4598Z" fill="#0069B1"/>
      <path d="M81.7515 -0.000244141H79.1431V16.9561H81.7515V-0.000244141Z" fill="#0069B1"/>
      <path d="M33.5331 5.96559V4.00385H30.2519V-0.000244141H27.6699V13.1243C27.6699 14.4636 28.0057 15.4705 28.6508 16.16C29.296 16.8358 30.2506 17.1681 31.4882 17.1681C31.9045 17.1681 32.2818 17.1284 32.6716 17.0751C32.981 17.0218 33.2627 16.9561 33.5193 16.8631V14.7414C33.3181 14.8207 33.103 14.874 32.8741 14.9398C32.5911 14.9931 32.3358 15.0191 32.1082 15.0191C31.463 15.0191 30.9788 14.8468 30.6833 14.5157C30.3877 14.1846 30.2531 13.6278 30.2531 12.8453V5.97799L33.5344 5.96435L33.5331 5.96559Z" fill="#0069B1"/>
      <path d="M76.9372 3.65942C76.0493 3.65942 75.2569 3.89751 74.5577 4.36253C73.8446 4.8263 73.2132 5.4364 72.8636 6.20523V4.00416H70.4036V16.9564H73.012V10.1548C73.012 9.61162 73.0925 9.08088 73.227 8.57742C73.3616 8.07397 73.6031 7.64987 73.8999 7.25182C74.1955 6.86741 74.5853 6.576 75.0431 6.33667C75.4997 6.09858 76.0518 5.99194 76.6831 5.99194C77.0994 5.99194 77.4893 6.03162 77.8666 6.12462V3.73879C77.5975 3.67306 77.3019 3.65942 76.9384 3.65942H76.9372Z" fill="#0069B1"/>
      <path d="M11.4159 6.86786C11.2147 6.23172 10.9179 5.68735 10.5154 5.19753C10.0991 4.73376 9.61493 4.3357 8.99615 4.07033C8.39121 3.79132 7.6517 3.64624 6.80403 3.64624C6.33365 3.64624 5.86328 3.69956 5.41932 3.84465C4.9892 3.97733 4.57165 4.1497 4.19561 4.37538C3.81956 4.61347 3.51017 4.86644 3.21462 5.17025C2.91907 5.46166 2.62351 5.79275 2.44869 6.13748V4.01577H0V16.968H2.60842V10.087C2.60842 8.80109 2.94422 7.75325 3.58941 6.99807C4.23459 6.2156 5.08227 5.83119 6.11733 5.83119C6.72228 5.83119 7.22032 5.95023 7.6102 6.16228C8.00008 6.37433 8.29563 6.66574 8.51069 7.03775C8.72575 7.40852 8.88674 7.82022 8.96723 8.29763C9.04772 8.76141 9.08797 9.26486 9.08797 9.7956V16.968H11.7102V8.93377C11.7102 8.19099 11.6159 7.50153 11.4147 6.86538L11.4159 6.86786Z" fill="#0069B1"/>
      <path d="M87.2901 4.00415H90.5035L84.9647 10.5268L90.423 16.9564H87.2096L81.7513 10.5268L87.2901 4.00415Z" fill="#0069B1"/>
      <path d="M96.4826 3.96143H93.2818L98.7992 10.458L93.3623 16.8628H96.5631L102 10.458L96.4826 3.96143Z" fill="#FF2E56"/>
      <path d="M69.3987 30.7437C68.5535 30.7437 67.8153 30.435 67.1839 29.8162C66.5526 29.1974 66.2369 28.3715 66.2369 27.3361C66.2369 26.3007 66.5526 25.4971 67.1839 24.8746C67.8153 24.2521 68.5535 23.9409 69.3987 23.9409C70.44 23.9409 71.2852 24.4034 71.9329 25.3297V21.3914H72.9189V30.6049H71.9329V29.2917C71.2676 30.2589 70.4224 30.7437 69.3987 30.7437ZM69.5785 29.8732C70.2187 29.8732 70.7771 29.6339 71.255 29.154C71.7329 28.6741 71.9719 28.064 71.9719 27.3237C71.9719 26.5834 71.7329 26.0006 71.255 25.5257C70.7771 25.0507 70.2187 24.8126 69.5785 24.8126C68.9384 24.8126 68.3586 25.042 67.9146 25.5009C67.4707 25.9597 67.2493 26.576 67.2493 27.3497C67.2493 28.1235 67.4757 28.7064 67.9272 29.1738C68.38 29.6413 68.9296 29.8745 69.5785 29.8745V29.8732Z" fill="#0069B1"/>
      <path d="M74.5702 22.653V21.5803H75.6971V22.653H74.5702ZM74.6343 30.6041V24.079H75.6204V30.6041H74.6343Z" fill="#0069B1"/>
      <path d="M77.3355 30.6042V24.0791H78.3216V25.2149C78.8422 24.3655 79.5968 23.9402 80.5879 23.9402C81.3727 23.9402 81.9915 24.1783 82.4442 24.6532C82.897 25.1281 83.1221 25.7618 83.1221 26.5529V30.6042H82.1361V26.7923C82.1361 26.1785 81.9764 25.6961 81.6557 25.3476C81.3362 24.9979 80.886 24.8243 80.3049 24.8243C79.7239 24.8243 79.2598 25.0141 78.8837 25.3923C78.5077 25.7705 78.3203 26.2628 78.3203 26.8692V30.6054H77.3343L77.3355 30.6042Z" fill="#0069B1"/>
      <path d="M85.234 27.7397C85.3019 28.4043 85.5559 28.9326 85.9961 29.3232C86.435 29.7151 86.9582 29.9097 87.5644 29.9097C88.358 29.9097 89.0535 29.6022 89.6509 28.9884L90.2659 29.5315C89.5239 30.3475 88.6146 30.7554 87.5393 30.7554C86.6086 30.7554 85.8263 30.438 85.1899 29.8031C84.5536 29.1682 84.2366 28.3498 84.2366 27.3478C84.2366 26.3459 84.5397 25.5919 85.1459 24.931C85.7521 24.27 86.5067 23.9402 87.4123 23.9402C88.3178 23.9402 89.1101 24.2688 89.6648 24.9248C90.2194 25.5808 90.4973 26.4054 90.4973 27.3987C90.4973 27.5251 90.4936 27.638 90.4848 27.7397H85.2365H85.234ZM85.234 26.9572H89.4962C89.4359 26.326 89.2258 25.8027 88.8624 25.3861C88.5001 24.9694 88.0071 24.7611 87.3833 24.7611C86.8199 24.7611 86.3382 24.9669 85.937 25.3799C85.5358 25.7928 85.3006 26.3186 85.2327 26.9572H85.234Z" fill="#0069B1"/>
    </g>
    <defs>
      <clipPath id="clip0_2170_1952">
        <rect width="102" height="32.9032" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const ProcessingPaymentScreen = ({ onCompletion }: { onCompletion: () => void }) => {
  const [step, setStep] = useState(1); // 1: Verifying, 2: Processing, 3: Confirming

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    timers.push(setTimeout(() => setStep(2), 1200));
    timers.push(setTimeout(() => setStep(3), 2700));
    timers.push(setTimeout(onCompletion, 3500));

    return () => timers.forEach(clearTimeout);
  }, [onCompletion]);

  const Step = ({ n, label, currentStep }: { n: number; label: string; currentStep: number }) => {
    const isActive = n === currentStep;
    const isCompleted = n < currentStep;

    return (
      <div className="flex items-center gap-4">
        <div className="relative h-6 w-6 flex items-center justify-center">
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6 text-blue-500" />
          ) : isActive ? (
            <>
              <div className="h-6 w-6 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="absolute h-3 w-3 rounded-full bg-white"></div>
            </>
          ) : (
            <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-gray-300"></div>
          )}
        </div>
        <span className={cn(
            "font-semibold text-base", 
            isCompleted ? "text-gray-900" : "text-gray-400", 
            isActive && "text-gray-900")
        }>
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col min-h-screen w-full max-w-md mx-auto bg-gray-50">
      <header className="p-4 text-center border-b bg-white">
        <h1 className="font-bold text-lg">Processing Payment</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-8">
        <div className="relative w-24 h-24">
          <Loader2 className="w-full h-full text-blue-500 animate-spin" style={{ animationDuration: '1.5s' }} />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">Processing Your Payment</h2>
          <p className="text-gray-500">Please wait while we process your transaction</p>
        </div>

        <Card className="w-full text-left rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-5">
            <h3 className="font-bold">Processing Steps</h3>
            <Step n={1} label="Card details verified" currentStep={step} />
            <Step n={2} label="Processing payment" currentStep={step} />
            <Step n={3} label="Confirmation" currentStep={step} />
          </CardContent>
        </Card>

        <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
          <ShieldCheck className="h-5 w-5 text-blue-500" />
          <span className="font-semibold text-blue-500">Secure Transaction</span>
          <p className="text-xs text-center">Your payment is protected by bank-level encryption</p>
        </div>
      </main>

      <footer className="p-4 bg-white border-t text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-semibold">
           <div className="flex gap-1">
             <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0s'}}></span>
             <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.2s'}}></span>
             <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: '0.4s'}}></span>
           </div>
          Processing payment...
        </div>
      </footer>
    </div>
  );
};


function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const total = searchParams.get('total');
    const totalAmount = total ? parseFloat(total) : 0;
    
    const handlePayNow = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
    };

    const handlePaymentComplete = () => {
        router.push('/mobile/menu/payment-successful');
    };

    if (isProcessing) {
        return <ProcessingPaymentScreen onCompletion={handlePaymentComplete} />;
    }

    return (
        <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-gray-50">
            <header className="p-6 text-center border-b bg-white flex justify-center items-center">
                <NetworkLogo />
            </header>
            
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-200">
                            <ShieldCheck className="h-6 w-6 text-blue-600"/>
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">Network International</p>
                            <p className="text-sm text-gray-500">Secure payment gateway</p>
                        </div>
                    </CardContent>
                    <div className="border-t border-dashed" />
                    <CardContent className="p-4 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Total Amount</span>
                        <span className="font-bold text-lg text-gray-800 font-mono">AED {totalAmount.toFixed(2)}</span>
                    </CardContent>
                </Card>

                <form onSubmit={handlePayNow}>
                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="p-4 space-y-4">
                            <h3 className="font-bold text-gray-800">Card Information</h3>
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <div className="relative" suppressHydrationWarning>
                                    <Input id="card-number" defaultValue={isMounted ? "4242 4242 4242 4242" : ""} placeholder="1234 5678 9012 3456" className="h-12 rounded-lg bg-gray-100 border-gray-200 pr-20" />
                                    {isMounted && (
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                          <VisaIcon />
                                          <MastercardIcon />
                                      </div>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="expiry-date">Expiry Date</Label>
                                    <Input id="expiry-date" defaultValue={isMounted ? "12/26" : ""} placeholder="MM/YY" className="h-12 rounded-lg bg-gray-100 border-gray-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" defaultValue={isMounted ? "123" : ""} placeholder="123" className="h-12 rounded-lg bg-gray-100 border-gray-200" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="cardholder-name">Cardholder Name</Label>
                                <Input id="cardholder-name" defaultValue={isMounted ? "John Smith" : ""} placeholder="John Smith" className="h-12 rounded-lg bg-gray-100 border-gray-200" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-sm mt-4">
                        <CardContent className="p-4 space-y-4">
                            <h3 className="font-bold text-gray-800">Billing Address</h3>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={isMounted ? "john@example.com" : ""} placeholder="john@example.com" className="h-12 rounded-lg bg-gray-100 border-gray-200"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select defaultValue="uae">
                                    <SelectTrigger id="country" className="h-12 rounded-lg bg-gray-100 border-gray-200">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="uae">United Arab Emirates</SelectItem>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-4 bg-green-50 rounded-2xl border border-green-200 flex items-center gap-3 mt-4">
                        <ShieldCheck className="h-5 w-5 text-green-600"/>
                        <div>
                            <p className="font-bold text-sm text-green-800">Secure Payment</p>
                            <p className="text-xs text-green-700">Your payment information is encrypted and secure</p>
                        </div>
                    </div>

                    <footer className="sticky bottom-0 py-4 bg-gray-50/80 backdrop-blur-sm">
                        <Button 
                            className="w-full h-14 rounded-2xl text-lg font-bold bg-[#0069B1] hover:bg-[#005a99]"
                            type="submit"
                        >
                            Pay AED {totalAmount.toFixed(2)}
                        </Button>
                    </footer>
                </form>
            </main>

        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
