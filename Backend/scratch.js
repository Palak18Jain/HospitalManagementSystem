import { findAllAppointments } from "./models/appoinmentModel.js";

async function test() {
  try {
    const appoinments = await findAllAppointments();
    console.log("Found raw appointments count:", appoinments.length);
    const parsedAppointments = appoinments.map(appt => {
        let parsedDocData = {};
        let parsedUserData = {};

        if (typeof appt.docData === 'string') {
            try { parsedDocData = JSON.parse(appt.docData); } catch (e) { }
        } else if (appt.docData) {
            parsedDocData = appt.docData;
        }

        if (typeof appt.userData === 'string') {
            try { parsedUserData = JSON.parse(appt.userData); } catch (e) { }
        } else if (appt.userData) {
            parsedUserData = appt.userData;
        }

        return {
            ...appt,
            docData: parsedDocData,
            userData: parsedUserData
        };
    });
    console.log("Successfully parsed appointments count:", parsedAppointments.length);
    if (parsedAppointments.length > 0) {
      console.log("First parsed appointment sample:", JSON.stringify(parsedAppointments[0], null, 2));
    }
  } catch (error) {
    console.error("Test failed:", error);
  }
  process.exit(0);
}

test();
