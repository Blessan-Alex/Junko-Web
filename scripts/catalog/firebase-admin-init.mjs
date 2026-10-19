import admin from "firebase-admin";
import fs from "fs";

/**
 * Initialize Firebase Admin from env (never commit credentials).
 * - FIREBASE_SERVICE_ACCOUNT_JSON: full service account JSON string
 * - GOOGLE_APPLICATION_CREDENTIALS: path to service account JSON file
 */
export function initFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin;
  }

  const jsonEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (jsonEnv) {
    let parsed;
    try {
      parsed = JSON.parse(jsonEnv);
    } catch {
      throw new Error(
        "FIREBASE_SERVICE_ACCOUNT_JSON is set but is not valid JSON",
      );
    }
    admin.initializeApp({
      credential: admin.credential.cert(parsed),
      projectId: parsed.project_id,
    });
    return admin;
  }

  if (credPath) {
    if (!fs.existsSync(credPath)) {
      throw new Error(
        `GOOGLE_APPLICATION_CREDENTIALS file not found: ${credPath}`,
      );
    }
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    return admin;
  }

  throw new Error(
    "Missing Firebase credentials: set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS",
  );
}
