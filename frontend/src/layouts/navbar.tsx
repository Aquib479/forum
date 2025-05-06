"use client";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useForum } from "@/hooks/useForum";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { searchTerm, setSearchTerm } = useForum();
  const router = useRouter();
  return (
    <nav className="bg-gray-700">
      <div className="container mx-auto h-14 px-2 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-50">
          <Link href={"/"}>Community Forum</Link>
        </h1>
        <div className="flex items-center gap-4">
          <div className="lg:flex hidden items-center space-x-2 bg-white py-1 px-2 rounded-full">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              className="outline-none text-sm py-1"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search forum"
            />
          </div>
          <CircleUserRound
            size={32}
            className="text-white cursor-pointer"
            onClick={() => router.push("/profile")}
          />
        </div>
      </div>
    </nav>
  );
}
