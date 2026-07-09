"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface MoodboardImage {
  src: string;
  alt: string;
}

const moodboards: MoodboardImage[] = [
  {
    src: "/moodboards/03-lovable.png",
    alt: "Minimalist",
  },
  {
    src: "/moodboards/01-the-archive.jpg",
    alt: "Moodboard with blank linen-bound vintage books, Nike Air Max 1 sneakers in terracotta and forest green, fabric swatches, and brushstrokes",
  },
  {
    src: "/moodboards/04-mens-business-1.jpg",
    alt: "Men's business casual quiet luxury moodboard with tailored wool blazer, oxford shirt, suede loafers, and minimalist watch without text",
  },
  {
    src: "/moodboards/05-mens-business-2.jpg",
    alt: "Men's modern creative director moodboard with olive mock-neck sweater, suede sneakers, blank leather folio, and brass fountain pen without text",
  },
  { src: "/moodboards/moodboard_shuffle_pack01/001-vintage-novels.jpg", alt: "Vintage novels editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/002-penguin-paperbacks.jpg", alt: "Penguin paperbacks editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/003-rare-book-collector.jpg", alt: "Rare book collector editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/004-childrens-books.jpg", alt: "Childrens books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/005-manga-sketchpad.jpg", alt: "Manga sketchpad editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/006-cookbook-stack.jpg", alt: "Cookbook stack editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/007-travel-writing.jpg", alt: "Travel writing editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/008-poetry-lavender.jpg", alt: "Poetry lavender editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/009-architecture-books.jpg", alt: "Architecture books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/010-secondhand-books.jpg", alt: "Secondhand books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/011-philosophy-books.jpg", alt: "Philosophy books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/012-scifi-fantasy.jpg", alt: "Scifi fantasy editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/013-art-books.jpg", alt: "Art books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/014-solitary-reader.jpg", alt: "Solitary reader editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/015-audiobook.jpg", alt: "Audiobook editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/016-book-club.jpg", alt: "Book club editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/017-antique-atlas.jpg", alt: "Antique atlas editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/018-zines-riso.jpg", alt: "Zines riso editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/019-romance-novels.jpg", alt: "Romance novels editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/020-tech-books.jpg", alt: "Tech books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/021-baby-books.jpg", alt: "Baby books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/022-music-biographies.jpg", alt: "Music biographies editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/023-gardening-books.jpg", alt: "Gardening books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/024-library-books.jpg", alt: "Library books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/025-family-books.jpg", alt: "Family books editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/026-mediterranean-herbs.jpg", alt: "Mediterranean herbs editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/027-asian-pantry.jpg", alt: "Asian pantry editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/028-baking-scene.jpg", alt: "Baking scene editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/029-farmers-market.jpg", alt: "Farmers market editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/030-barbecue-prep.jpg", alt: "Barbecue prep editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/031-cocktails.jpg", alt: "Cocktails editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/032-breakfast-spread.jpg", alt: "Breakfast spread editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/033-eastern-european.jpg", alt: "Eastern european editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/034-pasta-making.jpg", alt: "Pasta making editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/035-spice-drawer.jpg", alt: "Spice drawer editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/036-picnic-prep.jpg", alt: "Picnic prep editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/037-fermentation.jpg", alt: "Fermentation editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/038-meal-prep.jpg", alt: "Meal prep editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/039-masala-dabba.jpg", alt: "Masala dabba editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/040-chocolate.jpg", alt: "Chocolate editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/041-tea-ceremony.jpg", alt: "Tea ceremony editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/042-smoothie-bowl.jpg", alt: "Smoothie bowl editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/043-cheese-board.jpg", alt: "Cheese board editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/044-foraging.jpg", alt: "Foraging editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/045-preserves.jpg", alt: "Preserves editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/046-street-food.jpg", alt: "Street food editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/047-coffee-ritual.jpg", alt: "Coffee ritual editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/048-plant-based.jpg", alt: "Plant based editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/049-holiday-baking.jpg", alt: "Holiday baking editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/050-fishmonger.jpg", alt: "Fishmonger editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/051-dunks.jpg", alt: "Dunks editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/052-minimal-sneakers.jpg", alt: "Minimal sneakers editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/053-streetwear.jpg", alt: "Streetwear editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/054-womens-sneakers.jpg", alt: "Womens sneakers editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/055-thrift-finds.jpg", alt: "Thrift finds editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/056-high-low.jpg", alt: "High low editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/057-sneaker-custom.jpg", alt: "Sneaker custom editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/058-running.jpg", alt: "Running editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/059-unboxing.jpg", alt: "Unboxing editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/060-dad-shoes.jpg", alt: "Dad shoes editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/061-workwear.jpg", alt: "Workwear editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/062-skate.jpg", alt: "Skate editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/063-collector.jpg", alt: "Collector editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/064-festival.jpg", alt: "Festival editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/065-monochrome.jpg", alt: "Monochrome editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/066-retro-sportswear.jpg", alt: "Retro sportswear editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/067-fall-layers.jpg", alt: "Fall layers editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/068-womens-streetwear.jpg", alt: "Womens streetwear editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/069-sneaker-cleaning.jpg", alt: "Sneaker cleaning editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/070-capsule.jpg", alt: "Capsule editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/071-shelf.jpg", alt: "Shelf editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/072-parent-child.jpg", alt: "Parent child editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/073-jerseys.jpg", alt: "Jerseys editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/074-summer.jpg", alt: "Summer editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/075-commuter.jpg", alt: "Commuter editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/076-home-office.jpg", alt: "Home office editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/077-vinyl.jpg", alt: "Vinyl editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/078-skincare.jpg", alt: "Skincare editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/079-gift-hunting.jpg", alt: "Gift hunting editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/080-outdoor-gear.jpg", alt: "Outdoor gear editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/081-teen-wishlist.jpg", alt: "Teen wishlist editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/082-apartment.jpg", alt: "Apartment editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/083-photography.jpg", alt: "Photography editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/084-stationery.jpg", alt: "Stationery editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/085-bike.jpg", alt: "Bike editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/086-gaming.jpg", alt: "Gaming editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/087-watches.jpg", alt: "Watches editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/088-yoga.jpg", alt: "Yoga editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/089-new-apartment.jpg", alt: "New apartment editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/090-pet-owner.jpg", alt: "Pet owner editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/091-camping.jpg", alt: "Camping editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/092-art-supplies.jpg", alt: "Art supplies editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/093-back-to-school.jpg", alt: "Back to school editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/094-plant-parent.jpg", alt: "Plant parent editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/095-grooming.jpg", alt: "Grooming editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/096-sustainable.jpg", alt: "Sustainable editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/097-music-hunt.jpg", alt: "Music hunt editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/098-wedding.jpg", alt: "Wedding editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/099-travel-packing.jpg", alt: "Travel packing editorial moodboard" },
  { src: "/moodboards/moodboard_shuffle_pack01/100-edc.jpg", alt: "Edc editorial moodboard" },
];

export function MoodboardGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe state for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const minSwipeDistance = 40; // minimum distance in px to trigger swipe

  // Auto-rotate every 8s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % moodboards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Smart preloading: preload the next 2 and previous 1 images relative to currentIndex so crossfades are instant without downloading all 100+ JPEGs on mount
  useEffect(() => {
    const indicesToPreload = [
      (currentIndex + 1) % moodboards.length,
      (currentIndex + 2) % moodboards.length,
      (currentIndex - 1 + moodboards.length) % moodboards.length,
    ];
    indicesToPreload.forEach((idx) => {
      const img = new window.Image();
      img.src = moodboards[idx].src;
    });
  }, [currentIndex]);

  const handleShuffle = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => {
      if (moodboards.length <= 1) return prev;
      let nextIndex = prev;
      while (nextIndex === prev) {
        nextIndex = Math.floor(Math.random() * moodboards.length);
      }
      return nextIndex;
    });
  }, []);

  // Track if user is swiping vs tapping on mobile so tap shuffles instantly without double-triggering onClick
  const isSwipingRef = React.useRef(false);

  // Mobile swipe and tap event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    isSwipingRef.current = false;
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    if (touchStartX !== null && Math.abs(touchStartX - e.targetTouches[0].clientX) > 15) {
      isSwipingRef.current = true;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    // If little or no horizontal movement occurred, treat as a clean mobile tap -> shuffle!
    if (touchEndX === null || Math.abs(touchStartX - touchEndX) <= minSwipeDistance) {
      isSwipingRef.current = true; // Prevent synthetic onClick right after from double-shuffling
      handleShuffle(e);
      return;
    }

    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      isSwipingRef.current = true;
      setCurrentIndex((prev) => (prev + 1) % moodboards.length);
    } else if (isRightSwipe) {
      isSwipingRef.current = true;
      setCurrentIndex((prev) => (prev - 1 + moodboards.length) % moodboards.length);
    }
  };

  const handleImageAreaClick = useCallback((e: React.MouseEvent) => {
    // If user just tapped or swiped on mobile, touchEnd already handled it
    if (isSwipingRef.current) {
      isSwipingRef.current = false;
      return;
    }
    // Clean desktop click -> shuffle!
    handleShuffle(e);
  }, [handleShuffle]);

  return (
    <div
      className="w-full max-w-md lg:max-w-none flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Card Container */}
      <div className="relative w-full transform rotate-1 hover:rotate-0 transition-all duration-700 ease-out group">
        <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-[var(--color-border)]/70 transition-all duration-700 relative">

          {/* Image Container with 4:5 Aspect Ratio, Swipe Handlers, and Click/Tap to Shuffle */}
          <div
            className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[var(--color-border)]/20 touch-pan-y cursor-pointer"
            title="Click or tap to shuffle composition"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={handleImageAreaClick}
          >
            {moodboards.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={item.src}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-600 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              );
            })}

            {/* Shuffle button floating bottom right of image area */}
            <button
              type="button"
              onClick={handleShuffle}
              aria-label="Shuffle moodboard image"
              title="Shuffle composition"
              className="absolute bottom-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-[var(--color-accent)] text-[var(--color-text-body)] hover:text-white shadow-md hover:shadow-lg border border-[var(--color-border)]/80 flex items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer"
            >
              {/* Lucide Shuffle Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180"
              >
                <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22" />
                <path d="m18 2 4 4-4 4" />
                <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
                <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
                <path d="m18 14 4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
