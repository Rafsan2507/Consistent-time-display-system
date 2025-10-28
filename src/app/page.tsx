"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-[100vh] bg-violet-50">
      <div className="flex justify-center pt-[5vh] mb-[10vh] font-extrabold text-4xl text-blue-500">
        Consistent Time Display System
      </div>
      <div className="mt-[30vh] flex justify-around max-w-4xl mx-auto px-8">
        <Button onClick={() => router.push("/delivery")} className="px-12 py-6 text-xl h-auto rounded-2xl">
          Delivery Time
        </Button>
        <Button onClick={() => router.push("/payment")} className="px-12 py-6 text-xl h-auto rounded-2xl">
          Payment Deadline
        </Button>
      </div>
    </div>
  );
}
