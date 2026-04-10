import { medicineService } from "@/services/medicine.service";
import { AllMedicinesTable } from "./_components/AllMedicinesTable";
import { Pill } from "lucide-react";

export default async function AllMedicinesPage() {
  const { data: medicines } = await medicineService.getAllMedicines();
  const medicinesList = Array.isArray(medicines) ? medicines : [];

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Pill className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black">All Medicines</h1>
          <p className="text-muted-foreground">Monitor all products listed across the MediStore platform.</p>
        </div>
      </div>

      <AllMedicinesTable medicines={medicinesList} />
    </div>
  );
}
