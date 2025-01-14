"use client";

import Link from "next/link";
import React from "react";

export function AppLink(props: React.ComponentProps<typeof Link>) {
  return <Link {...props} />;
}
