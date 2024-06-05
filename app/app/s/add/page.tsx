"use client";
import { useState, useEffect } from "react";
import { Csv } from "@/components/students/add/csv";
import { AddOrUpdateStudent } from "@/components/students/addOrUpdateStudent";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { getGroups, getPromos, getYears } from "@/app/actions/utils";
import { groupToOptions } from "@/utils/utils";

const Profile = () => {
  const [selected, setSelected] = useState(0);
  const [promos, setPromos] = useState<string[]>([]);
  const [groups, setGroups] = useState<Option[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedGroups, fetchedPromos, fetchedYears] = await Promise.all([
          getGroups(),
          getPromos(),
          getYears()
        ]);
        setGroups(groupToOptions(fetchedGroups));
        setPromos(fetchedPromos);
        setYears(fetchedYears);
      } catch (err) {
        console.error("Failed to fetch promos, years, groups data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-blue-light min-h-screen p-8">
      <p className="text-center font-medium text-3xl">Add Student</p>
      <div className="my-4 py-4 mx-auto bg-white rounded-3xl h-fit">
        <div className="border-b-2 border-[#F4F5F7] flex justify-between items-center text-[#718EBF] cursor-pointer">
          <a
            className={`w-1/2 ${selected ? "" : "selected"}`}
            onClick={() => setSelected(0)}
          >
            <p className="text-center font-medium text-xl">Manually</p>
          </a>
          <a
            className={`w-1/2 ${selected ? "selected" : ""}`}
            onClick={() => setSelected(1)}
          >
            <p className="text-center font-medium text-xl">Import CSV</p>
          </a>
        </div>

        {selected ? (
          <Csv />
        ) : (
          <AddOrUpdateStudent
            addOrUpdate="ADD"
            promos={promos}
            years={years}
            groups={groups}
          /> 
        )}
      </div>
    </div>
  );
};

export default Profile;
