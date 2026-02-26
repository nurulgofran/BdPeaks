import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";

interface Contribution {
    id: number;
    contributorName: string;
    mountainName: string;
    latitude: string;
    longitude: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
}

export default function AdminDashboard() {
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchContributions = async () => {
        setIsLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const res = await fetch(`${apiUrl}/api/contributions`);
            if (!res.ok) throw new Error("Failed to fetch data");
            const data = await res.json();
            setContributions(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load contributions");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContributions();
    }, []);

    const copyToClipboard = (lat: string, lng: string) => {
        navigator.clipboard.writeText(`${lat}, ${lng}`);
        toast.success("Coordinates copied to clipboard");
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING": return <Badge variant="outline" className="text-yellow-500 bg-yellow-500/10 border-yellow-500/20"><RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Pending</Badge>;
            case "APPROVED": return <Badge variant="outline" className="text-emerald-500 bg-emerald-500/10 border-emerald-500/20"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
            case "REJECTED": return <Badge variant="outline" className="text-red-500 bg-red-500/10 border-red-500/20"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <PageTransition>
            <main className="container py-8 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Review and manage community contributions.</p>
                    </div>
                    <Button variant="outline" onClick={fetchContributions} disabled={isLoading}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>

                <div className="border border-border rounded-xl px-1 overflow-hidden bg-card/50">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead>Date</TableHead>
                                <TableHead>Contributor</TableHead>
                                <TableHead>Target Peak</TableHead>
                                <TableHead>Coordinates (Lat, Lng)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Loading contributions...</TableCell>
                                </TableRow>
                            ) : contributions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">No contributions found.</TableCell>
                                </TableRow>
                            ) : (
                                contributions.map((item) => (
                                    <TableRow key={item.id} className="cursor-default">
                                        <TableCell className="text-muted-foreground whitespace-nowrap">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="font-medium">{item.contributorName}</TableCell>
                                        <TableCell>{item.mountainName}</TableCell>
                                        <TableCell className="font-mono text-xs">
                                            <div className="flex items-center gap-2">
                                                {item.latitude}, {item.longitude}
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => copyToClipboard(item.latitude, item.longitude)}>
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="outline" className="text-xs mr-2">Approve</Button>
                                            <Button size="sm" variant="ghost" className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10">Reject</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </PageTransition>
    );
}
