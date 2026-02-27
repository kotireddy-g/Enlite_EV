import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Zap, LogOut, RefreshCw, Search, Users, Calendar, CheckCircle2,
    Phone, Mail, Car, MessageSquare, ChevronDown, ChevronUp, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Booking {
    id: number;
    full_name: string;
    phone_number: string;
    email: string;
    vehicle_type: string;
    service_type: string;
    message: string;
    status: string;
    created_at: string;
}

interface ApiResponse {
    status: boolean;
    data: Booking[];
}

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    { value: "contacted", label: "Contacted", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { value: "resolved", label: "Resolved", color: "bg-green-100 text-green-800 border-green-200" },
];

function statusStyle(status: string) {
    return STATUS_OPTIONS.find((s) => s.value === status)?.color ?? "bg-gray-100 text-gray-700 border-gray-200";
}

function statusLabel(status: string) {
    return STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
}

export default function AdminDashboard() {
    const [, navigate] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<"newest" | "oldest">("newest");
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // Auth guard
    useEffect(() => {
        if (!localStorage.getItem("adminToken")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        navigate("/login");
    };

    const { data, isLoading, isError, refetch, isFetching } = useQuery<ApiResponse>({
        queryKey: ["admin-bookings"],
        queryFn: async () => {
            const res = await fetch("https://enliteev.com/api/get_bookings.php");
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        },
        refetchInterval: 60_000,
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }: { id: number; status: string }) => {
            const res = await fetch("https://enliteev.com/api/update_booking_status.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (!res.ok) throw new Error("Update failed");
            return res.json();
        },
        onSuccess: (_, { status }) => {
            queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
            toast({ title: `Status updated to "${statusLabel(status)}" ✅` });
        },
        onError: () => {
            toast({ title: "Failed to update status", variant: "destructive" });
        },
    });

    const bookings = data?.data ?? [];

    const filtered = bookings
        .filter((b) => {
            const q = search.toLowerCase();
            return (
                b.full_name.toLowerCase().includes(q) ||
                b.phone_number.includes(q) ||
                b.email.toLowerCase().includes(q) ||
                b.vehicle_type.toLowerCase().includes(q) ||
                b.service_type.toLowerCase().includes(q)
            );
        })
        .sort((a, b) =>
            sort === "newest"
                ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const contacted = bookings.filter((b) => b.status === "contacted").length;
    const resolved = bookings.filter((b) => b.status === "resolved").length;

    const today = new Date().toDateString();
    const todayCount = bookings.filter(
        (b) => new Date(b.created_at).toDateString() === today
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-sm leading-none">Enlite EV Care</p>
                            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden sm:block text-xs text-muted-foreground">
                            {localStorage.getItem("adminEmail")}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="gap-1.5"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
                            Refresh
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50">
                            <LogOut className="w-3.5 h-3.5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { icon: Users, label: "Total Leads", value: total, bg: "bg-gradient-to-br from-green-500 to-green-600" },
                        { icon: Calendar, label: "Today", value: todayCount, bg: "bg-gradient-to-br from-blue-500 to-blue-600" },
                        { icon: Clock, label: "Pending", value: pending, bg: "bg-gradient-to-br from-yellow-500 to-orange-500" },
                        { icon: CheckCircle2, label: "Resolved", value: resolved, bg: "bg-gradient-to-br from-emerald-500 to-teal-500" },
                    ].map(({ icon: Icon, label, value, bg }) => (
                        <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border flex items-center gap-4">
                            <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0`}>
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{value}</p>
                                <p className="text-xs text-muted-foreground">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, phone, email, vehicle or service..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
                        className="px-3 py-2 rounded-lg border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400/40"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl h-20 animate-pulse border" />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <p className="text-red-600 font-semibold">Failed to load bookings</p>
                        <p className="text-sm text-red-400 mt-1">Please check your connection and try again.</p>
                        <Button variant="outline" onClick={() => refetch()} className="mt-4">Retry</Button>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white border rounded-2xl p-12 text-center text-muted-foreground">
                        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">{search ? "No bookings match your search" : "No bookings yet"}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((booking) => {
                            const isExpanded = expandedId === booking.id;
                            return (
                                <div key={booking.id} className="bg-white border rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
                                    {/* Row */}
                                    <div
                                        className="flex items-center gap-3 px-5 py-4 cursor-pointer"
                                        onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                                    >
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            {booking.full_name.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-semibold text-sm">{booking.full_name}</span>
                                                <span className="text-xs text-muted-foreground">#{booking.id}</span>
                                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                                    {booking.vehicle_type}
                                                </Badge>
                                                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                                                    {booking.service_type}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{booking.phone_number}</span>
                                                {booking.email && <span className="hidden sm:flex items-center gap-1"><Mail className="w-3 h-3" />{booking.email}</span>}
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(booking.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                                            </div>
                                        </div>

                                        {/* Status + expand */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyle(booking.status)}`}>
                                                {statusLabel(booking.status)}
                                            </span>
                                            {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                                        </div>
                                    </div>

                                    {/* Expanded */}
                                    {isExpanded && (
                                        <div className="border-t bg-slate-50/70 px-5 py-4 space-y-4">
                                            {/* Message */}
                                            {booking.message && (
                                                <div className="flex gap-2">
                                                    <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                                    <p className="text-sm text-muted-foreground">{booking.message}</p>
                                                </div>
                                            )}

                                            {/* Contact info */}
                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Phone className="w-3.5 h-3.5" />
                                                    <a href={`tel:${booking.phone_number}`} className="text-blue-600 hover:underline">{booking.phone_number}</a>
                                                </span>
                                                {booking.email && (
                                                    <span className="flex items-center gap-1.5 text-muted-foreground">
                                                        <Mail className="w-3.5 h-3.5" />
                                                        <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">{booking.email}</a>
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Car className="w-3.5 h-3.5" />
                                                    {booking.vehicle_type} — {booking.service_type}
                                                </span>
                                            </div>

                                            {/* Status Update */}
                                            <div className="flex flex-wrap items-center gap-2 pt-1">
                                                <span className="text-xs font-medium text-muted-foreground">Update Status:</span>
                                                {STATUS_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        disabled={booking.status === opt.value || updateStatusMutation.isPending}
                                                        onClick={() => updateStatusMutation.mutate({ id: booking.id, status: opt.value })}
                                                        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all
                              ${booking.status === opt.value
                                                                ? `${opt.color} opacity-60 cursor-default`
                                                                : `bg-white border-gray-200 hover:${opt.color} hover:opacity-80 cursor-pointer`
                                                            }`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <p className="text-center text-xs text-muted-foreground pt-2">
                            Showing {filtered.length} of {total} bookings
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
