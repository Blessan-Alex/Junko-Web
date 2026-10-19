import "server-only";

import admin from "firebase-admin";
import fs from "fs";

function initFirebaseAdmin(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const jsonEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const projectIdEnv = process.env.FIREBASE_PROJECT_ID;

  if (jsonEnv) {
    const parsed = JSON.parse(jsonEnv) as admin.ServiceAccount & {
      project_id?: string;
    };
    return admin.initializeApp({
      credential: admin.credential.cert(parsed),
      projectId: parsed.project_id ?? projectIdEnv,
    });
  }

  if (credPath && fs.existsSync(credPath)) {
    const parsed = JSON.parse(fs.readFileSync(credPath, "utf8")) as admin.ServiceAccount & {
      project_id?: string;
    };
    return admin.initializeApp({
      credential: admin.credential.cert(parsed),
      projectId: parsed.project_id ?? projectIdEnv,
    });
  }

  throw new Error(
    "Firebase Admin: set FIREBASE_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS",
  );
}

export function getFirebaseAdmin(): admin.app.App {
  return initFirebaseAdmin();
}

export async function verifyAdminIdToken(idToken: string) {
  getFirebaseAdmin();
  const decoded = await admin.auth().verifyIdToken(idToken);
  if (decoded.admin !== true) {
    return null;
  }
  return decoded;
}
