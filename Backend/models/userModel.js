import db from "../config/db.js ";


export const createUser = async (userdata) => {
    const query = `
     INSERT INTO users (
        name, 
        email, 
        phone, 
        password, 
        address, 
        gender, 
        dob, 
        image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        userdata.name || '',
        userdata.email || '',
        userdata.phone || '',
        userdata.password || '',
        userdata.address || '',
        userdata.gender || '',
        userdata.dob || null,
        userdata.image || ''
    ];
    const [result] = await db.execute(query, values);
    return result;
    
}

export const findByEmail = async (email)=>{
    try {
    const [rows] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }}

   export const findById =async (userId)=>{
    try {
        const [rows] = await db.execute(
            `SELECT * FROM users WHERE id = ?`,
            [userId]
        )
        return rows[0]
    } catch (error) {
        console.log(error)
        throw error
    }    
   }

export const updateUserProfile = async (userId, updateData) => {
    try {
        const query = `
            UPDATE users
            SET name = ?, dob = ?, gender = ?, phone = ?, address = ?, image = ?
            WHERE id = ?
        `;
        
        let addressValue = updateData.address;
        if (typeof addressValue === 'object') {
            addressValue = JSON.stringify(addressValue);
        }

        const values = [
            updateData.name || '',
            updateData.dob || '',
            updateData.gender || '',
            updateData.phone || '',
            addressValue || '',
            updateData.image || '',
            userId
        ];
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export  const  createAppoinment = async (appoinmentData) => {
    try {
        const query = `
            INSERT INTO appointments (
                userId, 
                docId, 
                slotDate, 
                slotTime, 
                userData,
                docData,
                amount, 
                date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            appoinmentData.userId,
            appoinmentData.docId,
            appoinmentData.slotDate,
            appoinmentData.slotTime,
            appoinmentData.userData,
            appoinmentData.docData,
            appoinmentData.amount,
            appoinmentData.date
        ];
        const [result] = await db.execute(query, values);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAppointmentByUserId = async (userId) => {
    try {
        const [rows] = await db.execute(
            `SELECT * FROM appointments WHERE userId = ?`,
            [userId]
        )
        return rows
    } catch (error) {
        console.log(error)
        throw error
    }    
}

export const getAppointmentById = async (appointmentId) => {
    try {
        const [rows] = await db.execute(
            `SELECT * FROM appointments WHERE id = ?`,
            [appointmentId]
        )
        return rows[0]
    } catch (error) {
        console.log(error)
        throw error
    }    
}

export const cancelAppointmentById = async (appointmentId) => {
    try {
        const [result] = await db.execute(
            `UPDATE appointments SET cancelled = 1 WHERE id = ?`,
            [appointmentId]
        )
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateAppointmentPaymentStatus = async (appointmentId, isPaid) => {
    try {
        const [result] = await db.execute(
            `UPDATE appointments SET payment = ? WHERE id = ?`,
            [isPaid ? 1 : 0, appointmentId]
        )
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const findUsers = async () => {
    try {
        const [rows] = await db.execute(`SELECT * FROM users`);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}