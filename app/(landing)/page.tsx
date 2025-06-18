/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Download,
  Infinity,
  NotebookText,
  Receipt,
  Rocket,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Clock,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DemoPreview from "./components/demoPreview";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 min-h-screen">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gray-800/20 rounded-xl blur-lg"></div>
                <Image
                  src="/receipt copy.png"
                  width={48}
                  height={48}
                  className="relative rounded-xl shadow-lg"
                  alt="Invoice Generator Logo"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent">
                  InvoiceFlow
                </h1>
                <p className="text-sm text-gray-600">Professional & Free</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors font-medium">
                Features
              </a>
              <a href="#demo" className="text-gray-600 hover:text-gray-800 transition-colors font-medium">
                Demo
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-800 transition-colors font-medium">
                Pricing
              </a>
              <Link
                href="/new"
                className="bg-gradient-to-r from-gray-800 to-slate-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-gray-900 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/5 to-slate-700/5"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-gray-700 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Free Forever • No Sign-up Required
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              <span className="block">Create Stunning</span>
              <span className="bg-gradient-to-r from-gray-800 via-slate-700 to-gray-600 bg-clip-text text-transparent">
                Invoices
              </span>
              <span className="block text-5xl md:text-6xl mt-2">in Seconds</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              The most beautiful, professional invoice generator that helps you get paid faster. 
              Trusted by thousands of freelancers and businesses worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                href="/new"
                className="group inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-gray-800 to-slate-700 rounded-2xl hover:from-gray-900 hover:to-slate-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-gray-500/25"
              >
                <Zap className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Create Invoice Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                target="_blank"
                href="https://github.com/Vineetjassal/Invoice"
                className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-2xl hover:border-gray-300 hover:text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3"
                >
                  <path
                    d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                View Source
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "10K+", label: "Happy Users", icon: Users },
                { number: "50K+", label: "Invoices Created", icon: Receipt },
                { number: "100%", label: "Free Forever", icon: Infinity },
                { number: "5★", label: "User Rating", icon: Star },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-700 to-slate-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section id="demo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-gray-700 text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Live Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              See Your Invoice
              <span className="bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent"> Come to Life</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch as your professional invoice takes shape with our real-time preview. 
              Every detail perfectly crafted for maximum impact.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
              <DemoPreview />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm font-medium mb-6">
              <Rocket className="w-4 h-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent"> Get Paid</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional invoicing made simple with features that help you focus on what matters most - your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Create professional invoices in under 30 seconds. No complex setup or learning curve required.",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: Infinity,
                title: "Unlimited & Free",
                description: "Generate unlimited invoices forever. No hidden fees, subscriptions, or premium plans.",
                gradient: "from-gray-700 to-slate-600"
              },
              {
                icon: NotebookText,
                title: "Beautiful Templates",
                description: "Professionally designed templates that make your business look credible and trustworthy.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data stays private. No account required, no data collection, completely secure.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Clock,
                title: "Get Paid Faster",
                description: "Professional invoices reduce payment delays and improve your cash flow significantly.",
                gradient: "from-red-500 to-rose-500"
              },
              {
                icon: Globe,
                title: "Multi-Currency",
                description: "Support for 15+ currencies with automatic formatting and currency symbols.",
                gradient: "from-cyan-500 to-blue-500"
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl from-gray-500 to-slate-500"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-800 via-slate-700 to-gray-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Transform Your
            <span className="block">Invoicing Process?</span>
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who've streamlined their billing and improved their cash flow with InvoiceFlow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/new"
              className="group inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-gray-800 bg-white rounded-2xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/25"
            >
              <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce" />
              Start Creating Invoices
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center space-x-2 text-gray-100">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">No signup required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 InvoiceFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;