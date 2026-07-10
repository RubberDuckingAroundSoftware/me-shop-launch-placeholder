"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface MoodboardImage {
  src: string;
  alt: string;
  figure?: string;
  title?: string;
  palette?: string;
  wisdom?: string;
  catchphrase?: string;
}

export const moodboards: MoodboardImage[] = [
  {
    src: "/moodboards/03-lovable.png",
    alt: "Minimalist",
    catchphrase: "the clean minimal piece you'll wear every single week",
  },
  {
    src: "/moodboards/01-the-archive.jpg",
    alt: "Moodboard with blank linen-bound vintage books, Nike Air Max 1 sneakers in terracotta and forest green, fabric swatches, and brushstrokes",
    catchphrase: "the archival sneaker colorway you'll never let go of",
  },
  {
    src: "/moodboards/04-mens-business-1.jpg",
    alt: "Men's business casual quiet luxury moodboard with tailored wool blazer, oxford shirt, suede loafers, and minimalist watch without text",
    catchphrase: "the tailored blazer that makes you feel immediately dressed",
  },
  {
    src: "/moodboards/05-mens-business-2.jpg",
    alt: "Men's modern creative director moodboard with olive mock-neck sweater, suede sneakers, blank leather folio, and brass fountain pen without text",
    catchphrase: "the quiet luxury staples that define your signature uniform",
  },
  { src: "/moodboards/moodboard_shuffle_pack01/001-vintage-novels.jpg", alt: "Vintage novels editorial moodboard", catchphrase: "the edition that smells like the decade it was printed in" },
  { src: "/moodboards/moodboard_shuffle_pack01/002-penguin-paperbacks.jpg", alt: "Penguin paperbacks editorial moodboard", catchphrase: "the book that makes you miss your bus stop" },
  { src: "/moodboards/moodboard_shuffle_pack01/003-rare-book-collector.jpg", alt: "Rare book collector editorial moodboard", catchphrase: "the first edition you've been hunting for three years" },
  { src: "/moodboards/moodboard_shuffle_pack01/004-childrens-books.jpg", alt: "Childrens books editorial moodboard", catchphrase: "the story they'll ask you to read forty nights in a row" },
  { src: "/moodboards/moodboard_shuffle_pack01/005-manga-sketchpad.jpg", alt: "Manga sketchpad editorial moodboard", catchphrase: "the volume that turns a casual reader into a collector" },
  { src: "/moodboards/moodboard_shuffle_pack01/006-cookbook-stack.jpg", alt: "Cookbook stack editorial moodboard", catchphrase: "the cookbook you actually cook from, not just photograph" },
  { src: "/moodboards/moodboard_shuffle_pack01/007-travel-writing.jpg", alt: "Travel writing editorial moodboard", catchphrase: "the book that makes you buy a plane ticket" },
  { src: "/moodboards/moodboard_shuffle_pack01/008-poetry-lavender.jpg", alt: "Poetry lavender editorial moodboard", catchphrase: "the poem you memorize without trying" },
  { src: "/moodboards/moodboard_shuffle_pack01/009-architecture-books.jpg", alt: "Architecture books editorial moodboard", catchphrase: "the monograph that changes how you see every building" },
  { src: "/moodboards/moodboard_shuffle_pack01/010-secondhand-books.jpg", alt: "Secondhand books editorial moodboard", catchphrase: "the used copy with someone else's notes in the margins" },
  { src: "/moodboards/moodboard_shuffle_pack01/011-philosophy-books.jpg", alt: "Philosophy books editorial moodboard", catchphrase: "the paragraph you underline three times" },
  { src: "/moodboards/moodboard_shuffle_pack01/012-scifi-fantasy.jpg", alt: "Scifi fantasy editorial moodboard", catchphrase: "the world you'd rather live in than this one" },
  { src: "/moodboards/moodboard_shuffle_pack01/013-art-books.jpg", alt: "Art books editorial moodboard", catchphrase: "the plate you stare at until your coffee goes cold" },
  { src: "/moodboards/moodboard_shuffle_pack01/014-solitary-reader.jpg", alt: "Solitary reader editorial moodboard", catchphrase: "the chapter that makes you look up and see everything differently" },
  { src: "/moodboards/moodboard_shuffle_pack01/015-audiobook.jpg", alt: "Audiobook editorial moodboard", catchphrase: "the narrator whose voice you hear even after you stop listening" },
  { src: "/moodboards/moodboard_shuffle_pack01/016-book-club.jpg", alt: "Book club editorial moodboard", catchphrase: "the novel that splits the table into two loud opinions" },
  { src: "/moodboards/moodboard_shuffle_pack01/017-antique-atlas.jpg", alt: "Antique atlas editorial moodboard", catchphrase: "the map with countries that don't exist anymore" },
  { src: "/moodboards/moodboard_shuffle_pack01/018-zines-riso.jpg", alt: "Zines riso editorial moodboard", catchphrase: "the zine that someone made in their kitchen for twelve people" },
  { src: "/moodboards/moodboard_shuffle_pack01/019-romance-novels.jpg", alt: "Romance novels editorial moodboard", catchphrase: "the love story you stay up until 3am to finish" },
  { src: "/moodboards/moodboard_shuffle_pack01/020-tech-books.jpg", alt: "Tech books editorial moodboard", catchphrase: "the chapter that finally makes the concept click" },
  { src: "/moodboards/moodboard_shuffle_pack01/021-baby-books.jpg", alt: "Baby books editorial moodboard", catchphrase: "the book so chewed it became a family heirloom" },
  { src: "/moodboards/moodboard_shuffle_pack01/022-music-biographies.jpg", alt: "Music biographies editorial moodboard", catchphrase: "the memoir that makes you hear the album differently" },
  { src: "/moodboards/moodboard_shuffle_pack01/023-gardening-books.jpg", alt: "Gardening books editorial moodboard", catchphrase: "the guide that turns a brown thumb green" },
  { src: "/moodboards/moodboard_shuffle_pack01/024-library-books.jpg", alt: "Library books editorial moodboard", catchphrase: "the library copy you almost don't want to return" },
  { src: "/moodboards/moodboard_shuffle_pack01/025-family-books.jpg", alt: "Family books editorial moodboard", catchphrase: "the book with your grandmother's handwriting on the first page" },
  { src: "/moodboards/moodboard_shuffle_pack01/026-mediterranean-herbs.jpg", alt: "Mediterranean herbs editorial moodboard", catchphrase: "the ingredient that makes the whole dish" },
  { src: "/moodboards/moodboard_shuffle_pack01/027-asian-pantry.jpg", alt: "Asian pantry editorial moodboard", catchphrase: "the noodle that tastes like that street in Taipei" },
  { src: "/moodboards/moodboard_shuffle_pack01/028-baking-scene.jpg", alt: "Baking scene editorial moodboard", catchphrase: "the recipe your kids will teach their kids" },
  { src: "/moodboards/moodboard_shuffle_pack01/029-farmers-market.jpg", alt: "Farmers market editorial moodboard", catchphrase: "the tomato that reminds you why seasons matter" },
  { src: "/moodboards/moodboard_shuffle_pack01/030-barbecue-prep.jpg", alt: "Barbecue prep editorial moodboard", catchphrase: "the cut your butcher sets aside because he knows you" },
  { src: "/moodboards/moodboard_shuffle_pack01/031-cocktails.jpg", alt: "Cocktails editorial moodboard", catchphrase: "the drink you name after a Tuesday in November" },
  { src: "/moodboards/moodboard_shuffle_pack01/032-breakfast-spread.jpg", alt: "Breakfast spread editorial moodboard", catchphrase: "the morning ritual you'd never trade for convenience" },
  { src: "/moodboards/moodboard_shuffle_pack01/033-eastern-european.jpg", alt: "Eastern european editorial moodboard", catchphrase: "the recipe your family argues is the only right way" },
  { src: "/moodboards/moodboard_shuffle_pack01/034-pasta-making.jpg", alt: "Pasta making editorial moodboard", catchphrase: "the pasta shape that took four tries to get right" },
  { src: "/moodboards/moodboard_shuffle_pack01/035-spice-drawer.jpg", alt: "Spice drawer editorial moodboard", catchphrase: "the spice you bought on a trip and can't find at home" },
  { src: "/moodboards/moodboard_shuffle_pack01/036-picnic-prep.jpg", alt: "Picnic prep editorial moodboard", catchphrase: "the afternoon that didn't need a plan to be perfect" },
  { src: "/moodboards/moodboard_shuffle_pack01/037-fermentation.jpg", alt: "Fermentation editorial moodboard", catchphrase: "the jar on the counter that's technically alive" },
  { src: "/moodboards/moodboard_shuffle_pack01/038-meal-prep.jpg", alt: "Meal prep editorial moodboard", catchphrase: "the Sunday routine that saves the whole week" },
  { src: "/moodboards/moodboard_shuffle_pack01/039-masala-dabba.jpg", alt: "Masala dabba editorial moodboard", catchphrase: "the family recipe that doesn't have measurements" },
  { src: "/moodboards/moodboard_shuffle_pack01/040-chocolate.jpg", alt: "Chocolate editorial moodboard", catchphrase: "the dessert that earns a silence at the table" },
  { src: "/moodboards/moodboard_shuffle_pack01/041-tea-ceremony.jpg", alt: "Tea ceremony editorial moodboard", catchphrase: "the cup of tea that slows the whole afternoon down" },
  { src: "/moodboards/moodboard_shuffle_pack01/042-smoothie-bowl.jpg", alt: "Smoothie bowl editorial moodboard", catchphrase: "the breakfast that's almost too pretty to eat" },
  { src: "/moodboards/moodboard_shuffle_pack01/043-cheese-board.jpg", alt: "Cheese board editorial moodboard", catchphrase: "the pairing that makes someone ask how you knew" },
  { src: "/moodboards/moodboard_shuffle_pack01/044-foraging.jpg", alt: "Foraging editorial moodboard", catchphrase: "the mushroom you found yourself and didn't die from" },
  { src: "/moodboards/moodboard_shuffle_pack01/045-preserves.jpg", alt: "Preserves editorial moodboard", catchphrase: "the jar of plum jam that outlasts the season" },
  { src: "/moodboards/moodboard_shuffle_pack01/046-street-food.jpg", alt: "Street food editorial moodboard", catchphrase: "the thing you ate standing up that you still think about" },
  { src: "/moodboards/moodboard_shuffle_pack01/047-coffee-ritual.jpg", alt: "Coffee ritual editorial moodboard", catchphrase: "the cup that makes the café version taste like water" },
  { src: "/moodboards/moodboard_shuffle_pack01/048-plant-based.jpg", alt: "Plant based editorial moodboard", catchphrase: "the vegetable dish that converts the skeptic at the table" },
  { src: "/moodboards/moodboard_shuffle_pack01/049-holiday-baking.jpg", alt: "Holiday baking editorial moodboard", catchphrase: "the cookie that means December started" },
  { src: "/moodboards/moodboard_shuffle_pack01/050-fishmonger.jpg", alt: "Fishmonger editorial moodboard", catchphrase: "the catch so fresh the fishmonger brags about it" },
  { src: "/moodboards/moodboard_shuffle_pack01/051-dunks.jpg", alt: "Dunks editorial moodboard", catchphrase: "the pair that made you start paying attention to what you wear" },
  { src: "/moodboards/moodboard_shuffle_pack01/052-minimal-sneakers.jpg", alt: "Minimal sneakers editorial moodboard", catchphrase: "the rotation that covers every day of the week" },
  { src: "/moodboards/moodboard_shuffle_pack01/053-streetwear.jpg", alt: "Streetwear editorial moodboard", catchphrase: "the fit that looks effortless but took twenty minutes" },
  { src: "/moodboards/moodboard_shuffle_pack01/054-womens-sneakers.jpg", alt: "Womens sneakers editorial moodboard", catchphrase: "the sneaker that dresses up without trying" },
  { src: "/moodboards/moodboard_shuffle_pack01/055-thrift-finds.jpg", alt: "Thrift finds editorial moodboard", catchphrase: "the thrift find that someone offers to buy off your feet" },
  { src: "/moodboards/moodboard_shuffle_pack01/056-high-low.jpg", alt: "High low editorial moodboard", catchphrase: "the outfit where no one can tell which piece cost what" },
  { src: "/moodboards/moodboard_shuffle_pack01/057-sneaker-custom.jpg", alt: "Sneaker custom editorial moodboard", catchphrase: "the colorway that doesn't exist until you make it" },
  { src: "/moodboards/moodboard_shuffle_pack01/058-running.jpg", alt: "Running editorial moodboard", catchphrase: "the shoe that carried you across a finish line" },
  { src: "/moodboards/moodboard_shuffle_pack01/059-unboxing.jpg", alt: "Unboxing editorial moodboard", catchphrase: "them before the resale price doubles" },
  { src: "/moodboards/moodboard_shuffle_pack01/060-dad-shoes.jpg", alt: "Dad shoes editorial moodboard", catchphrase: "the shoe your dad wore that's suddenly cool again" },
  { src: "/moodboards/moodboard_shuffle_pack01/061-workwear.jpg", alt: "Workwear editorial moodboard", catchphrase: "the gear that looks better the more you beat it up" },
  { src: "/moodboards/moodboard_shuffle_pack01/062-skate.jpg", alt: "Skate editorial moodboard", catchphrase: "the shoe that remembers every kickflip attempt" },
  { src: "/moodboards/moodboard_shuffle_pack01/063-collector.jpg", alt: "Collector editorial moodboard", catchphrase: "the pair you keep in the box and the pair you actually wear" },
  { src: "/moodboards/moodboard_shuffle_pack01/064-festival.jpg", alt: "Festival editorial moodboard", catchphrase: "the outfit you planned for three weeks for one weekend" },
  { src: "/moodboards/moodboard_shuffle_pack01/065-monochrome.jpg", alt: "Monochrome editorial moodboard", catchphrase: "the fit that says everything by saying nothing" },
  { src: "/moodboards/moodboard_shuffle_pack01/066-retro-sportswear.jpg", alt: "Retro sportswear editorial moodboard", catchphrase: "the era you weren't born in but dress like you were" },
  { src: "/moodboards/moodboard_shuffle_pack01/067-fall-layers.jpg", alt: "Fall layers editorial moodboard", catchphrase: "the layers that make October feel like a personal season" },
  { src: "/moodboards/moodboard_shuffle_pack01/068-womens-streetwear.jpg", alt: "Womens streetwear editorial moodboard", catchphrase: "the combination that shouldn't work but absolutely does" },
  { src: "/moodboards/moodboard_shuffle_pack01/069-sneaker-cleaning.jpg", alt: "Sneaker cleaning editorial moodboard", catchphrase: "the before-and-after that feels like a spa day for your shoes" },
  { src: "/moodboards/moodboard_shuffle_pack01/070-capsule.jpg", alt: "Capsule editorial moodboard", catchphrase: "the closet where everything goes with everything" },
  { src: "/moodboards/moodboard_shuffle_pack01/071-shelf.jpg", alt: "Shelf editorial moodboard", catchphrase: "the shelf that's really a shrine" },
  { src: "/moodboards/moodboard_shuffle_pack01/072-parent-child.jpg", alt: "Parent child editorial moodboard", catchphrase: "the pair that comes in your size and theirs" },
  { src: "/moodboards/moodboard_shuffle_pack01/073-jerseys.jpg", alt: "Jerseys editorial moodboard", catchphrase: "the jersey of a player who retired before you were born" },
  { src: "/moodboards/moodboard_shuffle_pack01/074-summer.jpg", alt: "Summer editorial moodboard", catchphrase: "the summer shoe that never needs socks" },
  { src: "/moodboards/moodboard_shuffle_pack01/075-commuter.jpg", alt: "Commuter editorial moodboard", catchphrase: "the shoe that commutes as hard as you do" },
  { src: "/moodboards/moodboard_shuffle_pack01/076-home-office.jpg", alt: "Home office editorial moodboard", catchphrase: "the setup that makes Monday morning almost bearable" },
  { src: "/moodboards/moodboard_shuffle_pack01/077-vinyl.jpg", alt: "Vinyl editorial moodboard", catchphrase: "the record you play when you need to feel something" },
  { src: "/moodboards/moodboard_shuffle_pack01/078-skincare.jpg", alt: "Skincare editorial moodboard", catchphrase: "the routine that's really just ten minutes of quiet" },
  { src: "/moodboards/moodboard_shuffle_pack01/079-gift-hunting.jpg", alt: "Gift hunting editorial moodboard", catchphrase: "the gift that makes someone say you actually know them" },
  { src: "/moodboards/moodboard_shuffle_pack01/080-outdoor-gear.jpg", alt: "Outdoor gear editorial moodboard", catchphrase: "the gear that earns its scratches" },
  { src: "/moodboards/moodboard_shuffle_pack01/081-teen-wishlist.jpg", alt: "Teen wishlist editorial moodboard", catchphrase: "the wishlist that doubles as a mood board" },
  { src: "/moodboards/moodboard_shuffle_pack01/082-apartment.jpg", alt: "Apartment editorial moodboard", catchphrase: "the apartment that's not home yet but will be" },
  { src: "/moodboards/moodboard_shuffle_pack01/083-photography.jpg", alt: "Photography editorial moodboard", catchphrase: "the lens that makes you see what was always there" },
  { src: "/moodboards/moodboard_shuffle_pack01/084-stationery.jpg", alt: "Stationery editorial moodboard", catchphrase: "the pen that makes your handwriting someone else's" },
  { src: "/moodboards/moodboard_shuffle_pack01/085-bike.jpg", alt: "Bike editorial moodboard", catchphrase: "the commute that's secretly the best part of your day" },
  { src: "/moodboards/moodboard_shuffle_pack01/086-gaming.jpg", alt: "Gaming editorial moodboard", catchphrase: "the upgrade that turns a desk into a cockpit" },
  { src: "/moodboards/moodboard_shuffle_pack01/087-watches.jpg", alt: "Watches editorial moodboard", catchphrase: "the watch you wear to feel ready for anything" },
  { src: "/moodboards/moodboard_shuffle_pack01/088-yoga.jpg", alt: "Yoga editorial moodboard", catchphrase: "the practice that starts before you get on the mat" },
  { src: "/moodboards/moodboard_shuffle_pack01/089-new-apartment.jpg", alt: "New apartment editorial moodboard", catchphrase: "the list that turns four walls into yours" },
  { src: "/moodboards/moodboard_shuffle_pack01/090-pet-owner.jpg", alt: "Pet owner editorial moodboard", catchphrase: "the toy they destroy in a day and the one they sleep with forever" },
  { src: "/moodboards/moodboard_shuffle_pack01/091-camping.jpg", alt: "Camping editorial moodboard", catchphrase: "the weekend that doesn't need Wi-Fi" },
  { src: "/moodboards/moodboard_shuffle_pack01/092-art-supplies.jpg", alt: "Art supplies editorial moodboard", catchphrase: "the color you mixed once and can never mix again" },
  { src: "/moodboards/moodboard_shuffle_pack01/093-back-to-school.jpg", alt: "Back to school editorial moodboard", catchphrase: "the supplies that make September smell like possibility" },
  { src: "/moodboards/moodboard_shuffle_pack01/094-plant-parent.jpg", alt: "Plant parent editorial moodboard", catchphrase: "the cutting that roots when you finally stop checking on it" },
  { src: "/moodboards/moodboard_shuffle_pack01/095-grooming.jpg", alt: "Grooming editorial moodboard", catchphrase: "the routine your grandfather did better than any product launch" },
  { src: "/moodboards/moodboard_shuffle_pack01/096-sustainable.jpg", alt: "Sustainable editorial moodboard", catchphrase: "the swap that's so small it's almost suspiciously easy" },
  { src: "/moodboards/moodboard_shuffle_pack01/097-music-hunt.jpg", alt: "Music hunt editorial moodboard", catchphrase: "the string gauge you argue about like it's a personality trait" },
  { src: "/moodboards/moodboard_shuffle_pack01/098-wedding.jpg", alt: "Wedding editorial moodboard", catchphrase: "the detail no guest will notice but you'll always know is right" },
  { src: "/moodboards/moodboard_shuffle_pack01/099-travel-packing.jpg", alt: "Travel packing editorial moodboard", catchphrase: "the packing list that fits a life into 7 kilograms" },
  { src: "/moodboards/moodboard_shuffle_pack01/100-edc.jpg", alt: "Edc editorial moodboard", catchphrase: "the pocket check you do three times before leaving the house" },
];

export interface MoodboardGalleryProps {
  currentIndex?: number;
  isTransitioning?: boolean;
  onTransitionTo?: (nextIndex: number | ((prev: number) => number)) => void;
  onPauseChange?: (paused: boolean) => void;
  // Easter eggs:
  speedReaderActive?: boolean;
  onSpeedReaderTrigger?: () => void;
  isComplete?: boolean;
  count?: number;
  showCounter?: boolean;
}

export function MoodboardGallery({
  currentIndex: controlledIndex,
  isTransitioning: controlledTransitioning,
  onTransitionTo,
  onPauseChange,
  speedReaderActive = false,
  onSpeedReaderTrigger,
  isComplete = false,
  count = 0,
  showCounter = false,
}: MoodboardGalleryProps = {}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [internalTransitioning, setInternalTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const isControlled = typeof controlledIndex === "number" && typeof onTransitionTo === "function";
  const currentIndex = isControlled ? controlledIndex : internalIndex;
  const isTransitioning = isControlled ? Boolean(controlledTransitioning) : internalTransitioning;

  const handlePauseChange = useCallback((paused: boolean) => {
    setIsPaused(paused);
    if (onPauseChange) onPauseChange(paused);
  }, [onPauseChange]);

  const triggerTransition = useCallback((nextIndexInput: number | ((prev: number) => number)) => {
    if (isControlled) {
      onTransitionTo(nextIndexInput);
    } else {
      setInternalTransitioning(true);
      setTimeout(() => {
        setInternalIndex((prev) => typeof nextIndexInput === "function" ? nextIndexInput(prev) : nextIndexInput);
        setInternalTransitioning(false);
      }, 400);
    }
  }, [isControlled, onTransitionTo]);

  // Touch swipe and scroll state for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);
  const minSwipeDistance = 40; // minimum distance in px to trigger swipe

  // Speed Reader tracking refs
  const shuffleTimestamps = useRef<number[]>([]);
  const hasTriggeredSpeedReader = useRef(false);
  const recentIndicesRef = useRef<number[]>([0]);

  // Keep track of shown images so manual shuffle doesn't repeat recent ones
  useEffect(() => {
    if (typeof currentIndex === "number" && !recentIndicesRef.current.includes(currentIndex)) {
      recentIndicesRef.current.push(currentIndex);
      if (recentIndicesRef.current.length > Math.floor(moodboards.length * 0.75)) {
        recentIndicesRef.current.shift();
      }
    }
  }, [currentIndex]);

  // Auto-rotate every 8s when running uncontrolled
  useEffect(() => {
    if (isControlled || isPaused || speedReaderActive) return;
    const interval = setInterval(() => {
      triggerTransition((prev) => (prev + 1) % moodboards.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isControlled, isPaused, speedReaderActive, currentIndex, triggerTransition]);

  // Smart preloading: preload the next 2 and previous 1 images relative to currentIndex so crossfades are instant
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
    if (speedReaderActive) return;

    const now = Date.now();
    shuffleTimestamps.current.push(now);
    if (shuffleTimestamps.current.length > 5) {
      shuffleTimestamps.current.shift();
    }

    if (
      !hasTriggeredSpeedReader.current &&
      shuffleTimestamps.current.length >= 5 &&
      now - shuffleTimestamps.current[0] <= 3000
    ) {
      hasTriggeredSpeedReader.current = true;
      if (onSpeedReaderTrigger) {
        onSpeedReaderTrigger();
      }
      return;
    }

    triggerTransition((prev) => {
      if (moodboards.length <= 1) return prev;
      const candidates = moodboards
        .map((_, i) => i)
        .filter((i) => i !== prev && !recentIndicesRef.current.includes(i));
      if (candidates.length > 0) {
        return candidates[Math.floor(Math.random() * candidates.length)];
      }
      let nextIndex = prev;
      while (nextIndex === prev) {
        nextIndex = Math.floor(Math.random() * moodboards.length);
      }
      return nextIndex;
    });
  }, [triggerTransition, speedReaderActive, onSpeedReaderTrigger]);

  // Track if user is swiping or scrolling vs stationary tapping on mobile
  const isSwipingOrScrollingRef = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    isSwipingOrScrollingRef.current = false;
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    setTouchEndX(currentX);
    setTouchEndY(currentY);

    if (touchStartX !== null && touchStartY !== null) {
      const deltaX = Math.abs(currentX - touchStartX);
      const deltaY = Math.abs(currentY - touchStartY);
      if (deltaX > 10 || deltaY > 10) {
        isSwipingOrScrollingRef.current = true;
      }
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;

    const finalEndX = touchEndX ?? touchStartX;
    const finalEndY = touchEndY ?? touchStartY;
    const deltaX = Math.abs(finalEndX - touchStartX);
    const deltaY = Math.abs(finalEndY - touchStartY);

    // 1. If user moved their finger vertically or horizontally across the threshold
    if (isSwipingOrScrollingRef.current || deltaX > 10 || deltaY > 10) {
      // If horizontal distance exceeded minSwipeDistance and horizontal movement exceeded vertical movement, it is a left/right swipe
      if (deltaX > minSwipeDistance && deltaX > deltaY) {
        const distance = touchStartX - finalEndX;
        if (distance > minSwipeDistance) {
          triggerTransition((prev) => (prev + 1) % moodboards.length);
        } else if (distance < -minSwipeDistance) {
          triggerTransition((prev) => (prev - 1 + moodboards.length) % moodboards.length);
        }
      }
      // Whether it was a horizontal swipe OR a vertical page scroll, mark as scrolled/swiped to block onClick and DO NOT shuffle!
      isSwipingOrScrollingRef.current = true;
      return;
    }

    // 2. Otherwise, finger remained stationary (<= 10px): this is an intentional tap!
    isSwipingOrScrollingRef.current = true; // block synthetic onClick so it does not double-shuffle
    handleShuffle(e);
  };

  const handleImageAreaClick = useCallback((e: React.MouseEvent) => {
    if (isSwipingOrScrollingRef.current) {
      isSwipingOrScrollingRef.current = false;
      return;
    }
    handleShuffle(e);
  }, [handleShuffle]);

  return (
    <div
      className="w-full max-w-md lg:max-w-none flex flex-col items-center select-none"
      onMouseEnter={() => handlePauseChange(true)}
      onMouseLeave={() => handlePauseChange(false)}
    >
      {/* Main Card Container */}
      <div className="relative w-full transform rotate-1 hover:rotate-0 transition-all duration-700 ease-out group">
        <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-[var(--color-border)]/70 transition-all duration-700 relative">

          {/* Image Container with 4:5 Aspect Ratio, Swipe Handlers, and Click/Tap to Shuffle */}
          <div
            className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[var(--color-border)]/20 touch-pan-y cursor-pointer"
            title="Click or tap to shuffle moodboard"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onClick={handleImageAreaClick}
          >
            {/* Speed Reader Easter Egg Message Card */}
            {speedReaderActive ? (
              <div className="absolute inset-0 w-full h-full bg-[var(--color-bg)] flex flex-col items-center justify-center p-6 text-center z-30 transition-opacity duration-400">
                <p className="font-serif text-[var(--color-text-primary)] text-xl sm:text-2xl mb-3 leading-tight select-none">
                  Slow down.
                </p>
                <p className="font-serif italic text-[var(--color-text-muted)] text-base sm:text-lg max-w-xs leading-relaxed select-none">
                  The right one doesn&apos;t come from rushing.
                </p>
              </div>
            ) : null}

            {moodboards.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={item.src}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-400 ease-in-out ${isActive && !isTransitioning ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
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
              disabled={speedReaderActive || isTransitioning}
              aria-label="Shuffle moodboard image"
              title="Shuffle composition"
              className={`absolute bottom-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-[var(--color-accent)] text-[var(--color-text-body)] hover:text-white shadow-md hover:shadow-lg border border-[var(--color-border)]/80 flex items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer ${speedReaderActive ? "opacity-30 pointer-events-none" : ""
                }`}
            >
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
