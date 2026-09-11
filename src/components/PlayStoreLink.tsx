'use client';

import { sendGAEvent } from '@next/third-parties/google';
import React from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=cpm.planbot';

interface Props {
  className?: string;
  children?: React.ReactNode;
  location?: string;
  style?: React.CSSProperties;
}

export default function PlayStoreLink({ 
  className = "btn-primary", 
  children = "Get PlanBot Free", 
  location = "unknown",
  style
}: Props) {
  const handleClick = () => {
    sendGAEvent({ event: 'play_store_click', value: location });
  };

  return (
    <a 
      href={PLAY_STORE_URL} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
