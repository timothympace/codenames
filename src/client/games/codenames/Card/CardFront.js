// @flow

import React from 'react';
import { SILHOUETTE } from '../../../../config/constants';

type Props = {
  word: string,
  spymaster: boolean,
  agent: string,
  agentIndex: number,
};

export default function CardFront({ word, spymaster, agent, agentIndex }: Props) {
  agent = spymaster ? agent : SILHOUETTE;
  agentIndex = spymaster ? agentIndex : 0;
  const profileUrl = `/images/${agent}-profile-${agentIndex}.jpg`;

  return (
    <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 165">
      <defs>
        <linearGradient id="outer-gradient" gradientTransform="rotate(55)">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#a79680" />
        </linearGradient>
        <linearGradient id="inner-gradient" gradientTransform="rotate(55)">
          <stop offset="0%" stopColor="#a79680" />
          <stop offset="100%" stopColor="#efece9" />
        </linearGradient>

        <linearGradient id="overlay1" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
        </linearGradient>

        <linearGradient id="overlay2" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="25%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="75%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="overlay3" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <rect width="250" height="165" fill="#e4d7c6" rx="15" />
      <circle
        cx="125"
        cy="28"
        r="12.5"
        stroke="url(#outer-gradient)"
        shapeRendering="geometricPrecision"
        fill="none"
      />
      <circle
        cx="125"
        cy="28"
        r="7"
        stroke="url(#inner-gradient)"
        strokeWidth="2"
        shapeRendering="geometricPrecision"
        fill="#fff"
      />
      <rect
        id="card-border"
        x="16"
        y="16"
        width="218"
        height="133"
        stroke="#a79680"
        strokeWidth="3"
        shapeRendering="geometricPrecision"
        fill="none"
        rx="15"
      />
      <rect x="26" y="82" width="140" height="3" fill="#b1a79b" />
      <rect x="176" y="26" width="48" height="60" fill="#ebe1d8" />

      <image x="179" y="29" width="42" height="54" href={profileUrl} />

      <text
        x="96"
        y="72"
        transform="rotate(180 96 72)"
        fill="#817c67"
        fontSize="20px"
        fontStyle="italic"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {word}
      </text>
      <path fill="#fff" d="M26,93 h198 v34 a10,10 0 0 1 -10,10 h-178 a10,10 0 0 1 -10,-10" />

      <polygon points="43,14.5 63,14.5 14.5,79 14.5,52" fill="url(#overlay1)" />
      <polygon points="70,14.5 113,14.5 14.5,135 14.5,89" fill="url(#overlay2)" />
      <polygon points="154,14.5 197,14.5 94,150.5 50,150.5" fill="url(#overlay3)" />
      <polygon points="203,14.5 221,14.5 118,150.5 99,150.5" fill="url(#overlay3)" />

      <text fontSize="28px" x="125" y="115" textAnchor="middle" dominantBaseline="central">
        {word}
      </text>
    </svg>
  );
}
