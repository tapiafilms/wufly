// ══════════════════════════════════════════════════════════════
// CLEANUP VIDEOS - Supabase Edge Function
// Elimina videos expirados (mayores a 48 horas) de Storage y BD
// Ejecutar cada hora via cron job
// ══════════════════════════════════════════════════════════════

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  // CORS headers
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  }

  try {
    // Create Supabase client with service role key (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("[cleanup] Starting video cleanup...");

    // Find expired videos
    const { data: expiredVideos, error: queryError } = await supabase
      .from("media_videos")
      .select("id, video_url, thumbnail_url, user_id")
      .lt("expires_at", new Date().toISOString());

    if (queryError) {
      console.error("[cleanup] Query error:", queryError);
      throw queryError;
    }

    if (!expiredVideos || expiredVideos.length === 0) {
      console.log("[cleanup] No expired videos found.");
      return new Response(
        JSON.stringify({ success: true, deleted: 0, message: "No expired videos" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    console.log(`[cleanup] Found ${expiredVideos.length} expired videos.`);

    let deletedCount = 0;
    let errorCount = 0;

    for (const video of expiredVideos) {
      try {
        // Delete from storage: media-videos bucket
        if (video.video_url) {
          const { error: storageErr1 } = await supabase.storage
            .from("media-videos")
            .remove([video.video_url]);
          
          if (storageErr1) {
            console.warn(`[cleanup] Storage delete error (video): ${storageErr1.message}`);
          }
        }

        // Delete thumbnail from media-photos bucket
        if (video.thumbnail_url) {
          const { error: storageErr2 } = await supabase.storage
            .from("media-photos")
            .remove([video.thumbnail_url]);
          
          if (storageErr2) {
            console.warn(`[cleanup] Storage delete error (thumb): ${storageErr2.message}`);
          }
        }

        // Delete from database
        const { error: dbErr } = await supabase
          .from("media_videos")
          .delete()
          .eq("id", video.id);

        if (dbErr) {
          console.error(`[cleanup] DB delete error for ${video.id}:`, dbErr);
          errorCount++;
        } else {
          deletedCount++;
          console.log(`[cleanup] Deleted video ${video.id} for user ${video.user_id}`);
        }
      } catch (err) {
        console.error(`[cleanup] Error processing video ${video.id}:`, err);
        errorCount++;
      }
    }

    const result = {
      success: true,
      deleted: deletedCount,
      errors: errorCount,
      timestamp: new Date().toISOString(),
    };

    console.log(`[cleanup] Complete: ${deletedCount} deleted, ${errorCount} errors`);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[cleanup] Fatal error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
