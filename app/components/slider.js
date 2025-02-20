"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import whiteCheck from "@/public/StaticAssets/white_check.png";
import whiteClose from "@/public/StaticAssets/white_close.png";

import redCheck from "@/public/StaticAssets/red_check.png";
import redClose from "@/public/StaticAssets/red_close.png";
import redCircle from "@/public/StaticAssets/red_button.png";
import redLeftArrows from "@/public/StaticAssets/red_left_arrows.png";
import redRightArrows from "@/public/StaticAssets/red_right_arrows.png";

import greenCheck from "@/public/StaticAssets/green_check.png";
import greenClose from "@/public/StaticAssets/green_close.png";
import greenCircle from "@/public/StaticAssets/green_button.png";
import greenLeftArrows from "@/public/StaticAssets/green_left_arrows.png";
import greenRightArrows from "@/public/StaticAssets/green_right_arrows.png";

import {
  GlowingCircle,
  GlowingLeftArrows,
  GlowingRightArrows,
} from "../Lottie";

const Slider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);
  const [isLeftSide, setIsLeftSide] = useState(false);
  const startPosRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setPosition(screenWidth / 2);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

    //When user clicks down on the circle
  const handleMouseDown = (e) => {
    setIsDragging(true); // Start dragging
    // Store the initial position
    startPosRef.current = e.clientX - position;
  };

  // When user moves mouse while holding down
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const bounds = containerRef.current.getBoundingClientRect();
    const newPosition = e.clientX - startPosRef.current;
    const containerCenter = (bounds.right + bounds.left) / 2;
    setIsLeftSide(newPosition < containerCenter);

    const minPosition = bounds.left; 
    const maxPosition = bounds.right; 

    // Limit the position to the container's boundaries
    const limitedPosition = Math.min(
      Math.max(newPosition, minPosition),
      maxPosition
    );

    setPosition(limitedPosition);
  };

  //When user releases mouse
  const handleMouseUp = () => {
    if (isDragging) {
      const bounds = containerRef.current.getBoundingClientRect();

      // Check if we're at either end of the container 
      if (position <= bounds.left + 5) {
        alert("Bet Declined");
        setPosition((bounds.right + bounds.left) / 2);
      } else if (position >= bounds.right - 5) {
        alert("Bet Accepted");
        setPosition((bounds.right + bounds.left) / 2);
      } else {
        console.log("middle");
        const circle = containerRef.current.querySelector("[data-circle]");
        if (circle) {
          circle.style.transition = "left 0.2s ease-out";
          setPosition((bounds.right + bounds.left) / 2);
          
          // Remove transition after animation completes
          setTimeout(() => {
            circle.style.transition = "";
          }, 300);
        }
      }
    }

    setIsDragging(false);
  };
  return (
    <div
      className={`p-[2px] rounded-xl ${
        isDragging
          ? isLeftSide
            ? "bg-gradient-to-b from-sliderRedBorderLight via-sliderRedBorderDark to-sliderRedBorderLight"
            : "bg-gradient-to-b from-sliderGreenBorderLight via-sliderGreenBorderDark to-sliderGreenBorderLight"
          : "bg-gradient-to-b from-sliderOrangeBorderLight via-sliderOrangeBorderDark to-sliderOrangeBorderLight"
      }`}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`h-20 w-full rounded-xl flex items-center justify-between px-6 gap-8 ${
          isDragging
            ? isLeftSide
              ? "bg-gradient-to-b from-sliderRedLight to-sliderRedDark"
              : "bg-gradient-to-b from-sliderGreenLight to-sliderGreenDark"
            : "bg-sliderOrangeLight"
        }`}
      >
        <div className="flex items-center gap-2 relative">
          <Image
            src={isDragging ? (isLeftSide ? redClose : greenClose) : whiteClose}
            alt="Close"
            width={24}
            height={24}
          />
          <span
            className={`text-lg font-medium ${
              isDragging
                ? isLeftSide
                  ? "text-redText"
                  : "text-greenText"
                : "text-white"
            }`}
          >
            Decline
          </span>
        </div>
        {!isDragging ? (
          <GlowingLeftArrows />
        ) : (
          <Image
            src={isLeftSide ? redLeftArrows : greenLeftArrows}
            alt="Left Arrows"
            width={50}
            height={50}
            className="scale-150 pr-2"
          />
        )}{" "}
        <div
          data-circle // Add this attribute to target the element
          onMouseDown={handleMouseDown}
          className="absolute -translate-x-1/2 hover:cursor-grab active:cursor-grabbing  "
          style={{
            left: `${position}px`, // Apply the position state as a pixel value
            zIndex: 1000,
          }}
        >
          <div className="pointer-events-none select-none">
            {isDragging ? (
              <Image
                src={isLeftSide ? redCircle : greenCircle}
                alt="Circle"
                width={150}
                height={150}
                style={{ transform: " scale(1.0)" }}
              />
            ) : (
              <GlowingCircle />
            )}
          </div>
        </div>
        {!isDragging ? (
          <GlowingRightArrows />
        ) : (
          <Image
            src={isLeftSide ? redRightArrows : greenRightArrows}
            alt="Right Arrows"
            width={50}
            height={50}
            className="scale-150 pl-2"
          />
        )}{" "}
        <div className="flex items-center gap-2">
          <span
            className={`text-lg font-medium ${
              isDragging
                ? isLeftSide
                  ? "text-redText"
                  : "text-greenText"
                : "text-white"
            }`}
          >
            Accept
          </span>
          <Image
            src={isDragging ? (isLeftSide ? redCheck : greenCheck) : whiteCheck}
            alt="Check"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
