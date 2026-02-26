import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "@/lib/mapbox";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// MAPBOX API KEY (Public token is fine for general usage)
mapboxgl.accessToken = MAPBOX_TOKEN;

const formSchema = z.object({
    contributorName: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    mountainName: z.string().min(2, "Mountain name is required."),
    latitude: z.string().refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
        message: "Valid latitude is required.",
    }),
    longitude: z.string().refine((val) => !isNaN(Number(val)) && Number(val) !== 0, {
        message: "Valid longitude is required.",
    }),
    notes: z.string().optional(),
    proofUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

import { useSearchParams } from "react-router-dom";

export function ContributionForm() {
    const [searchParams] = useSearchParams();
    const initialMountain = searchParams.get("mountain") || "";

    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const marker = useRef<mapboxgl.Marker | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contributorName: "",
            email: "",
            mountainName: initialMountain,
            latitude: "",
            longitude: "",
            notes: "",
            proofUrl: "",
        },
    });

    // Initialize Map
    useEffect(() => {
        if (!mapContainer.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/satellite-streets-v12",
            center: [92.4, 21.8], // Chittagong Hill Tracts roughly
            zoom: 9,
            pitch: 60,
            bearing: -20,
            antialias: true,
        });

        map.current.on("style.load", () => {
            map.current!.addSource("mapbox-dem", {
                type: "raster-dem",
                url: "mapbox://mapbox.mapbox-terrain-dem-v1",
                tileSize: 512,
                maxzoom: 14,
            });
            map.current!.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
        });

        // Add a slight delay then resize the map so it fits its container 
        // properly if rendered inside a dynamic layout.
        setTimeout(() => {
            map.current?.resize();
        }, 300);

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

        // Click to drop a pin
        map.current.on("click", (e) => {
            const { lng, lat } = e.lngLat;

            if (!marker.current) {
                marker.current = new mapboxgl.Marker({ color: "#f59e0b" })
                    .setLngLat([lng, lat])
                    .addTo(map.current!);
            } else {
                marker.current.setLngLat([lng, lat]);
            }

            form.setValue("latitude", lat.toFixed(6));
            form.setValue("longitude", lng.toFixed(6));
        });

        return () => {
            map.current?.remove();
        };
    }, [form]);

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true);

        try {
            // Determine API URL based on environment (local vs production)
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

            const response = await fetch(`${apiUrl}/api/contributions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to submit contribution');
            }

            toast.success("Contribution Submitted!", {
                description: "Thank you! Your submission is pending review.",
            });

            form.reset();
            if (marker.current) marker.current.remove();
            marker.current = null;

        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Submission failed", {
                description: "There was an error communicating with the server.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-left max-w-2xl mx-auto w-full">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="contributorName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormDescription>So we can contact you if needed.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="mountainName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mountain / Waterfall Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Saka Haphong" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-2 border border-border/50 rounded-xl p-4 bg-muted/20">
                    <div className="flex items-center gap-2 mb-2 font-medium">
                        <MapPin className="h-4 w-4 text-primary" />
                        Pick Coordinates on Map
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Click anywhere on the map to drop a pin and auto-fill the coordinates below.
                    </p>
                    <div
                        ref={mapContainer}
                        className="w-full h-[300px] rounded-lg overflow-hidden border border-border/50 mb-4"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input placeholder="21.xxxxxx" readOnly className="bg-muted/50" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                        <Input placeholder="92.xxxxxx" readOnly className="bg-muted/50" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="proofUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Proof URL (Optional but recommended)</FormLabel>
                            <FormControl>
                                <Input placeholder="Link to Strava, GPX, or image" {...field} />
                            </FormControl>
                            <FormDescription>Link to a public track or photo proving the location.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any details about how to get there, local names, etc."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Contribution"}
                </Button>
            </form>
        </Form>
    );
}
