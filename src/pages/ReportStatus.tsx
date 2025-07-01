
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, CheckCircle, AlertCircle } from "lucide-react";

const ReportStatus = () => {
  const [reportId, setReportId] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration
  const mockReports = {
    "CW-123456": {
      id: "CW-123456",
      type: "Water Problems",
      location: "Main Street, Block A",
      description: "Water pipe leak causing flooding",
      status: "In Progress",
      priority: "High",
      dateReported: "2024-01-15",
      lastUpdated: "2024-01-18",
      estimatedCompletion: "2024-01-22",
      updates: [
        { date: "2024-01-18", message: "Repair team assigned and dispatched" },
        { date: "2024-01-16", message: "Issue verified and approved for repair" },
        { date: "2024-01-15", message: "Report submitted and under review" }
      ]
    },
    "CW-789012": {
      id: "CW-789012",
      type: "Road Issues",
      location: "Park Avenue near School",
      description: "Large pothole causing traffic disruption",
      status: "Completed",
      priority: "Medium",
      dateReported: "2024-01-10",
      lastUpdated: "2024-01-14",
      estimatedCompletion: "Completed",
      updates: [
        { date: "2024-01-14", message: "Pothole repair completed and road reopened" },
        { date: "2024-01-12", message: "Road work in progress" },
        { date: "2024-01-10", message: "Report submitted and scheduled for repair" }
      ]
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    
    setTimeout(() => {
      const result = mockReports[reportId as keyof typeof mockReports];
      setSearchResult(result || "not_found");
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Check Report Status
            </h1>
            <p className="text-lg text-gray-600">
              Track the progress of your reported issues using your report ID
            </p>
          </div>

          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Report
              </CardTitle>
              <CardDescription>
                Enter your report ID to check the current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="reportId">Report ID</Label>
                  <Input
                    id="reportId"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                    placeholder="e.g., CW-123456"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch}
                    disabled={!reportId || isSearching}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {searchResult === "not_found" && (
            <Card className="shadow-lg border-red-200">
              <CardContent className="pt-6">
                <div className="text-center text-red-600">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Report Not Found</h3>
                  <p>No report found with ID: {reportId}</p>
                  <p className="text-sm mt-2">Please check your report ID and try again.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {searchResult && searchResult !== "not_found" && (
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Report #{searchResult.id}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {searchResult.type} • {searchResult.location}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(searchResult.status)} flex items-center gap-1`}>
                    {getStatusIcon(searchResult.status)}
                    {searchResult.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Issue Details</h4>
                    <p className="text-gray-600 mb-4">{searchResult.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Priority:</span>
                        <Badge variant="outline">{searchResult.priority}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Date Reported:</span>
                        <span>{searchResult.dateReported}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Last Updated:</span>
                        <span>{searchResult.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Est. Completion:</span>
                        <span>{searchResult.estimatedCompletion}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Progress Updates</h4>
                    <div className="space-y-3">
                      {searchResult.updates.map((update: any, index: number) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{update.message}</p>
                            <p className="text-xs text-gray-500">{update.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Try these sample report IDs: <strong>CW-123456</strong> or <strong>CW-789012</strong>
            </p>
            <p className="text-sm text-gray-500">
              Don't have your report ID? Check your email confirmation or contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportStatus;
