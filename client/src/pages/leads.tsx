import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Search,
    RefreshCw,
    Users,
    Zap,
    Wrench,
    Calendar,
    Phone,
    Mail,
    MessageSquare,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

interface Booking {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
    vehicle_type: string;
    service_type: string;
    message: string;
    created_at: string;
}

interface ApiResponse {
    status: boolean;
    data: Booking[];
}

const SERVICE_COLORS: Record<string, string> = {
    repair: "bg-red-100 text-red-700 border-red-200",
    maintenance: "bg-blue-100 text-blue-700 border-blue-200",
    diagnostics: "bg-purple-100 text-purple-700 border-purple-200",
    emergency: "bg-orange-100 text-orange-700 border-orange-200",
    "battery checkup": "bg-yellow-100 text-yellow-700 border-yellow-200",
};

const VEHICLE_COLORS: Record<string, string> = {
    "2-wheeler": "bg-green-100 text-green-700 border-green-200",
    "3-wheeler": "bg-teal-100 text-teal-700 border-teal-200",
    bus: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

function getServiceColor(type: string) {
    return SERVICE_COLORS[type.toLowerCase()] ?? "bg-gray-100 text-gray-700 border-gray-200";
}

function getVehicleColor(type: string) {
    return VEHICLE_COLORS[type.toLowerCase()] ?? "bg-gray-100 text-gray-700 border-gray-200";
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function LeadsPage() {
    const [search, setSearch] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const { data, isLoading, isError, refetch, isFetching } = useQuery<ApiResponse>({
        queryKey: ["leads"],
        queryFn: async () => {
            const res = await fetch("https://enliteev.com/api/get_bookings.php");
            if (!res.ok) throw new Error("Failed to fetch leads");
            return res.json();
        },
        refetchInterval: 60_000,
    });

    const bookings: Booking[] = data?.data ?? [];

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
        .sort((a, b) => {
            const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
            return sortOrder === "desc" ? -diff : diff;
        });

    const totalLeads = bookings.length;
    const uniqueVehicles = new Set(bookings.map((b) => b.vehicle_type)).size;
    const uniqueServices = new Set(bookings.map((b) => b.service_type)).size;
    const todayCount = bookings.filter(
        (b) => new Date(b.created_at).toDateString() === new Date().toDateString()
    ).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Enlite EV — Leads Dashboard</h1>
                            <p className="text-xs text-gray-500">Service booking enquiries</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Total Leads", value: totalLeads, icon: Users, color: "from-green-500 to-emerald-600" },
                        { label: "Today's Leads", value: todayCount, icon: Calendar, color: "from-blue-500 to-cyan-600" },
                        { label: "Vehicle Types", value: uniqueVehicles, icon: Zap, color: "from-purple-500 to-violet-600" },
                        { label: "Service Types", value: uniqueServices, icon: Wrench, color: "from-orange-500 to-amber-600" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{isLoading ? "—" : stat.value}</p>
                                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search + Sort */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by name, phone, email, vehicle or service…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-white border-gray-200"
                        />
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder((s) => (s === "desc" ? "asc" : "desc"))}
                        className="gap-2 whitespace-nowrap"
                    >
                        {sortOrder === "desc" ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                        {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                    </Button>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="grid gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <p className="text-red-600 font-semibold text-lg">Failed to load leads</p>
                        <p className="text-red-400 text-sm mt-1">Please check your connection and try again.</p>
                        <Button onClick={() => refetch()} className="mt-4" variant="outline">
                            Retry
                        </Button>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No leads found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search query.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filtered.map((booking, idx) => {
                            const isExpanded = expandedId === booking.id;
                            return (
                                <div
                                    key={booking.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                                >
                                    {/* Card Header */}
                                    <div
                                        className="p-5 flex items-center gap-4 cursor-pointer"
                                        onClick={() => setExpandedId(isExpanded ? null : booking.id)}
                                    >
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                            {booking.full_name.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="font-semibold text-gray-900 text-base">{booking.full_name}</h3>
                                                <span className="text-xs text-gray-400">#{booking.id}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                                                <span className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Phone className="w-3 h-3" /> {booking.phone_number}
                                                </span>
                                                {booking.email && (
                                                    <span className="flex items-center gap-1 text-sm text-gray-500 truncate max-w-[180px]">
                                                        <Mail className="w-3 h-3" /> {booking.email}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Badges + Date */}
                                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                            <div className="flex gap-2 flex-wrap justify-end">
                                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getVehicleColor(booking.vehicle_type)}`}>
                                                    {booking.vehicle_type}
                                                </span>
                                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getServiceColor(booking.service_type)}`}>
                                                    {booking.service_type}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(booking.created_at)}
                                            </span>
                                        </div>

                                        {/* Expand toggle */}
                                        <div className="ml-2 text-gray-400">
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </div>
                                    </div>

                                    {/* Expanded Message */}
                                    {isExpanded && booking.message && (
                                        <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                                                <MessageSquare className="w-3 h-3" /> Customer Message
                                            </p>
                                            <p className="text-sm text-gray-700 leading-relaxed">{booking.message}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Footer count */}
                {!isLoading && !isError && (
                    <p className="text-center text-sm text-gray-400 pb-4">
                        Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of{" "}
                        <span className="font-semibold text-gray-600">{totalLeads}</span> leads
                    </p>
                )}
            </div>
        </div>
    );
}
