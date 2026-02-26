import { useEffect, useState } from "react";
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Loader2, Sun, Sunset, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeatherWidgetProps {
    lat: number;
    lng: number;
}

interface WeatherData {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
    isDay: number;
    elevation: number;
}

// Map WMO weather codes to icons and descriptions
// Ref: https://open-meteo.com/en/docs
const getWeatherDetails = (code: number, isDay: number) => {
    if (code === 0) return { icon: isDay ? Sun : Sunset, text: "Clear sky" };
    if (code === 1 || code === 2 || code === 3) return { icon: Cloud, text: "Partly cloudy" };
    if (code >= 45 && code <= 48) return { icon: CloudFog, text: "Foggy" };
    if (code >= 51 && code <= 57) return { icon: CloudDrizzle, text: "Drizzle" };
    if (code >= 61 && code <= 67) return { icon: CloudRain, text: "Rain" };
    if (code >= 71 && code <= 77) return { icon: CloudSnow, text: "Snowfall" };
    if (code >= 80 && code <= 82) return { icon: CloudRain, text: "Rain showers" };
    if (code >= 95 && code <= 99) return { icon: CloudLightning, text: "Thunderstorm" };
    return { icon: Cloud, text: "Unknown" };
};

export function WeatherWidget({ lat, lng }: WeatherWidgetProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!lat || !lng) {
            setLoading(false);
            return;
        }

        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(false);
                // Using Open-Meteo free API
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,is_day,weather_code,wind_speed_10m&timezone=auto`;
                const res = await fetch(url);
                if (!res.ok) throw new Error("Failed to fetch weather");

                const data = await res.json();
                setWeather({
                    temperature: data.current.temperature_2m,
                    windSpeed: data.current.wind_speed_10m,
                    weatherCode: data.current.weather_code,
                    isDay: data.current.is_day,
                    elevation: data.elevation,
                });
            } catch (err) {
                console.error("Weather fetch error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lng]);

    // Determine season based on current date (for Bangladesh)
    // Winter: Dec-Feb, Pre-monsoon: Mar-May, Monsoon: Jun-Sep, Post-monsoon: Oct-Nov
    const currentMonth = new Date().getMonth() + 1; // 1-12
    let seasonBadge = null;

    if (currentMonth >= 6 && currentMonth <= 9) {
        seasonBadge = <Badge variant="destructive" className="ml-auto flex items-center gap-1.5"><CloudRain className="w-3.5 h-3.5" /> Monsoon Warning</Badge>;
    } else if (currentMonth === 11 || currentMonth === 12 || currentMonth === 1 || currentMonth === 2) {
        seasonBadge = <Badge variant="default" className="ml-auto bg-green-500 hover:bg-green-600 flex items-center gap-1.5"><Sun className="w-3.5 h-3.5" /> Prime Season</Badge>;
    } else if (currentMonth >= 3 && currentMonth <= 5) {
        seasonBadge = <Badge variant="secondary" className="ml-auto flex items-center gap-1.5"><Sun className="w-3.5 h-3.5" /> Hot & Humid</Badge>;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-6 border border-border/50 rounded-xl bg-muted/10 h-[104px]">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className="flex items-center text-sm p-4 border border-border/50 rounded-xl bg-muted/10 text-muted-foreground">
                Live weather currently unavailable.
            </div>
        );
    }

    const { icon: WeatherIcon, text: weatherDesc } = getWeatherDetails(weather.weatherCode, weather.isDay);

    return (
        <div className="overflow-hidden relative rounded-xl border border-border/50 bg-card p-5">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10" />

            <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <WeatherIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold tracking-tight">{Math.round(weather.temperature)}</span>
                            <span className="text-xl text-muted-foreground font-medium">°C</span>
                        </div>
                        <p className="text-sm font-medium text-foreground/80">{weatherDesc}</p>
                    </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5">
                    {seasonBadge}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                        <Wind className="h-3.5 w-3.5" />
                        <span>{weather.windSpeed} km/h wind</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
