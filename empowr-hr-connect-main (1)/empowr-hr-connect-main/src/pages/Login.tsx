import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { users } from "@/data/users";
import { LogIn, Check, Shield, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Check for existing logged in user
  useEffect(() => {
    const user = localStorage.getItem("hrm-user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value) setIsValidEmail(validateEmail(value));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !password) {
      toast({
        title: "Invalid input",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    // Simulate API authentication
    setTimeout(() => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Store user in localStorage for persistence AND use the auth context
        localStorage.setItem("hrm-user", JSON.stringify(user));
        login(user); // Use the auth context login function
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}`,
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Hero/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/90 to-blue-600 text-white p-8 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">HR Operations Manager</h1>
          <p className="text-white/80">Complete human resource management solution</p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2 rounded-full">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Employee Management</h3>
              <p className="text-white/70 text-sm">Complete employee lifecycle management from onboarding to offboarding</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2 rounded-full">
              <Check className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Performance Tracking</h3>
              <p className="text-white/70 text-sm">Set goals, track progress, and manage performance reviews</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-2 rounded-full">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium">Policy Management</h3>
              <p className="text-white/70 text-sm">Centralized hub for company policies and procedures</p>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-white/60">© 2025 HR Operations Manager. All rights reserved.</p>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">HR Operations Manager</h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={handleEmailChange}
                      className={`pr-8 ${!isValidEmail && email ? 'border-red-400 focus:ring-red-400' : ''}`}
                      required
                    />
                    {email && !isValidEmail && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xs">
                        Invalid email
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <a 
                      href="#" 
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      className={isPasswordFocused ? "border-primary focus:ring-primary" : ""}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      <span>Sign in</span>
                    </div>
                  )}
                </Button>
              </CardFooter>
            </form>
            <div className="p-6 pt-0 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-primary font-medium hover:underline">
                  Contact admin
                </a>
              </p>
            </div>
          </Card>
          
          <div className="mt-8 text-center md:hidden">
            <p className="text-xs text-gray-500">© 2025 HR Operations Manager. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
