import React from 'react'

export default function TriangleIcon({ fill, degrees }) {
  return (
    <svg
      width="28"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      transform={`rotate(${degrees})`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.3298 20.7324C31.4453 20.4915 31.4877 20.2262 31.4524 19.9648C31.417 19.7034 31.3054 19.4558 31.1293 19.2486L15.8224 1.31309C15.6659 1.12983 15.4637 0.984352 15.233 0.889126C15.0024 0.793899 14.7502 0.751756 14.4981 0.766305C14.246 0.780854 14.0014 0.851662 13.7854 0.972666C13.5694 1.09367 13.3883 1.26126 13.2577 1.4611L0.483228 21.0171C0.335894 21.2428 0.258161 21.5014 0.258447 21.765C0.258733 22.0286 0.337026 22.2871 0.484849 22.5125C0.632672 22.7379 0.844392 22.9217 1.09708 23.0438C1.34978 23.166 1.63381 23.2219 1.91844 23.2056L29.9998 21.5851C30.2846 21.5687 30.559 21.4805 30.7935 21.3302C31.0279 21.1799 31.2134 20.9732 31.3298 20.7324Z"
        fill={fill}
      />
    </svg>
  )
}
