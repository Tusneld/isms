import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, School, BarChart3, MessageSquare } from "lucide-react";
import { ZitoChatbot } from "@/components/ZitoChatbot"; 

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            iSMS – Namibia School Management System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Empowering schools, teachers, parents, and learners with modern, easy-to-use digital tools.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Login as Admin</Button>
            <Button size="lg" variant="outline">Explore Features</Button>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Users className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Parent Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Track attendance, grades, fees, and communicate with teachers.</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <School className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Teacher Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Mark attendance, enter grades, manage classes efficiently.</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Admin Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Full reports, analytics, user management, and system control.</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="w-10 h-10 mb-2 text-primary" />
                <CardTitle>Zito Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Multilingual AI chatbot in English, Oshiwambo, and Afrikaans.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-6 text-center text-sm text-muted-foreground">
          © 2026 iSMS – Proudly made for Namibian schools 🇳🇦
        </footer>
      </div>

      {/* Floating Chatbot */}
      <ZitoChatbot />
    </>
  );
}