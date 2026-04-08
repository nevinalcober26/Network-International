'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Crown, MapPin, Utensils, Receipt } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Custom icon for the main circular button, matching the design.
const WelcomeMenuIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18H12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 6V6.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 12V12.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 18V18.01" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// Custom component for the footer logo using Network International branding
const PoweredByEMenu = () => (
  <div className="flex flex-col items-center gap-1">
    <p className="text-xs text-gray-400 font-semibold">Powered by</p>
    <div className="flex items-center gap-2 grayscale brightness-150 scale-75 opacity-60">
      <svg width="280" height="48" viewBox="0 0 280 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M264.841 12.0977H256.034L271.193 30.1607L256.217 47.9996H265.023L280 30.1607L264.841 12.0977Z" fill="#E54360"/>
        <path d="M67.0306 15.1225C65.5301 13.5123 63.7071 12.266 61.5616 11.4119C59.402 10.5578 57.0181 10.1237 54.3817 10.1237C51.7454 10.1237 49.2913 10.5858 47.0196 11.5239C44.7478 12.4621 42.7706 13.7503 41.1018 15.4306C39.4331 17.1109 38.1289 19.0992 37.1894 21.4516C36.2498 23.79 35.7871 26.3104 35.7871 29.1389C35.7871 31.9673 36.2638 34.5298 37.2174 36.8681C38.171 39.1925 39.4892 41.1809 41.1579 42.8191C42.8267 44.4574 44.818 45.7316 47.1458 46.6418C49.4596 47.5519 51.9838 48 54.7183 48C57.9015 48 60.7903 47.3979 63.3986 46.1937C66.0069 44.9895 68.2506 43.1272 70.1718 40.5788L65.1655 36.5601C64.1559 38.0723 62.7676 39.3606 61.0007 40.4247C59.2337 41.4889 57.1443 42.007 54.7183 42.007C53.1477 42.007 51.6753 41.741 50.287 41.1809C48.8987 40.6348 47.6647 39.8646 46.6129 38.8845C45.5472 37.9043 44.7058 36.7561 44.0747 35.4259C43.4437 34.0957 43.1071 32.6814 43.051 31.1692H71.6162C71.6582 30.7631 71.6863 30.3571 71.6863 29.965V28.7468C71.6863 25.8763 71.2796 23.2859 70.4663 20.9895C69.6529 18.6931 68.503 16.7468 67.0166 15.1225H67.0306ZM43.0651 25.8763C43.1632 24.4621 43.5278 23.1459 44.1589 21.8997C44.7759 20.6954 45.5892 19.6033 46.5849 18.6791C47.5665 17.769 48.7304 17.0548 50.0626 16.5228C51.3948 15.9907 52.8252 15.7246 54.3397 15.7246C56.0084 15.7246 57.4528 15.9907 58.7009 16.5228C59.9349 17.0548 60.9726 17.783 61.814 18.6791C62.6554 19.5893 63.2864 20.6674 63.7071 21.8997C64.1418 23.1319 64.3802 24.4621 64.4223 25.8763H43.0651ZM31.2576 19.0432C31.7905 20.8075 32.0569 22.7118 32.0569 24.7281V46.9918H24.9331V27.0805C24.9331 25.6243 24.821 24.224 24.5966 22.9218C24.3722 21.6196 23.9515 20.4434 23.3485 19.4352C22.7455 18.4271 21.9041 17.6149 20.8524 17.0128C19.7866 16.4107 18.4264 16.1027 16.7577 16.1027C13.925 16.1027 11.6112 17.1809 9.83022 19.3232C8.03526 21.4656 7.13778 24.3361 7.13778 27.9207V47.0058H0V11.1179H6.74513C6.74513 11.1179 6.28237 17.979 6.74513 17.0128C7.20789 16.0607 8.04928 15.1505 8.83458 14.3244C9.61987 13.4842 10.5174 12.7561 11.527 12.126C12.5367 11.4959 13.6585 11.0058 14.8645 10.6558C16.0705 10.3057 17.3326 10.1237 18.6508 10.1237C20.9786 10.1237 22.9699 10.5158 24.6387 11.2859C26.3074 12.07 27.6957 13.1202 28.8035 14.4224C29.9114 15.7386 30.7387 17.2789 31.2716 19.0432H31.2576ZM82.7786 11.1039H91.7394V16.5368H82.7786V35.5799C82.7786 37.7363 83.1853 39.2905 83.9846 40.2147C84.7839 41.1389 86.074 41.6149 87.8409 41.6149C88.5 41.6149 89.2012 41.5449 89.9725 41.4049C90.6175 41.2929 91.1925 41.1109 91.7394 40.8868V46.7678C91.0102 46.9918 90.2529 47.1879 89.4115 47.3279C88.3738 47.5099 87.294 47.5939 86.1862 47.5939C82.8066 47.5939 80.2124 46.6558 78.4174 44.7935C76.6224 42.9172 75.725 40.1167 75.725 36.3921V0H82.7646V11.1039H82.7786ZM183.577 15.4306C181.838 13.7643 179.777 12.4621 177.407 11.5239C175.037 10.5858 172.485 10.1237 169.75 10.1237C167.016 10.1237 164.477 10.5858 162.107 11.5239C159.724 12.4621 157.676 13.7503 155.965 15.4306C154.255 17.0969 152.894 19.0712 151.913 21.3816C150.931 23.6779 150.44 26.2124 150.44 28.9848C150.44 31.7573 150.931 34.3057 151.913 36.6301C152.894 38.9545 154.241 40.9568 155.965 42.6511C157.69 44.3314 159.724 45.6476 162.107 46.5858C164.477 47.5239 167.03 47.986 169.75 47.986C172.471 47.986 175.023 47.5239 177.407 46.5858C179.791 45.6476 181.838 44.3454 183.577 42.6511C185.316 40.9568 186.69 38.9545 187.672 36.6301C188.653 34.3057 189.144 31.7573 189.144 28.9848C189.144 26.2124 188.653 23.6779 187.672 21.3816C186.69 19.0852 185.33 17.1109 183.577 15.4306ZM180.913 33.9137C180.38 35.4679 179.608 36.8541 178.599 38.0583C177.589 39.2625 176.327 40.2287 174.841 40.9288C173.354 41.6289 171.629 41.993 169.708 41.993C167.787 41.993 166.076 41.6429 164.576 40.9288C163.075 40.2287 161.827 39.2625 160.817 38.0583C159.794 36.8541 159.022 35.4679 158.49 33.9137C157.957 32.3594 157.69 30.7211 157.69 29.0128C157.69 27.3046 157.957 25.6663 158.49 24.112C159.022 22.5578 159.794 21.1855 160.817 19.9953C161.827 18.8051 163.089 17.867 164.576 17.1669C166.062 16.4667 167.787 16.1027 169.708 16.1027C171.629 16.1027 173.34 16.4527 174.841 17.1669C176.327 17.867 177.589 18.8191 178.599 19.9953C179.622 21.1855 180.38 22.5438 180.913 24.112C181.445 25.6803 181.712 27.3046 181.712 29.0128C181.712 30.7211 181.445 32.3594 180.913 33.9137ZM210.501 10.1237C211.455 10.1237 212.282 10.2077 212.983 10.3617V17.0128C211.974 16.7748 210.894 16.6488 209.744 16.6488C208.033 16.6488 206.533 16.9568 205.285 17.5869C204.009 18.217 202.971 19.0712 202.144 20.1214C201.302 21.1855 200.685 22.4037 200.278 23.79C199.872 25.1762 199.675 26.6324 199.675 28.1447V46.9918H192.552V11.1179H199.297V17.1669C200.307 15.0385 202.003 13.3442 203.953 12.056C205.902 10.7678 208.075 10.1237 210.515 10.1237H210.501ZM223.655 0V46.9918H216.531V0H223.655ZM151.113 11.1039L139.222 46.9918H131.803L122.941 20.0373H122.787L113.994 46.9918H106.562L94.6001 11.1039H102.327L110.516 38.7445L119.155 11.1039H126.657L135.449 38.7445L143.625 11.1039H151.127H151.113ZM232.462 29.1669L247.438 47.0058H238.632L223.655 29.1669L238.814 11.1039H247.621L232.462 29.1669Z" fill="#016EAF"/>
      </svg>
    </div>
  </div>
)

export default function MobileWelcomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto bg-[#F7F9FB] font-sans">
      <header className="p-4 flex justify-between items-center w-full z-10">
        <Button variant="outline" className="rounded-full bg-white shadow-sm h-10 px-4 border-gray-200/80">
          <Globe className="h-4 w-4 mr-2 text-gray-600" />
          <span className="font-bold text-gray-800">EN</span>
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-sm relative h-10 w-10 border-gray-200/80">
          <Crown className="h-4 w-4 text-gray-600" />
          <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="relative w-full max-w-sm">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-[#F7F9FB]">
              <WelcomeMenuIcon />
            </div>
          </div>
          
          <Card className="w-full rounded-3xl shadow-lg pt-16 bg-white/90 backdrop-blur-2xl border-gray-200/50">
            <CardContent className="text-center flex flex-col items-center gap-6 px-6 pb-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Blue Plate</h1>
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Table 12
                </div>
              </div>

              <div className="w-full border-t border-dashed border-gray-200/80"></div>

              <p className="text-gray-500 leading-relaxed text-base">
                Welcome! We're <br /> delighted to have you.
              </p>

              <div className="w-full space-y-3 pt-2">
                <Button variant="outline" className="w-full h-14 rounded-xl text-lg font-bold border-2 border-primary/80 text-primary hover:bg-primary/5 hover:text-primary active:bg-primary/10" asChild>
                  <Link href="/mobile/menu">
                    <Utensils className="h-5 w-5 mr-3" />
                    View Menu
                  </Link>
                </Button>
                <Button className="w-full h-14 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 active:bg-primary/80 shadow-lg shadow-primary/20">
                  <Receipt className="h-5 w-5 mr-3" />
                  Pay my Bill
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-10 flex justify-center">
        <PoweredByEMenu />
      </footer>
    </div>
  );
}
