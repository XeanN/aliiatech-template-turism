"use client";

import { useEffect, useMemo, useState } from "react";

import type { UbigeoDepartment } from "@/lib/ubigeo";

// Selects encadenados Departamento→Provincia→Distrito — mismo dataset y
// patrón (useMemo derivando opciones + reset en cascada al cambiar un
// padre) que ya usa CheckoutFlow.tsx para direcciones de envío. Devuelve
// un fragment (3 <select>) para que el padre controle el layout/wrapper.
export function LocationSelects({
  department,
  province,
  district,
  onDepartmentChange,
  onProvinceChange,
  onDistrictChange,
  required = false,
  className,
}: {
  department: string;
  province: string;
  district: string;
  onDepartmentChange: (value: string) => void;
  onProvinceChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  required?: boolean;
  className?: string;
}) {
  const [ubigeoTree, setUbigeoTree] = useState<UbigeoDepartment[] | null>(null);

  useEffect(() => {
    import("@/lib/ubigeo").then(({ loadUbigeoTree }) => loadUbigeoTree().then(setUbigeoTree));
  }, []);

  const provinceOptions = useMemo(
    () => ubigeoTree?.find((d) => d.name === department)?.provinces ?? [],
    [ubigeoTree, department],
  );
  const districtOptions = useMemo(
    () => provinceOptions.find((p) => p.name === province)?.districts ?? [],
    [provinceOptions, province],
  );

  function handleDepartmentChange(next: string) {
    onDepartmentChange(next);
    onProvinceChange("");
    onDistrictChange("");
  }

  function handleProvinceChange(next: string) {
    onProvinceChange(next);
    onDistrictChange("");
  }

  return (
    <>
      <select
        value={department}
        onChange={(e) => handleDepartmentChange(e.target.value)}
        required={required}
        className={className}
      >
        <option value="">Departamento</option>
        {ubigeoTree?.map((dept) => (
          <option key={dept.code} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>

      <select
        value={province}
        onChange={(e) => handleProvinceChange(e.target.value)}
        disabled={!department}
        required={required}
        className={`${className} disabled:opacity-50`}
      >
        <option value="">Provincia</option>
        {provinceOptions.map((prov) => (
          <option key={prov.code} value={prov.name}>
            {prov.name}
          </option>
        ))}
      </select>

      <select
        value={district}
        onChange={(e) => onDistrictChange(e.target.value)}
        disabled={!province}
        required={required}
        className={`${className} disabled:opacity-50`}
      >
        <option value="">Distrito</option>
        {districtOptions.map((dist) => (
          <option key={dist.code} value={dist.name}>
            {dist.name}
          </option>
        ))}
      </select>
    </>
  );
}
