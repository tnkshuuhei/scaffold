"use client";
import { Button } from "@/components/ui/button";
import { showSuccessToast } from "@/hooks/useNotification";

export default function Home() {
  function handleClick() {
    showSuccessToast("https://github.com/tnkshuuhei");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={handleClick}>Click me</Button>
    </main>
  );
}
