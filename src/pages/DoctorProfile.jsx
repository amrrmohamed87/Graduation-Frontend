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
  const navigate = useNavigate();

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
        setMedicalRecords(resData.userR);
        setIsLoadingRecords(false);
      } catch (error) {
        setMedicalRecordsError(error.message);
        setIsLoadingRecords(false);
      }
    }
    loadMedicalRecords();
  }, []);

  function handleShowMedicalRecords() {}
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
        <Table className="bg-emerald-950 text-white w-[50%] m-4">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Patient Name</TableHead>
              <TableHead className="text-white">Medical Records</TableHead>
              <TableHead className="text-white">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalRecords.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.patient.name}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-emerald-950">
                        Records
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit medical records</DialogTitle>
                        <DialogDescription>
                          Make changes to the medical records here. Click save
                          when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <h1 className="text-[25px] text-black">
                            medications:{" "}
                            <span className="text-[25px] text-emerald-950">
                              {record.medicine}
                            </span>
                          </h1>
                          <h1 className="text-[25px] text-black">
                            Diagnosis:{" "}
                            <span className="text-[25px] text-emerald-950">
                              {record.diagnose}
                            </span>
                          </h1>
                          <h1 className="text-[25px] text-black">
                            Dr Name:{" "}
                            <span className="text-[25px] text-emerald-950">
                              {record.doctor.name}
                            </span>
                          </h1>
                          <h1 className="text-[25px] text-black">
                            date:{" "}
                            <span className="text-[25px] text-emerald-950">
                              {record.date}
                            </span>
                          </h1>
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
                            Dr Name
                          </label>
                          <input
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
                <TableCell className="w-18">{record.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </section>
      <section className="m-20">
        {medicalRecords.map((record, index) => (
          <div key={index}>
            <h1>{record._id}</h1>
            <h1>{record.medicine}</h1>
            <h1>{record.diagnose}</h1>
            <h1>{record.date}</h1>
          </div>
        ))}
      </section>
    </main>
  );
}

export default DoctorProfile;
