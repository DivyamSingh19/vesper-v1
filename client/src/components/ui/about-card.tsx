"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import Image from "next/image";
import ViewRepo from "../buttons/view-repo";
import Back from "../buttons/back-button";
import { useRouter } from "next/navigation";

interface props {
  className?: string;
}

const AboutCard = ({ className }: props) => {
  const router = useRouter();
  return (
    <div
      className={`flex min-h-screen justify-center items-center p-4 sm:p-6 md:p-10${
        className || ""
      }`}
    >
      <Card className="max-w-full p-4 rounded-2xl">
        <CardHeader className="flex flex-row justify-between items-center gap-4 ">
          <CardTitle className="font-playfair text-2xl sm:text-3xl ">
            Vesper
          </CardTitle>
          <CardAction>
            <ViewRepo
              onClick={() =>
                window.open(
                  "https://github.com/DivyamSingh19/vesper-v1",
                  "_blank"
                )
              }
            />
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-8">
          <div className="flex flex-col gap-3 md:gap-5 lg:max-w-5xl lg:w-full font-sans text-sm sm:text-base md:text-lg lg:text-xl order-2 lg:order-1">
            <p className="leading-relaxed">
              Vesper is a comprehensive legal aid platform that democratizes
              access to legal understanding through advanced AI-powered document
              summarization and interactive flowchart generation for
              personalized legal guidance.
            </p>
            <p className="leading-relaxed">
              The platform features complete multilingual support,
              text-to-speech and speech-to-text capabilities for accessibility,
              and leverages IPFS blockchain technology for secure, tamper-proof
              document storage and one-click encrypted sharing between clients
              and legal teams.
            </p>
            <p className="leading-relaxed">
              With integrated appointment booking systems for both legal
              professionals and clients, Vesper's core mission is to decode
              complex legal jargon into understandable language, ensuring
              everyone knows their rights regardless of their background or
              abilities, while providing free, universal access to legal care
              and eliminating barriers to justice through technology-driven
              solutions.
            </p>
          </div>

          <div className="relative w-full h-48 sm:h-56 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 flex-shrink-0 order-1 lg:order-2 rounded-lg overflow-hidden">
            <Image
              src="/images/kdot.jpg"
              alt="kenny"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              priority
            />
          </div>
        </CardContent>

        <CardFooter className="pt-4 sm:pt-6">
          <Back className="" onClick={() => router.push("/")} />
        </CardFooter>
      </Card>
    </div>
  );
};

export { AboutCard };
