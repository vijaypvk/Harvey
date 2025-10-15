    import { MapPin, Phone, Mail, Star } from "lucide-react";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
    import { Button } from "../components/ui/button";
    import { Input } from "../components/ui/input";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
    import { useState } from "react";

    const lawyers = [
        {
            id: "1",
            name: "Adv. Rajesh Kumar",
            specialization: "Criminal Law",
            rating: 4.8,
            location: "Delhi High Court",
            phone: "+91 98765 43210",
            email: "rajesh.kumar@law.com",
            experience: "15 years",
        },
        {
            id: "2",
            name: "Adv. Priya Sharma",
            specialization: "Civil Law",
            rating: 4.9,
            location: "Supreme Court",
            phone: "+91 98765 43211",
            email: "priya.sharma@law.com",
            experience: "12 years",
        },
        {
            id: "3",
            name: "Adv. Amit Patel",
            specialization: "Corporate Law",
            rating: 4.7,
            location: "Mumbai High Court",
            phone: "+91 98765 43212",
            email: "amit.patel@law.com",
            experience: "10 years",
        },
        {
            id: "4",
            name: "Adv. Meera Desai",
            specialization: "Family Law",
            rating: 4.6,
            location: "Bangalore District Court",
            phone: "+91 98765 43213",
            email: "meera.desai@law.com",
            experience: "8 years",
        },
        {
            id: "5",
            name: "Adv. Arjun Reddy",
            specialization: "Criminal Law",
            rating: 4.5,
            location: "Hyderabad High Court",
            phone: "+91 98765 43214",
            email: "arjun.reddy@law.com",
            experience: "11 years",
        },
        {
            id: "6",
            name: "Adv. Kavita Nair",
            specialization: "Property Law",
            rating: 4.8,
            location: "Kerala High Court",
            phone: "+91 98765 43215",
            email: "kavita.nair@law.com",
            experience: "14 years",
        },
        {
            id: "7",
            name: "Adv. Vikram Singh",
            specialization: "Corporate Law",
            rating: 4.9,
            location: "Gurugram District Court",
            phone: "+91 98765 43216",
            email: "vikram.singh@law.com",
            experience: "16 years",
        },
        {
            id: "8",
            name: "Adv. Anjali Verma",
            specialization: "Consumer Law",
            rating: 4.7,
            location: "Pune District Court",
            phone: "+91 98765 43217",
            email: "anjali.verma@law.com",
            experience: "9 years",
        },
        {
            id: "9",
            name: "Adv. Suresh Iyer",
            specialization: "Civil Law",
            rating: 4.6,
            location: "Chennai High Court",
            phone: "+91 98765 43218",
            email: "suresh.iyer@law.com",
            experience: "13 years",
        },
    ];

    export default function Lawyers() {
        const [searchTerm, setSearchTerm] = useState("");
        const [filterSpecialization, setFilterSpecialization] = useState("all");

        const filteredLawyers = lawyers.filter((lawyer) => {
            const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterSpecialization === "all" || lawyer.specialization === filterSpecialization;
            return matchesSearch && matchesFilter;
        });

        return (
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Find Lawyers</h1>
                    <p className="text-muted-foreground">
                        Connect with experienced legal professionals near you
                    </p>
                </div>

                {/* Filters */}
                <Card className="card-glow bg-card border-border">
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <Input
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 bg-background border-border"
                            />
                            <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
                                <SelectTrigger className="w-48 bg-background border-border">
                                    <SelectValue placeholder="Specialization" />
                                </SelectTrigger>
                                <SelectContent className="bg-card border-border">
                                    <SelectItem value="all">All Specializations</SelectItem>
                                    <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                                    <SelectItem value="Civil Law">Civil Law</SelectItem>
                                    <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                                    <SelectItem value="Family Law">Family Law</SelectItem>
                                    <SelectItem value="Property Law">Property Law</SelectItem>
                                    <SelectItem value="Consumer Law">Consumer Law</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Lawyers List */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredLawyers.map((lawyer) => (
                        <Card key={lawyer.id} className="card-glow bg-card border-border">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{lawyer.name}</CardTitle>
                                        <CardDescription>{lawyer.specialization}</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                                        <Star className="h-3 w-3 text-primary fill-primary" />
                                        <span className="text-sm font-medium text-primary">{lawyer.rating}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{lawyer.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        <span>{lawyer.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <span className="truncate">{lawyer.email}</span>
                                    </div>
                                    <div className="pt-1">
                                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                                            {lawyer.experience} experience
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button className="flex-1 bg-[#303030] shadow-glow">
                                        Book Consultation
                                    </Button>
                                    <Button variant="outline" size="icon" className="border-border">
                                        <Mail className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
