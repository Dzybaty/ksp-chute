export interface CelestialBodyT {
  name: string;
  gravity: number;
  airDensity: number;
}

export interface ParachuteT {
  name: string;
  drag: number;
  isDrogue?: boolean;
}

export interface ParachuteGroupT {
  id: string,
  symmetry: number,
  type: ParachuteT,
}

export declare const CELESTIAL_BODIES: Array<CelestialBodyT>;
export declare const PARACHUTES: Array<ParachuteT>;
