import { useState } from "react";
import {
  User,
  School,
  FileText,
  CheckCircle,
  Upload,
  MapPin,
  Calendar,
  Phone,
  Mail,
  ChevronLeft,
} from "lucide-react";

// Shadcn/UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Custom MultiStepForm component 
import { MultiStepForm } from "@/components/forms/MultiStepForm";

import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// List of Namibian regions
const regions = [
  "Khomas", "Erongo", "Oshana", "Omusati", "Ohangwena",
  "Oshikoto", "Kavango East", "Kavango West", "Zambezi",
  "Kunene", "Otjozondjupa", "Omaheke", "Hardap", "ǁKaras"
];

// Available grades from Grade 1 to 12
const grades = [
  "Grade 0", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5",
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12"
];

// List of countries (alphabetical, based on ISO 3166-1)
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
  "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania",
  "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function ChildRegistration() {
  // Central form state holding all input values
  const [formData, setFormData] = useState({
    // Child Details
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "Namibian",
    idNumber: "",

    // School Selection
    region: "",
    school: "",
    grade: "",
    preferredLanguage: "",

    // Guardian Details
    guardianName: "",
    relationship: "",
    phone: "",
    email: "",
    address: "",

    // Documents & Additional Info
    birthCertificate: null, // File object
    previousReport: null,   // File object
    medicalInfo: "",
  });

  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to update any field in formData
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle final form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);

    // Success notification
    toast({
      title: "Registration Submitted!",
      description: "Your child's registration has been submitted successfully. You will receive a confirmation SMS shortly.",
    });
  };

  // Define the multi-step form structure
  const steps = [
    {
      id: "child-info",
      title: "Child Information",
      description: "Enter your child's personal details",
      content: (
        <div className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
              />
            </div>
          </div>

          {/* DOB & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select value={formData.gender} onValueChange={(v) => updateFormData("gender", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Nationality & ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => updateFormData("nationality", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID/Birth Certificate Number</Label>
              <Input
                id="idNumber"
                placeholder="Enter ID number"
                value={formData.idNumber}
                onChange={(e) => updateFormData("idNumber", e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },

    {
      id: "school-selection",
      title: "School Selection",
      description: "Choose your preferred school and grade",
      content: (
        <div className="space-y-4">
          {/* Region Selection */}
          <div className="space-y-2">
            <Label>Region *</Label>
            <Select value={formData.region} onValueChange={(v) => updateFormData("region", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region.toLowerCase()}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* School Selection - disabled until region is selected */}
          <div className="space-y-2">
            <Label>School *</Label>
            <Select
              value={formData.school}
              onValueChange={(v) => updateFormData("school", v)}
              disabled={!formData.region}
            >
              <SelectTrigger>
                <SelectValue placeholder={formData.region ? "Select school" : "Select a region first"} />
              </SelectTrigger>
              <SelectContent>
                {/* In a real app, schools would be filtered by selected region */}
                <SelectItem value="windhoek-high">Windhoek High School</SelectItem>
                <SelectItem value="windhoek-primary">Windhoek Primary School</SelectItem>
                <SelectItem value="jan-mohr">Jan Mohr Secondary School</SelectItem>
                <SelectItem value="concordia">Concordia College</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grade & Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Grade Applying For *</Label>
              <Select value={formData.grade} onValueChange={(v) => updateFormData("grade", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade.toLowerCase().replace(" ", "-")}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Preferred Language of Instruction</Label>
              <Select value={formData.preferredLanguage} onValueChange={(v) => updateFormData("preferredLanguage", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="afrikaans">Afrikaans</SelectItem>
                  <SelectItem value="oshiwambo">Oshiwambo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Show school info card when a school is selected */}
          {formData.school && (
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">School Location</p>
                    <p className="text-sm text-muted-foreground">123 Education Street, Windhoek</p>
                    <p className="text-sm text-muted-foreground">Contact: +264 61 123 4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ),
    },

    {
      id: "guardian-info",
      title: "Guardian Details",
      description: "Provide parent/guardian contact information",
      content: (
        <div className="space-y-4">
          {/* Guardian Name & Relationship */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guardianName">Full Name *</Label>
              <Input
                id="guardianName"
                placeholder="Enter guardian's full name"
                value={formData.guardianName}
                onChange={(e) => updateFormData("guardianName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Relationship to Child *</Label>
              <Select value={formData.relationship} onValueChange={(v) => updateFormData("relationship", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="guardian">Legal Guardian</SelectItem>
                  <SelectItem value="grandparent">Grandparent</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Phone & Email with icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+264 81 XXX XXXX"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="parent@email.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Physical Address *</Label>
            <Textarea
              id="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={(e) => updateFormData("address", e.target.value)}
            />
          </div>
        </div>
      ),
    },

    {
      id: "documents",
      title: "Documents & Review",
      description: "Upload required documents and review your application",
      content: (
        <div className="space-y-6">
          {/* Document Upload Areas (visual only for now) */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Birth Certificate (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Previous School Report (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalInfo">Medical Information (Optional)</Label>
              <Textarea
                id="medicalInfo"
                placeholder="Any medical conditions, allergies, or special needs we should know about"
                value={formData.medicalInfo}
                onChange={(e) => updateFormData("medicalInfo", e.target.value)}
              />
            </div>
          </div>

          {/* Summary Card */}
          <Card className="bg-accent/5 border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                Registration Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Child:</span>
                <span className="font-medium">{formData.firstName} {formData.lastName || "—"}</span>

                <span className="text-muted-foreground">Date of Birth:</span>
                <span className="font-medium">{formData.dateOfBirth || "—"}</span>

                <span className="text-muted-foreground">School:</span>
                <span className="font-medium">
                  {formData.school 
                    ? formData.school === "windhoek-high" ? "Windhoek High School" 
                    : formData.school === "windhoek-primary" ? "Windhoek Primary School"
                    : formData.school === "jan-mohr" ? "Jan Mohr Secondary School"
                    : "Concordia College"
                    : "—"}
                </span>

                <span className="text-muted-foreground">Grade:</span>
                <span className="font-medium">{formData.grade ? formData.grade.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) : "—"}</span>

                <span className="text-muted-foreground">Guardian:</span>
                <span className="font-medium">{formData.guardianName || "—"}</span>

                <span className="text-muted-foreground">Contact:</span>
                <span className="font-medium">{formData.phone || "—"}</span>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this application, you confirm that all information provided is accurate and complete.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Link */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Register a New Child
          </h1>
          <p className="text-muted-foreground mt-2">
            Complete the form below to submit an enrollment application
          </p>
        </div>

        {/* Multi-Step Form */}
        <Card>
          <CardContent className="p-6 lg:p-8">
            <MultiStepForm
              steps={steps}
              onComplete={handleSubmit}
              isSubmitting={isSubmitting}
              submitLabel="Submit Registration"
            />
          </CardContent>
        </Card>

        {/* Offline Registration Option */}
        <Card className="mt-6 bg-secondary/5 border-secondary/20">
          <CardContent className="p-4 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">No Internet? Register via SMS</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Send "REGISTER" to <strong>+264 81 1234 567</strong> and follow the prompts to register your child offline.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
