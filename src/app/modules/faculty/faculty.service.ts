import { TFaculty } from "./faculty.interface"
import { FacultyModel } from "./faculty.model"


const createFaculty = async (payload: TFaculty) => {
    const result = await FacultyModel.create(payload)
    return result
  }
const getAllFaculty = async () =>{
  const result = await FacultyModel.find().populate("user");
  return result;
}

  export const FacultyServices = {
    createFaculty,
    getAllFaculty
  }
  