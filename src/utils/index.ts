/* eslint-disable import/prefer-default-export */
import type { CelestialBodyT, ParachuteGroupT } from '../data';

export const calculateVelocity = (
  targetBody: CelestialBodyT,
  mountedGroups: ParachuteGroupT[],
  shipMass: number,
): {
  vTouch: number,
  vDrag: number,
} => {
  let vTouch = 0.0;
  let vDrag = 0.0;

  mountedGroups.forEach((group) => {
    const b = (2.0 * targetBody.gravity) / (targetBody.airDensity * group.type.drag);
    const summand = (group.symmetry ** 1.5) / b;
    vTouch += summand;

    if (group.type.isDrogue) {
      vDrag += summand;
    }
  });

  return {
    vTouch: Math.sqrt(shipMass / vTouch),
    vDrag: Math.sqrt(shipMass / vDrag),
  };
};

export const generateId = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < 8; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const formatResult = (result: number) => {
  if (!result || !Number.isFinite(Number(result)) || Number.isNaN(Number(result))) {
    return 'N/A';
  }

  return `${result.toFixed(2)} m/s`;
};
