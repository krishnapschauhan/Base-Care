import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    location: "",
    description: "",
    priority: ""
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    const reportId = `CW-${Date.now().toString().slice(-6)}`;
    
    toast({
      title: "Report submitted",
      description: `Report ID: ${reportId}. We'll contact you within 48 hours.`,
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      issueType: "",
      location: "",
      description: "",
      priority: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Report an Issue
            </h1>
            <p className="text-xl text-gray-600">
              Help us improve the community together
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-white">
            <CardHeader className="pb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center">Issue Details</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="mt-2 border-2 border-gray-300 focus:border-blue-500 p-3 text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="mt-2 border-2 border-gray-300 focus:border-blue-500 p-3 text-lg"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-2 border-2 border-gray-300 focus:border-blue-500 p-3 text-lg"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="issueType" className="text-lg font-semibold text-gray-700">Issue Type *</Label>
                    <Select value={formData.issueType} onValueChange={(value) => handleInputChange("issueType", value)}>
                      <SelectTrigger className="mt-2 border-2 border-gray-300 focus:border-blue-500 p-3 text-lg">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical">⚡ Electrical</SelectItem>
                        <SelectItem value="water">💧 Water</SelectItem>
                        <SelectItem value="road">🚗 Road</SelectItem>
                        <SelectItem value="sanitary">🗑️ Sanitation</SelectItem>
                        <SelectItem value="other">📋 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority" className="text-lg font-semibold text-gray-700">Priority *</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger className="mt-2 border-2 border-gray-300 focus:border-blue-500 p-3 text-lg">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">🟢 Low</SelectItem>
                        <SelectItem value="medium">🟡 Medium</SelectItem>
                        <SelectItem value="high">🟠 High</SelectItem>
                        <SelectItem value="emergency">🔴 Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-lg font-semibold text-gray-700">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Address or area"
                    required
                    className="mt-2 border-2 border-gray-300 focus:border-blue-500 p-3 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-lg font-semibold text-gray-700">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the issue in detail..."
                    required
                    className="mt-2 min-h-[120px] border-2 border-gray-300 focus:border-blue-500 p-3 text-lg"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  disabled={!formData.name || !formData.email || !formData.issueType || !formData.location || !formData.description || !formData.priority}
                >
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
