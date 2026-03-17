export interface VariationOption {
  id: string;
  value: string;
}

export interface VariationGroup {
  id:string;
  name: string;
  options: VariationOption[];
}
