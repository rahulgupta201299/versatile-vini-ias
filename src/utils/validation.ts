"use client";

import { useCallback, useState, type ChangeEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Field rules                                                        */
/* ------------------------------------------------------------------ */

const NAME_MIN = 2;
const NAME_MAX = 50;
const NAME_PATTERN = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*\.?$/; // letters, single spaces, . ' -
const MOBILE_PATTERN = /^[6-9]\d{9}$/; // Indian mobile: 10 digits starting 6–9

export function validateName(value: string): string {
  const v = value.trim();
  if (!v) return "Name is required";
  if (v.length < NAME_MIN) return `Name must be at least ${NAME_MIN} characters`;
  if (v.length > NAME_MAX) return `Name must be under ${NAME_MAX} characters`;
  if (/\d/.test(v)) return "Name cannot contain numbers";
  if (!NAME_PATTERN.test(v)) return "Use letters and spaces only";
  return "";
}

export function validateMobile(value: string): string {
  if (!value) return "Mobile number is required";
  if (value.length < 10) return `Enter all 10 digits (${value.length}/10)`;
  if (!/^[6-9]/.test(value)) return "Mobile number must start with 6, 7, 8 or 9";
  if (/^(\d)\1{9}$/.test(value)) return "Enter a valid mobile number";
  if (!MOBILE_PATTERN.test(value)) return "Enter a valid 10-digit mobile number";
  return "";
}

export function validateRequiredSelect(label: string) {
  return (value: string): string => (value ? "" : `Please select ${label}`);
}

export function validateConsent(value: boolean): string {
  return value ? "" : "Please accept the Terms & Conditions to continue";
}

/* ------------------------------------------------------------------ */
/*  Input sanitisers (applied while typing)                            */
/* ------------------------------------------------------------------ */

/** Keeps digits only, drops a pasted +91 / 0 prefix, caps at 10 digits. */
export function sanitizeMobile(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.length > 10 && d.startsWith("91")) d = d.slice(2);
  else if (d.length > 10 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
}

/** Removes leading spaces, collapses double spaces and caps length. */
export function sanitizeName(raw: string): string {
  return raw.replace(/^\s+/, "").replace(/\s{2,}/g, " ").slice(0, NAME_MAX);
}

/* ------------------------------------------------------------------ */
/*  Tiny form hook: per-field errors shown on blur / submit            */
/* ------------------------------------------------------------------ */

type Validators<T> = { [K in keyof T]?: (value: T[K], values: T) => string };
type Sanitizers<T> = { [K in keyof T]?: (value: T[K]) => T[K] };

export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  validators: Validators<T>,
  sanitizers: Sanitizers<T> = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errorOf = useCallback(
    (key: keyof T, all: T = values) => validators[key]?.(all[key], all) ?? "",
    [validators, values]
  );

  const setValue = <K extends keyof T>(key: K, raw: T[K]) => {
    const clean = sanitizers[key] ? sanitizers[key]!(raw) : raw;
    setValues((prev) => ({ ...prev, [key]: clean }));
  };

  const markTouched = (key: keyof T) => setTouched((prev) => ({ ...prev, [key]: true }));

  /** Error text to display (only once the field was blurred or a submit was tried). */
  const visibleError = (key: keyof T) =>
    touched[key] || submitAttempted ? errorOf(key) : "";

  /** Validates every field; returns true when the form is valid. Focuses the first invalid field. */
  const validateAll = (formEl?: HTMLElement | null) => {
    setSubmitAttempted(true);
    const invalid = (Object.keys(validators) as (keyof T)[]).filter((k) => errorOf(k));
    if (invalid.length && formEl) {
      setTimeout(() => {
        const el = formEl.querySelector<HTMLElement>('[aria-invalid="true"]');
        el?.focus();
      }, 0);
    }
    return invalid.length === 0;
  };

  const reset = (next: T = initialValues) => {
    setValues(next);
    setTouched({});
    setSubmitAttempted(false);
  };

  /** Spread onto an MUI TextField: value, onChange, onBlur, error, helperText. */
  const fieldProps = (key: keyof T, hint?: string) => {
    const err = visibleError(key);
    return {
      name: String(key),
      value: values[key] as unknown as string,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValue(key, e.target.value as T[keyof T]),
      onBlur: () => markTouched(key),
      error: Boolean(err),
      helperText: err || hint || " ",
    };
  };

  return { values, setValue, markTouched, visibleError, validateAll, reset, fieldProps };
}
