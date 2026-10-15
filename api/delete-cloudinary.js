
import { v2 as cloudinary } from "cloudinary";

const ADMIN_UID = "9g720vY2b7Qd6hCpDCMWl1XNAW12";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const authorization = req.headers.authorization || "";
    const idToken = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : "";

    if (!idToken) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const verifyResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.VITE_FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!verifyResponse.ok) {
      return res.status(401).json({ error: "Invalid authentication" });
    }

    const authData = await verifyResponse.json();
    const user = authData.users?.[0];

    if (!user || user.localId !== ADMIN_UID) {
      return res.status(403).json({ error: "Admin access required" });
    }

    const { public_id } = req.body || {};

    if (
      typeof public_id !== "string" ||
      !public_id.trim() ||
      public_id.length > 500
    ) {
      return res.status(400).json({ error: "Valid public_id required" });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(502).json({ error: "Cloudinary deletion failed" });
    }

    return res.status(200).json({ success: true, result: result.result });
  } catch (error) {
    console.error("Cloudinary deletion error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
}
