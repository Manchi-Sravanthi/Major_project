export interface Hospital {
  name: string;
  type: string;
  address: string;
  district: string;
  phone: string;
  email: string;
  bedStrength: string;
  numberOfDoctors: string;
  specialties: string;
  accreditations: string;
}

export interface DoctorData {
  hospitalName: string;
  phone: string;
  email: string;
  district: string;
  specialties: string;
}

// Parsed hospital data from CSV
export const hospitals: Hospital[] = [
  {
    name: "Saparya Ayurveda",
    type: "OP Treatment Centre / Wellness Centre",
    address: "Near Police Station Thamarassery, PO. Thamarassery, Kozhikode-673573",
    district: "Kozhikode",
    phone: "7034669955",
    email: "dr.dvipink@gmail.com",
    bedStrength: "0",
    numberOfDoctors: "2",
    specialties: "Spine and Joint Care, Women and Child Care",
    accreditations: "Nil"
  },
  {
    name: "Amba Panchakarma Chikitsalayam",
    type: "Hospital",
    address: "Amba Panchakarma Chikitsalayam Urakam P.O Thrissur- 680562",
    district: "Thrissur",
    phone: "9846430009",
    email: "jitheshoo@gmail.com",
    bedStrength: "5",
    numberOfDoctors: "3",
    specialties: "Kayachikitsa",
    accreditations: "Clinical Establishment Provisional Registration"
  },
  {
    name: "Indukantham Ayurveda Hospital and Panchakarma centre",
    type: "Hospital",
    address: "Kizhakkenada, chengannur",
    district: "Alappuzha",
    phone: "9446423497",
    email: "Indukanthamayurveda@gmail.com",
    bedStrength: "10",
    numberOfDoctors: "3",
    specialties: "Kayachikitsa, Koumarabrithya, therapeutic yoga",
    accreditations: "LSGI"
  },
  {
    name: "Sanjeevani Ayurveda Hospital And Rejuvenation Centre",
    type: "Hospital",
    address: "Manappally P O",
    district: "Kollam",
    phone: "9446184869",
    email: "drrenji73@gmail.com",
    bedStrength: "22",
    numberOfDoctors: "3",
    specialties: "Kayachikitsa",
    accreditations: "ISO"
  },
  {
    name: "Sririshi Ayurveda concepts",
    type: "OP Treatment Centre / Wellness Centre",
    address: "Parappa PO Kasaragod Dt pin 671533",
    district: "Kasaragod",
    phone: "9495461290",
    email: "drpraveenpr@gmail.com",
    bedStrength: "3",
    numberOfDoctors: "3",
    specialties: "General",
    accreditations: "NA"
  },
  {
    name: "Kma aryavaidyasala",
    type: "OP Treatment Centre / Wellness Centre",
    address: "Beach road Kovalam Trivandrum",
    district: "Thiruvananthapuram",
    phone: "9388007007",
    email: "anasbams@gmail.com",
    bedStrength: "4",
    numberOfDoctors: "2",
    specialties: "Kayachikitsa",
    accreditations: "ISO"
  },
  {
    name: "Anaril Vaidyasala",
    type: "OP Treatment Centre / Wellness Centre",
    address: "XI/ 245, Thrikunnapuzha, 690515",
    district: "Alappuzha",
    phone: "9446918019",
    email: "drbrajeshveda@gmail.com",
    bedStrength: "2",
    numberOfDoctors: "1",
    specialties: "Kayachikitsa, Shalya Chikitsa",
    accreditations: "NIL"
  },
  {
    name: "Navaneetham Ayurveda speciality centre",
    type: "Hospital",
    address: "Navaneetham ayurveda speciality centre, kunnakkara, kottarakkara 691566",
    district: "Kollam",
    phone: "8590497871",
    email: "navaneethamayurveda@gmail.com",
    bedStrength: "16",
    numberOfDoctors: "12",
    specialties: "Kayachikitsa, Salakya Chikitsa, Shalya Chikitsa, Visha Chikitsa, Prasoothi Thanthra",
    accreditations: "Government approved Hospital"
  },
  {
    name: "AYURKSHETHRA",
    type: "Hospital",
    address: "Opp KSEB NH Jun: Vayalar Cherthala",
    district: "Alappuzha",
    phone: "9995432210",
    email: "drshenoieayurkshethra@gmail.com",
    bedStrength: "20",
    numberOfDoctors: "5",
    specialties: "Kayachikitsa, Koumarabrithya, Prasoothi Thanthra, Centre of Excellence for Stroke",
    accreditations: "ISO"
  },
  {
    name: "Ayurkshethra wellnes Health Resorts & Retreats",
    type: "Resort",
    address: "Alappuzha",
    district: "Alappuzha",
    phone: "9995432210",
    email: "drshenoieayurkshethra@gmail.com",
    bedStrength: "35",
    numberOfDoctors: "7",
    specialties: "Wellness",
    accreditations: "ISO"
  },
  {
    name: "Ashtanga Ayurghriham",
    type: "OP Treatment Centre / Wellness Centre",
    address: "Kochanthara house, kuruppankulangara p o, Cherthala, Alappuzha",
    district: "Alappuzha",
    phone: "8075415823",
    email: "akhilaamitha1993@gmail.com",
    bedStrength: "Nil",
    numberOfDoctors: "1",
    specialties: "Kayachikitsa",
    accreditations: "ISO"
  },
  {
    name: "Kannankallel ayurveda clinic",
    type: "Clinic op",
    address: "Kannankallel ayurveda clinic pindimana po kothamangalam ernakulam dist Kerala",
    district: "Ernakulam",
    phone: "9349753904",
    email: "g.mamman32@gmail.com",
    bedStrength: "No beds",
    numberOfDoctors: "2",
    specialties: "Kayachikitsa",
    accreditations: "No"
  }
];

export const getHospitalNames = (): string[] => {
  return hospitals.map(h => h.name);
};

export const getHospitalByName = (name: string): Hospital | undefined => {
  return hospitals.find(h => h.name.toLowerCase() === name.toLowerCase());
};

export const validateDoctor = (hospitalName: string, phone: string, email: string): Hospital | null => {
  const hospital = hospitals.find(h => 
    h.name.toLowerCase() === hospitalName.toLowerCase() &&
    h.phone.includes(phone.replace(/\D/g, '')) &&
    h.email.toLowerCase() === email.toLowerCase()
  );
  return hospital || null;
};

export const getHospitalsByDistrict = (district: string): Hospital[] => {
  return hospitals.filter(h => h.district.toLowerCase() === district.toLowerCase());
};
