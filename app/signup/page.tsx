"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add your Supabase / API signup call here
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              required
              className="bg-background text-foreground"
            />
            <Input
              type="email"
              placeholder="Email"
              required
              className="bg-background text-foreground"
            />
            <Input
              type="password"
              placeholder="Password"
              required
              className="bg-background text-foreground"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-primary-foreground/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline hover:text-primary-foreground"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
