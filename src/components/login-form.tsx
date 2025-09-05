"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const BOSS_PASSWORD = "asphalt2025";

export function LoginForm() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
        if (password === BOSS_PASSWORD) {
          toast({
            title: "Success!",
            description: "Access granted. Welcome, Boss!",
            className: "bg-primary text-primary-foreground",
          });
          try {
            sessionStorage.setItem('isAuthenticated', 'true');
            router.push('/boss-quarters');
          } catch (error) {
            console.error("Session storage is not available.");
             toast({
              variant: "destructive",
              title: "Login Error",
              description: "Could not save session. Please enable cookies/session storage.",
            });
            setIsLoading(false);
          }
        } else {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "Incorrect password. Please try again.",
          });
          setIsLoading(false);
          setPassword('');
        }
    }, 1000);
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
        {isLoading && <Loader2 className="animate-spin" />}
        {isLoading ? 'ACCESSING...' : 'ACCESS'}
      </Button>
    </form>
  );
}
