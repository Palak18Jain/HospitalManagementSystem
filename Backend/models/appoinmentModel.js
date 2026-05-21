import db from "../config/db.js"


export const findAllAppointments = async() => {
    try{
       const [result] = await db.execute(`SELECT * FROM appointments`);
       return result;

    } catch (error) {
        return error.message;
    }
}
export const getAppointmentsForDoctor = async(docId) => {
    try{
       const [result] = await db.execute(`SELECT * FROM appointments WHERE docId = ?`, [docId]);
       return result;

    } catch (error) {
        throw error;
    }
}

export const getAppointmentById = async (appointmentId) => {
    try {
        const [rows] = await db.execute(
            `SELECT * FROM appointments WHERE id = ?`,
            [appointmentId]
        );
        return rows[0];
    } catch (error) {
        throw error;
    }    
}

export const cancelAppointmentById = async (appointmentId) => {
    try {
        const [result] = await db.execute(
            `UPDATE appointments SET cancelled = 1 WHERE id = ?`,
            [appointmentId]
        );
        return result;
    } catch (error) {
        throw error;
    }
}

export const completeAppointmentById = async (appointmentId) => {
    try {
        const [result] = await db.execute(
            `UPDATE appointments SET isComplete = 1 WHERE id = ?`,
            [appointmentId]
        );
        return result;
    } catch (error) {
        throw error;
    }
}
