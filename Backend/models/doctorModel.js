
import db from "../config/db.js"


export const createDoctor = async (doctorData) => {
  const query = `
    INSERT INTO doctors 
    (name, email, password, speciality, degree, experience, about, available, fees,
     address1, address2, phone, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    doctorData.name,
    doctorData.email,
    doctorData.password,
    doctorData.speciality,
    doctorData.degree,
    doctorData.experience,
    doctorData.about,
    doctorData.available,
    doctorData.fees,
    doctorData.address1,
    doctorData.address2,
    doctorData.phone || '',
    doctorData.image || ''
  ];

  const [result] = await db.execute(query, values);
  return result;
};

export const findByEmail = async (email) => {
 try {
   const [result] = await db.execute(`SELECT * from doctors WHERE email = ?`, [email])
  return result[0];
  
 } catch (error) {
  return error.message;
 }
}

// models/doctorModel.js

export const findDoctors = async () => {
  try {

    const [result] = await db.execute(`
      SELECT 
        id,
        name,
        email,
        speciality,
        degree,
        experience,
        about,
        available,
        fees,
        address1,
        address2,
        phone,
        image,
        slots_booked
      FROM doctors
    `);

    return result;

  } catch (error) {

    console.log(error);

    throw new Error(error.message);
  }
};

export const findById = async (doctor_id) => {
  try {
    const [result] = await db.execute(`SELECT * FROM doctors WHERE id = ?`, [doctor_id]);
    return result[0];
  } catch (error) {
    throw error;
  }
};  

export const findByIdAndUpdate = async (doctor_id, doctorData) => {
  try {
    const [result] = await db.execute(`UPDATE doctors SET available = ? WHERE id = ?`, [doctorData.available ? 1 : 0, doctor_id]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateDoctorSlotsBooked = async (doctor_id, slots_booked_json) => {
  try {
    const [result] = await db.execute(`UPDATE doctors SET slots_booked = ? WHERE id = ?`, [slots_booked_json, doctor_id]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateDoctorProfileById = async (doctor_id, doctorData) => {
  try {
    const query = `
      UPDATE doctors 
      SET fees = ?, address1 = ?, address2 = ?, available = ?, about = ?, phone = ?, image = ?
      WHERE id = ?
    `;
    const values = [
      doctorData.fees,
      doctorData.address1,
      doctorData.address2,
      doctorData.available,
      doctorData.about,
      doctorData.phone,
      doctorData.image,
      doctor_id
    ];
    const [result] = await db.execute(query, values);
    return result;
  } catch (error) {
    throw error;
  }
};