
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RefreshCw, Laptop, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const { user } = useAuth();

  // Mock settings
  const [currentSemester, setCurrentSemester] = React.useState("Fall 2023");
  const [autoExpirePermits, setAutoExpirePermits] = React.useState(true);
  const [permitValidityDays, setPermitValidityDays] = React.useState("30");
  const [notificationMethod, setNotificationMethod] = React.useState("email");

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully!");
  };

  const handleResetSystem = () => {
    toast.success("System reset complete!");
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-university-primary text-white p-6 pt-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="opacity-90 font-medium">Manage system configuration</p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentSemester">Current Semester</Label>
              <Select value={currentSemester} onValueChange={setCurrentSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spring 2023">Spring 2023</SelectItem>
                  <SelectItem value="Summer 2023">Summer 2023</SelectItem>
                  <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                  <SelectItem value="Winter 2024">Winter 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="autoExpire">Auto-expire permits</Label>
                <Switch
                  id="autoExpire"
                  checked={autoExpirePermits}
                  onCheckedChange={setAutoExpirePermits}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically expire permits after the exam date
              </p>
            </div>

            {autoExpirePermits && (
              <div className="space-y-2">
                <Label htmlFor="validityDays">Permit validity (days)</Label>
                <Input
                  id="validityDays"
                  type="number"
                  value={permitValidityDays}
                  onChange={(e) => setPermitValidityDays(e.target.value)}
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveGeneral}>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how users receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={notificationMethod} onValueChange={setNotificationMethod}>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Both</Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotifications}>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Advanced Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>System maintenance options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Button variant="outline" className="w-full" onClick={handleResetSystem}>
                <RefreshCw className="mr-2 h-4 w-4" /> Reset Permit System
              </Button>
            </div>
            <Separator />
            <div className="pt-2">
              <p className="text-muted-foreground text-sm mb-4">System Information</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Version</span>
                  <span className="font-mono">1.2.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Last updated</span>
                  <span>April 12, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" /> Online
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default SettingsPage;
