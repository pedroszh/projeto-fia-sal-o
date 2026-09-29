import { transform, useTransform, type MotionValue } from "framer-motion";

/**
 * useTransform por intervalo, sempre com clamp.
 * Usa uma função em vez do mapeamento direto para evitar a aceleração via
 * ScrollTimeline nativo, que ignora o clamp fora do intervalo em alguns navegadores.
 */
export function useRange(value: MotionValue<number>, input: number[], output: number[]): MotionValue<number>;
export function useRange(value: MotionValue<number>, input: number[], output: string[]): MotionValue<string>;
export function useRange(value: MotionValue<number>, input: number[], output: number[] | string[]): MotionValue<number> | MotionValue<string> {
  return useTransform(value, (v) => transform(v, input, output as number[]) as number | string) as MotionValue<number> | MotionValue<string>;
}
