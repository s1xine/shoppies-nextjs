"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/admin/_lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await loginAdmin(username, password);

    if (result.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(result.error || "Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--admin-bg)] p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 admin-gradient blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 admin-gradient blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-[var(--admin-border)] bg-[var(--admin-card)] shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl admin-gradient flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-[var(--admin-fg)]">
              Admin Panel
            </CardTitle>
            <CardDescription className="text-[var(--admin-muted-foreground)] mt-1">
              Sign in to manage your store
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-lg border border-red-500/20 text-center animate-in fade-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="admin-username"
                className="text-sm font-medium text-[var(--admin-fg)]"
              >
                Username
              </label>
              <Input
                id="admin-username"
                type="text"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-[var(--admin-muted)] border-[var(--admin-border)] text-[var(--admin-fg)] placeholder:text-[var(--admin-muted-foreground)] focus-visible:ring-[var(--admin-ring)]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="admin-password"
                className="text-sm font-medium text-[var(--admin-fg)]"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 bg-[var(--admin-muted)] border-[var(--admin-border)] text-[var(--admin-fg)] placeholder:text-[var(--admin-muted-foreground)] focus-visible:ring-[var(--admin-ring)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--admin-muted-foreground)] hover:text-[var(--admin-fg)] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full admin-gradient text-white hover:opacity-90 transition-opacity font-semibold h-11"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-xs text-center text-[var(--admin-muted-foreground)] mt-6">
            This is a restricted area. Unauthorized access is prohibited.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
