import { useEffect, useState } from 'react';
import { Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

const ANIMATION_SEQUENCES = [
  {
    name: 'matrix',
    logoClasses: "text-green-500 before:from-green-500 before:to-emerald-500",
    textClasses: "from-green-500 to-emerald-500",
  },
  {
    name: 'tron',
    logoClasses: "text-blue-400 before:from-blue-400 before:to-cyan-400",
    textClasses: "from-blue-400 to-cyan-400",
  },
  {
    name: 'stark',
    logoClasses: "text-red-500 before:from-red-500 before:to-orange-500",
    textClasses: "from-red-500 to-orange-500",
  }
];

export function Header() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [currentSequence, setCurrentSequence] = useState(0);

  useEffect(() => {
    // Randomly trigger animation every 30-60 seconds
    const triggerInterval = setInterval(() => {
      const shouldAnimate = Math.random() < 0.5; // 50% chance to animate
      if (shouldAnimate && !isAnimating) {
        setIsAnimating(true);
      }
    }, Math.random() * 30000 + 30000);

    return () => clearInterval(triggerInterval);
  }, [isAnimating]);

  useEffect(() => {
    if (!isAnimating) return;

    // Animation sequence
    const timers = [
      setTimeout(() => setAnimationPhase(1), 500),
      setTimeout(() => setAnimationPhase(2), 1500),
      setTimeout(() => setAnimationPhase(3), 2500),
      setTimeout(() => {
        setAnimationPhase(0);
        setCurrentSequence((prev) => (prev + 1) % ANIMATION_SEQUENCES.length);
        setIsAnimating(false);
      }, 5000)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [isAnimating]);

  const sequence = ANIMATION_SEQUENCES[currentSequence];

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center px-6">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "relative flex items-center justify-center w-8 h-8",
              "before:absolute before:inset-0",
              "before:bg-gradient-to-r",
              "before:opacity-0 before:blur-xl",
              "after:absolute after:inset-0 after:bg-background",
              isAnimating && sequence.logoClasses,
              isAnimating && animationPhase >= 1 && [
                "before:animate-pulse before:opacity-100",
                "after:animate-glow"
              ],
              isAnimating && animationPhase >= 2 && "after:animate-disappear"
            )}
          >
            <Layout 
              className={cn(
                "h-5 w-5 relative z-10 transition-all duration-700",
                isAnimating && sequence.logoClasses,
                isAnimating && animationPhase === 0 && "opacity-0 scale-0 rotate-180",
                isAnimating && animationPhase >= 1 && "opacity-100 scale-100 rotate-0",
                isAnimating && animationPhase >= 2 && [
                  "animate-float",
                  "after:content-[''] after:absolute after:inset-0",
                  "after:bg-gradient-to-r after:opacity-50 after:blur-sm"
                ]
              )}
            />
          </div>

          <div className="overflow-hidden">
            <h1 
              className={cn(
                "text-xl font-bold tracking-tight",
                isAnimating && [
                  "bg-gradient-to-r bg-clip-text text-transparent",
                  sequence.textClasses
                ],
                "transition-all duration-1000",
                isAnimating && animationPhase < 2 && "opacity-0 translate-y-8",
                isAnimating && animationPhase >= 2 && [
                  "opacity-100 translate-y-0",
                  "animate-text-pulse"
                ]
              )}
            >
              KanbanFlow
            </h1>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes text-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes disappear {
          to { opacity: 0; }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-text-pulse {
          animation: text-pulse 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-disappear {
          animation: disappear 1s ease-out forwards;
        }
      `}</style>
    </header>
  );
}