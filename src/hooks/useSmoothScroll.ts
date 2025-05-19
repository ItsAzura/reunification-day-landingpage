import { useEffect, useRef } from 'react';
import Lenis from 'lenis'

// Define minimal type for Lenis to ensure type safety
interface LenisInstance {
  raf: (time: number) => void;
  resize: () => void;
  destroy: () => void;
  // Add other methods if needed, e.g., scrollTo
}

interface LenisOptions {
  lerp?: number;
  smoothWheel?: boolean;
  [key: string]: any; // Allow other options for flexibility
}

interface LenisConstructor {
  new (options: LenisOptions): LenisInstance;
}

// Type for the Lenis ref
type LenisRef = LenisInstance | null;

export default function useSmoothScroll(): LenisRef {
  const lenisRef = useRef<LenisRef>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize Lenis after component mounts
    lenisRef.current = new (Lenis as LenisConstructor)({
      lerp: 0.15,
      smoothWheel: true,
    });

    // Animation loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Debounced resize handler
    const refreshLenis = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          if (lenisRef.current) {
            console.log('Recalculating Lenis dimensions');
            lenisRef.current.resize();
          }
        });
      }, 200);
    };

    // Handle window load
    window.addEventListener('load', refreshLenis);

    // Handle window resize
    window.addEventListener('resize', refreshLenis);

    // Track all images in the document
    const images = document.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      if (img.complete) {
        refreshLenis();
      } else {
        img.addEventListener('load', refreshLenis);
      }
    });

    // Track dynamic DOM changes with MutationObserver
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      let shouldRefresh = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldRefresh = true;

          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'IMG') {
              const img = node as HTMLImageElement;
              if (img.complete) {
                refreshLenis();
              } else {
                img.addEventListener('load', refreshLenis);
              }
            }
          });
        }
      });

      if (shouldRefresh) {
        refreshLenis();
      }
    });

    // Observe the entire DOM
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'style', 'class'],
    });

    // Force resize after a delay
    const initialDelayTimeout = setTimeout(() => {
      refreshLenis();
    }, 1000);

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }

      window.removeEventListener('load', refreshLenis);
      window.removeEventListener('resize', refreshLenis);

      images.forEach((img: HTMLImageElement) => {
        img.removeEventListener('load', refreshLenis);
      });

      observer.disconnect();

      clearTimeout(initialDelayTimeout);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return lenisRef.current;
}

