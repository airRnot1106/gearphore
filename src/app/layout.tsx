'use client';

import { RecoilRoot } from 'recoil';

import '@/app/globals.css';
import { DebugObserver } from '@/components/functional/DebugObserver';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="text-neutral-content">
        <RecoilRoot>
          <DebugObserver />
          <>
            <div className="fixed top-0 left-0 z-50 h-[10dvh] w-full bg-base-200"></div>
            <div className="z-0 h-[83dvh] bg-base-100">
              <div className="h-[10dvh]"></div>
              {children}
              <div className="h-[13dvh]"></div>
            </div>
            <div className="fixed bottom-0 left-0 h-[7dvh]"></div>
          </>
        </RecoilRoot>
      </body>
    </html>
  );
}
