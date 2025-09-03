"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BOSS_PASSWORD = "paul2025";

export function LoginForm() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === BOSS_PASSWORD) {
      toast({
        title: "Success!",
        description: "Access granted. Welcome, Boss!",
      });
      try {
        sessionStorage.setItem('isAuthenticated', 'true');
        router.push('/boss-quarters');
      } catch (error) {
        console.error("Session storage is not available.");
        // Fallback for environments where sessionStorage is disabled/unavailable
         toast({
          variant: "destructive",
          title: "Login Error",
          description: "Could not save session. Please enable cookies/session storage.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Incorrect password.",
      });
      setIsLoading(false);
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input
        type="password"
        placeholder="Enter password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        autoFocus
      />
      <Button type="submit" className="w-full font-bold" disabled={isLoading}>
        {isLoading ? 'ACCESSING...' : 'ACCESS'}
      </Button>
    </form>
  );
}
