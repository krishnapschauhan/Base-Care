
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
              About CivicWatch
            </h1>
            <p className="text-gray-600">
              Simple reporting for better communities
            </p>
          </div>

          <div className="space-y-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  CivicWatch connects citizens with local government to report and resolve 
                  community issues efficiently. We believe every voice matters in building 
                  better neighborhoods.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mt-0.5">1</div>
                    <span className="text-gray-600">Report an issue</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mt-0.5">2</div>
                    <span className="text-gray-600">We assign to relevant department</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mt-0.5">3</div>
                    <span className="text-gray-600">Track progress</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mt-0.5">4</div>
                    <span className="text-gray-600">Issue gets resolved</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-900 font-medium">Emergency:</span>
                    <span className="text-gray-600 ml-2">911</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Support:</span>
                    <span className="text-gray-600 ml-2">(555) 123-CIVIC</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">Hours:</span>
                    <span className="text-gray-600 ml-2">Mon-Fri, 8AM-6PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
