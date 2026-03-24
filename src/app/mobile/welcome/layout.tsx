import React from 'react';

export default function MobileWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F7F9FB]">
      {children}
    </div>
  );
}
