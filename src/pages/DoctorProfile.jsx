import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Dashboard from "../components/Dashboard";
function DoctorProfile() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);
  const [medicalRecordsError, setMedicalRecordsError] = useState("");

  //fetching medical Records
  useEffect(() => {
    async function loadMedicalRecords() {
      setIsLoadingRecords(true);
      try {
        const response = await fetch(
          "https://mhiproject.onrender.com/doctor/showRecords"
        );

        if (!response.ok) {
          throw new Error("Could not fetch medical records");
        }

        const resData = await response.json();
        console.log(resData);
        console.log(resData.userR);

        setMedicalRecords(resData.userR);
        setIsLoadingRecords(false);
      } catch (error) {
        setMedicalRecordsError(error.message);
        setIsLoadingRecords(false);
      }
    }
    loadMedicalRecords();
  }, []);

  //formate Date
  const formDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  //creating new medical record

  const name = localStorage.getItem("name");
  const specialize = localStorage.getItem("specialize");
  return (
    <main>
      <Dashboard />
      <section className="mt-16 mb-16">
        <div className="pr-6 text-right">
          <h1 className="text-emerald-950 text-[25px] md:text-[65px]">
            دكتور {name}
          </h1>
          <p className="text-emerald-950 text-[20px] md:text-[28px]">
            التخصص - {specialize}
          </p>
        </div>
      </section>
      <section className="mb-20">
        {isLoadingRecords ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white w-[50%] m-4 shadow-xl">
            <Table>
              <TableHeader className="bg-[#056558]">
                <TableRow>
                  <TableHead className="text-white">Patient Name</TableHead>
                  <TableHead className="text-white">Medical Records</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                </TableRow>
              </TableHeader>
              {/*  <TableBody>
                {medicalRecords.map((record) => (
                  <TableRow key={record._id}>
                    <TableCell>{record.patient.name}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-[#056558] text-white"
                          >
                            Records
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[805px]">
                          <DialogHeader>
                            <DialogTitle>Pt medical records</DialogTitle>
                            <DialogDescription>
                              Make changes to the medical records here. Click
                              save when you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="bg-white shadow-xl rounded-md">
                              <Table>
                                <TableHeader>
                                  <TableRow className="bg-[#056558] hover:bg-black">
                                    <TableHead className="text-white">
                                      Dr Names
                                    </TableHead>
                                    <TableHead className="text-white">
                                      Medicines
                                    </TableHead>
                                    <TableHead className="text-white">
                                      Diagnosis
                                    </TableHead>
                                    <TableHead className="text-white">
                                      Date
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>{record.doctor.name}</TableCell>
                                    <TableCell className="font-medium">
                                      {record.medicine}
                                    </TableCell>
                                    <TableCell>{record.diagnose}</TableCell>
                                    <TableCell className="text-right">
                                      {formDate(record.date)}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="name" className="text-right">
                                medicine
                              </label>
                              <input
                                id="name"
                                className="col-span-3 border-2 border-emerald-950"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="username" className="text-right">
                                diagnose
                              </label>
                              <textarea
                                id="username"
                                className="col-span-3 border-2 border-emerald-950"
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="username" className="text-right">
                                Date
                              </label>
                              <input
                                id="username"
                                type="date"
                                className="col-span-3 border-2 border-emerald-950"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>{formDate(record.date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </div>
        )}
      </section>
    </main>
  );
}

export default DoctorProfile;
