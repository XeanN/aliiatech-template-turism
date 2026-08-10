// Dataset de ubigeo de Perú (departamento → provincia → distrito), extraído
// una sola vez de códigos oficiales INEI/RENIEC como archivo JSON estático —
// no depende de un paquete npm en runtime (son datos de referencia, no
// lógica). peru-ubigeo.json pesa ~80KB, por eso se importa dinámicamente
// solo cuando el cliente elige "Provincia" en el checkout.
export type UbigeoDistrict = { code: string; name: string };
export type UbigeoProvince = {
  code: string;
  name: string;
  districts: UbigeoDistrict[];
};
export type UbigeoDepartment = {
  code: string;
  name: string;
  provinces: UbigeoProvince[];
};

export async function loadUbigeoTree(): Promise<UbigeoDepartment[]> {
  const data = await import("./peru-ubigeo.json");
  return data.default as UbigeoDepartment[];
}

export function findProvince(
  tree: UbigeoDepartment[],
  departmentName: string,
  provinceName: string,
): UbigeoProvince | null {
  const department = tree.find((d) => d.name === departmentName);
  return department?.provinces.find((p) => p.name === provinceName) ?? null;
}

export function isValidProvinceLocation(
  tree: UbigeoDepartment[],
  departmentName: string,
  provinceName: string,
  districtName: string,
): boolean {
  const province = findProvince(tree, departmentName, provinceName);
  return Boolean(province?.districts.some((d) => d.name === districtName));
}
