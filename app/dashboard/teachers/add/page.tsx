"use client";
import { useState } from "react";
import { Csv } from "@/components/teachers/add/csv";
import { AddOrUpdateTeacher } from "@/components/teachers/AddOrUpdateTeacher";

const Profile = () => { 
  const [selected, setSelected] = useState(0);
  return (
    <div className="bg-bg-courses min-h-screen p-8">
      <p className="text-center font-medium text-3xl" >Add Teacher</p>
      <div className="my-4 py-4 mx-auto bg-white rounded-3xl h-fit   ">
        <div className="border-b-2 border-[#F4F5F7] flex justify-between items-center  text-[#718EBF] cursor-pointer  ">
          <a
            className={` w-1/2 ${selected ? "" : "selected"} ` }
            onClick={() => setSelected(0)}
          
          >
           <p className="text-center font-medium text-xl" >Manually</p> 
          </a>
          <a
             className={` w-1/2 ${selected ? "selected" : ""} ` }
            onClick={() => setSelected(1)}
          >
             <p className="text-center font-medium text-xl" >Import CSV</p> 
          </a>
        </div>

        {selected ? <Csv /> : <AddOrUpdateTeacher addOrUpdate="ADD"/>}
      </div>
    </div>
  );
};
export default Profile;
